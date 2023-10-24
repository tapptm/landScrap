const puppeteer = require("puppeteer");
const { website } = require("../constant");
const { selectOption, addNumber, clickElement, extractLocation } = require("../../scripts/actions");
const logger = require("../config/winston");

async function getLocation(req, res) {
  const { province, district, deedNo } = req.query;

  // open google chrome
  logger.debug("opening google chrome..");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-gpu"],
  });

  try {
    // go to url
    logger.debug("open new page..");
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 860 });
    logger.debug(`go to url ${website}`);
    await page.goto(website);

    // select value in dropdown element
    logger.debug(`selecting dropdown province by value: ${province}`);
    await selectOption(page, "#cbprovince", province);
    logger.debug(`selecting dropdown district by value: ${district}`);
    await selectOption(page, "#cbamphur", district);
    logger.debug(`input deed number by value: ${deedNo}`);
    await addNumber(page, "#txtparcelno", deedNo);
    logger.debug(`clicking search button`);
    await clickElement(page, "#btnSearch");

    // extract data from modal element
    logger.debug(`extracting location on modal element`);
    const location = await extractLocation(page, 'a[href^="https://www.google.com/maps?q="]');
    logger.debug(`Done. founded location lat: ${location.lat} lon: ${location.lon}`);
    await browser.close();

    // return location
    return res.status(200).send({
      code: 200,
      message: "Done. founded location",
      address: {
        province,
        district,
        deedNo,
        location,
      },
    });
  } catch (error) {
    await browser.close();
    logger.error(error.message);
    return res.status(400).send({
      code: 400,
      message: error.message,
    });
  }
}

module.exports = { getLocation };
