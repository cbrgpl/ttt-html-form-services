module.exports.Validator = class {
  constructor( getFn, params, message = null ) {
    this.fn = getFn( params );
    this.message = this.getMessageCallback( message );
  }

  getMessageCallback( message ) {
    if( message === null ){
      return null;
    } else if ( typeof message === 'function' ) {
      return ( params ) => message( params );
    } else {
      return () => message;
    }
  }

  getValidationResult( value ) {
    const validateStatus = this.validate( value );

    return this.getResultObject( validateStatus );
  }

  validate( value ) {
    return this.fn( value );
  }

  getResultObject( success ) {
    const result = {
      error: !success,
    };

    if( !success && this.isMessage() ) {
      result.message = this.message();
    }

    return result;
  }

  isMessage() {
    return this.message !== null;
  }

};
