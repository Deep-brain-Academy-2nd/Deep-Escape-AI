"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const asyncify = require('express-asyncify');
const router = asyncify(express_1.default.Router());
// 영상 조회 요청
router.get('/', async (req, res) => {
    const appId = req.query.appId;
    const userKey = req.query.userKey;
    try {
        const response = await axios_1.default.get(`https://dev.aistudios.com/api/odin/generateClientToken?appId=${appId}&userKey=${userKey}`);
        res.status(200).send(response.data);
    }
    catch (e) {
        res.status(400).send('generate token error');
    }
});
// 영상 생성
router.post('/makeVideo', async (req, res) => {
    try {
        const response = await axios_1.default.post(`https://dev.aistudios.com/api/odin/makeVideo`, {
            appId: req.body.appId,
            clientHostname: req.body.appIdclientHostname,
            isClientToken: req.body.isClientToken,
            platform: req.body.platform,
            sdk_v: req.body.sdk_v,
            token: req.body.token,
            uuid: req.body.uuid,
            clothes: req.body.clothes,
            language: req.body.language,
            model: req.body.model,
            text: req.body.text,
        });
        res.status(200).send(response.data);
    }
    catch (e) {
        res.status(400).send('generate token error');
    }
});
// 영상 작업 확인
router.post('/findProject', async (req, res) => {
    try {
        const response = await axios_1.default.post(`https://dev.aistudios.com/api/odin/findProject`, {
            key: req.body.key,
            appId: req.body.appId,
            clientHostname: req.body.clientHostname,
            isClientToken: req.body.isClientToken,
            platform: req.body.platform,
            sdk_v: req.body.sdk_v,
            token: req.body.token,
            uuid: req.body.uuid,
        });
        res.status(200).send(response.data);
    }
    catch (e) {
        res.status(400).send('generate token error');
    }
});
exports.default = router;
//# sourceMappingURL=studioRouter.js.map