import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import spark.Request;
import spark.Response;
import spark.Route;

public class SpotifyHandler implements Route {

  public SpotifyHandler() {

  }

  @Override
  public Object handle(Request request, Response response)
      throws Exception {
    HttpRequest tokenRequest =
        HttpRequest.newBuilder()
            .uri(new URI("https://accounts.spotify.com/authorize?client_id=fbf528e0063e4820b4fd570f750f297d&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%3A3232%2FSpotifyHandler&scopes=playlist-read-private"))
            .GET()
            .build();
    HttpResponse<String> tokenResponse =
        HttpClient.newBuilder().build().send(tokenRequest, BodyHandlers.ofString());
    System.out.println(tokenRequest);
    System.out.println(tokenResponse);
    return 1;
  }
}
