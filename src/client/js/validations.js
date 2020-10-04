const validateUrl = (url) => {
  console.log(url);
  if (url.length < 1) {
    return false;
  }

  // regex adapted from https://www.regexpal.com/93652
  const regex = new RegExp(
    /^(https?:\/\/|www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  );
  return regex.test(url);
};

export default validateUrl;
