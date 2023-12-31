var jwt = require('jsonwebtoken');
const JWT_SECRET = 'Ayushisagoodb$oy';

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        req.status(401).send({ error: "Please authenticate using a valid Token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    } catch (error) {
        req.status(401).send({ error: "Please authenticate using a valid Token" });
    }
}

module.exports = fetchuser;