const Product = require('../model/Products')

const getProducts = async (req, res) => {
    try {
        const products = await Product;
        res.status(200).json({message: 'Success', products })
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const products = await Product;
        const product = products.find(product => product.id === Number(req.params.id))
        if(!product) return res.status(404).json({message: 'Product not found'});
        res.status(200).json({message: 'Success', product })
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}


module.exports = {
    getProducts,
    getSingleProduct
}