const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();
console.log(process.env.APP_ID);
app.use(express.json());
app.use(cors());




//Convert 
app.get("/convert" , async( req , res ) => {
  const {sourceCurrency,targetCurrency,amountInSourceCurrency} = req.query
  try {
    const response = await axios.request(`http://data.fixer.io/api/latest?access_key=${process.env.APP_ID}`);
    const data = response.data;
    const rates = data.rates
    if (
      !rates.hasOwnProperty(sourceCurrency) ||
      !rates.hasOwnProperty(targetCurrency)
    ) {
      throw new Error(
        "The entered sourceCurrency and targetCurrency are not available"
      );

    }
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];
    const targetValue = (targetRate / sourceRate) * amountInSourceCurrency;SVGDefsElement
    return res.json({
      value: targetValue
    });

  } catch (error) {
    console.error(error , "Cannot fetch")
  }
});





// Port
app.listen(5000, () => {
  console.log("Server started on port 3002");
});
