import axios from "axios";
import * as cheerio from "cheerio";

export async function redtube(email) {
  try {
    const response = await axios.get("https://redtube.com/register");
    const $ = cheerio.load(response.data);
    const token = $("#token").attr("value");

    if (!token) return false;

    const checkResponse = await axios.post(
      "https://www.redtube.com/user/create_account_check",
      new URLSearchParams({
        token,
        check_what: "email",
        email,
      })
    );

    return checkResponse.data.includes("Email has been taken.");
  } catch (error) {
    console.error("Redtube check error:", error);
    return false;
  }
}