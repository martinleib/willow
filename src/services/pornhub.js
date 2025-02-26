import axios from "axios";
import * as cheerio from "cheerio";

export async function pornhub(email) {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en,en-US;q=0.5",
    DNT: "1",
    Connection: "keep-alive",
    "Upgrade-Insecure-Requests": "1",
  };

  try {
    console.log("Checking email on Pornhub:", email);
    const response = await axios.get("https://www.pornhub.com/signup", {
      headers,
    });
    const $ = cheerio.load(response.data);
    const token = $('input[name="token"]').attr("value");

    console.log("Token:", token);

    if (!token) {
      console.log("Token not found.");
      return false;
    }

    const checkResponse = await axios.post(
      "https://www.pornhub.com/user/create_account_check",
      {
        check_what: "email",
        email: email,
      },
      {
        headers,
        params: { token },
      }
    );

    console.log("Check Response:", checkResponse.data); // Log the response

    if (checkResponse.data.error_message === "Email has been taken.") {
      console.log("Account found on Pornhub.");
      return true; // Email exists
    } else {
      console.log("No account found on Pornhub.");
      return false; // Email does not exist
    }
  } catch (error) {
    console.error("Pornhub check error:", error);
    return false;
  }
}
