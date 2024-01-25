const core = require('../config/core.config')

const verifyUserToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send(
        {
            status: {
                code: 401,
                message: "Access Denied / Unauthorized request"
            },
        }
    );

    try {
        token = token.split(' ')[1] // Remove Bearer from string

        if (token === 'null' || !token) return res.status(401).send('Unauthorized request');

        let decoded = core.jwt.verify(token, core.env.TOKEN_KEY);
        if (!decoded) return res.status(401).send('Unauthorized request')

        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).send({
            status: {
                code: 401,
                message: "Invalid Authorization"
            },
        });
    }

}


module.exports = verifyUserToken;
