export const checkSubscribe = (action) => {
  if (action === "Subscribe") return true;
  return false;
};

export const checkWaitingList = (action) => {
  if (action === "Waiting List") return true;
  return false;
};
export const checkUnsubscribe = (action) => {
  if (action === "Unsubscribe") return true;
  return false;
};
