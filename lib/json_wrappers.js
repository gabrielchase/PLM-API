module.exports = {
    success: (res, data) => {
        const obj = {
            success: true,
            data: data
        }
        res.json(obj)
    },
    fail: (res, err) => {
        console.log(err)
        const obj = {
            success: false,
            reason: err.message
        }
        res.json(obj)
    },
    newUserJson: ({ _id, email, username, admin, created_on }) => {
        return {
            _id,
            email,
            username, 
            admin, 
            created_on
        }
    },
    loginCredentialsJson: ({ _id, email, username, admin, full_name }, { token, iat, exp}) => {
        return {
            _id, 
            email, 
            username,
            full_name,
            admin,
            token, 
            iat, 
            exp
        }
    },
    updatedUserJson: ({ _id, email, username, admin, full_name, temporary_password, created_on, modified_on }) => {
        return { _id, email, username, admin, full_name, temporary_password, created_on, modified_on }
    }
}