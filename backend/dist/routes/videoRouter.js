"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const videoService_1 = require("../services/videoService");
const asyncify = require('express-asyncify');
const router = asyncify(express_1.default.Router());
// 영상 조회 요청
router.get('/', async (req, res) => {
    const videoService = new videoService_1.VideoService();
    const type = req.query.type;
    const selected = req.query.selected;
    try {
        const video = await videoService.findOne(type, selected);
        if (!video) {
            express_1.response.status(400).send('video not exist');
        }
        res.status(200).send(video);
    }
    catch (err) {
        res.status(400).send('write error');
    }
});
// 모든 영상 조회 요청
router.get('/videos', async (req, res) => {
    const videoService = new videoService_1.VideoService();
    try {
        const video = await videoService.findAll();
        if (!video) {
            express_1.response.status(400).send('video not exist');
        }
        res.status(200).send(video);
    }
    catch (err) {
        res.status(400).send('write error');
    }
});
// 영상 생성 요청
router.post('/', async (req, res) => {
    const videoService = new videoService_1.VideoService();
    console.log('text: ', req.body.text);
    try {
        let video = {
            type: req.body.type,
            url: req.body.url,
            text: req.body.text,
            selected: req.body.selected
        };
        const result = await videoService.create(video);
        if (req.body.videoId) {
            console.log('생성 안의 수정으로 들어옴');
            await videoService.update(req.body.videoId);
        }
        console.log(result);
        res.status(201).send('success');
    }
    catch (err) {
        console.log('error: ', err);
        res.status(400).send('write error');
    }
});
exports.default = router;
//# sourceMappingURL=videoRouter.js.map