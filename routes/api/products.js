const router = require('express').Router();

const Product = require('../../models/product.model');

router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.json(err));

});

//agrupar por departamentos
router.get('/dpto/stats', async (req, res) => {
    const product = await Product.aggregate([

        {
            $group: {
                _id: "$department", numProduct: { $sum: 1 }, stock: { $sum: '$stock' }
            }
        }
    ]);
    res.json(product);
});

router.get('/dpto/same', async (req, res) => {
    const prod = new Product();
    prod.department = "moda";

    const products = await prod.sameDepartment();
    res.json(products)
});

router.get('/dpto/:department', async (req, res) => {
    const { department } = req.params;
    try {
        const products = await Product.find({ department });
        res.json(products);
    } catch {
        res.json({ error: err.message });
    }
});

router.get('/pr/max/:price', async (req, res) => {
    const { price } = req.params

    const products = await Product.getByMaxPrice(price);

    res.json(products)
});

//precio min 
router.get('/pr/:minPrice', async (req, res) => {
    const { minPrice } = req.params
    try {
        const products = await Product.find({ price: { $gt: minPrice } })
        res.json(products)
    } catch {
        res.json({ error: err.message });
    }
});


router.get('/list/:order', async (req, res) => {
    const { order } = req.params;
    let tipo = (order === 'desc') ? 1 : -1

    const products = await Product.aggregate([
        { $project: { _id: 0, name: 1, price: 1 } },
        { $sort: { price: 1 } }
    ]);

    res.json(products);
});

router.get('/list/:order', async (req, res) => {
    const { order } = req.params;
    let tipo = (order === 'asc') ? 1 : -1

    const products = await Product.aggregate([
        { $project: { _id: 0, name: 1, price: 1 } },
        { $sort: { price: 1 } }
    ]);

    res.json(products);
});

router.get('/available', async (req, res) => {
    const products = await Product.availables();
    res.json(products);
});

router.get('/taxes', async (req, res) => {
    const products = await Product.find();
    const result = [];
    for (let product of products) {
        const obj = {
            name: product.name,
            price_taxes: product.price_taxes
        }
        result.push(obj);
    }

    res.json(result);
});

router.get('/add/:productId', async (req, res) => {
    const { productId } = req.params;

    req.user.products.push(productId);
    await req.user.save();

    res.json({ success: 'Producto logado' })
});

router.get('/api/products/cart', (req, res) => {
    res.json(req.user.products);
});

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(400).json({ error: 'No existe el producto' })
        }

        res.json(product);
    } catch {
        res.status(400).json({ error: 'No existe el producto' })
    }
});

router.post('/', async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
});


router.put('/:productId', async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findByIdAndUpdate(productId, req.body, { new: true });

    res.json(product);
});

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    res.json(product);
});

module.exports = router;