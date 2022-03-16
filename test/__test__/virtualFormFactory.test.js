const { VirtualFormFactory } = require( './../../libs/form/virtualFormFactory.js' );
const { FormFieldTypeError } = require( './../../libs/error/formFieldTypeError.js' );
const { FORM_FIELD_TYPES } = require( './../../libs/enum/formFieldTypes.js' );

const { getFnCaller, getFnResult } = require( './../__utils__/expectGetters.js' );

const { DocumentUtils } = require( './../__utils__/documentUtils.js' );

const htmlTemplates = require( '../__templates__/form_factory.templates.js' );

test( 'createVirtualField; unexpected_type; FormFieldTypeError', () => {
  expect( getFnCaller( () => {
    VirtualFormFactory.createVirtualField( null, null, 'any_unexpected_type' );
  } ) ).toThrow( FormFieldTypeError );
} );

test( 'createVirtualField; ( $textField, null, TEXT ); TextField', () => {
  DocumentUtils.insertTemplate( htmlTemplates.textField );

  expect( getFnResult( () => {
    const $field = DocumentUtils.getNode( 'input' );

    const vField = VirtualFormFactory.createVirtualField( $field, null, FORM_FIELD_TYPES.TEXT );

    return vField.constructor.name;
  } ) ).toEqual( 'TextField' );
} );

test( 'createVirtualField; ( $singleSelectField, null, SINGLE_SELECT ); SingleSelectField', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.singleSelectField );

  expect( getFnResult( () => {
    const $field = DocumentUtils.getNode( 'input' );

    const vField = VirtualFormFactory.createVirtualField( $field, null, FORM_FIELD_TYPES.SINGLE_SELECT );

    return vField.constructor.name;
  } ) ).toEqual( 'SingleSelectField' );
} );

test( 'createVirtualField; ( $multipleSelectField, null, SINGLE_SELECT ); MultipleSelectField', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.multipleSelectField );

  expect( getFnResult( () => {
    const $field = DocumentUtils.getNode( 'div' );

    const vField = VirtualFormFactory.createVirtualField( $field, null, FORM_FIELD_TYPES.MULTIPLE_SELECT );

    return vField.constructor.name;
  } ) ).toEqual( 'MultipleSelectField' );
} );



test( 'createVirtualForm; $form ;$valid_form', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.form );

  expect( getFnResult( () => {
    const $form = DocumentUtils.getNode( 'form' );
    const vForm = VirtualFormFactory.createVirtualForm( $form );

    const result = {};

    for( const fieldName in vForm ) {
      const vField = vForm[ fieldName ];

      result[ fieldName ] = vField.constructor.name;
    }

    return result;
  } ) ).toEqual( {
    email: 'TextField',
    country: 'MultipleSelectField',
    rememberMe: 'SingleSelectField'
  } );
} );
