const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const { id } = req.params;
    Product.findById(id)
    .then(product => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            product: product,
            path: '/products'
        });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(products => {
        
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
        });

    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(products => {        
        res.render('shop/cart', {
            pageTitle: 'Your Cart',
            path: '/cart',
            products: products,
        });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const { productId } = req.body;
    Product.findById(productId)
    .then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
    .addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
    req.user.getOrders()
    .then(orders => {
        res.render('shop/orders', {
            orders: orders,
            pageTitle: 'Your Orders',
            path: '/orders',
        });
    })
    .catch(err => console.log(err));    
};