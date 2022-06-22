const Review = require('../models/Review')

module.exports = async (req, res) => {
    const review = await Review.findById(req.params.id)
    res.render('review', {
        review
    })
}