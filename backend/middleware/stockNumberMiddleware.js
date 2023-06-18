const mongoose = require("mongoose")

const tuluStockNumberGenerator = async () => {
  try {
    // Find the document with the highest tuluStockNum
    const highestStockNumDoc = await mongoose.connection.db
      .collection(process.env.INVENTORY_DB_NAME)
      .findOne({}, { sort: { tuluStockNum: -1 } });

    // If there are no documents in the collection, start with 0
    const highestStockNum = highestStockNumDoc
      ? parseInt(highestStockNumDoc.tuluStockNum.slice(4), 10)
      : 0;

    // Generate the next stock number
    const string = `TULU${String(highestStockNum + 1).padStart(4, "0")}`;

    return string;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
    tuluStockNumberGenerator
}