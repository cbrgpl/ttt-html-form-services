module.exports.PropertyExistingError = class extends Error {
  constructor( data, prop, ...params ) {
    super( ...params );

    this.data = data;
    this.prop = prop;
  }
};
