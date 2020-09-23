const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'chegeeddie@gmail.com',
    from: 'bsclmr091818@spu.ac.ke',
    subject: 'Price has been reached',
    text: 'EURUSD has reached price :',

}
sgMail.send(msg)