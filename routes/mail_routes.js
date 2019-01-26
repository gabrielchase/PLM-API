const { success, fail } = require('../lib/json_wrappers')
const { sendMail } = require('../services/mailer')

module.exports = function (app) {
    app.post('/api/mail', async (req, res) => {
        try {
            const messageId = await sendMail(req.body)
            success(res, messageId)   
        } catch (err) {
            fail(res, err)
        }        
    })
}