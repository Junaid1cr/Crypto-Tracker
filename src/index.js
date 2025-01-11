require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cryptoRoutes = require("./routes/crypto");
const { startPriceTracker } = require("./jobs/priceTracker");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.use(express.json());

app.use("/", cryptoRoutes);

startPriceTracker();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
