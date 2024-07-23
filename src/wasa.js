
function Wasa() {

const accountSid = 'ACe83481613a81f17fc412be954e97ac1d';
const authToken = '68043c6b5f529874a686915200794155';
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'Mensaje de prueba de Whatsapp con twilio',
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+19566009878'
    })
    .then(message => console.log(message.sid))
    


}

export default Wasa;