require('dotenv').config();
const express = require('express');
require("./src/db/conn");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`connection is live at port no ${port}`);
});

const user = require("./src/routes/userRoute");
const labor = require("./src/routes/laborRoute");
const farmer = require("./src/routes/farmerRoute");
const dealer = require("./src/routes/dealerRoute");

app.get("/",(req,res)=>{
    res.json({
        message:"Route obtained on for the demo successfully"
    })
})

app.use("/api",user); // for registeration
app.use("/api",labor);
app.use("/api",farmer);
app.use("/api",dealer);

// unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})
