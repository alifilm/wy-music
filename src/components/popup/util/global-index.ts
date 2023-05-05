let globalZIndex = 2e3;
const useGlobalZIndex = () => ++globalZIndex;
const setGlobalZIndex = (val: number) => {
  globalZIndex = val;
};
export {
  setGlobalZIndex,
  useGlobalZIndex
};