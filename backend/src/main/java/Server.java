import static spark.Spark.after;

import spark.Spark;

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


