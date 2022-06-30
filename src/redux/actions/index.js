export const SAVE_USER_INFO = 'SAVE_USER_INFO';
export const SAVE_SCORE = 'SAVE_SCORE';

export const saveUserInfo = (payload) => ({ type: SAVE_USER_INFO, payload });

export const saveScore = (payload) => ({ type: SAVE_SCORE, payload });
