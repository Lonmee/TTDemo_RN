export const TOGGLE_COMMENT = 'toggleComment';
export const SWITCH_VIDEO = 'switchVideo';

export const toggleComment = () => ({
  type: TOGGLE_COMMENT,
});
export const switchVideo = (inx: number) => ({
  type: SWITCH_VIDEO,
  currentVideoIndex: inx,
});
