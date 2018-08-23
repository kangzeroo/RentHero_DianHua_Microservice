require('dotenv').load();
const twilio = require('twilio');
const ClientCapability = twilio.jwt.ClientCapability;
const VoiceResponse = twilio.twiml.VoiceResponse;
const MessagingResponse = twilio.twiml.MessagingResponse


exports.get_token = (req, res, next) => {
  const capability = new ClientCapability({
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  });

  capability.addScope(
    new ClientCapability.OutgoingClientScope({
      applicationSid: process.env.TWILIO_TWIML_APP_SID})
  );

  const token = capability.toJwt();

  res.send({
    token: token,
  })
}

exports.voice = (req, res, next) => {
  const voiceResponse = new VoiceResponse()
  const dial = voiceResponse.dial({
    callerId: process.env.TWILIO_NUMBER,
    record: 'record-from-answer'
  })

  dial.number(req.body.number)
  res.type('text/xml')
  res.send(voiceResponse.toString())
}
