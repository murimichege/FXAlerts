const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const message = {
    to: 'chegeeddie@gmail.com',
    from: 'bsclmr091818@spu.ac.ke',
    subject: 'Price Alert',
    text: 'EURUSD has reached price :',

}
sgMail.send(message)