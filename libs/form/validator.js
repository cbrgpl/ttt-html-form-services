module.exports.Validator = class {
  constructor( getFn, params, message = null ) {
    this.fn = getFn( params );
    this.params = params;
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

  getResultObject( isSuccess ) {
    const result = {
      error: !isSuccess,
    };

    if( !isSuccess && this.isMessage() ) {
      result.message = this.message( this.params );
    }

    return result;
  }

  isMessage() {
    return this.message !== null;
  }

};
