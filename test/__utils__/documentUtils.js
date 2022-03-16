module.exports.DocumentUtils = class DocumentUtils {
  static resetDocument () {
    document.body.innerHTML = '';
  }

  static insertTemplate( template ) {
    document.body.innerHTML += template;
  }

  static getNode( selector ) {
    return document.querySelector( selector );
  }

  static getNodes( selector ) {
    return document.querySelectorAll( selector );
  }
};
