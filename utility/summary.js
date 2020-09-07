module.exports = summary = (books) => {

    const getTotalPriceForEachRating = books.reduce((prevValue, currValue) => {
        console.log(currValue)
        if (!currValue.price.hasPrice) return prevValue;
        if (currValue.Rating === '1') {
            prevValue.oneRating.totalPrice += parseFloat(currValue.price.price);
            prevValue.oneRating.amount += 1;
            prevValue.oneRating.averagePrice = prevValue.oneRating.totalPrice / prevValue.oneRating.amount;
        };

        if (currValue.Rating === '2') {
            prevValue.twoRating.totalPrice += parseFloat(currValue.price.price);
            prevValue.twoRating.amount += 1;
            prevValue.twoRating.averagePrice = prevValue.twoRating.totalPrice / prevValue.twoRating.amount;
        };

        if (currValue.Rating === '3') {
            prevValue.threeRating.totalPrice += parseFloat(currValue.price.price);
            prevValue.threeRating.amount += 1;
            prevValue.threeRating.averagePrice = prevValue.threeRating.totalPrice / prevValue.threeRating.amount;
        };

        if (currValue.Rating === '4') {
            prevValue.fourRating.totalPrice += parseFloat(currValue.price.price);
            prevValue.fourRating.amount += 1;
            prevValue.fourRating.averagePrice = prevValue.fourRating.totalPrice / prevValue.fourRating.amount;
        };

        if (currValue.Rating === '5') {
            prevValue.fiveRating.totalPrice += parseFloat(currValue.price.price);
            prevValue.fiveRating.amount += 1;
            prevValue.fiveRating.averagePrice = prevValue.fiveRating.totalPrice / prevValue.fiveRating.amount;
        };

        return prevValue;
    }, {
        oneRating: { amount: 0, totalPrice: 0, averagePrice: 0 },
        twoRating: { amount: 0, totalPrice: 0, averagePrice: 0 },
        threeRating: { amount: 0, totalPrice: 0, averagePrice: 0 },
        fourRating: { amount: 0, totalPrice: 0, averagePrice: 0 },
        fiveRating: { amount: 0, totalPrice: 0, averagePrice: 0 }
    });




    // console.log(getTotalPriceForEachRating);
    return getTotalPriceForEachRating;
}