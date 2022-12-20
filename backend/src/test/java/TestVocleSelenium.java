import io.github.bonigarcia.wdm.WebDriverManager;
import java.time.Duration;
import org.junit.After;
import org.junit.Before;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

public class TestVocleSelenium {
  private RemoteWebDriver driver = null;
  private String indexpath = "localhost:3000/";

  // setup before each test
  @Before
  public void setup() {
    WebDriverManager.chromedriver().setup();
    ChromeOptions options = new ChromeOptions();

    options.addArguments("--headless");
    this.driver = new ChromeDriver(options);
    driver.manage().timeouts().implicitlyWait(Duration.ofMillis(500));
  }

  @After
  public void teardown() {
    driver.quit();
  }
}
