const { VirtualElement } = require( './virtualElement' );

module.exports.SingleSelectField = class SingleSelectField extends VirtualElement{
  constructor( ...params ) {
    super( ...params );
  }

  parseValue() {
    return this.domElement.checked;
  }

  clearField() {
    this.domElement.checked = false;
  }

};
