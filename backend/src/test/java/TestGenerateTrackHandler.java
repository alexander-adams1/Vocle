import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

/**
 * The TestGenerateTrackHandler class tests our GenerateTrack endpoint on the API and makes
 * sure it behaves exactly as intended. It should be noted that for this endpoint we assume
 * that the user is generating an AccessToken using our SpotifyToken handler, thus in the event
 * of an invalid token it still returns invalid playlist. This class then tests the endpoint
 * in for edge cases and makes sure each case is handled as intended.
 */
public class TestGenerateTrackHandler {


  @BeforeAll
  public static void setup_before_everything() {

    // Set the Spark port number.
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING);
  }

  @BeforeEach
  public void setup() {
    // Re-initialize state, etc. for _every_ test method run
    // In fact, restart the entire Spark server for every test!
    Spark.get("/SpotifyToken", new SpotifyTokenHandler());
    Spark.get("/GenerateTrack", new GenerateTrackHandler());
    Spark.init();
    Spark.awaitInitialization(); // don't continue until the server is listening
  }

  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("/SpotifyToken");
    Spark.unmap("/GenerateTrack");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /**
   * Helper to start a connection to a specific API endpoint/params
   *
   * @param apiCall the call string, including endpoint
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  private static HttpURLConnection tryRequest(String apiCall) throws IOException {
    // Configure the connection (but don't actually send the request yet)
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();

    // The default method is "GET", which is what we're using here.
    // If we were using "POST", we'd need to say so.
    // clientConnection.setRequestMethod("GET");

    clientConnection.connect();
    return clientConnection;
  }

  /**
   * This tests that if a valid public playlist is inputted and a valid SpotifyToken is inputted
   * properly into the GenerateTrack endpoint the browser returns a serialized Map containing
   * all the expected fields along with the Result being a Success.
   * @throws IOException if the connection fails for some reason
   */
  @Test
  public void generatePlaylistInformationValidRequest() throws IOException {
    HttpURLConnection clientTokenConnection = tryRequest("SpotifyToken");
    // Get an OK response (the *connection* worked, the *API* provides an error response)
    Assert.assertEquals(200, clientTokenConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    // Convert the JSON back into a Map
    Map<String, Object> actualTokenResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientTokenConnection.getInputStream()));
    // Get the AccessToken
    String accessToken = (String) actualTokenResponse.get("AccessToken");

    HttpURLConnection clientTrackConnection = tryRequest("GenerateTrack?accessToken="
        + accessToken + "&playlistID=37i9dQZF1DX0XUsuxWHRQd");
    // Get an OK response (the *connection* worked, the *API* provides an error response)
    Assert.assertEquals(200, clientTrackConnection.getResponseCode());

    Map<String, Object> actualTrackResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientTrackConnection.getInputStream()));
    Assert.assertTrue(actualTrackResponse.containsKey("Track"));
    Assert.assertTrue(actualTrackResponse.containsKey("TrackURL"));
    Assert.assertTrue(actualTrackResponse.containsKey("AlbumURL"));
    Assert.assertTrue(actualTrackResponse.containsKey("TrackName"));
    Assert.assertTrue(actualTrackResponse.containsKey("ArtistName"));
    Assert.assertTrue(actualTrackResponse.containsKey("TracksandArtistsList"));
    Assert.assertEquals("Success", actualTrackResponse.get("Result"));
  }

  /**
   * Tests that in the event that the user inputs an invalid playlist the GenerateTrack endpoint
   * serializes a map that contains the Result being an Invalid Playlist
   * @throws IOException if the connection fails for some reason
   */
  @Test
  public void generatePlaylistInformationInvalidPlaylistID() throws IOException {
    HttpURLConnection clientTokenConnection = tryRequest("SpotifyToken");
    // Get an OK response (the *connection* worked, the *API* provides an error response)
    Assert.assertEquals(200, clientTokenConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    // Convert the JSON back into a Map
    Map<String, Object> actualTokenResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientTokenConnection.getInputStream()));
    String accessToken = (String) actualTokenResponse.get("AccessToken");

    HttpURLConnection clientTrackConnection = tryRequest("GenerateTrack?accessToken="
        + accessToken + "&playlistID=invalidID");
    // Get an OK response (the *connection* worked, the *API* provides an error response)
    Assert.assertEquals(200, clientTrackConnection.getResponseCode());

    Map<String, Object> actualTrackResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientTrackConnection.getInputStream()));
    Assert.assertEquals("Invalid Playlist", actualTrackResponse.get("Result"));
  }

  /**
   * Tests that if an invalid AccessToken is inputted the GenerateTrack endpoint serializes a
   * Map containing the Result being an Invalid Playlist (THIS IS INTENDED)
   * @throws IOException if the connection fails for some reason
   */
  @Test
  public void generatePlaylistInformationInvalidAccessToken() throws IOException {
    HttpURLConnection clientTrackConnection = tryRequest("GenerateTrack?accessToken="
        + "invalidToken&playlistID=37i9dQZF1DXcBWIGoYBM5M");
    // Get an OK response (the *connection* worked, the *API* provides an error response)
    Assert.assertEquals(200, clientTrackConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    Map<String, Object> actualTrackResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientTrackConnection.getInputStream()));
    Assert.assertEquals("Invalid Playlist", actualTrackResponse.get("Result"));
  }

  /**
   * Tests that if invalid parameters are inputted the GenerateTrack endpoint serializes a Map
   * containing the Result being Invalid Parameters.
   * @throws IOException if the connection fails for some reason 
   */
  @Test
  public void generatePlaylistInformationInvalidParameters() throws IOException {
    HttpURLConnection clientTrackConnection = tryRequest("GenerateTrack?");
    // Get an OK response (the *connection* worked, the *API* provides an error response)
    Assert.assertEquals(200, clientTrackConnection.getResponseCode());

    Moshi moshi = new Moshi.Builder().build();
    Map<String, Object> actualTrackResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientTrackConnection.getInputStream()));
    Assert.assertEquals("Invalid Parameters", actualTrackResponse.get("Result"));
  }
}
