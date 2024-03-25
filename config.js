module.exports = {
    loginData: {
        email: 'yourEmail@adress.com', //change
        password: 'yourPassword' //change
    },
    urlDescriptor: {
        base: 'https://app.edubase.ch/#doc/58588/${page}',//change, path to edubase e-book, ${page} has to stay
        startPage: 1, //first page
        endPage: 106 //last page
    },
    loginUrl: 'https://app.edubase.ch/#promo?popup=login', //login-page, do not change!
	outputPdfTitle: 'merged_noOCR.pdf' //name of your pdf
};