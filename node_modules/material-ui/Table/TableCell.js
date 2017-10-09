'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _ref;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _withStyles = require('../styles/withStyles');

var _withStyles2 = _interopRequireDefault(_withStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Node = require('react').babelPluginFlowReactPropTypes_proptype_Node || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_ElementType = require('react').babelPluginFlowReactPropTypes_proptype_ElementType || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Context = {
  table: require('prop-types').object.isRequired
};

var babelPluginFlowReactPropTypes_proptype_Padding = require('prop-types').oneOf(['default', 'checkbox', 'dense', 'none']);

var babelPluginFlowReactPropTypes_proptype_Props = {
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node),
  classes: require('prop-types').object,
  className: require('prop-types').string,
  component: typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType),
  numeric: require('prop-types').bool,
  padding: require('prop-types').oneOf(['default', 'checkbox', 'dense', 'none'])
};
var styles = exports.styles = function styles(theme) {
  return {
    root: {
      borderBottom: '1px solid ' + theme.palette.text.lightDivider,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textAlign: 'left'
    },
    numeric: {
      textAlign: 'right',
      flexDirection: 'row-reverse' // can be dynamically inherited at runtime by contents
    },
    head: {
      whiteSpace: 'pre',
      fontWeight: theme.typography.fontWeightMedium,
      position: 'relative' // Workaround for Tooltip positioning issue.
    },
    padding: {
      padding: '0 ' + theme.spacing.unit * 7 + 'px 0 ' + theme.spacing.unit * 3 + 'px',
      '&:last-child': {
        paddingRight: theme.spacing.unit * 3
      }
    },
    dense: {
      paddingRight: theme.spacing.unit * 3
    },
    checkbox: {
      paddingLeft: 12,
      paddingRight: 12
    },
    footer: {
      borderBottom: 0
    }
  };
};

function TableCell(props, context) {
  var _classNames;

  var classes = props.classes,
      classNameProp = props.className,
      children = props.children,
      numeric = props.numeric,
      padding = props.padding,
      component = props.component,
      other = (0, _objectWithoutProperties3.default)(props, ['classes', 'className', 'children', 'numeric', 'padding', 'component']);
  var table = context.table;

  var Component = void 0;
  if (component) {
    Component = component;
  } else {
    Component = table && table.head ? 'th' : 'td';
  }
  var className = (0, _classnames2.default)(classes.root, (_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.numeric, numeric), (0, _defineProperty3.default)(_classNames, classes.dense, padding === 'dense'), (0, _defineProperty3.default)(_classNames, classes.checkbox, padding === 'checkbox'), (0, _defineProperty3.default)(_classNames, classes.padding, padding !== 'none'), (0, _defineProperty3.default)(_classNames, classes.head, table && table.head), (0, _defineProperty3.default)(_classNames, classes.footer, table && table.footer), _classNames), classNameProp);

  return _react2.default.createElement(
    Component,
    (0, _extends3.default)({ className: className }, other),
    children
  );
}

TableCell.propTypes = process.env.NODE_ENV !== "production" ? (_ref = {
  classes: require('prop-types').object.isRequired,
  padding: require('prop-types').oneOf(['default', 'checkbox', 'dense', 'none']).isRequired,
  numeric: require('prop-types').bool.isRequired,
  children: typeof babelPluginFlowReactPropTypes_proptype_Node === 'function' ? babelPluginFlowReactPropTypes_proptype_Node : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_Node)
}, (0, _defineProperty3.default)(_ref, 'classes', require('prop-types').object), (0, _defineProperty3.default)(_ref, 'className', require('prop-types').string), (0, _defineProperty3.default)(_ref, 'component', typeof babelPluginFlowReactPropTypes_proptype_ElementType === 'function' ? babelPluginFlowReactPropTypes_proptype_ElementType : require('prop-types').shape(babelPluginFlowReactPropTypes_proptype_ElementType)), (0, _defineProperty3.default)(_ref, 'numeric', require('prop-types').bool), (0, _defineProperty3.default)(_ref, 'padding', require('prop-types').oneOf(['default', 'checkbox', 'dense', 'none'])), _ref) : {};
TableCell.defaultProps = {
  numeric: false,
  padding: 'default'
};

TableCell.contextTypes = {
  table: _propTypes2.default.object.isRequired
};

exports.default = (0, _withStyles2.default)(styles, { name: 'MuiTableCell' })(TableCell);