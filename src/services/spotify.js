import axios from "axios";

export async function spotify(email) {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    Accept: "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.5",
    DNT: "1",
    Connection: "keep-alive",
  };

  const params = {
    validate: "1",
    email: email,
  };

  try {
    console.log("Checking email on Spotify:", email);
    const response = await axios.get(
      "https://spclient.wg.spotify.com/signup/public/v1/account",
      {
        headers,
        params,
      }
    );

    console.log("Response:", response.data); // Log the response data

    const status = response.data.status;

    if (status === 1) {
      console.log("No account found on Spotify.");
      return false; // Email does not exist
    } else if (status === 20) {
      console.log("Account found on Spotify.");
      return true; // Email exists
    } else {
      console.log("Rate-limited or unknown status from Spotify.");
      return null; // Unknown or rate-limited
    }
  } catch (error) {
    console.error("Spotify check error:", error);
    return false; // Error occurred, assume email does not exist
  }
}
