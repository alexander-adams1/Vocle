import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import javax.xml.crypto.Data;
import org.json.JSONObject;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

// Citing thread which was helpful https://stackoverflow.com/questions/63876345/how-to-get-access-token-from-spotify-api-java
public class SpotifyTokenHandler implements Route {
  private String accessToken;
  private String expiresIn;

  public SpotifyTokenHandler() {
    this.accessToken = "";
    this.expiresIn = "";
  }

  @Override
  public Object handle(Request request, Response response)
      throws Exception {
    HashMap<String, String> responseMap = new HashMap<>();
    QueryParamsMap QueryMapParameters = request.queryMap();
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
    catch (IOException e) {
      responseMap.put("Result", "Error, failed to get an access token");
    }
    return new GenericResponse(responseMap).serialize();
  }

  public void getAccessToken() throws IOException {
    URL url = new URL(TokenEndpoints.TOKEN_URL);
    HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
    httpURLConnection.setRequestMethod("POST");
    httpURLConnection.setDoOutput(true);
    httpURLConnection.setRequestProperty("content-type", "application/x-www-form-urlencoded");

    String data =
        "grant_type=client_credentials&client_id=" + TokenEndpoints.CLIENT_ID + "&client_secret="
            + TokenEndpoints.CLIENT_SECRET + "";

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

    JSONObject DataJSON = new JSONObject(response.toString());
    this.accessToken = DataJSON.getString("access_token");
    this.expiresIn = String.valueOf(DataJSON.getInt("expires_in"));
    httpURLConnection.disconnect();
  }
}
