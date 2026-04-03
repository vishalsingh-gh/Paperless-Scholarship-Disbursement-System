const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  email: String,
  document: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Application", appSchema);