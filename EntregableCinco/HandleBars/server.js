const path = require('path') 
const express = require('express');
const products = require('./api/productos');
const router = express.Router();
const handlebars = require('express-handlebars').engine;

// App Express
const app = express();

// Settings
app.use("/public", express.static('public')); 
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: '',
        layoutsDir: ''
    })
);
app.set('view engine', 'hbs');
app.set("views", "./views/layouts");

// Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/productos/vista', (req, res) => {

    const items = products.viewAll()
    console.log(items)
    if (items.length > 0) {
        res.render('vista', { items: products.viewAll(), productsExists: true })
    } else {
        res.render('vista', { items: products.viewAll(), productsExists: false })
    }
})

app.use('/api', router);

router.get('/productos/listar', (req, res) => {

    const items = products.viewAll()
    if (items.length > 0) {
        res.json(items)
    } else {
        res.json({
            error: 'No hay productos cargados'
        })
    }
})

router.get('/productos/listar/:id', (req, res) => {

    const item = products.viewByID(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.post('/productos/guardar', (req, res) => {

    products.addProduct(req.body)

    res.redirect('/productos/vista');
})

router.put('/productos/actualizar/:id', (req, res) => {
    const item = products.updateProduct(req.params.id, req.body)
    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

router.delete('/productos/borrar/:id', (req, res) => {
    const item = products.deleteProduct(req.params.id)

    if (item) {
        res.json(item)
    } else {
        res.json({
            error: 'El producto no fue encontrado'
        })
    }
})

//////////////////////////////////////////////////////////////////////////////////
////         SERVER ON PORT
//////////////////////////////////////////////////////////////////////////////////
const PORT = Math.floor(Math.random() * (8099 - 8000)) + 8000
const server = app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${server.address().port}/`)
    // console.log(    path.join(__dirname, '../public')   )
})
server.on('error', (error) => console.log(`Server error: ${error}`))
//////////////////////////////////////////////////////////////////////////////////
