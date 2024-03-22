import jwt from 'jsonwebtoken';
const JWT = process.env.JWT_SECRET;

function userAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) return res.status(403).json({});

    const token = req.headers.authorization.split(' ')[1];
    try {
        const decode = jwt.decode(token, JWT);
        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(403).json({});
    }

}

export default userAuth;