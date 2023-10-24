const logger = require("../api/config/winston");

async function selectOption(page, selector, optionText) {
  const selectElement = await page.$(selector);
  const optionValue = await page.evaluate(
    (select, text) => {
      const options = Array.from(select.options);
      const option = options.find((option) => option.textContent.includes(text));
      return option ? option.value : null;
    },
    selectElement,
    optionText
  );

  if (optionValue) {
    await page.select(selector, optionValue);
  } else {
    logger.error("Option not found")
    throw new Error("Option not found");
  }
}

async function addNumber(page, selector, numberToAdd) {
  const inputElement = await page.$(selector);
  await inputElement.type(numberToAdd);
}

async function clickElement(page, selector) {
  const buttonElement = await page.$(selector);
  await buttonElement.click();
}

async function extractLocation(page, selector) {
  await page.waitForSelector(selector);
  const anchorElement = await page.$(selector);
  if (anchorElement) {
    const textContent = await anchorElement.evaluate((element) => element.innerText);
    const [lat, lon] = textContent.split(",");
    const result = { lat: lat.trim(), lon: lon.trim() };
    return result;
  } else {
    logger.error("Element not found.")
    throw new Error("Element not found.");
  }
}

module.exports = { selectOption, addNumber, clickElement, extractLocation };
