const { Validator } = require( './../../libs/form/validator.js' );
const { getFnResult } = require( './../__utils__/expectGetters.js' );

const getValidatorFn = () => ( val ) => val === 'password';
const getDefaultValidator = ( ...args ) => new Validator( getValidatorFn,  ...args );
const defaultMessage = ( args ) => ( {
  message: 'default_message',
  args
} );

test( 'getMessageCallback; null; null', () => {
  expect( getFnResult( () => {
    const validator = getDefaultValidator( null, null );

    return validator.getMessageCallback( null );
  } ) ).toEqual( null );
} );

test( 'getMessageCallback; defaultMessage; default_message', () => {
  expect( getFnResult( () => {
    const validator = getDefaultValidator( null, null  );
    const getDefaultMessage = validator.getMessageCallback( defaultMessage );

    return getDefaultMessage( [ 1, 2 ] );
  } ) ).toEqual( {
    message: 'default_message',
    args: [ 1, 2 ]
  } );
} );

test( 'getMessageCallback; \'new_message\'; \'new_message\'', () => {
  expect( getFnResult( () => {
    const validator = getDefaultValidator( null, null );
    const getDefaultMessage = validator.getMessageCallback( 'new_message' );

    return getDefaultMessage();

  } ) ).toEqual( 'new_message' );
} );

test( 'validate; \'wrong_password\'; false', () => {
  expect( getFnResult( () => {
    const validator = getDefaultValidator( null, null );

    return validator.validate( 'wrong_password' );
  } ) ).toEqual( false );
} );

test( 'validate; \'password\'; true', () => {
  expect( getFnResult( () => {
    const validator = getDefaultValidator( null, null );

    return validator.validate( 'password' );
  } ) ).toEqual( true );
} );

test( 'isMessage; message_exists; true', () => {
  expect( getFnResult( () => {
    const validator = getDefaultValidator( null, () => 'message' );

    return validator.isMessage();
  } ) ).toEqual( true );
} );


test( 'getResultObject; true; {error: false}', () => {
  expect( getFnResult( () => {
    const validator = getDefaultValidator( null, null );

    return validator.getResultObject( true );
  } ) ).toEqual( { error: false } );
} );

test( 'getResultObject; false; {error: true, message: [1, 2]}, ', () => {
  expect( getFnResult( () => {
    const validator = getDefaultValidator( [ 1, 2 ], ( params ) => params );

    return validator.getResultObject( false );
  } ) ).toEqual( { error: true, message: [ 1, 2 ] } );
} );
