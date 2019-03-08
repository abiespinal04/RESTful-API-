const express = require('express');
const router = express.Router();

const Product = require('../models/product');
const mongoose = require('mongoose');

router.get('/', (req, res,next) => {
    res.status(200).json({
        message: 'Handling Get request to /products'
    })


});

router.post('/', (req,res,next) =>{
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    //moongose product
     const mproduct = new Product({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            price: req.body.price
     });
     mproduct.save().then(result => {
         console.log(result);
     }).catch(err => console.log(err));

    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct : product

    })

});

router.get('/:productId', (req,res,next) => {
   
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {console.log(err);
        res.status(500).json({error:err});
    });
});

router.patch('/:productId', (req,res,next) => {
    
    res.status(200).json({
        message: 'Updated product!'
    });

});


router.delete('/:productId', (req,res,next) => {
    
    res.status(200).json({
        message: 'Deleted product!'
    });

});


module.exports = router;