const summary = require('./summary');
const books = require('./mockingBooks');

describe('Summary-test', () => {
    it('should count average sum of rating book', () => {
        expect(summary(books)).toEqual({
            oneRating: {
                amount: 1,
                totalPrice: 77,
                averagePrice: 77
            },
            twoRating: {
                amount: 1,
                totalPrice: 35,
                averagePrice: 35
            },
            threeRating: {
                amount: 2,
                totalPrice: 195,
                averagePrice: 97.5
            },
            fourRating: {
                amount: 1,
                totalPrice: 1337,
                averagePrice: 1337
            },
            fiveRating: {
                amount: 3,
                totalPrice: 645,
                averagePrice: 215
            }
        })
    });


})