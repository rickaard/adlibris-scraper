const puppeteer = require('puppeteer');

const adlibrisURL = 'https://www.adlibris.com/se';

const getPricesForBooks = async (booksArray) => {

    const booksCopy = [...booksArray];

    try {
        const browser = await puppeteer.launch({ headless: true, args: ["--incognito"] });
        const page = await browser.newPage();
        await page.goto(adlibrisURL);

        for (let i = 0; i < booksCopy.length; i++) {
            // console.log(`${i}/${20}`)
            await page.click('.page-header__search__input', { clickCount: 3 });
            await page.keyboard.press('Backspace');
            await page.type('.page-header__search__input', booksCopy[i].Title + ' ' + booksCopy[i].Author);
            await page.click('#search-button');

            await page.waitForNavigation();

            let price = {};
            try {
                const priceEvaluate = await page.evaluate(() => {
                    const bookNodesCount = document.querySelectorAll('#search-hits')[0];

                    if (!bookNodesCount.childElementCount) {
                        return { hasPrice: false, reason: 'childElementCount == false' };
                    }
                    if (bookNodesCount.childElementCount > 1) {
                        return {
                            hasPrice: true,
                            price: document.querySelector('#search-hits > div:nth-child(1) > div > div.variants__wrapper > div > div > div.purchase__wrapper > div.purchase > a > span.btn--first-divider > div > span').childNodes[0].textContent.trim()
                        }
                    }
                    if (bookNodesCount.childElementCount = 1) {
                        return {
                            hasPrice: true,
                            price: document.querySelector('#search-hits > div > div > div.variants__wrapper > div > div > div.purchase__wrapper > div.purchase > a > span.btn--first-divider > div > span').childNodes[0].textContent.trim()
                        }
                    }
                });
                price = priceEvaluate;

            } catch {
                price.hasPrice = false;
                price.reason = 'No #search-hits found'
            }

            booksCopy[i].price = price;
        }

    } catch (err) {
        console.log(err)
    }

    // console.log(booksCopy);
    return booksCopy;
}

module.exports = getPricesForBooks;