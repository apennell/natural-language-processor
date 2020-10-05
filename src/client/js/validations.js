const validateUrl = (url) => {
  if (!url) {
    return false;
  }

  // regex adapted from https://www.regexpal.com/93652
  const regex = new RegExp(
    /^(https:\/\/|http:\/\/|www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  );

  return regex.test(url);
};

export default validateUrl;
