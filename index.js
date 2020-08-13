const puppeteer = require('puppeteer');
exports.gumtreeBuyerPageTest = async (req, res) => {
    let url = req.body.url || 'https://us-central1-hackathon-trial-01.cloudfunctions.net/gumtreeBuyerPage';
    let testid = req.body.testid || 'id-not-set';
    let iteration = req.body.iteration || 'I01';
    let status = 'fail';
    let browser;
    let page;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: [
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-sandbox',
            '--no-zygote',
            '--single-process'
        ]
      });
      page = await browser.newPage();
      await page.goto(url, {
        'waitUntil' : 'networkidle0'
      });
      switch(testid) {
        case 'CHECK_TRADEMARK':
                await page.waitForSelector("#logo", {visible: true});
                break;
        case 'CHECK_HEADER':
                break;
        case 'CHECK_CAROUSEL':
                break;
        case 'CHECK_MAIN_CONTENT':
                break;
        case 'CHECK_APP_BANNER':
                break;
        default:
      }
      await browser.close();
      status = 'pass';
    } catch(e) {
      status = 'fail';      
    }
    console.log(`->url:${url}`);
    console.log(`->iteration:${iteration}`);
    console.log(`->status:${status}`);
    console.log(`->iteration:${iteration}:status:${status}`);
    res.send(`Completed test. Iteration:${iteration}, Test Id:${testid}, Status: ${status}`);
};
