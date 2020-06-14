export const fontTitle = (width) => {
    while (width < 1024) return 10 + width / 140;
    return 17;
  };

export const fontSubtitle = (width) => {
    while (width < 1024) return 8 + width / 140;
    return 15;
  };

export const fontBottom = (width) => {
    while (width < 1024) return 6 + width / 140;
    return 13;
  };