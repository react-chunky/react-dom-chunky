'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_ElementType = require('react').babelPluginFlowReactPropTypes_proptype_ElementType || require('prop-types').any;

var styles = exports.styles = {
  root: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  rootMedia: {
    width: '100%'
  }
};

var mediaComponents = ['video', 'audio', 'picture', 'iframe', 'img'];

var babelPluginFlowReactPropTypes_proptype_Props = {
  classes: require('prop-types').object,
  className: require('prop-types').string,
  image: require('prop-types').string,
  src: require('prop-types').string,
  style: require('prop-types').object,
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType)
};


function CardMedia(props) {
  var _classNames;

  var classes = props.classes,
      className = props.className,
      image = props.image,
      style = props.style,
      src = props.src,
      ComponentProp = props.component,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'image', 'style', 'src', 'component']);


  process.env.NODE_ENV !== "production" ? (0, _warning2.default)(image || src, 'Material-UI: either `image` or `src` property must be specified.') : void 0;

  var isMediaComponent = mediaComponents.indexOf(ComponentProp) !== -1;
  var composedStyle = !isMediaComponent && image ? (0, _extends3.default)({ backgroundImage: 'url(' + image + ')' }, style) : style;
  var composedClassName = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.root, !isMediaComponent), (0, _defineProperty3.default)(_classNames, classes.rootMedia, isMediaComponent), _classNames), className);

  return _react2.default.createElement(ComponentProp, (0, _extends3.default)({
    className: composedClassName,
    style: composedStyle,
    src: isMediaComponent ? image || src : undefined
  }, other));
}

CardMedia.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType.isRequired ? babelPluginFlowReactPropTypes_proptype_ElementType.isRequired : babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType).isRequired
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'image', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'src', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'style', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'component', typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType)), _ref) : {};
CardMedia.defaultProps = {
  component: 'div'
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiCardMedia' })(CardMedia);