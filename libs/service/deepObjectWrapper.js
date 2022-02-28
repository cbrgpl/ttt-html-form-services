module.exports.DeepObjectWrapper = class {
  constructor( object ) {
    this.object = object;
  }

  value() {
    return this.object;
  }

  set( sequenceOfKeys, val ) {
    let whereSet = this.object;

    for( let i = 0; i < sequenceOfKeys.length - 1; ++i ) {
      const key = sequenceOfKeys[ i ];

      if( !whereSet[ key ] ) {
        whereSet[ key ] = {};
      }

      whereSet = whereSet[ key ];
    }

    const lastKey = sequenceOfKeys[ sequenceOfKeys.length - 1 ];
    whereSet[ lastKey ] = val;
  }

  get( sequenceOfKeys ) {
    let result = this.object;

    for( const key of sequenceOfKeys ) {
      result = result[ key ];
    }

    return result;
  }
};
