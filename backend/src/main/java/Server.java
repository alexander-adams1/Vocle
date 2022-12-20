import static spark.Spark.after;

import spark.Spark;

/**
 * Top-level class for this project. Contains the main() method which starts Spark and runs the
 * various handlers. We have two endpoints in this class, which generate an AccessToken,
 * and generate a random Track on a public Spotify playlist along with get other information
 * regarding the playlist
 */
public class Server {
  public static void main(String[] args) {
    Spark.port(3232);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });
    Spark.get("SpotifyToken", new SpotifyTokenHandler());
    Spark.get("GenerateTrack", new GenerateTrackHandler());
    Spark.init();
    Spark.awaitInitialization();
    System.out.println("Server started.");
  }
}


