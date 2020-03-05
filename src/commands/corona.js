const puppeteer = require('puppeteer');

const siteURL = 'https://www.worldometers.info/coronavirus/';

const scrape = async (url, message) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // select element by XPath, returns array
  // destructure first item of array into 'el'
  // INFECTED
  const [el] = await page.$x(
    '/html/body/div[3]/div[2]/div[1]/div/div[4]/div/span'
  );
  const infectedCount = await el.getProperty('textContent');
  const infectedRaw = await infectedCount.jsonValue();

  // DEATHS
  const [el2] = await page.$x(
    '/html/body/div[3]/div[2]/div[1]/div/div[6]/div/span'
  );
  const deaths = await el2.getProperty('textContent');
  const deathsRaw = await deaths.jsonValue();

  // RECOVERED
  const [el3] = await page.$x(
    '/html/body/div[3]/div[2]/div[1]/div/div[6]/div/span'
  );
  const recovered = await el3.getProperty('textContent');
  const recoveredRaw = await recovered.jsonValue();

  message.edit(
    `Here are the latest Coronavirus statistics:\n**Infected:** ${infectedRaw}\n**Deaths:** ${deathsRaw}\n**Recovered:** ${recoveredRaw}`
  );

  browser.close();

  return { infectedRaw, deathsRaw, recoveredRaw };
};

module.exports = {
  name: 'corona',
  description: 'Get lates stats on the Corona Virus',
  async execute(message, args) {
    const initial = await message.channel.send(
      'Fetching latest Coronavirus results...'
    );
    scrape(siteURL, initial);
  },
};
