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

/**
 * The GenerateTrackHandler class is responsible for taking in a valid AccessToken which can
 * be used for the SpotifyAPI and a playlistID for a public spotify playlist and then randomly
 * generating one song from the playlist. In the event of a valid request this endpoint returns
 * a Response containing a list of all tracks and their respective artists on the playlist separated
 * by a ' - ', the Track name of the randomly selected track, the artist name of the randomly
 * selected track, the track and artist name of the randomly selected track separated by a ' - ',
 * the Result, and a TrackURL which is a URL containing a preview of the track. It should be noted
 * it is expected that a user of this endpoint has generated a valid AccessToken using our SpotifyToken
 * endpoint or generated one on their own, thus in the event of an invalid accessToken the browser
 * will return invalid playlist.
 */
public class GenerateTrackHandler implements Route {
  private String accessToken;
  private String playlistID;
  private String trackID;
  private HashMap<String, Object> responseMap;
  public GenerateTrackHandler() {
    this.accessToken = "";
    this.playlistID = "";
    this.responseMap = new HashMap<>();
  }

  /**
   * This method serializes the result of the getTracks method assuming valid parameters
   * were inputted and then prints the result to the browser. In the result of invalid parameters
   * the method instead serializes a Map containing a Result field which maps to Invalid Parameters
   * and then prints that to the browser.
   * @param request the request to handle
   * @param response use to modify properties of the response
   * @return Response content of the request made
   * @throws Exception This is part of the interface; we don't have to throw anything.
   */
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

  /**
   * This method makes a get request to the SpotifyAPI using the PlaylistID and the AccessToken
   * to get all the tracks on the playlist. In the event of an invalid playlist, a HashMap
   * containing the Result field mapping to an Error is returned whereas in the event of a success
   * this endpoint returns a Response containing a list of all tracks and their respective artists
   * on the playlist separated by a ' - ', the Track name of the randomly selected track, the
   * artist name of the randomly selected track, the track and artist name of the randomly
   * selected track separated by a ' - ', the Result, and a TrackURL which is a URL containing
   * a preview of the track.
   * @throws URISyntaxException if the connection fails for some reason
   * @throws IOException This is part of the interface; we don't have to throw anything.
   */
  public void getTracks() throws URISyntaxException, IOException {
    URL url = new URL("https://api.spotify.com/v1/playlists/" + this.playlistID + "/tracks");
    HttpURLConnection httpURLConnection = (HttpURLConnection)url.openConnection();
    httpURLConnection.setRequestProperty("Accept", "application/json");
    httpURLConnection.setRequestProperty("Content-Type", "application/json");
    httpURLConnection.setRequestProperty("Authorization", "Bearer " + this.accessToken);
    httpURLConnection.setRequestMethod("GET");

    if (httpURLConnection.getResponseCode() != 200) {
      this.responseMap.put("Result", "Invalid Playlist");
      this.trackID = "Invalid playlist";
      return;
    }

    // Read in the data returned by the SpotifyAPI
    BufferedReader Lines = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
    String currentLine = Lines.readLine();
    StringBuilder response = new StringBuilder();

    while (currentLine != null) {
      response.append(currentLine).append("\n");
      currentLine = Lines.readLine();
    }

    // Convert the StringBuilder into a JSON, so we can access its fields
    JSONObject TrackDataJSON = new JSONObject(response.toString());
    // Randomly generate a track on the playlist to return as the random track
    int track_number = getRandomInteger(0, TrackDataJSON.getInt("total"));
    this.responseMap.put("Result", "Success");
    // Get the Track name and the Artist name of the random track
    String trackSongName = TrackDataJSON.getJSONArray("items").getJSONObject(track_number).getJSONObject("track").getString("name");
    String trackArtistName = new JSONObject(TrackDataJSON.getJSONArray("items").getJSONObject(track_number).getJSONObject("track").getJSONArray("artists").get(0).toString()).getString("name");
    this.trackID = (trackSongName + " - " + trackArtistName);
    // Get the trackURL which contains the preview of the song
    String trackURL = TrackDataJSON.getJSONArray("items").getJSONObject(track_number).getJSONObject("track").getString("preview_url");
    // Get the albumURL which contains the URL of the album cover of the song
    String albumURL = new JSONObject(TrackDataJSON.getJSONArray("items").getJSONObject(track_number).getJSONObject("track").getJSONObject("album").getJSONArray("images").get(0).toString()).getString("url");
    ArrayList<String> trackNameAndArtistList = new ArrayList<>();
    // For each song in the playlist get its trackName and artistName and then in the form
    // '*trackName* - *artistName*' add it to the List containing all the tracks with their
    // respective artists.
    for (int i = 0; i < TrackDataJSON.getInt("total"); i++) {
      String trackName = TrackDataJSON.getJSONArray("items").getJSONObject(i).getJSONObject("track").getString("name");
      String artistName = new JSONObject(TrackDataJSON.getJSONArray("items").getJSONObject(i).getJSONObject("track").getJSONArray("artists").get(0).toString()).getString("name");
      trackNameAndArtistList.add(trackName + " - " + artistName);
    }
    // Add everything to the list
    this.responseMap.put("TracksandArtistsList", trackNameAndArtistList);
    this.responseMap.put("TrackURL", trackURL);
    this.responseMap.put("AlbumURL", albumURL);
    this.responseMap.put("TrackName", trackSongName);
    this.responseMap.put("ArtistName", trackArtistName);
  }

  /**
   * Randomly generates an integer given a min and max as bounds
   * @param min minimum bound
   * @param max maximum bound
   * @return A random integer within the given bounds
   */
  private int getRandomInteger(int min, int max) {
    return (int) ((Math.random() * (max - min)) + min);
  }
}
