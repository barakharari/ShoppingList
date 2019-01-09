const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item')

// @route   GET api/items
// @desc    Get All Items
// @access  Public

router.get('/', function(req, res){
  Item.find()
    .sort({ date: -1})
    .then(items => res.json(items))
})

// @route   POST api/items
// @desc    Create an item
// @access  Public

router.post('/', function(req, res){
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
})

// @route   POST api/items/:id
// @desc    Delete an item
// @access  Public

router.delete('/:id', function(req, res){
  Item.findById(req.params.id)
    .then(item => item.remove()
      .then(() => res.json({success: true}))).catch(function(err){
        res.status(404).json({success: false})
      })
})

module.exports = router;