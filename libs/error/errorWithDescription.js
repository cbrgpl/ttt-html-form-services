module.exports.ErrorWithDescription = class extends Error {
  constructor( description, ...params ) {
    super( ...params );

    this.description = description;
  }
};
