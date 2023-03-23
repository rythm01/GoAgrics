require('dotenv').config();
const express = require('express');
require("./src/db/conn");
const bodyParser = require('body-parser');
const router = require('./src/routes/router');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);

app.listen(port,()=>{
    console.log(`connection is live at port no ${port}`);
});

app.get("/",async (req,res)=>{
   res.send("Namaste GoAgrics");
});