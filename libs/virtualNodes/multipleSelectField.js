const { VirtualElement } = require( './virtualElement' );

module.exports.MultipleSelectField = class extends VirtualElement{
  constructor( ...params ) {
    super( ...params );

    this.$fieldInputElements = [ ...this.domElement.querySelectorAll( 'input' ) ];
  }

  parseValue() {
    const result = [];

    for( const $input of this.$fieldInputElements ) {
      if( $input.checked ) {
        result.push( $input.value );
      }
    }

    return result;
  }

  clearField() {
    this.$fieldInputElements.forEach( ( $input ) => $input.checked = false );
  }
};
