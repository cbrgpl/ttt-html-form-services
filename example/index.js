const { VirtualFormFactory } = require( '@form/virtualFormFactory' );
const { FormValidator } = require( '@form/formValidator.js' );
const { FormManipulator } = require( '@form/formManipulator.js' );
const { EmailValidator } = require( '@form/../validators/email.js' );

const emailValidator = new EmailValidator();

const $form = document.querySelector( 'form' );
const $button = document.querySelector( 'button' );

const email = ( val ) => val;
const required = ( val ) => val;
const password = ( val ) => val;
const atLeast = ( val ) => val;
const truly = ( val ) => val;

const validationObject = {
  formData: {
    email: {
      required,
      email: emailValidator,
    },
    password: {
      required,
      password
    },
  },
  // country: {
  //   required,
  //   atLeast: atLeast( 1 )
  // },
  // rememberMe: {
  //   truly,
  // }
};

const testData = {
  formData: {
    email: 'cybirgpl@.com',
    password: 'qweqew',
  },
  country: [ 'russian' ],
  rememberMe: true
};

const formValidator = new FormValidator( validationObject );

$button.addEventListener( 'click', ( event ) => {
  event.preventDefault();
  const virtualForm = VirtualFormFactory.createVirtualForm( $form );
  const formManipulator = new FormManipulator( virtualForm );
  const formData = formManipulator.getForm();
  console.log( formData );

  const result = formValidator.validate( testData );
  console.log( 'validation', result );

} );
