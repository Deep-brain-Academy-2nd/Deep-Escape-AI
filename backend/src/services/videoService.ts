import { Video, VideoModel } from '../model/video';

export class VideoService {
  // 영상 조회
  public async findOne(type: string, selected: boolean): Promise<Video> {
    const videoData: Video = await VideoModel.findOne({type: type, selected: selected});
    return videoData;
  }

  // 모든 영상 조회
  public async findAll(): Promise<Video> {
    const videoData: any = await VideoModel.find({});
    return videoData;
  }

  // 영상 생성
  public async create(video: Video): Promise<Video> {
    let v = new VideoModel(video);
    return await v.save();
  }

  // 영상 수정
  public async update(videoId: number): Promise<Video> {
    const video: Video = await VideoModel.findOne({videoId: videoId})
    video.selected = false

    const videoData: Video = await VideoModel.findOneAndUpdate({ videoId: videoId }, video, { new: true });
    return videoData;
  }
}