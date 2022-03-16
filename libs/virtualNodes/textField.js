const { VirtualElement } = require( './virtualElement' );

module.exports.TextField = class TextField extends VirtualElement{
  constructor( ...params ) {
    super( ...params );
  }

  parseValue() {
    return this.domElement.value;
  }

  clearField(){
    this.domElement.value = '';
  }

};
