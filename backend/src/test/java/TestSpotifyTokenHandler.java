import com.squareup.moshi.Moshi;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import okio.Buffer;
import org.junit.Assert;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

/**
 * The TestSpotifyTokenHandler class is responsible for testing the SpotifyToken endpoint
 * of our API. This endpoint should always return a valid token since it is reliant on the
 * SpotifyAPI unless invalid parameters are inputted. Thus we must account for two cases,
 * the case where a valid request is made and an invalid request is made.
 */
public class TestSpotifyTokenHandler {


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

  /**
   * Testing the case where if we make a valid request to our backend regarding the SpotifyToken
   * endpoint we get returned a Hashmap containing a ExpiresIn, AccessToken, and Result field where
   * the Result fields value is Success, got an access token.
   * @throws IOException if the connection fails for some reason
   */
  @Test
  public void testValidGenerateAccessToken() throws IOException {
    HttpURLConnection clientConnection = tryRequest("SpotifyToken");
    // Get an OK response (the *connection* worked, the *API* provides an error response)
    Assert.assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    // Convert the JSON back into a Map
    Map<String, Object> actualResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    Assert.assertTrue(actualResponse.containsKey("AccessToken"));
    Assert.assertTrue(actualResponse.containsKey("ExpiresIn"));
    Assert.assertEquals("Success, got an access token", actualResponse.get("Result"));

    clientConnection.disconnect();
  }

  /**
   * Testing the case where we make an invalid call to our SpotifyToken endpoint by putting in
   * extra parameters in which case the api should return a HashMap containing a Result field
   * which maps to Invalid Parameters.
   * @throws IOException if the connection fails for some reason
   */
  @Test
  public void testInvalidGenerateAccessToken() throws IOException {
    HttpURLConnection clientConnection = tryRequest("SpotifyToken?param1=Random");
    Assert.assertEquals(200, clientConnection.getResponseCode());
    Moshi moshi = new Moshi.Builder().build();
    // Convert the JSON back into a Map
    Map<String, Object> actualResponse =
        moshi.adapter(Map.class).fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    Assert.assertEquals("Invalid Parameters", actualResponse.get("Result"));
    Assert.assertTrue(actualResponse.containsKey("Result"));

    clientConnection.disconnect();
  }


  /** Handles teardown after all tests have been run. */
  @AfterAll
  public static void disconnect() {
    Spark.stop();
  }
}
