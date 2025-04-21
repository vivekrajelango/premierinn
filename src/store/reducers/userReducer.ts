import { userDetailsTypes as types } from '@/types/userDetails/userDetails';
import _ from 'lodash';

export interface UserAppState {
  getReasonsPending: boolean;
  getReasonsFromApi: any;
}

const initialState: UserAppState = {
  getReasonsPending: false,
  getReasonsFromApi: [],
};


export default function actionReducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
): any {
  switch (type) {
    //Get api 
    case types.GET_REASONS_FROM_API_PENDING: {
      return {
        ...state,
        getReasonsPending: true
      }
    }
    case types.GET_REASONS_FROM_API_FULFILLED: {
      return {
        ...state,
        getReasonsPending: false,
        getReasonsFromApi: payload,
      }
    }
    case types.GET_REASONS_FROM_API_REJECTED: {
      return {
        ...state,
        getReasonsPending: false
      }
    }

    
    default:
      return state;
  }
}
