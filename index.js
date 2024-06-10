const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

const path = require("path");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8001;

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls,

    })
});

const urlRoute = require("./routes/url");

const URL = require("./models/url")

const { connectMongooseDb } = require("./connect");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const staticRoute = require("./routes/staticRouter")

app.use("/url", urlRoute);

app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    });
    res.redirect(entry.redirectURL)
})


app.use(express.urlencoded({ extended: false }));

connectMongooseDb(process.env.MONGOURL)
    .then(() => console.log("MongoDB Connected"))


app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))

module.exports = app;
