const getInitials = (fullName) => {
  if (fullName) {
    return fullName
      .toUpperCase()
      .match(/(\b[A-Z](?!\s))/g)
      .join("");
  }
};
it("should return the corect initials", () => {
  const fullName_1 = "Bogdan David";
  const fullName_2 = "bogdan david";
  const fullName_3 = "Bogdan david";
  const fullName_4 = "bogdan David";

  expect(getInitials(fullName_1)).toEqual("BD");
  expect(getInitials(fullName_2)).toEqual("BD");
  expect(getInitials(fullName_3)).toEqual("BD");
  expect(getInitials(fullName_4)).toEqual("BD");

});


