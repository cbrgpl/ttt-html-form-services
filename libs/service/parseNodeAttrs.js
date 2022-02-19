module.exports.parseNodeAttrs = ( $node, arrayOfAttrs ) => {
  const result = {};

  for( const attr of arrayOfAttrs ) {
    const attrValue = $node.getAttribute( attr );

    if( attrValue !== null ){
      result[ attr ] = attrValue;
    }
  }

  return result;
};
