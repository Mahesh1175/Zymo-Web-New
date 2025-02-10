const { defineSecret } = require("firebase-functions/params");
const Razorpay = require("razorpay");

const RAZORPAY_TEST_KEY = defineSecret("RAZORPAY_TEST_KEY");
const RAZORPAY_TEST_KEY_SECRET = defineSecret("RAZORPAY_TEST_KEY_SECRET");

function getRazorpayInstance() {
    return new Razorpay({
        key_id: process.env.RAZORPAY_TEST_KEY || RAZORPAY_TEST_KEY.value(),
        key_secret:
            process.env.RAZORPAY_TEST_KEY_SECRET ||
            RAZORPAY_TEST_KEY_SECRET.value(),
    });
}

module.exports = { getRazorpayInstance };
