const jsonwebtoken = require("jsonwebtoken");

const Admin = require('../models/admin.model');

const tokenDecode = (req) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ')[1];
        try {
            const tokenDecoded = jsonwebtoken.verify(
                bearer,
                process.env.JWT_KEY
            );
            return tokenDecoded;
        } catch(err) {
            return false;
        }
    } else {
        return false;
    }
};
exports.verifyAdminToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) { 
        const admin = await Admin.findById(tokenDecoded.id);
        console.log(tokenDecoded.id );
        if (!admin) return res.status(403).json('Not allowed!');
        req.admin = admin;
        next();
    } else {
        console.log("Decode Token is "+tokenDecoded);
        res.status(401).json('Unauthorized');
    }
};

exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const admin = await Admin.findById(tokenDecoded.id);
        if (!admin ) return res.status(403).json('Not allowed!');    
        req.admin = admin;
        next();
    } else {
        res.status(401).json('Unauthorized');
    }
}