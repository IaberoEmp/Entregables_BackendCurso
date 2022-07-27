import express from 'express'
import productsRouter from './routes/products.router.js'

const app = express();

const PORT=8080;
const server=app.listen(PORT, () => {
    console.log(`Listening on PORT=${PORT}`)});

app.use('/products',productsRouter); //Conecto con mi products.router.js y le declaro lo ruta base
app.use(express.static('public'))

