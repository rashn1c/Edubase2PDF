const puppeteer = require('puppeteer');
const fs = require('fs');
const config = require('./config');
const { PDFDocument } = require('pdf-lib');
const { loginData, urlDescriptor, loginUrl, outputPdfTitle } = require('./config');

const login = async (browser) => {
    const page = await browser.newPage();
    console.log(new Date().toISOString(), " --- trying to log in");
    await page.goto(loginUrl);
	await new Promise(resolve => setTimeout(resolve, 10000));
    await page.keyboard.type(loginData.email);
    await page.keyboard.press("Tab");
    await page.keyboard.type(loginData.password);
	await new Promise(resolve => setTimeout(resolve, 1000));
    await page.keyboard.press("Enter");
	await new Promise(resolve => setTimeout(resolve, 10000));
    console.log(new Date().toISOString(), " --- logged in");
};

const generatePDF = async (browser, urlDescriptor) => {
    const page = await browser.newPage();

    for (let index = urlDescriptor.startPage; index <= urlDescriptor.endPage; index++) {
        const pageUrl = urlDescriptor.base.replace('${page}', index.toString());
        await page.goto(pageUrl);
		await new Promise(resolve => setTimeout(resolve, 3000));
        console.log(new Date().toISOString(), ` --- opened page ${index}`);

        const pdfConfig = {
            path: `page-${index}.pdf`,
            format: 'A4',
            printBackground: true,
        };
        await page.emulateMediaType('print');
        await page.pdf(pdfConfig);
        console.log(new Date().toISOString(), ` --- downloaded pdf of page ${index}`);
    }
};

const mergePDFs = async (pdfFiles, outputFileName) => {
    const mergedPdf = await PDFDocument.create();

    for (const pdfFile of pdfFiles) {
        const pdfBytes = fs.readFileSync(pdfFile);
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(outputFileName, mergedPdfBytes);
    console.log(`Merged PDF saved as ${outputFileName}`);
	
    pdfFiles.forEach(file => {
        fs.unlinkSync(file);
        console.log(`Deleted file ${file}`);
	});
};

const main = async () => {
    const browser = await puppeteer.launch({ headless: true });
    await login(browser, loginUrl, loginData);
    await generatePDF(browser, urlDescriptor);
    await browser.close();

    const pdfFiles = Array.from({ length: urlDescriptor.endPage - urlDescriptor.startPage + 1 }, (_, index) => `page-${urlDescriptor.startPage + index}.pdf`);
    await mergePDFs(pdfFiles, outputPdfTitle);
};

main();
