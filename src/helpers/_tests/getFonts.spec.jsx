const fontTitle = (width) => {
  while (width < 1024) return 10 + width / 140;
  return 17;
};

const fontSubtitle = (width) => {
  while (width < 1024) return 8 + width / 140;
  return 15;
};

const fontBottom = (width) => {
  while (width < 1024) return 6 + width / 140;
  return 13;
};

it("should return the corect initials", () => {
  const width_1 = 1500;
  const width_2 = 500;
  const width_3 = 4000;

  expect(fontTitle(width_1)).toEqual(17);
  expect(Math.floor(fontTitle(width_2))).toEqual(13);
  expect(fontTitle(width_3)).toEqual(17);
  expect(fontSubtitle(width_1)).toEqual(15);
  expect(Math.floor(fontSubtitle(width_2))).toEqual(11);
  expect(fontSubtitle(width_3)).toEqual(15);
  expect(fontBottom(width_1)).toEqual(13);
  expect(Math.floor(fontBottom(width_2))).toEqual(9);
  expect(fontBottom(width_3)).toEqual(13);
});
