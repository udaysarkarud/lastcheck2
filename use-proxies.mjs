import puppeteer from "puppeteer";
import { anonymizeProxy, closeAnonymizedProxy } from "proxy-chain";
import "dotenv/config";

const getHTML = async (url, proxyServerUrl) => {
  const proxyUrl = await anonymizeProxy(`${proxyServerUrl}`);

  const browser = await puppeteer.launch({
    headless: false,
    args: [`--proxy-server=${proxyUrl}`],
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto(`${url}`);
  const content = await page.content();
  await page.close();
  await browser.close();

  await closeAnonymizedProxy(proxyUrl);

  return content;
};

await getHTML("https://httpbin.org/ip", process.env.WEBSHARE_PROXY_URL).then(
  console.log
);

await getHTML("https://httpbin.org/ip", process.env.PROXYSCRAPE_PROXY_URL).then(
  console.log
);
