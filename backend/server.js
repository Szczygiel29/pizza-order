const express = require("express");
const path = require("path");
const idRouter = require("./router");
const cors = require("cors");
// const fileReaderAsync = require("./fileReader");
// const filePath = path.join(`${__dirname}/pkgs.json`);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(`/api/`, idRouter);
app.get("/list", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../Frontend/index.html`));
});
app.get("/order", (req, res) => {
    res.sendFile(path.join(`${__dirname}/../Frontend/order.html`));
  });
app.use("/", express.static(`${__dirname}/../Frontend/`));

const port = 9000;

app.listen(port, () => console.log(`http://127.0.0.1:${port}`));