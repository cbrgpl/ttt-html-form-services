const ErrorWithDescription = require( '../error/errorWithDescription' );

module.exports.VirtualElement = class {
  constructor( domElement, name ) {
    this.domElement = domElement;
    this.name = name;
  }

  parseValue() {
    throw new ErrorWithDescription( 'parseValue method is not implemented in extensible classes' );
  }

  clearField() {
    throw new ErrorWithDescription( 'clearField method is not implemented in extensible classes' );
  }

  getName() {
    return this.name;
  }

};
