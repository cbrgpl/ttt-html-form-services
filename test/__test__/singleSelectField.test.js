const { SingleSelectField } = require( './../../libs/virtualNodes/singleSelectField.js' );

const { getFnResult } = require( './../__utils__/expectGetters.js' );
const { DocumentUtils } = require( './../__utils__/documentUtils.js' );

const htmlTemplates = require( '../__templates__/single_select_field.templates.js' );

test( 'parseValue; unchecked, checked; [false, true]', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.singleSelectField );

  const $field = DocumentUtils.getNode( 'input[data-field-type="singleSelect"]' );

  expect( getFnResult( () => {
    const vElem = new SingleSelectField( $field, 'rememberMe' );
    const result = [];

    result.push( vElem.parseValue() );
    $field.checked = true;
    result.push( vElem.parseValue() );

    return result;
  } ) ).toEqual( [ false, true ] );
} );

test( 'clearField; checked; false', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.singleSelectField );

  const $field = DocumentUtils.getNode( 'input[data-field-type="singleSelect"]' );

  expect( getFnResult( () => {
    const vElem = new SingleSelectField( $field, 'rememberMe' );
    $field.checked = true;

    vElem.clearField();

    return vElem.parseValue();
  } ) ).toEqual( false );
} );
