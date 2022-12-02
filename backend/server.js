const express = require("express");
const dotenv = require("dotenv").config();
let cors = require("cors");
let app = express();
app.use(cors());

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/synonyms", require("./routes/SynonymRoutes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
