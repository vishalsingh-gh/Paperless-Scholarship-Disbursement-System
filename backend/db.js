const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin123@cluster1.ro8p7lb.mongodb.net/scholarship")
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));