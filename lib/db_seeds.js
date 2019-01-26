const bcrypt = require('bcryptjs')

const User = require('../models/User')
const { SALT_ROUNDS } = require('../config/config')

async function seedAdminUser() {
    // Check that there are no users 
    const users = await User.find({})
    
    if (users.length) {
        return 
    }

    const hashed_password = await bcrypt.hash('password', SALT_ROUNDS)
    
    const admin = await new User({
        email: 'admin@plm.com',
        username: 'plmadmin',
        password: hashed_password,
        admin: true,
        temporary_password: false
    })

    await admin.save()
}

module.exports = { seedAdminUser }
