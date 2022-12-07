import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.http.HttpRequest;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GenerateTrackHandler implements Route {
  private String accessToken;
  private String playlistID;
  public GenerateTrackHandler() {
    this.accessToken = "";
    this.playlistID = "";
  }

  @Override
  public Object handle (Request request, Response response)
    throws Exception {
    HashMap<String, String> responseMap = new HashMap<>();
    QueryParamsMap QueryMapParameters = request.queryMap();
    if (!request.queryParams().equals(new HashSet<>(
        List.of("accessToken", "playlistID")))) {
      responseMap.put("Result", "Invalid Parameters");
      return new GenericResponse(responseMap).serialize();
    }
    this.accessToken = QueryMapParameters.value("accessToken");
    this.playlistID = QueryMapParameters.value("playlistID");
    this.getTracks();
    return 1;
  }

  public void getTracks() throws URISyntaxException, IOException {
    URL url = new URL("https://api.spotify.com/v1/playlists/" + this.playlistID + "/tracks");
    HttpURLConnection http = (HttpURLConnection)url.openConnection();
    http.setRequestProperty("Accept", "application/json");
    http.setRequestProperty("Content-Type", "application/json");
    http.setRequestProperty("Authorization", "Bearer " + this.accessToken);
    http.setRequestMethod("GET");

    BufferedReader Lines = new BufferedReader(new InputStreamReader(http.getInputStream()));
    String currentLine = Lines.readLine();
    StringBuilder response = new StringBuilder();
    while (currentLine != null) {
      response.append(currentLine).append("\n");
      currentLine = Lines.readLine();
    }
    System.out.println(response);
    System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
  }
}
