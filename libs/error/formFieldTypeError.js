module.exports.FormFieldTypeError = class extends Error {
  constructor( node, name, type, ...params ) {
    super( ...params );

    this.node = node;
    this.name = name;
    this.type= type;
  }
};
