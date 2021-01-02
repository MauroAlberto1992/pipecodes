const express = require("express");
const cors = require("cors");
const app = express();
const connectToDatabase = require("./config/connectToDatabase");

app.use(cors());

connectToDatabase();

app.use(express.json({ extended: false })); //Make req via headers

app.use("/api", require("./routes/questions"));

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));