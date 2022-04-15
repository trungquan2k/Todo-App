const express = require('express');
const router =express.Router();
const adminController =require('../app/controllers/adminController');

router.post(
    '/signup',
    adminController.create_account
);

router.post(
    '/',
    adminController.login
);

router.post(
    '/forgot',
    adminController.forgotPassWord
);

module.exports.router;