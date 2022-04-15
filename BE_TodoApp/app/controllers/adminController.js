const express = require('express');
const Admin =require('../../models/admin.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const os= require('os');
const moment =require('moment');


exports.login = async(req, res )=>{
    let username=req.body.username;
    let password=req.doby.password;
    try {
        const admin=await Admin.findOne({username:username});
        if(!admin){
            return res.json({
                message:"Username of Password not match"
            })
        };

        // compare password
        const isPasswordMath= await bcrypt.compare(password,admin.password);
        if(!isPasswordMath){
            return res.json({
                message:"Password not match"
            })
        };

        const token = jwt.sign({ id: admin._id }, process.env.JWT_KEY)
        admin.tokens = admin.tokens.concat({ token })
        await admin.save();

        res.status(201).json({
            message: "Login is successfull",
            token: token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error, req: req.body });
    }
};

// create Admin account
exports.create_account = async (req, res) => {
    const {
        email,
        username
    } = req.body;
    try {
        let admin = await Admin.findOne({ email: email });
        if (admin) return res.status(403).json('Email already registered for another account');

        admin = await Admin.findOne({ username });
        if (admin) return res.status(403).json('User name already registered for another account');

        const newUser = new Admin(req.body);
        const savedUser = await newUser.save();
        const token = jwt.sign({
            id: savedUser._id,
        }, process.env.JWT_KEY);

        res.status(201).json({
            admin: savedUser,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: err, req: req.body });
    }
};

exports.forgotPassWord= async(req, res)=>{
    return res;
}
