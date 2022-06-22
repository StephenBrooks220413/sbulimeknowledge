const stripe = require('stripe')('sk_test_51J4xntDEGDZ1oGVFGtDnr9aMxafozBKzQ941Y3r0AAM9TXa1RziPXpyge1XfGh2swi31KOWjK8iuxD9BG2KnOuC400IXWQZ4y4')

module.exports = (req, res) => {
    try {
        stripe.customers.create({
            name: req.body.name,
            email: req.body.email,
            source: req.body.stripeToken
        }).then(customer => stripe.charges.create({
            amount: req.body.amount * 100,
            currency: 'usd',
            customer: customer.id,
            description: 'Thank you for your generous donation.'
        })).then(() => res.render('complete'))
            .catch(err => console.log(err))
    } catch (err) { res.send(err) }
}