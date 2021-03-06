const {
  MultipleSelectField,
  SingleSelectField,
  TextField
} = require( './../virtualNodes' );

const { parseNodeAttrs } = require( './../service/parseNodeAttrs' );
const  { FormFieldTypeError } = require( '../error/FormFieldTypeError' );

const { FORM_FIELD_TYPES } = require( './../enum/formFieldTypes.js' );
const { FIELD_ATTRS } = require( './../enum/fieldAttrs.js' );

module.exports.VirtualFormFactory = class VirtualFormFactory {

  static createVirtualForm( $formNode ) {
    const $formFields = $formNode.querySelectorAll(  '[data-field-name]' );

    const virtualFields = {};

    for( const $field of $formFields ) {
      const { name, virtualField } = VirtualFormFactory.getVirtualField( $field );

      virtualFields[ name ] = virtualField;
    }

    return virtualFields;
  }

  static getVirtualField( $field ) {
    const { 'data-field-name': name, 'data-field-type': type } = parseNodeAttrs( $field, FIELD_ATTRS );
    const virtualField = VirtualFormFactory.createVirtualField( $field, name, type );

    return {
      name,
      virtualField,
    };
  }

  static createVirtualField( $field, name, type ) {
    if( type === FORM_FIELD_TYPES.TEXT ) {
      return new TextField( $field, name );
    } else if( type === FORM_FIELD_TYPES.SINGLE_SELECT ) {
      return new SingleSelectField( $field, name );
    }  else if( type === FORM_FIELD_TYPES.MULTIPLE_SELECT ) {
      return new MultipleSelectField( $field, name );
    } else {
      throw new FormFieldTypeError( $field, name, type );
    }
  }
};
