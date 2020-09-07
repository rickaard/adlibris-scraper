const csv = require('csv-parser');
const fs = require('fs');

const getPricesForBooks = require('./scrape');
const summary = require('./utility/summary');

const parseCSV = async (path) => {
    return new Promise((resolve, reject) => {
        let books = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', data => books.push(data))
            .on('end', () => {
                // console.log(books);
                books = books.map(book => {
                    return {
                        Title: book.Title,
                        ISBN13: book.ISBN13,
                        ISBN: book.ISBN,
                        Author: book.Author,
                        Rating: book['My Rating']
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
    }, 0);
    return bookPrices;
}

const amountOfBooksWithOutPrice = async (bookArray) => {
    const booksWithOutPrices = bookArray.filter(book => book.price ? book.price.hasPrice ? false : true : true);
    return booksWithOutPrices;
}

// const getFiveRatingBookPrice = async (bookArray) => {
//     const booksWithPrices = bookArray.filter(book => book.price ? book.price.hasPrice ? true : false : false);
//     const fiveRatingPrice = booksWithPrices.reduce((total, currentBook) => {
//         if (currentBook.Rating === '5') {
//             return total += parseFloat(currentBook.price.price);
//         } else {
//             return total += 0;
//         }
//     }, 0);

//     return fiveRatingPrice;
// }

const getBooksInfo = async () => {
    const books = await parseCSV('erics-books.csv'); // parse csv to array of objects
    const bookPrices = await getPricesForBooks(books); // scrape adlibris and return array of objects with price properties
    const booksWithPrice = await calculatePrice(bookPrices); // get total sum of all books with prices
    const averagePricesForBooks = await summary(bookPrices); // get total sum and average price for each ratings
    const booksWithOutPrice = await amountOfBooksWithOutPrice(bookPrices); // get total books without a price

    console.log('Total price for all books: ', booksWithPrice);
    console.log('Amount of books without a price: ', booksWithOutPrice.length)

    console.log('Amount of total books: ', books.length);
    console.log('Average of each book rating: ', averagePricesForBooks);
}

getBooksInfo();