const { FormValidator } = require( './../../libs/form/formValidator.js' );
const { Validator } = require( './../../libs/form/validator.js' );
const { DeepObjectWrapper } = require( './../../libs/service/deepObjectWrapper.js' );

const { getFnResult } = require( './../__utils__/expectGetters.js' );

const mustBeOneFn = ( val ) => val === 1,
  mustBeTwoValidator = new Validator( () => ( val ) => val === 2, [ 2 ], ( params ) => `validator ${ params[ 0 ] }` ),
  mustBeThreeValidator = new Validator( () => ( val ) => val === 3, [ 3 ], ( params ) => `validator ${ params[ 0 ] }` );;

const validations = {
  data: {
    prop1: {
      mustBeOne: mustBeOneFn
    },
    prop2: {
      mustBeTwo: mustBeTwoValidator
    }
  }
};

const formData = {
  data: {
    prop1: 1,
    prop2: 2
  },
};

test( 'createValidations; validations; [ mustBeOneValidator, mustBeTwoValidator ]', () => {
  expect( getFnResult( () => {
    const formValidator = new FormValidator( validations );

    const validationSchema = formValidator.createValidations( validations );

    const mustBeOneValidator = validationSchema.object.data.prop1.mustBeOne;
    const mustBeTwoValidator = validationSchema.object.data.prop2.mustBeTwo;

    return [
      mustBeOneValidator instanceof Validator,
      mustBeTwoValidator instanceof Validator
    ];
  } ) ).toEqual( [ true, true ] );
} );

test( 'isObjectOfValidators; obj_of_validators; true', () => {
  expect( getFnResult( () => {
    const formValidator = new FormValidator( validations );

    const validationSchema = formValidator.createValidations( validations );
    const propValidations = validationSchema.object.data.prop1;

    return formValidator.isObjectOfValidators( propValidations );
  } ) ).toEqual( true );
} );

test( 'validateFieldValue; 2, {mustBeTwoValidator}; {value, error: false, ...}', () => {
  expect( getFnResult( () => {
    const formValidator = new FormValidator( {} );

    const validationResult = formValidator.validateFieldValue( 2, { mustBeTwo: mustBeTwoValidator } );

    return validationResult;
  } ) ).toEqual( {
    value: 2,
    error: false,
    validators: {
      mustBeTwo: {
        error: false
      }
    },
    messages: [],
    _validationObject: true
  } );
} );

test( 'validateFieldValue; 1, {mustBeTwoValidator}; {value, error: true, ...}', () => {
  expect( getFnResult( () => {
    const formValidator = new FormValidator( {} );

    const validationResult = formValidator.validateFieldValue( 1, { mustBeTwo: mustBeTwoValidator } );

    return validationResult;
  } ) ).toEqual( {
    value: 1,
    error: true,
    validators: {
      mustBeTwo: {
        error: true,
        message: 'validator 2'
      }
    },
    messages: [
      'validator 2'
    ],
    _validationObject: true
  } );
} );

test( 'getFieldMessages; validationResult of 1; [\'validator 2\', \'validator 3\']', () => {
  expect( getFnResult( () => {
    const fieldValidation = {
      mustBeTwo: mustBeTwoValidator,
      mustBeThree: mustBeThreeValidator
    };

    const formValidator = new FormValidator( {} );
    const validationResult = formValidator.validateFieldValue( 1, fieldValidation );

    return formValidator.getFieldMessages( validationResult );
  } ) ).toEqual( [
    'validator 2',
    'validator 3'
  ] );
} );

test( 'checkFormValidation; fakeResult of 1; true', () => {
  expect( getFnResult( () => {
    const fakeResult = new DeepObjectWrapper( {} );
    fakeResult.set( [ 'form', 'prop1' ], {
      error: false,
      _validationObject: true,
    } );
    fakeResult.set( [ 'form', 'prop2' ], {
      error: true,
      _validationObject: true,
    } );


    const formValidator = new FormValidator( {} );

    return formValidator.checkFormValidation( fakeResult );
  } ) ).toEqual( true );
} );

test( 'validate; formData; valid_form', () => {
  expect( getFnResult( () => {
    const formValidator = new FormValidator( validations );

    return formValidator.validate( formData );
  } ) ).toEqual( {
    data:  {
      prop1:  {
        _validationObject: true,
        error: false,
        messages:  [],
        validators:  {
          mustBeOne:  {
            error: false,
          },
        },
        value: 1,
      },
      prop2:  {
        _validationObject: true,
        error: false,
        messages:  [],
        validators:  {
          mustBeTwo:  {
            error: false,
          },
        },
        value: 2,
      },
    },
    errorState: false,
  } );
} );
