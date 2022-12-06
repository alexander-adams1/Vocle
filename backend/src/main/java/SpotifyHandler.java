import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import spark.Request;
import spark.Response;
import spark.Route;

public class SpotifyHandler implements Route {

  public SpotifyHandler() {

  }

  @Override
  public Object handle(Request request, Response response)
      throws Exception {
    //create url access point
    URL url = new URL(tokenURL);

    //open http connection to url
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setDoOutput(true);
    conn.setDoInput(true);

    //setup post function and request headers
    conn.setRequestMethod("POST");
    conn.setRequestProperty("Authorization",String.format("Basic %s", clientCredEncode));
    conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

    //set body for posting
    String body = "grant_type=client_credentials";

    //calculate and set content length
    byte[] out = body.getBytes(StandardCharsets.UTF_8);
    int length = out.length;
    conn.setFixedLengthStreamingMode(length);

    //connect to http
    conn.connect();
    //}

    //send bytes to spotify
    try(OutputStream os = conn.getOutputStream()) {
      os.write(out);
    }

    //receive access token
    InputStream result = conn.getInputStream();
    String s = new String(result.readAllBytes());
    System.out.println(s);
    return 1;
  }
}
