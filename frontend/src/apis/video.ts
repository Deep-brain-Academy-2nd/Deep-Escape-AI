import axios from "axios";
import { API } from "constants/constants";

// 영상 조회 API
export const getVideos = async (type: string) => {
  const res = await axios.get(API + `/video?type=${type}&selected=${true}`);

  return res.data
}

// 영상 등록 API
export const postVideo = async (type: string, url: string, text: string, videoId: number) => {
  const res = await axios.post(API + '/video', {
    videoId: videoId,
    type: type,
    url: url,
    text: text,
    selected: true
  })

  return res.data
}