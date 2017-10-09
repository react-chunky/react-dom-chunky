'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

var _conditionalClassMerge = require('./conditionalClassMerge');

var _conditionalClassMerge2 = _interopRequireDefault(_conditionalClassMerge);

var _getClassName = require('./getClassName');

var _getClassName2 = _interopRequireDefault(_getClassName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Updates the className value of a JSX element using a provided styleName attribute.
 */
exports.default = (path, styleModuleImportMap, styleNameAttribute, options) => {
  const classNameAttribute = path.node.openingElement.attributes.find(attribute => {
    return typeof attribute.name !== 'undefined' && attribute.name.name === 'className';
  });

  const resolvedStyleName = (0, _getClassName2.default)(styleNameAttribute.value.value, styleModuleImportMap, options);

  if (classNameAttribute) {
    if ((0, _babelTypes.isStringLiteral)(classNameAttribute.value)) {
      classNameAttribute.value.value += ' ' + resolvedStyleName;
    } else if ((0, _babelTypes.isJSXExpressionContainer)(classNameAttribute.value)) {
      classNameAttribute.value.expression = (0, _conditionalClassMerge2.default)(classNameAttribute.value.expression, (0, _babelTypes.stringLiteral)(resolvedStyleName));
    } else {
      throw new Error('Unexpected attribute value.');
    }

    path.node.openingElement.attributes.splice(path.node.openingElement.attributes.indexOf(styleNameAttribute), 1);
  } else {
    styleNameAttribute.name.name = 'className';
    styleNameAttribute.value.value = resolvedStyleName;
  }
};
//# sourceMappingURL=resolveStringLiteral.js.map