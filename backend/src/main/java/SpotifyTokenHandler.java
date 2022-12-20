import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import org.json.JSONObject;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * The SpotifyTokenHandler class is responsible for returning a Hashmap containing an accessToken
 * which can be used for the SpotifyAPI assuming a valid request to the API was made along with
 * its duration. The code for this class was heavily inspired by the following thread:
 * https://stackoverflow.com/questions/63876345/how-to-get-access-token-from-spotify-api-java
 */
public class SpotifyTokenHandler implements Route {
  private String accessToken;
  private String expiresIn;

  public SpotifyTokenHandler() {
    this.accessToken = "";
    this.expiresIn = "";
  }

  /**
   * The handle method is responsible for generating the Hashmap which is displayed on the API
   * server when a request is made. In the event of a valid request a Hashmap containing the
   * Result, AccessToken, and duration of the AccessToken via the ExpiresIn field is returned.
   * For an invalid request a Hashmap containing a Result field explaining the error is returned.
   * @param request the request to handle
   * @param response use to modify properties of the response
   * @return Response content of the request made
   * @throws Exception This is part of the interface; we don't have to throw anything.
   */
  @Override
  public Object handle(Request request, Response response)
      throws Exception {
    HashMap<String, Object> responseMap = new HashMap<>();
    QueryParamsMap QueryMapParameters = request.queryMap();
    // Check for valid parameters, in the event of invalid parameters serialize a map
    // containing that the Result was Invalid Parameters.
    if (!request.queryParams().equals(new HashSet<>(
        List.of()))) {
      responseMap.put("Result", "Invalid Parameters");
      return new GenericResponse(responseMap).serialize();
    }
    try {
      this.getAccessToken();
      responseMap.put("Result", "Success, got an access token");
      responseMap.put("AccessToken", this.accessToken);
      responseMap.put("ExpiresIn", this.expiresIn);
    }
    // This line should realistically never be called since the Spotify servers are constantly
    // running so in theory a valid request should always be made
    catch (IOException e) {
      responseMap.put("Result", "Error, failed to get an access token");
    }
    return new GenericResponse(responseMap).serialize();
  }

  /**
   * This method sends a POST request to the Spotify Token endpoint from their API to request
   * and generate a valid token. If the request is valid, it then gets the AccessToken
   * and the duration of the Token and updates the accessToken and expiresIn instance variables.
   * @throws IOException if the connection fails for some reason
   */
  public void getAccessToken() throws IOException {
    URL url = new URL(TokenEndpoints.TOKEN_URL);
    HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
    httpURLConnection.setRequestMethod("POST");
    httpURLConnection.setDoOutput(true);
    httpURLConnection.setRequestProperty("content-type", "application/x-www-form-urlencoded");

    String data =
        "grant_type=client_credentials&client_id=" + TokenEndpoints.CLIENT_ID + "&client_secret="
            + TokenEndpoints.CLIENT_SECRET + "";

    // In the event of a valid request we need to read the bytes containing the accessToken
    // and the duration of the token.
    byte[] out = data.getBytes(StandardCharsets.UTF_8);

    OutputStream stream = httpURLConnection.getOutputStream();
    stream.write(out);

    BufferedReader Lines = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
    String currentLine = Lines.readLine();
    StringBuilder response = new StringBuilder();

    while (currentLine != null) {
      response.append(currentLine).append("\n");
      currentLine = Lines.readLine();
    }

    // Convert the StringBuilder output which we read in above into a JSON so we can access
    // the access_token and expires_in fields.
    JSONObject DataJSON = new JSONObject(response.toString());
    this.accessToken = DataJSON.getString("access_token");
    this.expiresIn = String.valueOf(DataJSON.getInt("expires_in"));
    httpURLConnection.disconnect();
  }
}
