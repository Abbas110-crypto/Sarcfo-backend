const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config({ path: './config.env' });
require('./db/connect');
const cors = require('cors');
const home = require("./routes/home");


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(require('./router/auth'));
app.use("/home", home);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
