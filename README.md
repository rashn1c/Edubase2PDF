# Edubase2PDF
Basic puppeteer code, that authenticates the user and navigates through a book, in order to generate and store a pdf.

## How to
1. install git
2. install node.js
3. clone the repository
4. navigate into the repository directory with your preferred command line tool
5. run `npm install`
6. adjust the values (const variables) in the config.js (namely all that are filled with 'change') to your liking. don't forget the start and end page.
7. run `node .`
8. wait till the process finishes (or stops with an error, then you know you have to fix something).


###
The PDF is not "searchable". You have to use a OCR-Tool first, like https://tools.pdf24.org/en/ocr-pdf.

####
Credit: This code is based on https://github.com/AndrinGautschi/edubase-book-downloader.


