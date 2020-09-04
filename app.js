const csv = require('csv-parser');
const fs = require('fs');

const getPricesForBooks = require('./scrape');

const parseCSV = async (path) => {
    return new Promise((resolve, reject) => {
        let books = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', data => books.push(data))
            .on('end', () => {
                books = books.map(book => {
                    return {
                        Title: book.Title,
                        ISBN13: book.ISBN13,
                        ISBN: book.ISBN,
                        Author: book.Author
                    }
                });
                resolve(books);
            })
            .on('error', err => reject(err))
    })
}

const calculatePrice = async (bookArray) => {
    const booksWithPrices = bookArray.filter(book => book.price ? book.price.hasPrice ? true : false : false);
    const bookPrices = booksWithPrices.reduce((total, currentBook) => {
        return total += parseFloat(currentBook.price.price);
    }, 0)
    return bookPrices;
}

const amountOfBooksWithOutPrice = async (bookArray) => {
    const booksWithOutPrices = bookArray.filter(book => book.price ? book.price.hasPrice ? false : true : true);
    return booksWithOutPrices;
}

const getBooksInfo = async () => {
    const books = await parseCSV('erics-books.csv');
    const bookPrices = await getPricesForBooks(books);
    const booksWithPrice = await calculatePrice(bookPrices);
    const booksWithOutPrice = await amountOfBooksWithOutPrice(bookPrices);

    // console.log('Amount of books with a price: ', booksWithPrice.length)
    console.log('Total price for all books: ', booksWithPrice);
    console.log('Amount of books without a price: ', booksWithOutPrice.length)
    console.log('Amount of total books: ', books.length);
}

getBooksInfo();