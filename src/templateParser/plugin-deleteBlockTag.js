const deleteBlockTagPlugin = function (opContent) {
  if (opContent) {
    // opContent
    opContent = opContent
      .replace(/<block[^<]*>/g, "")
      .replace(/<\/block>/g, "");
  }
  return opContent;
};

export default deleteBlockTagPlugin;
