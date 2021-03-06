import { useEffect, useState } from 'react';
import { generateClientTokenAsync } from 'redux/actions/studioAction';
import { makeVideo, findProject } from 'apis/studio';
import { postVideo } from 'apis/video';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import { VIDEO_TYPE } from 'constants/constants';
import { getVideos } from 'apis/video';
import { message } from 'antd';
import {
  AdminVideoWrap,
  AdminSectionWrap,
  AdminSectionTitle,
  AdminTypeButton,
  AdminModifyButton,
  SynthesizeButton,
  AdminVideoText,
  ProgressBackground,
  Progress,
  MakeVideoWrap,
  ModifyTextArea,
  CompleteButton,
} from 'styles/adminStyle';

const AdminVideo = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState(VIDEO_TYPE.introduction);
  const [progress, setProgress] = useState<string | number>('waiting');
  const [introVideo, setIntroVideo] = useState({ url: '', text: '', videoId: 0 });
  const [isModify, setIsModify] = useState(false);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [videoKey, setVideoKey] = useState('');
  const { token } = useSelector((state: RootState) => state.studio);

  // 첫 진입시 영상 정보 불러오기
  useEffect(() => {
    fetchData(VIDEO_TYPE.introduction);
    dispatch(generateClientTokenAsync.request());
  }, []);

  // 영상 합성 후 진행률 추적
  useEffect(() => {
    if (videoKey) {
      let interval = setInterval(async () => {
        const res = await findProject({ token: token, videoKey: videoKey });
        setProgress(res.data.progress);
        if (res.data.progress === 100) {
          setUrl(res.data.video);
          clearInterval(interval);
        }
      }, 2000);
    }
  }, [videoKey]);

  // 영상 정보 불러오기 핸들러
  const fetchData = async (type: string) => {
    try {
      const res = await getVideos(type);

      setIntroVideo(res);
    } catch (e) {
      setIntroVideo({ url: '', text: '', videoId: 0 });
    }
  };

  // 영상 합성 핸들러
  const makeVideoHandler = async () => {
    const res = await makeVideo({ token: token, text: text });
    setVideoKey(res.data.key);
  };

  // 영상 등록 핸들러
  const postVideoHandler = async () => {
    await postVideo(type, url, text, introVideo.videoId);
    await fetchData(type);
    setProgress('waiting');
    setVideoKey('');
    setText('');
    setIsSynthesizing(false);
    setIsModify(false);
    message.success({
      content: `영상을 성공적으로 수정했습니다.`,
      className: 'custom-class',
      style: {
        marginTop: '10vh',
      },
    });
  };

  return (
    <AdminVideoWrap>
      {/* Admin Video Info : 유형 탭 UI */}
      <AdminSectionWrap>
        <AdminSectionTitle>유형</AdminSectionTitle>
        <AdminTypeButton
          bgColor={type === VIDEO_TYPE.introduction}
          onClick={() => {
            setType(VIDEO_TYPE.introduction);
            setIsModify(false);
            fetchData(VIDEO_TYPE.introduction);
          }}
        >
          소개 영상 AI
        </AdminTypeButton>
        <AdminTypeButton
          bgColor={type === VIDEO_TYPE.awards}
          onClick={() => {
            setType(VIDEO_TYPE.awards);
            setIsModify(false);
            fetchData(VIDEO_TYPE.awards);
          }}
        >
          어워즈 영상 AI
        </AdminTypeButton>
      </AdminSectionWrap>
      {/* Admin Video Info : 영상 비디오 탭 UI */}
      <AdminSectionWrap>
        <AdminSectionTitle>영상</AdminSectionTitle>
        {introVideo.url && <video width="280px" height="500px" src={introVideo.url} controls />}
      </AdminSectionWrap>
      {/* Admin Video Info : 영상 정보 탭 UI */}
      <AdminSectionWrap>
        <AdminSectionTitle>내용</AdminSectionTitle>
        <AdminVideoText>{introVideo.text}</AdminVideoText>
        <AdminModifyButton bgColor={isModify} onClick={() => setIsModify(!isModify)}>
          {isModify ? '취소' : '수정하기'}
        </AdminModifyButton>
      </AdminSectionWrap>
      {/* Admin Video Info : 영상 수정 탭 UI */}
      <AdminSectionWrap>
        <AdminSectionTitle>수정</AdminSectionTitle>
        {isModify && (
          <>
            <MakeVideoWrap>
              <ModifyTextArea onChange={(e) => setText(e.target.value)} />
            </MakeVideoWrap>
            <SynthesizeButton
              bgColor={isSynthesizing}
              onClick={() => {
                makeVideoHandler();
                setIsSynthesizing(true);
              }}
            >
              {isSynthesizing ? 'On Progress...' : '영상 합성'}
            </SynthesizeButton>
            <div>상태 : {progress === 'waiting' ? progress : progress + '%'}</div>
            <ProgressBackground>
              <Progress progress={progress}></Progress>
            </ProgressBackground>
          </>
        )}
        {progress === 100 && (
          <>
            <CompleteButton bgColor={false} onClick={() => postVideoHandler()}>
              수정 완료하기
            </CompleteButton>
            {/* <a href={url} style={{ color: '#000' }}>
              영상 다운로드
            </a> */}
          </>
        )}
      </AdminSectionWrap>
    </AdminVideoWrap>
  );
};

export default AdminVideo;
