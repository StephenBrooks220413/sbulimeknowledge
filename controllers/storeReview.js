const Review = require('../models/Review');
const path = require("path");

module.exports = (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..' ,'public/uploads', image.name),async(error)=>{
        await Review.create({
            ...req.body,
            image: '/uploads/' + image.name,
            userid: req.session.userId
        })
        res.redirect('/')
    })
}