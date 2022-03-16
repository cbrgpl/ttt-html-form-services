const { VirtualElement } = require( './../../libs/virtualNodes/virtualElement.js' );
const { ErrorWithDescription } = require( './../../libs/error/errorWithDescription.js' );

const { getFnCaller, getFnResult } = require( './../__utils__/expectGetters.js' );

const { DocumentUtils } = require( './../__utils__/documentUtils.js' );

const htmlTemplates = require( '../__templates__/form_factory.templates.js' );

test( 'constructor; valid_args; valid_class', () => {
  DocumentUtils.insertTemplate( htmlTemplates.singleField );
  const $field = DocumentUtils.getNode( 'input' );

  expect( getFnResult( () => {
    const vElem = new VirtualElement( $field, 'email' );

    const result = {
      $elem: vElem.domElement,
      name: vElem.name,
    };

    return result;
  } ) ).toEqual( {
    $elem: $field,
    name: 'email',
  } );
} );

test( 'parseValue; throw err; ErrorWithDescription', () => {
  expect( getFnCaller( () => {
    const vElem = new VirtualElement();

    vElem.parseValue();
  } ) ).toThrow( ErrorWithDescription );
} );

test( 'clearField; throw err; ErrorWithDescription', () => {
  expect( getFnCaller( () => {
    const vElem = new VirtualElement();

    vElem.clearField();
  } ) ).toThrow( ErrorWithDescription );
} );
