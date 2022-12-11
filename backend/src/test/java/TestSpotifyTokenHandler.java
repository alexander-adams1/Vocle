import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import spark.Spark;

public class TestSpotifyTokenHandler {

  @BeforeAll
  public static void setup_before_everything() {
    // Set the Spark port number.
    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING);
  }

  // Create a Shared state DataObject which gets passed in to both LoadCSVHandler and GetCSVHandler

  @BeforeEach
  public void setup() {
    // Re-initialize state, etc. for _every_ test method run
    // In fact, restart the entire Spark server for every test!
    Spark.get("/SpotifyToken", new SpotifyTokenHandler());
    Spark.init();
    Spark.awaitInitialization(); // don't continue until the server is listening
  }

  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("/SpotifyToken");
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

  @Test
  public void generateAccessToken() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("SpotifyToken");
    // Get an OK response (the *connection* worked, the *API* provides an error response)
    Assert.assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    Map<String, String> actualResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    Assert.assertEquals("Success, got an access token", actualResponse.get("Result"));
    Assert.assertTrue(actualResponse.containsKey("AccessToken"));
    Assert.assertTrue(actualResponse.containsKey("ExpiresIn"));
    clientConnection.disconnect();
  }

  /** Handles teardown after all tests have been run. */
  @AfterAll
  public static void disconnect() {
    Spark.stop();
  }
}
