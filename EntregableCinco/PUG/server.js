const express = require('express');
const products = require('./api/productos');
const router = express.Router();


// App Express
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Settings

app.set('views', './views');
app.set('view engine', 'pug');


// Routes
app.get('/', (req, res) => {
    const productos = products.viewAll()
    console.log('productos', productos)
    if (productos.length > 0) {
        res.render('tabla', { productos: products.viewAll(), productsExists: true })
    } else {
        res.render('tabla', { productos: products.viewAll(), productsExists: false })
    }
})

app.use('/api', router);


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${server.address().port}/`)

})
server.on('error', (error) => console.log(`Server error: ${error}`))
