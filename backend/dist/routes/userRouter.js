"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorization_1 = require("../authorization");
const userService_1 = require("../services/userService");
const asyncify = require('express-asyncify');
const router = asyncify(express_1.default.Router());
// 유저 정보 요청
router.use('/profile', authorization_1.verifyToken);
router.get('/profile', async (req, res) => {
    const userService = new userService_1.UserService();
    try {
        let email = res.locals['email'];
        const user = await userService.read(email);
        // 유저 없는 경우
        if (!user) {
            res.status(400).send('user not exist');
            return;
        }
        res.status(200).send({ nickname: user.nickname, admin: user.admin });
    }
    catch (err) {
        res.status(400).send('user error');
    }
});
// 유저 로그인 요청
router.post('/login', async (req, res) => {
    const userService = new userService_1.UserService();
    try {
        let email = req.body.email;
        let password = req.body.password;
        const user = await userService.read(email);
        if (!user) {
            // 이메일 주소 없음
            res.status(400).send('email not exist');
            return;
        }
        const result = await (0, bcryptjs_1.compare)(password, user.password);
        if (!result) {
            // 비밀번호 불일치
            res.status(400).send('password incorrect');
            return;
        }
        // 유저 정보로 토큰 생성
        const token = jsonwebtoken_1.default.sign({
            email: email,
            admin: user.admin,
        }, process.env.SECRET_KEY || 'secret_key', {
            expiresIn: '600m'
        });
        res.status(200).send({
            nickname: user.nickname,
            token: token,
            admin: user.admin
        });
    }
    catch (err) {
        res.status(400).send('login error');
    }
});
// 유저 회원가입 요청
router.post('/register', async (req, res) => {
    const userService = new userService_1.UserService();
    let user = req.body;
    // 유저 암호 해쉬화
    user.password = await (0, bcryptjs_1.hash)(user.password, 5);
    try {
        const data = await userService.create(user);
        if (data) {
            res.status(201).send('success');
        }
        else {
            res.status(400).send('register error');
        }
    }
    catch (err) {
        res.status(400).send('register error');
    }
});
module.exports = router;
//# sourceMappingURL=userRouter.js.map