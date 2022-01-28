import express, { Request, response, Response } from 'express';
import { VideoService } from '../services/videoService';
import { Video } from '../model/video';

const asyncify = require('express-asyncify');
const router = asyncify(express.Router());

// 영상 조회 요청
router.get('/', async (req: Request, res: Response) => {
  const videoService = new VideoService();
  const type: any = req.query.type
  const selected: any = req.query.selected

  try{
    const video: Video | null = await videoService.findOne(type, selected);
    if(!video){
      response.status(400).send('video not exist')  
    }
    res.status(200).send(video);
  }catch(err) {
    res.status(400).send('write error');
  }
});

// 모든 영상 조회 요청
router.get('/videos', async (req: Request, res: Response) => {
  const videoService = new VideoService();

  try{
    const video: any = await videoService.findAll();
    if(!video){
      response.status(400).send('video not exist')  
    }
    res.status(200).send(video);
  }catch(err) {
    res.status(400).send('write error');
  }
});

// 영상 생성 요청
router.post('/', async (req: Request, res: Response) => {
  const videoService = new VideoService();

  try{
    let video: Video = {
      type: req.body.type,
      url: req.body.url,
      text: req.body.text,
      selected: req.body.selected
    };
    const result = await videoService.create(video);

    if(req.body.videoId){
      await videoService.update(req.body.videoId)
    }
    res.status(201).send('success');
  }catch(err) {
    console.log('error: ', err)
    res.status(400).send('write error');
  }
});

export default router