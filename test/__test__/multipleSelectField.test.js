const { MultipleSelectField } = require( './../../libs/virtualNodes/multipleSelectField.js' );

const { getFnResult } = require( './../__utils__/expectGetters.js' );
const { DocumentUtils } = require( './../__utils__/documentUtils.js' );

const htmlTemplates = require( '../__templates__/multiple_select_field.templates.js' );

test( 'constructor; ($field, name); $fieldInputElements is 3', () => {
  DocumentUtils.insertTemplate( htmlTemplates.multipleSelectField );
  const $field = DocumentUtils.getNode( 'div' );

  expect( getFnResult( () => {
    const vElem = new MultipleSelectField( $field, 'country' );

    return vElem.$fieldInputElements.length;
  } ) ).toEqual( 3 );;
} );

test( 'parseValue; selected(); []', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.multipleSelectField );

  const $field = DocumentUtils.getNode( 'div' );

  expect( getFnResult( () => {
    const vElem = new MultipleSelectField( $field, 'country' );

    const result = vElem.parseValue();

    return result;
  } ) ).toEqual( [] );
} );

test( 'parseValue; selected(russia_&&_usa); [\'russia\', \'usa\']', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.multipleSelectField );

  const $field = DocumentUtils.getNode( 'div' );

  expect( getFnResult( () => {
    const vElem = new MultipleSelectField( $field, 'country' );
    DocumentUtils.getNode( 'input[value="russia"]' ).checked = true;
    DocumentUtils.getNode( 'input[value="usa"]' ).checked = true;

    const result = vElem.parseValue();

    return result;
  } ) ).toEqual( [ 'russia', 'usa' ] );
} );

test( 'clearField; selected(russia_&&_usa); []', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.multipleSelectField );

  const $field = DocumentUtils.getNode( 'div' );

  expect( getFnResult( () => {
    const vElem = new MultipleSelectField( $field, 'country' );
    DocumentUtils.getNode( 'input[value="russia"]' ).checked = true;
    DocumentUtils.getNode( 'input[value="usa"]' ).checked = true;

    vElem.clearField();
    const result = vElem.parseValue();

    return result;
  } ) ).toEqual( [] );
} );
