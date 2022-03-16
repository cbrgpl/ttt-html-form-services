const { TextField } = require( './../../libs/virtualNodes/textField.js' );

const { getFnResult } = require( './../__utils__/expectGetters.js' );
const { DocumentUtils } = require( './../__utils__/documentUtils.js' );

const htmlTemplates = require( '../__templates__/text_field.template.js' );

test( 'parseValue; valued(\'entered_text\'); \'entered_text\'', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.textField );

  const $field = DocumentUtils.getNode( 'input[data-field-type="text"]' );

  expect( getFnResult( () => {
    const vElem = new TextField( $field, 'email' );
    $field.value = 'entered_text';

    const result = vElem.parseValue();

    return result;
  } ) ).toEqual( 'entered_text' );
} );


test( 'clearField; valued(\'entered_text\'); \'\'', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.textField );

  const $field = DocumentUtils.getNode( 'input[data-field-type="text"]' );

  expect( getFnResult( () => {
    const vElem = new TextField( $field, 'email' );
    $field.value = 'entered_text';

    vElem.clearField();
    const result = vElem.parseValue();

    return result;
  } ) ).toEqual( '' );
} );
