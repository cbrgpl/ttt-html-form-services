const { FORM_FIELD_TYPES } = require( './../../libs/enum/formFieldTypes.js' );

module.exports.iterateFormFieldTypes = ( callback ) => {
  for( const typeKey in FORM_FIELD_TYPES ) {
    const type = FORM_FIELD_TYPES[ typeKey ];

    callback( type );
  }
};
