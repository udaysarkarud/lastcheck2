import puppeteer from "puppeteer";
import "dotenv/config";

const lunchFromBrowserUrl = async (url, browserUrl) => {
  const browser = await puppeteer.connect({
    browserURL: `${browserUrl}`,
  });

  const page = await browser.newPage();

  await page.goto(`${url}`);

  console.log(await page.title());
};

await lunchFromBrowserUrl(
  "https://www.example.com/",
  process.env.YOUR_BROWSER_URL
);
