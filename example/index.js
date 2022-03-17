const { VirtualFormFactory } = require( '@form/virtualFormFactory' );
const { FormValidator } = require( '@form/formValidator.js' );
const { FormManipulator } = require( '@form/formManipulator.js' );
const { EmailValidator } = require( '@form/../validators/email.js' );

const emailValidator = new EmailValidator();

const { Validator } = require( './validator.js' );

const getValidationFn = ( minLength ) => ( value ) => value.length >= minLength && ( new RegExp( /[A-Z]/g ) ).test( value );
const minLength = 6;
const getMessage = ( minLength ) => `minLength should be at least ${ minLength }`;

const passwordValidator = new Validator( getValidationFn, minLength, getMessage );

const $form = document.querySelector( 'form' );
const $button = document.querySelector( 'button' );

const required = ( val ) => !!val;
const password = ( val ) => val.length > 6 && /[A-Z]/.test( val );
const atLeast = ( minLength ) => ( val ) => val.length >= minLength;
const truly = ( val ) => val === true;

const validationObject = {
  formData: {
    email: {
      required,
      email: emailValidator,
    },
    password: {
      passwordValidator
    },
  },
  country: {
    required,
    atLeast: atLeast( 1 )
  },
  rememberMe: {
    truly,
  }
};

const formValidator = new FormValidator( validationObject );

$button.addEventListener( 'click', ( event ) => {
  event.preventDefault();
  const virtualForm = VirtualFormFactory.createVirtualForm( $form );
  const formManipulator = new FormManipulator( virtualForm );
  const formData = formManipulator.getForm();

  const result = formValidator.validate( formData );
} );
