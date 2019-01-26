module.exports = {
    checkJWTExpiration: async (exp) => {
        let exp_str = exp.toString()
        const now_str = Date.now().toString()
        const padLength = now_str.length
        
        exp_str = exp_str.padEnd(padLength, 0)
        exp = parseInt(exp_str)

        if (Date.now() > exp) 
            throw new Error('JWT has expired')
        
        return true
    }
}