const express = require('express');
const router = express.Router();
const stripe = require('stripe')(
  'sk_test_51PQkcgP00E6usXEDufgRG4YyfxDBKJwjAT6HFfSvoD6Z3EsOom6f2gSYtCxQCxuImBZqME66zBriLCiY0AYcuA7t003gB4tw7S',
);

// router endpoints
router.post('/intents', async (req, res) => {
  console.log(req.body.amount);
  try {

    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return res.json({paymentIntent: paymentIntent.client_secret});
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;

