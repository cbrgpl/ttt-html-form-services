const { VirtualFormFactory } = require( './../../libs/form/virtualFormFactory.js' );
const { FormManipulator } = require( './../../libs/form/formManipulator.js' );

const { getFnResult } = require( './../__utils__/expectGetters.js' );
const { DocumentUtils } = require( './../__utils__/documentUtils.js' );

const htmlTemplates = require( '../__templates__/form_manipulator.templates.js' );

test( 'getForm; $filled_form; filledForm; ', () => {
  DocumentUtils.insertTemplate( htmlTemplates.filledForm );


  expect( getFnResult( () => {
    const $form = DocumentUtils.getNode( 'form' );
    const vForm = VirtualFormFactory.createVirtualForm( $form );
    const formManipulator = new FormManipulator( vForm );

    const formData = formManipulator.getForm();

    return formData;
  } ) ).toEqual( {
    email: 'my_email',
    country: [ 'russia', 'usa' ],
    rememberMe: true
  } );
} );

test( 'getForm; $filled_form; filledForm; ', () => {
  DocumentUtils.resetDocument();
  DocumentUtils.insertTemplate( htmlTemplates.filledForm );


  expect( getFnResult( () => {
    const $form = DocumentUtils.getNode( 'form' );
    const vForm = VirtualFormFactory.createVirtualForm( $form );
    const formManipulator = new FormManipulator( vForm );

    formManipulator.clearForm();
    const formData = formManipulator.getForm();

    return formData;
  } ) ).toEqual( {
    email: '',
    country: [],
    rememberMe: false
  } );
} );
