const express = require('express');
app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//connection to mongodb
mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PW + '@rest-node-shop-3szv9.mongodb.net/test?retryWrites=true',{ useNewUrlParser: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//CORS Handling
app.use((req,res,next) => {
    /*
    //This header allows access to only the specified client
    // res.header('Access-Control-Allow-Origin', 'http:/my-cool-page.com');
    */
    
    //This header allows access to every client domain
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Acess-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

//Handling errors for invalid routes
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;