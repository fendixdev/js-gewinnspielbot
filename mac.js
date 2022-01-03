const puppeteer = require('puppeteer');
const fs = require('fs');

    async function main() {
        const browser = await puppeteer.launch({
            //userDataDir: "./user_data",
            headless: false,
            args: [
            '--enable-automation'
            ] 
        });
        const page = await browser.newPage();
        await page.goto('https://www.pcgameshardware.de/xmas-special/');

        const iframe = await page.waitForSelector('iframe[title="SP Consent Message"]')
        const frame = await iframe.contentFrame()
        //console.log(iframe);
        await frame.click('.sp_choice_type_11')

        const button = await page.$("#subForm > ul.Teilnahmebedingungen > li.text > label");
        await button.evaluate(b => b.click());

        await page.type('#frm_email', 'hubertderallerechte@web.de');
        await page.waitForTimeout(2000);
        await page.waitForSelector('#subForm > ul.loesungswort > li.buttonFrame > button');
        await page.click('#subForm > ul.loesungswort > li.buttonFrame > button');
        await page.waitForTimeout(10000);
        await page.screenshot({ path: './example12.png' })
        await browser.close();
    }

    main();