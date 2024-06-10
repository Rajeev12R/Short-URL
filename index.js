const express = require("express");

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8001;

const urlRoute = require("./routes/url");

const URL = require("./models/url")

const { connectMongooseDb } = require("./connect");

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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

app.use(express.json());

connectMongooseDb('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("MongoDB Connected"))

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))
