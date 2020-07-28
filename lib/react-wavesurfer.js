(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("wavesurfer.js"), require("react-measure"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "wavesurfer", "react-measure"], factory);
	else if(typeof exports === 'object')
		exports["Wavesurfer"] = factory(require("react"), require("wavesurfer.js"), require("react-measure"));
	else
		root["Wavesurfer"] = factory(root["React"], root["WaveSurfer"], root["Measure"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _deepAssign = __webpack_require__(11);

	var _deepAssign2 = _interopRequireDefault(_deepAssign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WaveSurfer = __webpack_require__(13);
	var Measure = __webpack_require__(14).default;

	var EVENTS = ['audioprocess', 'error', 'finish', 'loading', 'mouseup', 'pause', 'play', 'ready', 'scroll', 'seek', 'zoom'];

	/**
	 * @description Capitalise the first letter of a string
	 */
	function capitaliseFirstLetter(string) {
	  return string.split('-').map(function (part) {
	    return part.charAt(0).toUpperCase() + part.slice(1);
	  }).join('');
	}

	/**
	 * @description Throws an error if the prop is defined and not an integer or not positive
	 */
	function positiveIntegerProptype(props, propName, componentName) {
	  var n = props[propName];
	  if (n !== undefined && (typeof n !== 'number' || n !== parseInt(n, 10) || n < 0)) {
	    return new Error('Invalid ' + propName + ' supplied to ' + componentName + ',\n      expected a positive integer');
	  }

	  return null;
	}

	var Wavesurfer = function (_Component) {
	  _inherits(Wavesurfer, _Component);

	  function Wavesurfer(props) {
	    _classCallCheck(this, Wavesurfer);

	    var _this = _possibleConstructorReturn(this, (Wavesurfer.__proto__ || Object.getPrototypeOf(Wavesurfer)).call(this, props));

	    _this.state = {
	      isReady: false
	    };

	    if ((typeof WaveSurfer === 'undefined' ? 'undefined' : _typeof(WaveSurfer)) === undefined) {
	      throw new Error('WaveSurfer is undefined!');
	    }

	    _this._wavesurfer = Object.create(WaveSurfer);
	    _this._loadMediaElt = _this._loadMediaElt.bind(_this);
	    _this._loadAudio = _this._loadAudio.bind(_this);
	    _this._seekTo = _this._seekTo.bind(_this);

	    _this._handleResize = function () {
	      if (_this.state.isReady) {
	        _this._wavesurfer.refresh();
	      }
	    };
	    return _this;
	  }

	  _createClass(Wavesurfer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var options = (0, _deepAssign2.default)({}, this.props.options, {
	        container: this.wavesurferEl
	      });

	      // media element loading is only supported by MediaElement backend
	      if (this.props.mediaElt) {
	        options.backend = 'MediaElement';
	      }

	      this._wavesurfer.init(options);

	      // file was loaded, wave was drawn
	      this._wavesurfer.on('ready', function () {
	        _this2.setState({
	          isReady: true,
	          pos: _this2.props.pos
	        });

	        // set initial position
	        if (_this2.props.pos) {
	          _this2._seekTo(_this2.props.pos);
	        }

	        // set initial volume
	        if (_this2.props.volume != null) {
	          _this2._wavesurfer.setVolume(_this2.props.volume);
	        }

	        // set initial playing state
	        if (_this2.props.playing) {
	          _this2.wavesurfer.play();
	        }

	        // set initial zoom
	        if (_this2.props.zoom) {
	          _this2._wavesurfer.zoom(_this2.props.zoom);
	        }
	      });

	      this._wavesurfer.on('audioprocess', function (pos) {
	        _this2.setState({
	          pos: pos
	        });
	        _this2.props.onPosChange({
	          wavesurfer: _this2._wavesurfer,
	          originalArgs: [pos]
	        });
	      });

	      // `audioprocess` is not fired when seeking, so we have to plug into the
	      // `seek` event and calculate the equivalent in seconds (seek event
	      // receives a position float 0-1) – See the README.md for explanation why we
	      // need this
	      this._wavesurfer.on('seek', function (pos) {
	        var formattedPos = _this2._posToSec(pos);
	        _this2.setState({
	          formattedPos: formattedPos
	        });
	        _this2.props.onPosChange({
	          wavesurfer: _this2._wavesurfer,
	          originalArgs: [formattedPos]
	        });
	      });

	      // hook up events to callback handlers passed in as props
	      EVENTS.forEach(function (e) {
	        var propCallback = _this2.props['on' + capitaliseFirstLetter(e)];
	        var wavesurfer = _this2._wavesurfer;
	        if (propCallback) {
	          _this2._wavesurfer.on(e, function () {
	            for (var _len = arguments.length, originalArgs = Array(_len), _key = 0; _key < _len; _key++) {
	              originalArgs[_key] = arguments[_key];
	            }

	            propCallback({
	              wavesurfer: wavesurfer,
	              originalArgs: originalArgs
	            });
	          });
	        }
	      });

	      // if audioFile prop, load file
	      if (this.props.audioFile) {
	        this._loadAudio(this.props.audioFile, this.props.audioPeaks);
	      }

	      // if mediaElt prop, load media Element
	      if (this.props.mediaElt) {
	        this._loadMediaElt(this.props.mediaElt, this.props.audioPeaks);
	      }
	    }

	    // update wavesurfer rendering manually

	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // update audioFile
	      if (this.props.audioFile !== nextProps.audioFile) {
	        this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
	      }

	      // update mediaElt
	      if (this.props.mediaElt !== nextProps.mediaElt) {
	        this._loadMediaElt(nextProps.mediaElt, nextProps.audioPeaks);
	      }

	      // update peaks
	      if (this.props.audioPeaks !== nextProps.audioPeaks) {
	        if (nextProps.mediaElt) {
	          this._loadMediaElt(nextProps.mediaElt, nextProps.audioPeaks);
	        } else {
	          this._loadAudio(nextProps.audioFile, nextProps.audioPeaks);
	        }
	      }

	      // update position
	      if (nextProps.pos && this.state.isReady && nextProps.pos !== this.props.pos && nextProps.pos !== this.state.pos) {
	        this._seekTo(nextProps.pos);
	      }

	      // update playing state
	      if (this.props.playing !== nextProps.playing) {
	        if (nextProps.playing) {
	          this._wavesurfer.play();
	        } else {
	          this._wavesurfer.pause();
	        }
	      }

	      // update volume
	      if (this.props.volume !== nextProps.volume) {
	        this._wavesurfer.setVolume(nextProps.volume);
	      }

	      // update volume
	      if (this.props.zoom !== nextProps.zoom) {
	        this._wavesurfer.zoom(nextProps.zoom);
	      }

	      // update audioRate
	      if (this.props.options.audioRate !== nextProps.options.audioRate) {
	        this._wavesurfer.setPlaybackRate(nextProps.options.audioRate);
	      }

	      if (nextProps.options.waveColor !== this.props.options.waveColor) {
	        this._wavesurfer.setWaveColor(nextProps.options.waveColor);
	      }

	      if (nextProps.options.progressColor !== this.props.options.progressColor) {
	        this._wavesurfer.setProgressColor(nextProps.options.progressColor);
	      }

	      if (nextProps.options.cursorColor !== this.props.options.cursorColor) {
	        this._wavesurfer.setCursorColor(nextProps.options.cursorColor);
	      }

	      if (nextProps.options.height !== this.props.options.height) {
	        this._wavesurfer.setHeight(nextProps.options.height);
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate() {
	      return false;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      var _this3 = this;

	      // remove listeners
	      EVENTS.forEach(function (e) {
	        _this3._wavesurfer.un(e);
	      });

	      // destroy wavesurfer instance
	      this._wavesurfer.destroy();
	    }

	    // receives seconds and transforms this to the position as a float 0-1

	  }, {
	    key: '_secToPos',
	    value: function _secToPos(sec) {
	      return 1 / this._wavesurfer.getDuration() * sec;
	    }

	    // receives position as a float 0-1 and transforms this to seconds

	  }, {
	    key: '_posToSec',
	    value: function _posToSec(pos) {
	      return pos * this._wavesurfer.getDuration();
	    }

	    // pos is in seconds, the 0-1 proportional position we calculate here …

	  }, {
	    key: '_seekTo',
	    value: function _seekTo(sec) {
	      var pos = this._secToPos(sec);
	      if (this.props.options.autoCenter) {
	        this._wavesurfer.seekAndCenter(pos);
	      } else {
	        this._wavesurfer.seekTo(pos);
	      }
	    }

	    // load a media element selector or HTML element
	    // if selector, get the HTML element for it
	    // and pass to _loadAudio

	  }, {
	    key: '_loadMediaElt',
	    value: function _loadMediaElt(selectorOrElt, audioPeaks) {
	      if (selectorOrElt instanceof window.HTMLElement) {
	        this._loadAudio(selectorOrElt, audioPeaks);
	      } else {
	        if (!window.document.querySelector(selectorOrElt)) {
	          throw new Error('Media Element not found!');
	        }

	        this._loadAudio(window.document.querySelector(selectorOrElt), audioPeaks);
	      }
	    }

	    // pass audio data to wavesurfer

	  }, {
	    key: '_loadAudio',
	    value: function _loadAudio(audioFileOrElt, audioPeaks) {
	      if (audioFileOrElt instanceof window.HTMLElement) {
	        // media element
	        this._wavesurfer.loadMediaElement(audioFileOrElt, audioPeaks);
	      } else if (typeof audioFileOrElt === 'string') {
	        // bog-standard string is handled by load method and ajax call
	        this._wavesurfer.load(audioFileOrElt, audioPeaks);
	      } else if (audioFileOrElt instanceof window.Blob || audioFileOrElt instanceof window.File) {
	        // blob or file is loaded with loadBlob method
	        this._wavesurfer.loadBlob(audioFileOrElt, audioPeaks);
	      } else {
	        throw new Error('Wavesurfer._loadAudio expects prop audioFile\n        to be either HTMLElement, string or file/blob');
	      }
	    }
	  }, {
	    key: '_measureIfResponsive',
	    value: function _measureIfResponsive(children) {
	      if (this.props.responsive) {
	        return _react2.default.createElement(
	          Measure,
	          { client: true, onResize: this._handleResize },
	          function (_ref) {
	            var measureRef = _ref.measureRef;
	            return _react2.default.createElement(
	              'div',
	              { ref: measureRef },
	              children
	            );
	          }
	        );
	      }

	      return children;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var childrenWithProps = this.props.children ? _react2.default.Children.map(this.props.children, function (child) {
	        return _react2.default.cloneElement(child, {
	          wavesurfer: _this4._wavesurfer,
	          isReady: _this4.state.isReady
	        });
	      }) : false;

	      return this._measureIfResponsive(_react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('div', { ref: function ref(c) {
	            _this4.wavesurferEl = c;
	          } }),
	        childrenWithProps
	      ));
	    }
	  }]);

	  return Wavesurfer;
	}(_react.Component);

	Wavesurfer.propTypes = {
	  playing: _propTypes2.default.bool,
	  pos: _propTypes2.default.number,
	  audioFile: function audioFile(props, propName, componentName) {
	    var prop = props[propName];
	    if (prop && typeof prop !== 'string' && !(prop instanceof window.Blob) && !(prop instanceof window.File)) {
	      return new Error('Invalid ' + propName + ' supplied to ' + componentName + '\n        expected either string or file/blob');
	    }

	    return null;
	  },

	  mediaElt: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(window.HTMLElement)]),
	  audioPeaks: _propTypes2.default.array,
	  volume: _propTypes2.default.number,
	  zoom: _propTypes2.default.number,
	  responsive: _propTypes2.default.bool,
	  onPosChange: _propTypes2.default.func,
	  children: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.array]),
	  options: _propTypes2.default.shape({
	    audioRate: _propTypes2.default.number,
	    backend: _propTypes2.default.oneOf(['WebAudio', 'MediaElement']),
	    barWidth: function barWidth(props, propName, componentName) {
	      var prop = props[propName];
	      if (prop !== undefined && typeof prop !== 'number') {
	        return new Error('Invalid ' + propName + ' supplied to ' + componentName + '\n          expected either undefined or number');
	      }

	      return null;
	    },

	    cursorColor: _propTypes2.default.string,
	    cursorWidth: positiveIntegerProptype,
	    dragSelection: _propTypes2.default.bool,
	    fillParent: _propTypes2.default.bool,
	    height: positiveIntegerProptype,
	    hideScrollbar: _propTypes2.default.bool,
	    interact: _propTypes2.default.bool,
	    loopSelection: _propTypes2.default.bool,
	    mediaControls: _propTypes2.default.bool,
	    minPxPerSec: positiveIntegerProptype,
	    normalize: _propTypes2.default.bool,
	    pixelRatio: _propTypes2.default.number,
	    progressColor: _propTypes2.default.string,
	    scrollParent: _propTypes2.default.bool,
	    skipLength: _propTypes2.default.number,
	    waveColor: _propTypes2.default.string,
	    autoCenter: _propTypes2.default.bool
	  })
	};

	Wavesurfer.defaultProps = {
	  playing: false,
	  pos: 0,
	  options: WaveSurfer.defaultParams,
	  responsive: true,
	  onPosChange: function onPosChange() {}
	};

	exports.default = Wavesurfer;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if ((undefined) !== 'production') {
	  var ReactIs = __webpack_require__(3);

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = __webpack_require__(6)(ReactIs.isElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(10)();
	}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	if ((undefined) === 'production') {
	  module.exports = __webpack_require__(4);
	} else {
	  module.exports = __webpack_require__(5);
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/** @license React v16.13.1
	 * react-is.production.min.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var b = "function" === typeof Symbol && Symbol.for,
	    c = b ? Symbol.for("react.element") : 60103,
	    d = b ? Symbol.for("react.portal") : 60106,
	    e = b ? Symbol.for("react.fragment") : 60107,
	    f = b ? Symbol.for("react.strict_mode") : 60108,
	    g = b ? Symbol.for("react.profiler") : 60114,
	    h = b ? Symbol.for("react.provider") : 60109,
	    k = b ? Symbol.for("react.context") : 60110,
	    l = b ? Symbol.for("react.async_mode") : 60111,
	    m = b ? Symbol.for("react.concurrent_mode") : 60111,
	    n = b ? Symbol.for("react.forward_ref") : 60112,
	    p = b ? Symbol.for("react.suspense") : 60113,
	    q = b ? Symbol.for("react.suspense_list") : 60120,
	    r = b ? Symbol.for("react.memo") : 60115,
	    t = b ? Symbol.for("react.lazy") : 60116,
	    v = b ? Symbol.for("react.block") : 60121,
	    w = b ? Symbol.for("react.fundamental") : 60117,
	    x = b ? Symbol.for("react.responder") : 60118,
	    y = b ? Symbol.for("react.scope") : 60119;
	function z(a) {
	  if ("object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a) {
	    var u = a.$$typeof;switch (u) {case c:
	        switch (a = a.type, a) {case l:case m:case e:case g:case f:case p:
	            return a;default:
	            switch (a = a && a.$$typeof, a) {case k:case n:case t:case r:case h:
	                return a;default:
	                return u;}}case d:
	        return u;}
	  }
	}function A(a) {
	  return z(a) === m;
	}exports.AsyncMode = l;exports.ConcurrentMode = m;exports.ContextConsumer = k;exports.ContextProvider = h;exports.Element = c;exports.ForwardRef = n;exports.Fragment = e;exports.Lazy = t;exports.Memo = r;exports.Portal = d;
	exports.Profiler = g;exports.StrictMode = f;exports.Suspense = p;exports.isAsyncMode = function (a) {
	  return A(a) || z(a) === l;
	};exports.isConcurrentMode = A;exports.isContextConsumer = function (a) {
	  return z(a) === k;
	};exports.isContextProvider = function (a) {
	  return z(a) === h;
	};exports.isElement = function (a) {
	  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === c;
	};exports.isForwardRef = function (a) {
	  return z(a) === n;
	};exports.isFragment = function (a) {
	  return z(a) === e;
	};exports.isLazy = function (a) {
	  return z(a) === t;
	};
	exports.isMemo = function (a) {
	  return z(a) === r;
	};exports.isPortal = function (a) {
	  return z(a) === d;
	};exports.isProfiler = function (a) {
	  return z(a) === g;
	};exports.isStrictMode = function (a) {
	  return z(a) === f;
	};exports.isSuspense = function (a) {
	  return z(a) === p;
	};
	exports.isValidElementType = function (a) {
	  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
	};exports.typeOf = z;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	/** @license React v16.13.1
	 * react-is.development.js
	 *
	 * Copyright (c) Facebook, Inc. and its affiliates.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if ((undefined) !== "production") {
	  (function () {
	    'use strict';

	    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	    // nor polyfill, then a plain number is used for performance.

	    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	    // (unstable) APIs that have been removed. Can we remove the symbols?

	    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
	    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	    function isValidElementType(type) {
	      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
	    }

	    function typeOf(object) {
	      if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null) {
	        var $$typeof = object.$$typeof;

	        switch ($$typeof) {
	          case REACT_ELEMENT_TYPE:
	            var type = object.type;

	            switch (type) {
	              case REACT_ASYNC_MODE_TYPE:
	              case REACT_CONCURRENT_MODE_TYPE:
	              case REACT_FRAGMENT_TYPE:
	              case REACT_PROFILER_TYPE:
	              case REACT_STRICT_MODE_TYPE:
	              case REACT_SUSPENSE_TYPE:
	                return type;

	              default:
	                var $$typeofType = type && type.$$typeof;

	                switch ($$typeofType) {
	                  case REACT_CONTEXT_TYPE:
	                  case REACT_FORWARD_REF_TYPE:
	                  case REACT_LAZY_TYPE:
	                  case REACT_MEMO_TYPE:
	                  case REACT_PROVIDER_TYPE:
	                    return $$typeofType;

	                  default:
	                    return $$typeof;
	                }

	            }

	          case REACT_PORTAL_TYPE:
	            return $$typeof;
	        }
	      }

	      return undefined;
	    } // AsyncMode is deprecated along with isAsyncMode

	    var AsyncMode = REACT_ASYNC_MODE_TYPE;
	    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	    var ContextConsumer = REACT_CONTEXT_TYPE;
	    var ContextProvider = REACT_PROVIDER_TYPE;
	    var Element = REACT_ELEMENT_TYPE;
	    var ForwardRef = REACT_FORWARD_REF_TYPE;
	    var Fragment = REACT_FRAGMENT_TYPE;
	    var Lazy = REACT_LAZY_TYPE;
	    var Memo = REACT_MEMO_TYPE;
	    var Portal = REACT_PORTAL_TYPE;
	    var Profiler = REACT_PROFILER_TYPE;
	    var StrictMode = REACT_STRICT_MODE_TYPE;
	    var Suspense = REACT_SUSPENSE_TYPE;
	    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	    function isAsyncMode(object) {
	      {
	        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

	          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	        }
	      }

	      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	    }
	    function isConcurrentMode(object) {
	      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	    }
	    function isContextConsumer(object) {
	      return typeOf(object) === REACT_CONTEXT_TYPE;
	    }
	    function isContextProvider(object) {
	      return typeOf(object) === REACT_PROVIDER_TYPE;
	    }
	    function isElement(object) {
	      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	    }
	    function isForwardRef(object) {
	      return typeOf(object) === REACT_FORWARD_REF_TYPE;
	    }
	    function isFragment(object) {
	      return typeOf(object) === REACT_FRAGMENT_TYPE;
	    }
	    function isLazy(object) {
	      return typeOf(object) === REACT_LAZY_TYPE;
	    }
	    function isMemo(object) {
	      return typeOf(object) === REACT_MEMO_TYPE;
	    }
	    function isPortal(object) {
	      return typeOf(object) === REACT_PORTAL_TYPE;
	    }
	    function isProfiler(object) {
	      return typeOf(object) === REACT_PROFILER_TYPE;
	    }
	    function isStrictMode(object) {
	      return typeOf(object) === REACT_STRICT_MODE_TYPE;
	    }
	    function isSuspense(object) {
	      return typeOf(object) === REACT_SUSPENSE_TYPE;
	    }

	    exports.AsyncMode = AsyncMode;
	    exports.ConcurrentMode = ConcurrentMode;
	    exports.ContextConsumer = ContextConsumer;
	    exports.ContextProvider = ContextProvider;
	    exports.Element = Element;
	    exports.ForwardRef = ForwardRef;
	    exports.Fragment = Fragment;
	    exports.Lazy = Lazy;
	    exports.Memo = Memo;
	    exports.Portal = Portal;
	    exports.Profiler = Profiler;
	    exports.StrictMode = StrictMode;
	    exports.Suspense = Suspense;
	    exports.isAsyncMode = isAsyncMode;
	    exports.isConcurrentMode = isConcurrentMode;
	    exports.isContextConsumer = isContextConsumer;
	    exports.isContextProvider = isContextProvider;
	    exports.isElement = isElement;
	    exports.isForwardRef = isForwardRef;
	    exports.isFragment = isFragment;
	    exports.isLazy = isLazy;
	    exports.isMemo = isMemo;
	    exports.isPortal = isPortal;
	    exports.isProfiler = isProfiler;
	    exports.isStrictMode = isStrictMode;
	    exports.isSuspense = isSuspense;
	    exports.isValidElementType = isValidElementType;
	    exports.typeOf = typeOf;
	  })();
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var ReactIs = __webpack_require__(3);
	var assign = __webpack_require__(7);

	var ReactPropTypesSecret = __webpack_require__(8);
	var checkPropTypes = __webpack_require__(9);

	var has = Function.call.bind(Object.prototype.hasOwnProperty);
	var printWarning = function printWarning() {};

	if ((undefined) !== 'production') {
	  printWarning = function printWarning(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	function emptyFunctionThatReturnsNull() {
	  return null;
	}

	module.exports = function (isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    elementType: createElementTypeTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    if ((undefined) !== 'production') {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	          err.name = 'Invariant Violation';
	          throw err;
	        } else if ((undefined) !== 'production' && typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (!manualPropTypeCallCache[cacheKey] &&
	          // Avoid spamming the console because they are often not actionable except for lib authors
	          manualPropTypeWarningCount < 3) {
	            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!ReactIs.isValidElementType(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      if ((undefined) !== 'production') {
	        if (arguments.length > 1) {
	          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
	        } else {
	          printWarning('Invalid argument supplied to oneOf, expected an array.');
	        }
	      }
	      return emptyFunctionThatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
	        var type = getPreciseType(value);
	        if (type === 'symbol') {
	          return String(value);
	        }
	        return value;
	      });
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (has(propValue, key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      (undefined) !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
	      return emptyFunctionThatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
	        return emptyFunctionThatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = assign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // falsy value can't be a Symbol
	    if (!propValue) {
	      return false;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes;
	  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	'use strict';
	/* eslint-disable no-unused-vars */

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var printWarning = function printWarning() {};

	if ((undefined) !== 'production') {
	  var ReactPropTypesSecret = __webpack_require__(8);
	  var loggedTypeFailures = {};
	  var has = Function.call.bind(Object.prototype.hasOwnProperty);

	  printWarning = function printWarning(text) {
	    var message = 'Warning: ' + text;
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  if ((undefined) !== 'production') {
	    for (var typeSpecName in typeSpecs) {
	      if (has(typeSpecs, typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          if (typeof typeSpecs[typeSpecName] !== 'function') {
	            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + _typeof(typeSpecs[typeSpecName]) + '`.');
	            err.name = 'Invariant Violation';
	            throw err;
	          }
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
	        } catch (ex) {
	          error = ex;
	        }
	        if (error && !(error instanceof Error)) {
	          printWarning((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + (typeof error === 'undefined' ? 'undefined' : _typeof(error)) + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
	        }
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          printWarning('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
	        }
	      }
	    }
	  }
	}

	/**
	 * Resets warning cache when testing.
	 *
	 * @private
	 */
	checkPropTypes.resetWarningCache = function () {
	  if ((undefined) !== 'production') {
	    loggedTypeFailures = {};
	  }
	};

	module.exports = checkPropTypes;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(8);

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	module.exports = function () {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var isObj = __webpack_require__(12);
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Sources cannot be null or undefined');
		}

		return Object(val);
	}

	function assignKey(to, from, key) {
		var val = from[key];

		if (val === undefined || val === null) {
			return;
		}

		if (hasOwnProperty.call(to, key)) {
			if (to[key] === undefined || to[key] === null) {
				throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
			}
		}

		if (!hasOwnProperty.call(to, key) || !isObj(val)) {
			to[key] = val;
		} else {
			to[key] = assign(Object(to[key]), from[key]);
		}
	}

	function assign(to, from) {
		if (to === from) {
			return to;
		}

		from = Object(from);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				assignKey(to, from, key);
			}
		}

		if (Object.getOwnPropertySymbols) {
			var symbols = Object.getOwnPropertySymbols(from);

			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					assignKey(to, from, symbols[i]);
				}
			}
		}

		return to;
	}

	module.exports = function deepAssign(target) {
		target = toObject(target);

		for (var s = 1; s < arguments.length; s++) {
			assign(target, arguments[s]);
		}

		return target;
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (x) {
		var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);
		return x !== null && (type === 'object' || type === 'function');
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ })
/******/ ])
});
;