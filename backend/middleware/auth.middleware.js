const CryptoJS = require('crypto-js')

const authMiddleware = async (req, res, next) => {
    let token = req.headers['authorization']

    if (!token) {
        return res.status(400).json({ message: 'token invalido' })
    }

    try {
        token = CryptoJS.AES.decrypt(token, "senha").toString(CryptoJS.enc.Utf8)

        if (!token) {
            return res.status(400).json({ message: 'token invalido' })
        }

        token = JSON.parse(token)

        if (!token) {
            return res.status(400).json({ message: 'token invalido' })
        }

        if (token.expiraEm < Date.now()) {
            return res.status(400).json({ message: 'sessão expirada, faça login novamente' })
        }

        next()
        
    } catch (err) {
        res.status(500).json({ message: 'erro ao autenticar' })
        console.error(err)
    }
}

module.exports = authMiddleware