const express = require("express");
const router = express.Router();
const fs = require("fs");

const pizzaList = JSON.parse(fs.readFileSync(`./pizzaList.json`, `utf-8`));
const allergenList = JSON.parse(
  fs.readFileSync(`./allergenList.json`, `utf-8`)
);
const ordersList = JSON.parse(fs.readFileSync(`./ordersList.json`, "utf-8"));
// const fileReaderAsync = require("./fileReader");

router.get(`/:id`, (req, res) => {
  const id = req.params.id;
  if (id === "pizza") {
    return res.status(200).json(pizzaList);
  } else if (id === "allergen") {
    return res.status(200).json(allergenList);
  } else if (id === "order") {
    return res.status(200).json(ordersList);
  }
});

router.post(`/:id`, (req, res) => {
  const Ik = req.params.id;
  if (Ik === "order") {
    let id = 1;
    if(ordersList.orders.length>0){
    id = ordersList.orders[ordersList.orders.length - 1].id + 1;
    }
    const newOrder = Object.assign({ id }, req.body);
    ordersList.orders.push(newOrder);

    fs.writeFile(`./ordersList.json`, JSON.stringify(ordersList, null, 2), (err) => {
      res.status(201).json({
        status: "DONE",
        data: { newOrder },
      });
    });
  }
});

module.exports = router;
