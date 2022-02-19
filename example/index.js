const { VirtualFormFactory } = require( '@form/virtualFormFactory' );

const $form = document.querySelector( 'form' );
const $button = document.querySelector( 'button' );

$button.addEventListener( 'click', ( event ) => {
  event.preventDefault();
  const virtualForm = VirtualFormFactory.createVirtualForm( $form );
  console.log( virtualForm );

  for( const virtualField in virtualForm ) {
    console.log( virtualField, virtualForm[ virtualField ].parseValue() );
  }
} );
