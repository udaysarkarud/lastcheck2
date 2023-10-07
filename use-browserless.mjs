import puppeteer from "puppeteer";
import "dotenv/config";

const lunchFromBrowless = async (url, wsEndpoint) => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${wsEndpoint}`,
  });

  const page = await browser.newPage();

  await page.goto(`${url}`);

  console.log(await page.title());

  await browser.close();
};

await lunchFromBrowless(
  "https://www.example.com/",
  process.env.BROWSERLESS_KEY
);
