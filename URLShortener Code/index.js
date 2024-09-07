const express = require('express');
const {connectToMongoDB } = require("./connect");
connectToMongoDB("mongodb://localhost:27017/short-url").then(() => console.log("MongoDB Connected")).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

const {restrictToLoggedinUserOnly} = require("./middlewares/auth")

const cookieParser = require('cookie-parser');
const URL = require('./models/url')
const path = require('path')
const app = express();
const PORT = 8001;

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter") 
const userRoute = require('./routes/user')

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));



app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use('/', staticRouter);
app.use('/user',userRoute);



app.listen(PORT,()=>console.log(`Server Started at Port: ${PORT}`));
