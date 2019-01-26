const { MAIL_RECIPIENT } = require('../config/config')

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
        user: 'gchasemailer@gmail.com',
        pass: 'kobe0824'
    }
})

let mail_options = {
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
