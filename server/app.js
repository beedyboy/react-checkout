const express = require('express');
const cors = require('cors')
const helmet = require('helmet');
const { getProducts, getSingleProduct } = require('./controllers/ProductController');
const customerCheckout = require('./controllers/CheckoutController')

const app = express();

app.use(cors())
app.use(helmet())

app.use(express.json());

app.get('/products', getProducts)
app.get('/products/:id', getSingleProduct)
app.post('/checkout', customerCheckout)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
})
