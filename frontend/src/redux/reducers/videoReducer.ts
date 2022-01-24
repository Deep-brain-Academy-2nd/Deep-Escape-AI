import { createReducer } from 'typesafe-actions';
import { VideoState, VideoAction } from 'types/types';
import {
  GET_VIDEOS,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_ERROR,
} from 'redux/actions/videoAction';

const initialState: VideoState = [];

const videoReducer = createReducer<VideoState, VideoAction>(initialState, {
  [GET_VIDEOS]: (state) => ([
    ...state
  ]),
  [GET_VIDEOS_SUCCESS]: (state, action) => ([
    ...state,
    ...action.payload
  ]),
  [GET_VIDEOS_ERROR]: (state, action) => ([
    ...state,
  ]),
});

export default videoReducer;
