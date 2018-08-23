require('dotenv').load();

const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.lookup_number = (req, res, next) => {
    twilio.lookups.phoneNumbers(req.body.number)
              .fetch()
              .then((numberObj) => {
                console.log(numberObj)
                res.json({
                  formattedNumber: numberObj.phoneNumber,
                })
              })
              .catch((err) => {
                console.log(err)
                res.status(500).send(err)
              })
}
