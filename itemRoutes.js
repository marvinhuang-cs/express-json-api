const express = require('express')
const router = new express.Router();
const items = require('./fakeDb')

router.get("/", function(req, res) {
    res.json({items})
});

router.post("/", function(req, res){
    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem)
    res.status(201).json({items: newItem})
});

router.get("/:name", function(req, res){
    const findItem = items.find(item => item.name === req.params.name)
    if (findItem === undefined) {
        throw new ExpressError("Item not found" , 404)
    }
    res.json({item: findItem})
});

router.patch("/:name", function(req, res){
    const findItem = items.find(item => item.name === req.params.name)
    if (findItem === undefined) {
        throw new ExpressError("Item not found", 404)
    }
    findItem.name = req.body.name
    findItem.price = req.body.price
    res.json({item: findItem})
});

router.delete("/:name", function(req, res){
    const findItem = items.findIndex(item => item.name === req.params.name)
    if (findItem === -1) {
        throw new ExpressError("Item not found", 404)
    }
    items.splice(findItem, 1)
    res.json({message: "Deleted"})

});

module.exports = router;