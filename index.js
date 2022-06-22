const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const flash = require('connect-flash')
const SitemapGenerator = require('sitemap-generator');

require('dotenv').config()

// create generator
const generator = SitemapGenerator('https://www.sublimeknowledge.com', {
    stripQuerystring: true
});

// register event listeners
generator.on('done', () => {
    // sitemaps created
});

// start the crawler
generator.start();

/////////////////////////////////////////////////////////////
// Middlewares
// const validateMiddleware = require('./middleware/validateMiddleware')
// const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

const app = new express()
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(morgan())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({exntended:true}))
app.use(fileUpload())
app.use(flash())
app.use(expressSession({
    secret: 'pe86fm8o5e7m68el5y6r8lye5fr'
}))
globalloggedIn = null;
app.use("*", (req, res, next)=>{
    loggedIn = req.session.userId;
    next()
});

/////////////////////////////////////////////////////////////
// DB Connection
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION, APP SHUTTING NOW!!");
    console.log(err.message, err.name);
    process.exit(1);
});
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
})
if(!mongoose){
    console.log('No DB connection')
} else {
    console.log('DB connection')
}
/////////////////////////////////////////////////////////////

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening')
})

/////////////////////////////////////////////////////////////
// Pages
const homeController = require('./controllers/home')
const aboutController = require('./controllers/about')
const productsController = require('./controllers/products')
const healthController = require('./controllers/health')
const wealthController = require('./controllers/wealth')
const loveController = require('./controllers/love')

//////////////////////////////////////////////////////////////////////////
// Review
const reviewsController = require('./controllers/reviews')
app.get('/reviews', reviewsController)
const reviewController = require('./controllers/review')
app.get('/review/:id', reviewController)
const newReviewController = require('./controllers/newReview')
app.get('/createReview', newReviewController)
const storeReviewController = require('./controllers/storeReview')
app.post('/review/store', storeReviewController)

/////////////////////////////////////////////////////////////////////////
// Pages
app.get('/', homeController)
app.get('/about', aboutController)
app.get('/products', productsController)
app.get('/health', healthController)
app.get('/wealth', wealthController)
app.get('/love', loveController)

/////////////////////////////////////////////////////////////////////////
// Stripe
const paymentController = require('./controllers/payment')
app.get('/payment', paymentController)
