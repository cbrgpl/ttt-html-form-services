module.exports.propIterationWithCallback = ( object, callback, sequenceOfKeys = [] ) => {
  const result = {};

  for( const prop in object ) {
    const sequenceOfKeysClone = JSON.parse( JSON.stringify( sequenceOfKeys ) );
    sequenceOfKeysClone.push( prop );

    callback( sequenceOfKeysClone );
  }

  return result;
};
