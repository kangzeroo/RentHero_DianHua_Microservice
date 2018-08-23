const bodyParser = require('body-parser')
const twilio = require('twilio')

// routes
const Test = require('./routes/test_routes')
const PhoneRoutes = require('./routes/phone_routes')
const LookupRoutes = require('./routes/lookup_routes')

// bodyParser attempts to parse any request into JSON format
const json_encoding = bodyParser.json({type:'*/*'})
// bodyParser attempts to parse any request into GraphQL format
// const graphql_encoding = bodyParser.text({ type: 'application/graphql' })

module.exports = function(app){

	app.use(bodyParser())

	// routes
	app.get('/test', json_encoding, Test.test)

	// phone routes
	app.post('/get_token', json_encoding, PhoneRoutes.get_token)
	app.post('/voice', [twilio.webhook({ validate: false })], PhoneRoutes.voice)

	// lookup routes
	app.post('/lookup_number', json_encoding, LookupRoutes.lookup_number)
}
