import jwt from 'jsonwebtoken';
import userModel from '../models/user-model.js';

const isLogged = async ( req, res, next ) => { 
    if (!req.cookies.token) return res.status(400).json({message: "Login first!"});
    try {
        let decoded = jwt.verify( req.cookies.token, process.env.JWT_SECRET );
        let user = await userModel.findOne({email: decoded.email}).select("-password");
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export default isLogged;