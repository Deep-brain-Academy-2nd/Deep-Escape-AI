import express, { Request, response, Response } from 'express';
import axios from 'axios'

const asyncify = require('express-asyncify');
const router = asyncify(express.Router());

// 영상 조회 요청
router.get('/', async (req: Request, res: Response) => {
  const appId = req.query.appId
  const userKey = req.query.userKey


  try {
    const response = await axios.get(`https://dev.aistudios.com/api/odin/generateClientToken?appId=${appId}&userKey=${userKey}`)
    res.status(200).send(response.data);
  } catch (e) {
    res.status(400).send('generate token error')
  }
});

// 영상 생성
router.post('/makeVideo', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`https://dev.aistudios.com/api/odin/makeVideo`, {
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
    })
    res.status(200).send(response.data);
  } catch (e) {
    res.status(400).send('generate token error')
  }
});

// 영상 작업 확인
router.post('/findProject', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`https://dev.aistudios.com/api/odin/findProject`, {
      key: req.body.key,
      appId: req.body.appId,
      clientHostname: req.body.clientHostname,
      isClientToken: req.body.isClientToken,
      platform: req.body.platform,
      sdk_v: req.body.sdk_v,
      token: req.body.token,
      uuid: req.body.uuid,
    })
    res.status(200).send(response.data);
  } catch (e) {
    res.status(400).send('generate token error')
  }
});

export default router