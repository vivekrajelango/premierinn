import { createAsyncAction } from 'redux-promise-middleware-actions';
import { userDetailsTypes } from '@/types/userDetails/userDetails';
import { getData } from '@/utils/apiMethods';

export const getMenuListfromApi = createAsyncAction(
  userDetailsTypes.GET_REASONS_FROM_API,
  async (routePath, data) => {
    const response = await getData(routePath, data);
    return response;
  }
);






