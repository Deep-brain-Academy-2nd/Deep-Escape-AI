import axios from "axios"
import { CLIENT, STUDIO_API, API } from "constants/constants";

// AI STUDIOS 토큰 생성 API
export const generateClientToken = async () => {
  // const res = await axios.get(STUDIO_API + `/generateClientToken?appId=${CLIENT.appId}&userKey=${CLIENT.uuid}`);
  const res = await axios.get(API + `/studio?appId=${CLIENT.appId}&userKey=${CLIENT.uuid}`);

  return res.data
}

// AI STUDIOS 모델 목록 조회 API
export const getModelList = async (token: string) => {
  // const res = await axios.post(STUDIO_API + '/getModelList', {
  const res = await axios.post(API + '/studio/getModelList', {
    appId: CLIENT.appId,
    clientHostname: CLIENT.clientHostname,
    isClientToken: CLIENT.isClientToken,
    platform: CLIENT.platform,
    sdk_v: CLIENT.sdk_v,
    token: token,
    uuid: CLIENT.uuid,
  })

  return res.data
}

// AI STUDIOS 영상 생성 API
export const makeVideo = async ({token, text}:{token: string, text: string}) => {
  // const res = await axios.post(STUDIO_API + '/makeVideo', {
  const res = await axios.post(API + '/studio/makeVideo', {
    appId: CLIENT.appId,
    clientHostname: CLIENT.clientHostname,
    isClientToken: CLIENT.isClientToken,
    platform: CLIENT.platform,
    sdk_v: CLIENT.sdk_v,
    token: token,
    uuid: CLIENT.uuid,
    clothes: '2',
    language: 'ko',
    model: 'ysy',
    text: text,
  })

  return res.data
};

// AI STUDIOS 영상 작업 확인 API
export const findProject = async ({token, videoKey}:{token: string, videoKey: string}) => {
  // const res = await axios.post(STUDIO_API + '/findProject', {
  const res = await axios.post(API + '/studio/findProject', {
    key: videoKey,
    appId: CLIENT.appId,
    clientHostname: CLIENT.clientHostname,
    isClientToken: CLIENT.isClientToken,
    platform: CLIENT.platform,
    sdk_v: CLIENT.sdk_v,
    token: token,
    uuid: CLIENT.uuid,
  });

  return res.data
};