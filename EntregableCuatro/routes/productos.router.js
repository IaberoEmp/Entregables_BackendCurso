import { Router } from "express";

const router = Router();

// All Products
router.get('/', async (req, res) => {
    const allProducts = await nCarManager.getAllCars()
    res.send(allProducts)
})

// Random Product
router.get('/Random', async (req, res) => {
    const allProducts = await nCarManager.getAllCars()
    const randomIndex = Math.floor(Math.random() * allProducts.length )
    const randomProduct = allProducts[randomIndex]
    res.send(randomProduct)
})

export default router;
