const mongoose = require("mongoose");
const MONGOOSE_SECRET = require("./secret/keys");
const connectDB = async () => {
  const conn = await mongoose.connect(
    "mongodb+srv://dana:dana@cluster0.vadd3.mongodb.net/test",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  );

  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
