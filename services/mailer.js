const { MAIL_RECIPIENT } = require('../config/config')

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: 'gchase.patron@gmail.com',
        pass: 'Django2.01'
    }
})

let mail_options = {
    from: 'plm_app@gmail.com', 
    to: MAIL_RECIPIENT
}

async function sendMail({ subject, message }) {
    mail_options.subject = subject 
    mail_options.html = `<p>${message}</p>`
    
    const info = await transporter.sendMail(mail_options)
    
    if (!info.messageId) {
        throw new Error('Sending email failed')
    }
    
    return info.messageId
}

module.exports = {
    sendMail
}
