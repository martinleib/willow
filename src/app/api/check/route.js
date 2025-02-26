import { NextResponse } from "next/server";
import * as services from "../../../services";  // Use relative path if @ alias doesn't work

export async function POST(request) {
  try {
    const { email } = await request.json();
    const results = {};

    const checks = Object.entries(services).map(async ([serviceName, checkFn]) => {
      try {
        const hasAccount = await checkFn(email);
        results[serviceName] = hasAccount;
      } catch (error) {
        console.error(`Error checking ${serviceName}:`, error);
        results[serviceName] = false;
      }
    });

    await Promise.all(checks);
    return NextResponse.json(results);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}