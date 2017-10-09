'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelTypes = require('babel-types');

/* eslint-disable flowtype/no-weak-types */

exports.default = (classNameExpression, styleNameExpression) => {
  return (0, _babelTypes.binaryExpression)('+', (0, _babelTypes.conditionalExpression)(classNameExpression, (0, _babelTypes.binaryExpression)('+', classNameExpression, (0, _babelTypes.stringLiteral)(' ')), (0, _babelTypes.stringLiteral)('')), styleNameExpression);
};
//# sourceMappingURL=conditionalClassMerge.js.map