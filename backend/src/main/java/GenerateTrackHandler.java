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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import org.json.JSONObject;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.Route;

public class GenerateTrackHandler implements Route {
  private String accessToken;
  private String playlistID;
  private String trackID;
  private HashMap<String, String> responseMap;
  public GenerateTrackHandler() {
    this.accessToken = "";
    this.playlistID = "";
    this.responseMap = new HashMap<>();
  }

  @Override
  public Object handle (Request request, Response response)
    throws Exception {
    QueryParamsMap QueryMapParameters = request.queryMap();
    if (!request.queryParams().equals(new HashSet<>(
        List.of("accessToken", "playlistID")))) {
      this.responseMap.put("Result", "Invalid Parameters");
      return new GenericResponse(this.responseMap).serialize();
    }
    this.accessToken = QueryMapParameters.value("accessToken");
    this.playlistID = QueryMapParameters.value("playlistID");
    this.getTracks();
    this.responseMap.put("Track", this.trackID);
    return new GenericResponse(this.responseMap).serialize();
  }

  public void getTracks() throws URISyntaxException, IOException {
    URL url = new URL("https://api.spotify.com/v1/playlists/" + this.playlistID + "/tracks");
    HttpURLConnection httpURLConnection = (HttpURLConnection)url.openConnection();
    httpURLConnection.setRequestProperty("Accept", "application/json");
    httpURLConnection.setRequestProperty("Content-Type", "application/json");
    httpURLConnection.setRequestProperty("Authorization", "Bearer " + this.accessToken);
    httpURLConnection.setRequestMethod("GET");

    if (httpURLConnection.getResponseCode() != 200) {
      this.responseMap.put("Result", "Error");
      this.trackID = "Invalid playlist";
      return;
    }

    BufferedReader Lines = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
    String currentLine = Lines.readLine();
    StringBuilder response = new StringBuilder();

    while (currentLine != null) {
      response.append(currentLine).append("\n");
      currentLine = Lines.readLine();
    }
    System.out.println(response);
    JSONObject TrackDataJSON = new JSONObject(response.toString());
    this.trackID = response.toString();
    int track_number = getRandomInteger(0, TrackDataJSON.getInt("total"));
    this.responseMap.put("Result", "Success");
    String trackSongName = TrackDataJSON.getJSONArray("items").getJSONObject(track_number).getJSONObject("track").getString("name");
    JSONObject trackJSON = new JSONObject(TrackDataJSON.getJSONArray("items").getJSONObject(track_number).getJSONObject("track").getJSONArray("artists").get(0).toString());
    String trackArtistName = trackJSON.getString("name");
    this.trackID = (trackSongName + "-" + trackArtistName);
    String trackURL = TrackDataJSON.getJSONArray("items").getJSONObject(track_number).getJSONObject("track").getJSONObject("external_urls").getString("spotify");
    ArrayList<String> trackNameAndArtistList = new ArrayList<>();
    for (int i = 0; i < TrackDataJSON.getInt("total"); i++) {
      String trackName = TrackDataJSON.getJSONArray("items").getJSONObject(i).getJSONObject("track").getString("name");
      JSONObject ArtistsDataJSON = new JSONObject(TrackDataJSON.getJSONArray("items").getJSONObject(i).getJSONObject("track").getJSONArray("artists").get(0).toString());
      String artistName = ArtistsDataJSON.getString("name");
      trackNameAndArtistList.add(trackName + " - " + artistName);
    }
    this.responseMap.put("Track and Artists List", trackNameAndArtistList.toString());
    this.responseMap.put("TrackURL", trackURL);
  }

  private int getRandomInteger(int min, int max) {
    return (int) ((Math.random() * (max - min)) + min);
  }
}
