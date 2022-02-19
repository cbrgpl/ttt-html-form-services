const { VirtualElement } = require( './virtualElement' );

module.exports.TextField = class extends VirtualElement{
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
