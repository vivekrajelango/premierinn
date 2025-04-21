import { addAsyncActionPostfixes } from '../../utils/actionTypeCreator';

export const userDetailsTypes = {
  ...addAsyncActionPostfixes({
    GET_REASONS_FROM_API: 'GET_REASONS_FROM_API',
  }),
};
