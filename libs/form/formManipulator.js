module.exports.FormManipulator = class {
  constructor( virtualForm ) {
    this.virtualForm = virtualForm;
  }

  clearForm() {
    for( const field in this.virtualForm ) {
      const virtualElem = this.virtualForm[ field ];

      virtualElem.clearField();
    }
  }

  getForm() {
    const result = {};

    for( const field in this.virtualForm ) {
      const virtualElem = this.virtualForm[ field ];

      result[ field ] = virtualElem.parseValue();
    }

    return result;
  }
};
