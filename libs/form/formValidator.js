const { DeepObjectWrapper } = require( './../service/deepObjectWrapper' );
const { propIterationWithCallback } = require( './../service/propIterationWithCallback' );
const { Validator } = require( './validator' );

module.exports.FormValidator = class {
  constructor( validations ) {
    this.validations = this.createValidations( validations );
  }

  createValidations( validations ) {
    const preparedValidations = new DeepObjectWrapper( {} );
    const deepValidations = new DeepObjectWrapper( validations );

    const prepareValidations = ( sequenceOfKeys ) => {
      const subVal = deepValidations.get( sequenceOfKeys );

      if( subVal instanceof Validator ) {
        preparedValidations.set( sequenceOfKeys, subVal );
      } else if( typeof subVal === 'function' ){
        const validator = new Validator( () => subVal );
        preparedValidations.set( sequenceOfKeys, validator );
      } else {
        propIterationWithCallback( subVal, prepareValidations, sequenceOfKeys );
      }

    };

    propIterationWithCallback( deepValidations.value(), prepareValidations );

    return preparedValidations;
  }

  validate( data ) {
    const validationResult = new DeepObjectWrapper( {} );
    const deepData = new DeepObjectWrapper( data );

    const depthFirstValidate = ( sequenceOfKeys ) => {
      const validationSubObject = this.validations.get( sequenceOfKeys );
      const value = deepData.get( sequenceOfKeys );

      if( this.isObjectOfValidators( validationSubObject ) ) {
        const fieldValidation = this.validateFieldValue( value, validationSubObject );
        validationResult.set( sequenceOfKeys, fieldValidation );
      } else {
        propIterationWithCallback( validationSubObject, depthFirstValidate, sequenceOfKeys );
      }
    };

    propIterationWithCallback( this.validations.value(), depthFirstValidate );

    const validationErrorState = this.checkFormValidation( validationResult );
    validationResult.set( [ 'errorState' ], validationErrorState );

    return validationResult.value();
  }

  isObjectOfValidators( obj ) {
    for( const prop in obj ) {
      const propVal = obj[ prop ];
      if( propVal instanceof Validator || typeof propVal === 'function' ) {
        return true;
      }
    }

    return false;
  }

  validateFieldValue( value, validators ) {
    const result = {
      value,
      error: false,
      validators: {},
      messages: [],
      _valiationObject: true,
    };

    for( const validator in validators ) {
      const validationResult = validators[ validator ].getValidationResult( value );
      result.validators[ validator ] = validationResult;

      if( result.validators[ validator ].error ) {
        result.error = true;
      }
    }

    result.messages = this.getFieldMessages( result );
    return result;
  }

  getFieldMessages( validationResult ) {
    const messages = [];

    for( const validatorName in validationResult.validators ) {
      const validatorResult = validationResult.validators[ validatorName ];

      if( validatorResult.message ) {
        messages.push( validatorResult.message );
      }

    }

    return messages;
  }

  checkFormValidation( validationResult ) {
    let errorState = false;
    const depthFirstCheck = ( sequenceOfKeys ) => {
      const validationSubResult = validationResult.get( sequenceOfKeys );


      if( this.subResultIsFieldValidation( validationSubResult ) ) {
        if( validationSubResult.error ) {
          errorState = true;
        }
      } else {
        propIterationWithCallback( validationSubResult, depthFirstCheck, sequenceOfKeys );
      }
    };

    propIterationWithCallback( validationResult.value(), depthFirstCheck );

    return errorState;
  }

  subResultIsFieldValidation( object ) {
    return !!object._valiationObject;
  }
};
