/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/demos/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Demo = __webpack_require__(30);
	
	var _Demo2 = _interopRequireDefault(_Demo);
	
	_react2['default'].render(_react2['default'].createElement(_Demo2['default'], null), document.querySelector('#content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	* 常量
	*/
	'use strict';
	
	exports.__esModule = true;
	var CREATE = 'CREATE';
	exports.CREATE = CREATE;
	var REMOVE = 'REMOVE';
	exports.REMOVE = REMOVE;
	var REORDER = 'REORDER';
	exports.REORDER = REORDER;
	var REPLACE = 'REPLACE';
	exports.REPLACE = REPLACE;
	var INSERT = 'INSERT';
	exports.INSERT = INSERT;
	var PROPS = 'PROPS';
	exports.PROPS = PROPS;
	var WIDGET = 'WIDGET';
	exports.WIDGET = WIDGET;
	var DID_MOUNT = 'DID_MOUNT';
	exports.DID_MOUNT = DID_MOUNT;
	var WILL_UNMOUNT = 'WILL_UNMOUNT';
	exports.WILL_UNMOUNT = WILL_UNMOUNT;
	var COMPONENT_ID = 'data-esnextid';
	exports.COMPONENT_ID = COMPONENT_ID;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _constant = __webpack_require__(1);
	
	//types.js
	var isType = function isType(type) {
		return function (obj) {
			return obj != null && Object.prototype.toString.call(obj) === '[object ' + type + ']';
		};
	};
	exports.isType = isType;
	var isObj = isType('Object');
	exports.isObj = isObj;
	var isStr = isType('String');
	exports.isStr = isStr;
	var isNum = isType('Number');
	exports.isNum = isNum;
	var isFn = isType('Function');
	exports.isFn = isFn;
	var isBln = isType('Boolean');
	exports.isBln = isBln;
	var isArr = Array.isArray || isType('Array');
	exports.isArr = isArr;
	var isThenable = function isThenable(obj) {
		return obj != null && isFn(obj.then);
	};
	
	exports.isThenable = isThenable;
	var pipe = function pipe(fn1, fn2) {
		return function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			fn1.apply(this, args);
			return fn2.apply(this, args);
		};
	};
	
	exports.pipe = pipe;
	var getUid = function getUid() {
		return Math.random().toString(36).substr(2);
	};
	
	exports.getUid = getUid;
	var $events = {};
	
	var $on = function $on(name, callback) {
		var events = $events[name] = $events[name] || [];
		events.push(callback);
	};
	
	exports.$on = $on;
	var $off = function $off(name, callback) {
		if (!isFn(callback)) {
			$events[name] = [];
			return;
		}
		var index = $events[name].indexOf(callback);
		if (index !== -1) {
			$events[name].splice(index, 1);
		}
	};
	
	exports.$off = $off;
	var $trigger = function $trigger(name) {
		for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
			args[_key2 - 1] = arguments[_key2];
		}
	
		if (isArr($events[name])) {
			$events[name].forEach(function (callback) {
				return callback.apply(undefined, args);
			});
		}
	};
	
	exports.$trigger = $trigger;
	var appendChild = function appendChild(node, child) {
		node.appendChild(child);
	};
	
	exports.appendChild = appendChild;
	var removeChild = function removeChild(node, child) {
		$trigger(_constant.WILL_UNMOUNT, child);
		node.removeChild(child);
	};
	
	exports.removeChild = removeChild;
	var replaceChild = function replaceChild(node, newChild, child) {
		$trigger(_constant.WILL_MOUNT, child, newChild);
		if (newChild.nodeType === 3 && child.nodeType === 3) {
			return child.replaceData(0, child.length, newChild.textContent);
		}
		node.replaceChild(newChild, child);
	};
	
	exports.replaceChild = replaceChild;
	var setProp = function setProp(elem, key, value) {
		switch (true) {
			case key === 'style':
				setStyle(elem, value);
				break;
			case /^on/.test(key):
				setEvent(elem, key.toLowerCase(), value);
				break;
			case key in elem:
				elem[key] = value;
				break;
			default:
				if (key !== 'key') {
					elem.setAttribute(key, value);
				}
		}
	};
	
	exports.setProp = setProp;
	var setProps = function setProps(elem, props) {
		Object.keys(props).forEach(function (key) {
			return setProp(elem, key, props[key]);
		});
	};
	
	exports.setProps = setProps;
	var isEventKey = function isEventKey(key) {
		return (/^on/.test(key)
		);
	};
	
	exports.isEventKey = isEventKey;
	var removeProp = function removeProp(elem, key) {
		var oldValue = elem[key];
		switch (true) {
			case isEventKey(key):
				removeEvent(elem, key);
				break;
			case isFn(oldValue):
				elem[key] = null;
				break;
			case isStr(oldValue):
				elem[key] = '';
				break;
			case isBln(oldValue):
				elem[key] = false;
				break;
			default:
				try {
					elem[key] = undefined;
					delete elem[key];
				} catch (e) {
					//pass
				}
		}
	};
	
	exports.removeProp = removeProp;
	var setEvent = function setEvent(elem, key, value) {
		key = key.toLowerCase();
		elem[key] = value;
		if (key === 'onchange' && !elem.oninput) {
			elem.oninput = value;
			value.oninput = true;
		}
	};
	
	exports.setEvent = setEvent;
	var removeEvent = function removeEvent(elem, key) {
		key = key.toLowerCase();
		if (isFn(elem[key]) && elem[key].oninput) {
			elem.oninput = null;
		}
		elem[key] = null;
	};
	
	exports.removeEvent = removeEvent;
	var removeStyle = function removeStyle(elem, style) {
		if (!isObj(style)) {
			return;
		}
		Object.keys(style).forEach(function (key) {
			return elem.style[key] = '';
		});
	};
	
	exports.removeStyle = removeStyle;
	var setStyle = function setStyle(elem, style) {
		if (!isObj(style)) {
			return;
		}
		Object.keys(style).forEach(function (key) {
			setStyleValue(elem.style, key, style[key]);
		});
	};
	
	exports.setStyle = setStyle;
	var isUnitlessNumber = {
		animationIterationCount: true,
		boxFlex: true,
		boxFlexGroup: true,
		boxOrdinalGroup: true,
		columnCount: true,
		flex: true,
		flexGrow: true,
		flexPositive: true,
		flexShrink: true,
		flexNegative: true,
		flexOrder: true,
		fontWeight: true,
		lineClamp: true,
		lineHeight: true,
		opacity: true,
		order: true,
		orphans: true,
		tabSize: true,
		widows: true,
		zIndex: true,
		zoom: true,
	
		// SVG-related properties
		fillOpacity: true,
		stopOpacity: true,
		strokeDashoffset: true,
		strokeOpacity: true,
		strokeWidth: true
	};
	
	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	var prefixKey = function prefixKey(prefix, key) {
		return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	};
	
	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	
	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function (prop) {
		return prefixes.forEach(function (prefix) {
			return isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
		});
	});
	
	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	var setStyleValue = function setStyleValue(style, key, value) {
		if (RE_NUMBER.test(value) && !isUnitlessNumber[key]) {
			style[key] = value + 'px';
		} else {
			style[key] = value;
		}
	};
	exports.setStyleValue = setStyleValue;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _util = __webpack_require__(2);
	
	var _constant = __webpack_require__(1);
	
	var widgetElems = [];
	
	/**
	* 根据 tagName props attrs 创建 real-dom
	*/
	var create = function create(_x) {
		var _again = true;
	
		_function: while (_again) {
			var vnode = _x;
			_again = false;
	
			if (vnode == null) {
				return document.createElement('noscript');
			}
	
			if (_util.isStr(vnode) || _util.isNum(vnode)) {
				return document.createTextNode(vnode);
			}
	
			if (vnode.type === _constant.WIDGET) {
				return vnode.init();
			}
	
			var _vnode = vnode;
			var tagName = _vnode.tagName;
			var props = _vnode.props;
			var children = _vnode.children;
	
			if (_util.isFn(tagName)) {
				props.children = children;
				vnode = tagName(props);
				_x = vnode;
				_again = true;
				_vnode = tagName = props = children = undefined;
				continue _function;
			}
	
			if (tagName == null) {
				debugger;
			}
			var elem = document.createElement(tagName);
			if (_util.isObj(props)) {
				_util.setProps(elem, props);
			}
			if (children && children.length > 0) {
				children.forEach(function (child) {
					return addChild(elem, child);
				});
			}
			return elem;
		}
	};
	
	exports['default'] = create;
	var addChild = function addChild(elem, child) {
		if (_util.isArr(child)) {
			return child.forEach(function (item) {
				return addChild(elem, item);
			});
		}
		var childNode = create(child);
		if (childNode !== undefined) {
			_util.appendChild(elem, childNode);
		}
	};
	exports.addChild = addChild;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _createElement = __webpack_require__(11);
	
	var _createElement2 = _interopRequireDefault(_createElement);
	
	var _render = __webpack_require__(12);
	
	var _component = __webpack_require__(6);
	
	var check = function check() {
	  return check;
	};
	check.isRequired = check;
	var PropTypes = {
	  "array": check,
	  "bool": check,
	  "func": check,
	  "number": check,
	  "object": check,
	  "string": check,
	  "any": check,
	  "arrayOf": check,
	  "element": check,
	  "instanceOf": check,
	  "node": check,
	  "objectOf": check,
	  "oneOf": check,
	  "oneOfType": check,
	  "shape": check
	};
	
	var Children = {
	  only: function only(children) {
	    return children;
	  }
	};
	
	exports['default'] = {
	  Component: _component.Component,
	  createClass: _component.createClass,
	  Children: Children,
	  render: _render.render,
	  findDOMNode: _component.findDOMNode,
	  PropTypes: PropTypes,
	  unmount: _render.unmount,
	  unmountComponentAtNode: _render.unmount,
	  createElement: _createElement2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	
	// [stiffness, damping]
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = {
	  noWobble: [170, 26], // the default
	  gentle: [120, 14],
	  wobbly: [180, 12],
	  stiff: [210, 20]
	};
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _util = __webpack_require__(2);
	
	var _constant = __webpack_require__(1);
	
	var _create = __webpack_require__(3);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _diff = __webpack_require__(7);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	var _patch = __webpack_require__(8);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var components = {};
	var removeComponent = function removeComponent(id) {
		var component = components[id];
		if (!component) {
			return;
		}
		if (_util.isArr(component)) {
			return component.forEach(function (item) {
				item.componentWillUnmount();
				delete components[item.$id];
			});
		}
		component.componentWillUnmount();
		delete components[id];
	};
	var checkUnmount = function checkUnmount(node, newNode) {
		if (!node || node.nodeType === 3) {
			return;
		}
		var id = node.getAttribute(_constant.COMPONENT_ID);
		if (!id) {
			return;
		}
		var component = components[id];
		if (!component) {
			return;
		}
		// if newNode is existed, it must be calling replaceChild function
		if (!newNode) {
			removeComponent(id);
		}
		var componentNodes = node.querySelectorAll('[' + _constant.COMPONENT_ID + ']');
		Array.prototype.slice.call(componentNodes).forEach(function (child) {
			return checkUnmount(child);
		});
	};
	
	_util.$on(_constant.WILL_UNMOUNT, checkUnmount);
	
	var Widget = (function () {
		function Widget(Component, props) {
			_classCallCheck(this, Widget);
	
			this.type = _constant.WIDGET;
			this.Component = Component;
			this.props = props;
		}
	
		Widget.prototype.init = function init() {
			var props = this.props;
			var Component = this.Component;
	
			props = _extends({}, props, Component.defaultProps);
			var component = this.component = new Component(props);
			var id = component.$id = _util.getUid();
			var vnode = component.vnode = component.render();
			var node = component.node = _create2['default'](vnode);
			var attr = node.getAttribute(_constant.COMPONENT_ID);
			if (!attr) {
				node.setAttribute(_constant.COMPONENT_ID, attr = id);
			}
			if (components[attr]) {
				if (!_util.isArr(components[attr])) {
					components[attr] = [components[attr]];
				}
				components[attr].splice(0, 0, component);
			} else {
				components[attr] = component;
			}
			component.componentWillMount();
			_util.$on(_constant.DID_MOUNT, function () {
				return component.componentDidMount();
			});
			return node;
		};
	
		Widget.prototype.update = function update(previous) {
			var component = this.component = previous.component;
			var props = this.props;
			var $cache = component.$cache;
	
			$cache.keepSilent = true;
			component.componentWillReceiveProps(props);
			$cache.keepSilent = false;
			var shouldUpdate = component.shouldComponentUpdate(props, component.state);
			if (!shouldUpdate) {
				return;
			}
			$cache.props = props;
			$cache.state = component.state;
			component.forceUpdate();
		};
	
		return Widget;
	})();
	
	exports.Widget = Widget;
	
	var Component = (function () {
		function Component(props) {
			_classCallCheck(this, Component);
	
			this.$cache = {
				keepSilent: false
			};
			this.props = props;
			this.state = {};
			this.refs = {};
		}
	
		Component.prototype.getDOMNode = function getDOMNode() {
			return this.node;
		};
	
		Component.prototype.setState = function setState(nextState, callback) {
			var _this = this;
	
			var $cache = this.$cache;
			var state = this.state;
			var props = this.props;
	
			if (_util.isFn(nextState)) {
				nextState = nextState(state, props);
			}
			this.state = _extends({}, this.state, nextState);
			var forceUpdate = function forceUpdate() {
				_this.forceUpdate();
				if (_util.isFn(callback)) {
					callback();
				}
			};
			if (!$cache.keepSilent) {
				if (_util.isFn(requestAnimationFrame)) {
					requestAnimationFrame(forceUpdate);
				} else {
					setTimeout(forceUpdate, 0);
				}
			}
		};
	
		Component.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
			return true;
		};
	
		Component.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {};
	
		Component.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {};
	
		Component.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {};
	
		Component.prototype.componentWillMount = function componentWillMount() {};
	
		Component.prototype.componentDidMount = function componentDidMount() {};
	
		Component.prototype.componentWillUnmount = function componentWillUnmount() {};
	
		Component.prototype.forceUpdate = function forceUpdate(callback) {
			var vnode = this.vnode;
			var node = this.node;
			var $cache = this.$cache;
			var state = this.state;
			var props = this.props;
			var id = this.$id;
	
			var nextProps = _util.isObj($cache.props) ? $cache.props : props;
			var nextState = _util.isObj($cache.state) ? $cache.state : state;
			$cache.props = $cache.state = null;
			this.componentWillUpdate(nextProps, nextState);
			this.props = nextProps;
			this.state = nextState;
			var nextVnode = this.render();
			var patches = _diff2['default'](vnode, nextVnode);
			var newNode = _patch2['default'](node, patches);
			//update this.node, if component render new element
			if (newNode !== node) {
				newNode.setAttribute(_constant.COMPONENT_ID, id);
				this.node = newNode;
			}
			_util.$trigger(_constant.DID_MOUNT);
			_util.$off(_constant.DID_MOUNT);
			this.vnode = nextVnode;
			this.componentDidUpdate(props, state);
			if (_util.isFn(callback)) {
				callback();
			}
		};
	
		return Component;
	})();
	
	exports.Component = Component;
	var findDOMNode = function findDOMNode(node) {
		return node.nodeName ? node : node.getDOMNode();
	};
	
	exports.findDOMNode = findDOMNode;
	var combineMixin = function combineMixin(proto, mixin) {
		for (var key in mixin) {
			if (!mixin.hasOwnProperty(key)) {
				continue;
			}
			var _source = mixin[key];
			var currentValue = proto[key];
			if (currentValue === undefined) {
				proto[key] = _source;
			} else if (_util.isFn(currentValue) && _util.isFn(_source)) {
				proto[key] = _util.pipe(currentValue, _source);
			}
		}
	};
	var combineMixins = function combineMixins(proto, mixins) {
		mixins.forEach(function (mixin) {
			return combineMixin(proto, mixin);
		});
	};
	
	var bindContext = function bindContext(obj, source) {
		for (var key in source) {
			if (source.hasOwnProperty(key) && _util.isFn(source[key])) {
				obj[key] = source[key].bind(obj);
			}
		}
	};
	
	var createClass = function createClass(options) {
		var mixins = options.mixins || [];
		var defaultProps = _util.isFn(options.getDefaultProps) ? options.getDefaultProps() : null;
		var mixinsForDefaultProps = undefined;
		if (_util.isObj(defaultProps)) {
			mixinsForDefaultProps = {
				componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
					for (var key in defaultProps) {
						if (!(key in nextProps)) {
							nextProps[key] = defaultProps[key];
						}
					}
				}
			};
			mixins = mixins.concat(mixinsForDefaultProps);
		}
		var Klass = (function (_Component) {
			_inherits(Klass, _Component);
	
			function Klass(props) {
				_classCallCheck(this, Klass);
	
				_Component.call(this, props);
				bindContext(this, Klass.prototype);
				if (_util.isObj(defaultProps)) {
					mixinsForDefaultProps.componentWillReceiveProps(props);
				}
				if (_util.isFn(this.getInitialState)) {
					this.state = this.getInitialState();
				}
			}
	
			return Klass;
		})(Component);
		combineMixins(Klass.prototype, mixins.concat(options));
		if (_util.isObj(options.statics)) {
			for (var key in options.statics) {
				if (options.statics.hasOwnProperty(key)) {
					Klass[key] = options.statics[key];
				}
			}
		}
		return Klass;
	};
	exports.createClass = createClass;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _util = __webpack_require__(2);
	
	var _constant = __webpack_require__(1);
	
	/**
	* diff vnode and newVnode
	*/
	var diff = function diff(vnode, newVnode) {
		var children = undefined;
		var type = undefined;
		switch (true) {
			case vnode === newVnode:
				return;
			case newVnode == null:
				type = _constant.REMOVE;
				break;
			case vnode == null:
				type = _constant.CREATE;
				break;
			case vnode.tagName !== newVnode.tagName:
				type = _constant.REPLACE;
				break;
			case vnode.type === _constant.WIDGET && newVnode.type === _constant.WIDGET:
				type = _constant.WIDGET;
				break;
			case vnode.type === _constant.WIDGET || newVnode.type === _constant.WIDGET:
				type = _constant.REPLACE;
				break;
			case !!(vnode.props || newVnode.props):
				if (newVnode.props && newVnode.props.key && newVnode.props.key !== vnode.props.key) {
					type = _constant.REPLACE;
				} else {
					type = _constant.PROPS;
				}
				break;
			case (_util.isStr(vnode) || _util.isNum(vnode) || _util.isStr(newVnode) || _util.isNum(newVnode)) && vnode != newVnode:
				type = _constant.REPLACE;
				break;
		}
		if (!type || type === _constant.PROPS) {
			children = diffChildren(vnode.children, newVnode.children);
			if (children) {
				return _extends({ type: type, vnode: vnode, newVnode: newVnode }, children);
			}
		}
	
		return type ? { type: type, vnode: vnode, newVnode: newVnode } : null;
	};
	
	exports['default'] = diff;
	
	var diffChildren = function diffChildren(children, newChildren) {
		children = getFlatChildren([], children);
		newChildren = getFlatChildren([], newChildren);
		var childrenType = undefined;
		var childrenPatches = undefined;
		if (children.length === 0) {
			if (newChildren.length > 0) {
				childrenType = _constant.CREATE;
			}
		} else if (newChildren.length === 0) {
			childrenType = _constant.REMOVE;
		} else {
			childrenPatches = [];
			var maxLen = Math.max(children.length, newChildren.length);
			for (var i = 0; i < maxLen; i++) {
				childrenPatches.push(diff(children[i], newChildren[i]));
			}
			childrenType = _constant.REPLACE;
			return { childrenType: childrenType, childrenPatches: childrenPatches };
		}
	
		if (childrenType) {
			return { childrenType: childrenType, newChildren: newChildren };
		}
	};
	
	var getFlatChildren = function getFlatChildren(store, children) {
		if (_util.isArr(children)) {
			children.forEach(function (item) {
				if (_util.isArr(item)) {
					return getFlatChildren(store, item);
				}
				store.push(item);
			});
		}
		return store;
	};
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _util = __webpack_require__(2);
	
	var _constant = __webpack_require__(1);
	
	var _create = __webpack_require__(3);
	
	var _create2 = _interopRequireDefault(_create);
	
	/**
	* patch dom
	*/
	var patch = function patch(node, patches, parent) {
		if (!patches) {
			return node;
		}
		var vnode = patches.vnode;
		var newVnode = patches.newVnode;
		var type = patches.type;
		var childrenType = patches.childrenType;
	
		var newNode = undefined;
		parent = node ? node.parentNode : parent;
		switch (type) {
			case _constant.CREATE:
				newNode = _create2['default'](newVnode);
				_util.appendChild(parent, newNode);
				break;
			case _constant.REMOVE:
				_util.removeChild(parent, node);
				break;
			case _constant.REPLACE:
				newNode = _create2['default'](newVnode);
				_util.replaceChild(parent, newNode, node);
				break;
			case _constant.PROPS:
				applyProps(node, vnode.props, newVnode.props);
				break;
			case _constant.WIDGET:
				newVnode.update(vnode, node);
				break;
		}
	
		switch (childrenType) {
			case _constant.REMOVE:
				node.innerHTML = '';
				break;
			case _constant.CREATE:
				patches.newChildren.forEach(function (child) {
					return _create.addChild(node, child);
				});
				break;
			case _constant.REPLACE:
				var children = Array.prototype.slice.call(node.childNodes);
				patches.childrenPatches.forEach(function (childPatches, index) {
					patch(children[index], childPatches, node);
				});
				break;
		}
	
		return newNode || node;
	};
	
	exports['default'] = patch;
	
	var applyProps = function applyProps(node, props, newProps) {
		if (props == null && _util.isObj(newProps)) {
			return _util.setProps(node, newProps);
		} else if (newProps == null && _util.isObj(props)) {
			return Object.keys(props).each(function (key) {
				return removeProp(node, key);
			});
		}
		Object.keys(_extends({}, props, newProps)).forEach(function (key) {
			var value = props[key];
			var newValue = newProps[key];
			switch (true) {
				case key === 'style':
					patchStyle(node, props.style, newProps.style);
					break;
				case _util.isEventKey(key):
					if (!_util.isFn(newValue)) {
						_util.removeEvent(node, key);
					} else if (newValue !== value) {
						_util.setEvent(node, key, newValue);
					}
					break;
				case key in node:
					if (newValue === undefined) {
						removeProp(node, key);
					} else if (newValue !== value) {
						node[key] = newValue;
					}
					break;
				default:
					if (newValue === undefined) {
						node.removeAttribute(key);
					} else if (key !== 'key') {
						node.setAttribute(key, newValue);
					}
			}
		});
	};
	
	var patchStyle = function patchStyle(node, style, newStyle) {
		var domStyle = node.style;
		Object.keys(_extends({}, style, newStyle)).forEach(function (key) {
			var value = newStyle[key];
			if (value === undefined) {
				domStyle[key] = '';
			} else if (value !== style[key]) {
				_util.setStyleValue(domStyle, key, value);
			}
		});
	};
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = spring;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _presets = __webpack_require__(5);
	
	var _presets2 = _interopRequireDefault(_presets);
	
	function spring(val) {
	  var config = arguments.length <= 1 || arguments[1] === undefined ? _presets2['default'].noWobble : arguments[1];
	
	  return { val: val, config: config };
	}
	
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _component = __webpack_require__(6);
	
	var _util = __webpack_require__(2);
	
	var createElement = function createElement(tagName, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}
	
		var isComponent = _util.isFn(tagName) && _util.isFn(tagName.prototype.render);
		children = children.filter(function (child) {
			return !_util.isBln(child);
		});
		if (isComponent) {
			return new _component.Widget(tagName, _extends({}, props, {
				children: children.length === 1 ? children[0] : children
			}));
		}
		return {
			tagName: tagName,
			props: props,
			children: children
		};
	};
	
	exports['default'] = createElement;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _create = __webpack_require__(3);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _diff = __webpack_require__(7);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	var _patch = __webpack_require__(8);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _util = __webpack_require__(2);
	
	var _constant = __webpack_require__(1);
	
	var store = {};
	var render = function render(vnode, container, callback) {
		var id = container.getAttribute(_constant.COMPONENT_ID);
		if (id) {
			var patches = _diff2['default'](store[id], vnode);
			_patch2['default'](container.firstChild, patches);
			store[id] = vnode;
		} else {
			var node = _create2['default'](vnode);
			container.setAttribute(_constant.COMPONENT_ID, id = _util.getUid());
			store[id] = vnode;
			container.innerHTML = '';
			_util.appendChild(container, node);
			_util.$trigger(_constant.DID_MOUNT);
			_util.$off(_constant.DID_MOUNT);
		}
		if (_util.isFn(callback)) {
			callback();
		}
	};
	
	exports.render = render;
	var unmount = function unmount(container) {
		var id = container.getAttribute(_constant.COMPONENT_ID);
		if (store.hasOwnProperty(id)) {
			var firstChild = container.firstChild;
			if (firstChild) {
				_util.removeChild(container, firstChild);
			}
			delete store[id];
		}
	};
	exports.unmount = unmount;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = configAnimation;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _performanceNow = __webpack_require__(10);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(25);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	function configAnimation() {
	  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _config$timeStep = config.timeStep;
	  var timeStep = _config$timeStep === undefined ? 1 / 60 * 1000 : _config$timeStep;
	  var _config$timeScale = config.timeScale;
	  var timeScale = _config$timeScale === undefined ? 1 : _config$timeScale;
	  var _config$maxSteps = config.maxSteps;
	  var maxSteps = _config$maxSteps === undefined ? 10 : _config$maxSteps;
	  var _config$raf = config.raf;
	  var raf = _config$raf === undefined ? _raf2['default'] : _config$raf;
	  var _config$now = config.now;
	  var now = _config$now === undefined ? _performanceNow2['default'] : _config$now;
	
	  var animRunning = [];
	  var running = false;
	  var prevTime = 0;
	  var accumulatedTime = 0;
	
	  function loop() {
	    var currentTime = now();
	    var frameTime = currentTime - prevTime; // delta
	
	    prevTime = currentTime;
	    accumulatedTime += frameTime * timeScale;
	
	    if (accumulatedTime > timeStep * maxSteps) {
	      accumulatedTime = 0;
	    }
	
	    var frameNumber = Math.ceil(accumulatedTime / timeStep);
	    for (var i = 0; i < animRunning.length; i++) {
	      var _animRunning$i = animRunning[i];
	      var active = _animRunning$i.active;
	      var animationStep = _animRunning$i.animationStep;
	      var prevPrevState = _animRunning$i.prevState;
	      var prevNextState = animRunning[i].nextState;
	
	      if (!active) {
	        continue;
	      }
	
	      // Seems like because the TS sets destVals as enterVals for the first
	      // tick, we might render that value twice. We render it once, currValue is
	      // enterVal and destVal is enterVal. The next tick is faster than 16ms,
	      // so accumulatedTime (which would be about -16ms from the previous tick)
	      // is negative (-16ms + any number less than 16ms < 0). So we just render
	      // part ways towards the nextState, but that's enterVal still. We render
	      // say 75% between currValue (=== enterVal) and destValue (=== enterVal).
	      // So we render the same value a second time.
	      // The solution below is to recalculate the destination state even when
	      // you're moving partially towards it.
	      if (accumulatedTime <= 0) {
	        animRunning[i].nextState = animationStep(timeStep / 1000, prevPrevState);
	      } else {
	        for (var j = 0; j < frameNumber; j++) {
	          animRunning[i].nextState = animationStep(timeStep / 1000, prevNextState);
	          var _ref = [prevNextState, animRunning[i].nextState];
	          animRunning[i].prevState = _ref[0];
	          prevNextState = _ref[1];
	        }
	      }
	    }
	
	    accumulatedTime = accumulatedTime - frameNumber * timeStep;
	
	    // Render and filter in one iteration.
	    var alpha = 1 + accumulatedTime / timeStep;
	    for (var i = 0; i < animRunning.length; i++) {
	      var _animRunning$i2 = animRunning[i];
	      var animationRender = _animRunning$i2.animationRender;
	      var nextState = _animRunning$i2.nextState;
	      var prevState = _animRunning$i2.prevState;
	
	      // Might mutate animRunning........
	      animationRender(alpha, nextState, prevState);
	    }
	
	    animRunning = animRunning.filter(function (_ref2) {
	      var active = _ref2.active;
	      return active;
	    });
	
	    if (animRunning.length === 0) {
	      running = false;
	    } else {
	      raf(loop);
	    }
	  }
	
	  function start() {
	    if (!running) {
	      running = true;
	      prevTime = now();
	      accumulatedTime = 0;
	      raf(loop);
	    }
	  }
	
	  return function startAnimation(state, animationStep, animationRender) {
	    for (var i = 0; i < animRunning.length; i++) {
	      var val = animRunning[i];
	      if (val.animationStep === animationStep) {
	        val.active = true;
	        val.prevState = state;
	        start();
	        return val.stop;
	      }
	    }
	
	    var newAnim = {
	      animationStep: animationStep,
	      animationRender: animationRender,
	      prevState: state,
	      nextState: state,
	      active: true
	    };
	
	    newAnim.stop = function () {
	      return newAnim.active = false;
	    };
	    animRunning.push(newAnim);
	
	    start();
	
	    return newAnim.stop;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = components;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _noVelocity = __webpack_require__(18);
	
	var _noVelocity2 = _interopRequireDefault(_noVelocity);
	
	var _hasReachedStyle = __webpack_require__(16);
	
	var _hasReachedStyle2 = _interopRequireDefault(_hasReachedStyle);
	
	var _mergeDiff = __webpack_require__(17);
	
	var _mergeDiff2 = _interopRequireDefault(_mergeDiff);
	
	var _animationLoop = __webpack_require__(13);
	
	var _animationLoop2 = _interopRequireDefault(_animationLoop);
	
	var _zero = __webpack_require__(24);
	
	var _zero2 = _interopRequireDefault(_zero);
	
	var _updateTree = __webpack_require__(23);
	
	var _deprecatedSprings2 = __webpack_require__(15);
	
	var _deprecatedSprings3 = _interopRequireDefault(_deprecatedSprings2);
	
	var _stripStyle = __webpack_require__(22);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var startAnimation = _animationLoop2['default']();
	
	function mapObject(f, obj) {
	  var ret = {};
	  for (var key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = f(obj[key], key);
	  }
	  return ret;
	}
	
	function everyObj(f, obj) {
	  for (var key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    if (!f(obj[key], key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function components(React) {
	  var PropTypes = React.PropTypes;
	
	  var Motion = React.createClass({
	    displayName: 'Motion',
	
	    propTypes: {
	      // TOOD: warn against putting a config in here
	      defaultValue: function defaultValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('Spring\'s `defaultValue` has been changed to `defaultStyle`. ' + 'Its format received a few (easy to update!) changes as well.');
	        }
	      },
	      endValue: function endValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('Spring\'s `endValue` has been changed to `style`. Its format ' + 'received a few (easy to update!) changes as well.');
	        }
	      },
	      defaultStyle: PropTypes.object,
	      style: PropTypes.object.isRequired,
	      children: PropTypes.func.isRequired
	    },
	
	    getInitialState: function getInitialState() {
	      var _props = this.props;
	      var defaultStyle = _props.defaultStyle;
	      var style = _props.style;
	
	      var currentStyle = defaultStyle || style;
	      return {
	        currentStyle: currentStyle,
	        currentVelocity: mapObject(_zero2['default'], currentStyle)
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyle = state.currentStyle;
	      var currentVelocity = state.currentVelocity;
	      var style = this.props.style;
	
	      var newCurrentStyle = _updateTree.updateCurrentStyle(timestep, currentStyle, currentVelocity, style);
	      var newCurrentVelocity = _updateTree.updateCurrentVelocity(timestep, currentStyle, currentVelocity, style);
	
	      // TOOD: this isn't necessary anymore. It was used only against endValue func
	      if (_noVelocity2['default'](currentVelocity, newCurrentStyle) && _noVelocity2['default'](newCurrentVelocity, newCurrentStyle)) {
	        // check explanation in `Motion.animationRender`
	        this.stopAnimation(); // Nasty side effects....
	      }
	
	      return {
	        currentStyle: newCurrentStyle,
	        currentVelocity: newCurrentVelocity
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      // Is smart enough to not start it twice
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // `this.hasUnmounted` might be true in the following condition:
	      // user does some checks in `style` and calls an owner handler
	      // owner sets state in the callback, triggering a re-render
	      // unmounts Motion
	      if (!this.hasUnmounted) {
	        this.setState({
	          currentStyle: _updateTree.interpolateValue(alpha, nextState.currentStyle, prevState.currentStyle),
	          currentVelocity: nextState.currentVelocity
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = _stripStyle2['default'](this.state.currentStyle);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var StaggeredMotion = React.createClass({
	    displayName: 'StaggeredMotion',
	
	    propTypes: {
	      defaultStyle: function defaultStyle(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `StaggeredMotion`\'s `defaultStyles`.');
	        }
	      },
	      style: function style(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `StaggeredMotion`\'s `styles`.');
	        }
	      },
	      // TOOD: warn against putting configs in here
	      defaultStyles: PropTypes.arrayOf(PropTypes.object),
	      styles: PropTypes.func.isRequired,
	      children: PropTypes.func.isRequired
	    },
	
	    getInitialState: function getInitialState() {
	      var _props2 = this.props;
	      var styles = _props2.styles;
	      var defaultStyles = _props2.defaultStyles;
	
	      var currentStyles = defaultStyles ? defaultStyles : styles();
	      return {
	        currentStyles: currentStyles,
	        currentVelocities: currentStyles.map(function (s) {
	          return mapObject(_zero2['default'], s);
	        })
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyles = state.currentStyles;
	      var currentVelocities = state.currentVelocities;
	
	      var styles = this.props.styles(currentStyles.map(_stripStyle2['default']));
	
	      var newCurrentStyles = currentStyles.map(function (currentStyle, i) {
	        return _updateTree.updateCurrentStyle(timestep, currentStyle, currentVelocities[i], styles[i]);
	      });
	      var newCurrentVelocities = currentStyles.map(function (currentStyle, i) {
	        return _updateTree.updateCurrentVelocity(timestep, currentStyle, currentVelocities[i], styles[i]);
	      });
	
	      // TODO: is this right?
	      if (currentVelocities.every(function (v, k) {
	        return _noVelocity2['default'](v, currentStyles[k]);
	      }) && newCurrentVelocities.every(function (v, k) {
	        return _noVelocity2['default'](v, newCurrentStyles[k]);
	      })) {
	        this.stopAnimation();
	      }
	
	      return {
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // See comment in Motion.
	      if (!this.hasUnmounted) {
	        var currentStyles = nextState.currentStyles.map(function (style, i) {
	          return _updateTree.interpolateValue(alpha, style, prevState.currentStyles[i]);
	        });
	        this.setState({
	          currentStyles: currentStyles,
	          currentVelocities: nextState.currentVelocities
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = this.state.currentStyles.map(_stripStyle2['default']);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var TransitionMotion = React.createClass({
	    displayName: 'TransitionMotion',
	
	    propTypes: {
	      defaultValue: function defaultValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('TransitionSpring\'s `defaultValue` has been changed to ' + '`defaultStyles`. Its format received a few (easy to update!) ' + 'changes as well.');
	        }
	      },
	      endValue: function endValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('TransitionSpring\'s `endValue` has been changed to `styles`. ' + 'Its format received a few (easy to update!) changes as well.');
	        }
	      },
	      defaultStyle: function defaultStyle(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `TransitionMotion`\'s `defaultStyles`.');
	        }
	      },
	      style: function style(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `TransitionMotion`\'s `styles`.');
	        }
	      },
	      // TOOD: warn against putting configs in here
	      defaultStyles: PropTypes.objectOf(PropTypes.any),
	      styles: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.any.isRequired)]).isRequired,
	      willLeave: PropTypes.oneOfType([PropTypes.func]),
	      // TOOD: warn against putting configs in here
	      willEnter: PropTypes.oneOfType([PropTypes.func]),
	      children: PropTypes.func.isRequired
	    },
	
	    getDefaultProps: function getDefaultProps() {
	      return {
	        willEnter: function willEnter(key, value) {
	          return value;
	        },
	        willLeave: function willLeave() {
	          return null;
	        }
	      };
	    },
	
	    getInitialState: function getInitialState() {
	      var _props3 = this.props;
	      var styles = _props3.styles;
	      var defaultStyles = _props3.defaultStyles;
	
	      var currentStyles = undefined;
	      if (defaultStyles == null) {
	        if (typeof styles === 'function') {
	          currentStyles = styles();
	        } else {
	          currentStyles = styles;
	        }
	      } else {
	        currentStyles = defaultStyles;
	      }
	      return {
	        currentStyles: currentStyles,
	        currentVelocities: mapObject(function (s) {
	          return mapObject(_zero2['default'], s);
	        }, currentStyles)
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyles = state.currentStyles;
	      var currentVelocities = state.currentVelocities;
	      var _props4 = this.props;
	      var styles = _props4.styles;
	      var willEnter = _props4.willEnter;
	      var willLeave = _props4.willLeave;
	
	      if (typeof styles === 'function') {
	        styles = styles(currentStyles);
	      }
	
	      // TODO: huh?
	      var mergedStyles = styles; // set mergedStyles to styles as the default
	      var hasNewKey = false;
	
	      mergedStyles = _mergeDiff2['default'](currentStyles, styles,
	      // TODO: stop allocating like crazy in this whole code path
	      function (key) {
	        var res = willLeave(key, currentStyles[key], styles, currentStyles, currentVelocities);
	        if (res == null) {
	          // For legacy reason. We won't allow returning null soon
	          // TODO: remove, after next release
	          return null;
	        }
	
	        if (_noVelocity2['default'](currentVelocities[key], currentStyles[key]) && _hasReachedStyle2['default'](currentStyles[key], res)) {
	          return null;
	        }
	        return res;
	      });
	
	      Object.keys(mergedStyles).filter(function (key) {
	        return !currentStyles.hasOwnProperty(key);
	      }).forEach(function (key) {
	        var _extends2, _extends3;
	
	        hasNewKey = true;
	        var enterStyle = willEnter(key, mergedStyles[key], styles, currentStyles, currentVelocities);
	
	        // We can mutate this here because mergeDiff returns a new Obj
	        mergedStyles[key] = enterStyle;
	
	        currentStyles = _extends({}, currentStyles, (_extends2 = {}, _extends2[key] = enterStyle, _extends2));
	        currentVelocities = _extends({}, currentVelocities, (_extends3 = {}, _extends3[key] = mapObject(_zero2['default'], enterStyle), _extends3));
	      });
	
	      var newCurrentStyles = mapObject(function (mergedStyle, key) {
	        return _updateTree.updateCurrentStyle(timestep, currentStyles[key], currentVelocities[key], mergedStyle);
	      }, mergedStyles);
	      var newCurrentVelocities = mapObject(function (mergedStyle, key) {
	        return _updateTree.updateCurrentVelocity(timestep, currentStyles[key], currentVelocities[key], mergedStyle);
	      }, mergedStyles);
	
	      if (!hasNewKey && everyObj(function (v, k) {
	        return _noVelocity2['default'](v, currentStyles[k]);
	      }, currentVelocities) && everyObj(function (v, k) {
	        return _noVelocity2['default'](v, newCurrentStyles[k]);
	      }, newCurrentVelocities)) {
	        // check explanation in `Motion.animationRender`
	        this.stopAnimation(); // Nasty side effects....
	      }
	
	      return {
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // See comment in Motion.
	      if (!this.hasUnmounted) {
	        var currentStyles = mapObject(function (style, key) {
	          return _updateTree.interpolateValue(alpha, style, prevState.currentStyles[key]);
	        }, nextState.currentStyles);
	        this.setState({
	          currentStyles: currentStyles,
	          currentVelocities: nextState.currentVelocities
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = mapObject(_stripStyle2['default'], this.state.currentStyles);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var _deprecatedSprings = _deprecatedSprings3['default'](React);
	
	  var Spring = _deprecatedSprings.Spring;
	  var TransitionSpring = _deprecatedSprings.TransitionSpring;
	
	  return { Spring: Spring, TransitionSpring: TransitionSpring, Motion: Motion, StaggeredMotion: StaggeredMotion, TransitionMotion: TransitionMotion };
	}
	
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = deprecatedSprings;
	var hasWarnedForSpring = {};
	var hasWarnedForTransitionSpring = {};
	
	function deprecatedSprings(React) {
	  var Spring = React.createClass({
	    displayName: 'Spring',
	
	    componentWillMount: function componentWillMount() {
	      if (false) {
	        var ownerName = this._reactInternalInstance._currentElement._owner && this._reactInternalInstance._currentElement._owner.getName();
	        if (!hasWarnedForSpring[ownerName]) {
	          hasWarnedForSpring[ownerName] = true;
	          console.error('Spring (used in %srender) has now been renamed to Motion. ' + 'Please see the release note for the upgrade path. Thank you!', ownerName ? ownerName + '\'s ' : 'React.');
	        }
	      }
	    },
	
	    render: function render() {
	      return null;
	    }
	  });
	
	  var TransitionSpring = React.createClass({
	    displayName: 'TransitionSpring',
	
	    componentWillMount: function componentWillMount() {
	      if (false) {
	        var ownerName = this._reactInternalInstance._currentElement._owner && this._reactInternalInstance._currentElement._owner.getName();
	        if (!hasWarnedForTransitionSpring[ownerName]) {
	          hasWarnedForTransitionSpring[ownerName] = true;
	          console.error('TransitionSpring (used in %srender) has now been renamed to ' + 'TransitionMotion. Please see the release note for the upgrade ' + 'path. Thank you!', ownerName ? ownerName + '\'s ' : 'React.');
	        }
	      }
	    },
	
	    render: function render() {
	      return null;
	    }
	  });
	
	  return { Spring: Spring, TransitionSpring: TransitionSpring };
	}
	
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = hasReachedStyle;
	
	function hasReachedStyle(currentStyle, style) {
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    var currentValue = currentStyle[key];
	    var destValue = style[key];
	    if (destValue == null || !destValue.config) {
	      // not a spring config
	      continue;
	    }
	    if (currentValue.config && currentValue.val !== destValue.val) {
	      return false;
	    }
	    if (!currentValue.config && currentValue !== destValue.val) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	
	
	// this function is allocation-less thanks to babel, which transforms the tail
	// calls into loops
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = mergeDiff;
	function mergeDiffArr(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
	  var _again = true;
	
	  _function: while (_again) {
	    var arrA = _x,
	        arrB = _x2,
	        collB = _x3,
	        indexA = _x4,
	        indexB = _x5,
	        onRemove = _x6,
	        accum = _x7;
	    endA = endB = keyA = keyB = fill = fill = undefined;
	    _again = false;
	
	    var endA = indexA === arrA.length;
	    var endB = indexB === arrB.length;
	    var keyA = arrA[indexA];
	    var keyB = arrB[indexB];
	    if (endA && endB) {
	      // returning null here, otherwise lint complains that we're not expecting
	      // a return value in subsequent calls. We know what we're doing.
	      return null;
	    }
	
	    if (endA) {
	      accum[keyB] = collB[keyB];
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA;
	      _x5 = indexB + 1;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      continue _function;
	    }
	
	    if (endB) {
	      var fill = onRemove(keyA);
	      if (fill != null) {
	        accum[keyA] = fill;
	      }
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      continue _function;
	    }
	
	    if (keyA === keyB) {
	      accum[keyA] = collB[keyA];
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB + 1;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      continue _function;
	    }
	
	    if (!collB.hasOwnProperty(keyA)) {
	      var fill = onRemove(keyA);
	      if (fill != null) {
	        accum[keyA] = fill;
	      }
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      continue _function;
	    }
	
	    _x = arrA;
	    _x2 = arrB;
	    _x3 = collB;
	    _x4 = indexA + 1;
	    _x5 = indexB;
	    _x6 = onRemove;
	    _x7 = accum;
	    _again = true;
	    continue _function;
	  }
	}
	
	function mergeDiff(a, b, onRemove) {
	  var ret = {};
	  // if anyone can make this work without allocating the arrays here, we'll
	  // give you a medal
	  mergeDiffArr(Object.keys(a), Object.keys(b), b, 0, 0, onRemove, ret);
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	
	// currentStyle keeps the info about whether a prop is configured as a spring
	// or if it's just a random prop that happens to be present on the style
	
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = noVelocity;
	
	function noVelocity(currentVelocity, currentStyle) {
	  for (var key in currentVelocity) {
	    if (!currentVelocity.hasOwnProperty(key)) {
	      continue;
	    }
	    if (currentStyle[key] != null && currentStyle[key].config && currentVelocity[key] !== 0) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _components2 = __webpack_require__(14);
	
	var _components3 = _interopRequireDefault(_components2);
	
	var _reorderKeys = __webpack_require__(20);
	
	var _reorderKeys2 = _interopRequireDefault(_reorderKeys);
	
	var _components = _components3['default'](_react2['default']);
	
	var Spring = _components.Spring;
	var TransitionSpring = _components.TransitionSpring;
	var Motion = _components.Motion;
	var StaggeredMotion = _components.StaggeredMotion;
	var TransitionMotion = _components.TransitionMotion;
	exports.Spring = Spring;
	exports.TransitionSpring = TransitionSpring;
	exports.Motion = Motion;
	exports.StaggeredMotion = StaggeredMotion;
	exports.TransitionMotion = TransitionMotion;
	
	var _spring2 = __webpack_require__(9);
	
	var _spring3 = _interopRequireDefault(_spring2);
	
	exports.spring = _spring3['default'];
	
	var _presets2 = __webpack_require__(5);
	
	var _presets3 = _interopRequireDefault(_presets2);
	
	exports.presets = _presets3['default'];
	var utils = {
	  reorderKeys: _reorderKeys2['default']
	};
	exports.utils = utils;

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = reorderKeys;
	
	function reorderKeys(obj, f) {
	  var newKeys = f(Object.keys(obj));
	  var ret = {};
	  for (var i = 0; i < newKeys.length; i++) {
	    var key = newKeys[i];
	    ret[key] = obj[key];
	  }
	
	  return ret;
	}
	
	module.exports = exports["default"];

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = stepper;
	
	var errorMargin = 0.0001;
	
	function stepper(frameRate, x, v, destX, k, b) {
	  // Spring stiffness, in kg / s^2
	
	  // for animations, destX is really spring length (spring at rest). initial
	  // position is considered as the stretched/compressed position of a spring
	  var Fspring = -k * (x - destX);
	
	  // Damping, in kg / s
	  var Fdamper = -b * v;
	
	  // usually we put mass here, but for animation purposes, specifying mass is a
	  // bit redundant. you could simply adjust k and b accordingly
	  // let a = (Fspring + Fdamper) / mass;
	  var a = Fspring + Fdamper;
	
	  var newV = v + a * frameRate;
	  var newX = x + newV * frameRate;
	
	  if (Math.abs(newV - v) < errorMargin && Math.abs(newX - x) < errorMargin) {
	    return [destX, 0];
	  }
	
	  return [newX, newV];
	}
	
	module.exports = exports["default"];

/***/ },
/* 22 */
/***/ function(module, exports) {

	
	// turn {x: {val: 1, config: [1, 2]}, y: 2} generated by
	// `{x: spring(1, [1, 2]), y: 2}` into {x: 1, y: 2}
	
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = stripStyle;
	
	function stripStyle(style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = style[key] == null || style[key].val == null ? style[key] : style[key].val;
	  }
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.interpolateValue = interpolateValue;
	exports.updateCurrentStyle = updateCurrentStyle;
	exports.updateCurrentVelocity = updateCurrentVelocity;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stepper = __webpack_require__(21);
	
	var _stepper2 = _interopRequireDefault(_stepper);
	
	var _spring = __webpack_require__(9);
	
	var _spring2 = _interopRequireDefault(_spring);
	
	// TODO: refactor common logic with updateCurrValue and updateCurrVelocity
	
	function interpolateValue(alpha, nextStyle, prevStyle) {
	  // might be used by a TransitionMotion, where prevStyle might not exist anymore
	  if (!prevStyle) {
	    return nextStyle;
	  }
	
	  var ret = {};
	  for (var key in nextStyle) {
	    if (!nextStyle.hasOwnProperty(key)) {
	      continue;
	    }
	
	    if (nextStyle[key] == null || !nextStyle[key].config) {
	      ret[key] = nextStyle[key];
	      // not a spring config, not something we want to interpolate
	      continue;
	    }
	    var prevValue = prevStyle[key].config ? prevStyle[key].val : prevStyle[key];
	    ret[key] = _spring2['default'](nextStyle[key].val * alpha + prevValue * (1 - alpha), nextStyle[key].config);
	  }
	
	  return ret;
	}
	
	// TODO: refactor common logic with updateCurrentVelocity
	
	function updateCurrentStyle(frameRate, currentStyle, currentVelocity, style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    if (style[key] == null || !style[key].config) {
	      ret[key] = style[key];
	      // not a spring config, not something we want to interpolate
	      continue;
	    }
	    var _style$key$config = style[key].config;
	    var k = _style$key$config[0];
	    var b = _style$key$config[1];
	
	    var val = _stepper2['default'](frameRate,
	    // might have been a non-springed prop that just became one
	    currentStyle[key].val == null ? currentStyle[key] : currentStyle[key].val, currentVelocity[key], style[key].val, k, b)[0];
	    ret[key] = _spring2['default'](val, style[key].config);
	  }
	  return ret;
	}
	
	function updateCurrentVelocity(frameRate, currentStyle, currentVelocity, style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    if (style[key] == null || !style[key].config) {
	      // not a spring config, not something we want to interpolate
	      ret[key] = 0;
	      continue;
	    }
	    var _style$key$config2 = style[key].config;
	    var k = _style$key$config2[0];
	    var b = _style$key$config2[1];
	
	    var val = _stepper2['default'](frameRate,
	    // might have been a non-springed prop that just became one
	    currentStyle[key].val == null ? currentStyle[key] : currentStyle[key].val, currentVelocity[key], style[key].val, k, b)[1];
	    ret[key] = val;
	  }
	  return ret;
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	
	// used by the tree-walking updates and springs. Avoids some allocations
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = zero;
	
	function zero() {
	  return 0;
	}
	
	module.exports = exports["default"];

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(10)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
	
	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(global, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 26 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isIterateeCall = __webpack_require__(28);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. If `end` is not specified it is
	 * set to `start` with `start` then set to `0`. If `end` is less than `start`
	 * a zero-length range is created unless a negative `step` is specified.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the new array of numbers.
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	function range(start, end, step) {
	  if (step && isIterateeCall(start, end, step)) {
	    end = step = undefined;
	  }
	  start = +start || 0;
	  step = step == null ? 1 : (+step || 0);
	
	  if (end == null) {
	    end = start;
	    start = 0;
	  } else {
	    end = +end || 0;
	  }
	  // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	  // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = start;
	    start += step;
	  }
	  return result;
	}
	
	module.exports = range;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _srcReactMotion = __webpack_require__(19);
	
	var _lodashRange = __webpack_require__(27);
	
	var _lodashRange2 = _interopRequireDefault(_lodashRange);
	
	var _srcPresets = __webpack_require__(5);
	
	var _srcPresets2 = _interopRequireDefault(_srcPresets);
	
	var Demo = _react2['default'].createClass({
	  displayName: 'Demo',
	
	  getInitialState: function getInitialState() {
	    return { x: 250, y: 300 };
	  },
	
	  componentDidMount: function componentDidMount() {
	    window.addEventListener('mousemove', this.handleMouseMove);
	    window.addEventListener('touchmove', this.handleTouchMove);
	  },
	
	  handleMouseMove: function handleMouseMove(_ref) {
	    var x = _ref.pageX;
	    var y = _ref.pageY;
	
	    this.setState({ x: x, y: y });
	  },
	
	  handleTouchMove: function handleTouchMove(_ref2) {
	    var touches = _ref2.touches;
	
	    this.handleMouseMove(touches[0]);
	  },
	
	  getStyles: function getStyles(prevStyles) {
	    var _this = this;
	
	    // `prevStyles` is the interpolated value of the last tick
	    var endValue = prevStyles.map(function (_, i) {
	      return i === 0 ? _this.state : {
	        x: _srcReactMotion.spring(prevStyles[i - 1].x, _srcPresets2['default'].gentle),
	        y: _srcReactMotion.spring(prevStyles[i - 1].y, _srcPresets2['default'].gentle)
	      };
	    });
	    return endValue;
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      _srcReactMotion.StaggeredMotion,
	      {
	        defaultStyles: _lodashRange2['default'](6).map(function () {
	          return { x: 0, y: 0 };
	        }),
	        styles: this.getStyles },
	      function (balls) {
	        return _react2['default'].createElement(
	          'div',
	          { className: 'demo1' },
	          balls.map(function (_ref3, i) {
	            var x = _ref3.x;
	            var y = _ref3.y;
	            return _react2['default'].createElement('div', {
	              key: i,
	              className: 'demo1-ball ball-' + i,
	              style: {
	                WebkitTransform: 'translate3d(' + (x - 25) + 'px, ' + (y - 25) + 'px, 0)',
	                transform: 'translate3d(' + (x - 25) + 'px, ' + (y - 25) + 'px, 0)',
	                zIndex: balls.length - i
	              } });
	          })
	        );
	      }
	    );
	  }
	});
	
	exports['default'] = Demo;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=all.js.map