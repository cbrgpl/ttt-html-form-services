module.exports = {
  getFnCaller: ( callback ) => () => callback(),
  getFnResult: ( callback ) => callback()
};
