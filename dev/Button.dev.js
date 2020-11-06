(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Button"] = factory();
	else
		root["Button"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@xaro/event-emitter/src/EventEmitter.ts":
/*!**************************************************************!*\
  !*** ./node_modules/@xaro/event-emitter/src/EventEmitter.ts ***!
  \**************************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var EventEmitter = /** @class */ (function () {
    /**
     * Create Emitter
     */
    function EventEmitter(on) {
        if (on === void 0) { on = {}; }
        /**
         * Event list
         */
        this.events = {};
        for (var key in on) {
            if (on[key]) {
                this.subscribe(key, on[key]);
            }
        }
    }
    /**
     * Creates a key for the event and subscribes the passed callback to it.
     */
    EventEmitter.prototype.subscribe = function (key, cb) {
        var _this = this;
        if (!this.has(key)) {
            this.events[key] = [];
        }
        var removes = [];
        if (Array.isArray(cb)) {
            for (var _i = 0, cb_1 = cb; _i < cb_1.length; _i++) {
                var _cb = cb_1[_i];
                removes.push.apply(removes, this.subscribe(key, _cb));
            }
        }
        else {
            this.events[key].push(cb);
            removes.push(function () { return _this.removeListener(key, cb); });
        }
        return removes;
    };
    /**
     * Unsubscribes all callback functions from the event and removes the event
     * key.
     */
    EventEmitter.prototype.unsubscribe = function (key) {
        if (this.events[key]) {
            delete this.events[key];
        }
    };
    /**
     * Removes a specific event key callback function.
     */
    EventEmitter.prototype.removeListener = function (key, cb) {
        // if (typeof this.events[key] === 'object') {
        if (Array.isArray(this.events[key])) {
            var idx = this.events[key].indexOf(cb);
            if (idx > -1) {
                this.events[key].splice(idx, 1);
            }
        }
    };
    /**
     * Calls the callback function only once, and then removes it.
     */
    EventEmitter.prototype.once = function (key, cb) {
        var remove = this.subscribe(key, function () {
            remove[0]();
            if (Array.isArray(cb)) {
                for (var _i = 0, cb_2 = cb; _i < cb_2.length; _i++) {
                    var _cb = cb_2[_i];
                    _cb();
                }
            }
            else {
                cb();
            }
        });
    };
    /**
     * Checks for an event by key.
     * (Doesn't check for callback functions)
     */
    EventEmitter.prototype.has = function (key) {
        return !!this.events[key];
    };
    /**
     * Returns the number of callback functions for the event key or "false" if
     * there is no key
     */
    EventEmitter.prototype.listenerCount = function (key) {
        if (!this.events.hasOwnProperty(key)) {
            return false;
        }
        return this.events[key].length;
    };
    /**
     * Calls all callback functions on events using the event key.
     */
    EventEmitter.prototype.emit = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var event = this.events[key];
        if (event) {
            for (var _a = 0, event_1 = event; _a < event_1.length; _a++) {
                var cb = event_1[_a];
                cb.apply(void 0, args);
            }
        }
    };
    /**
     * Just like "emit" calls all callback functions. However, the callback must
     * return a boolean value, which determines whether or not the next callback
     * will execute.
     * As a result, it returns the result of the last executed callback function.
     */
    EventEmitter.prototype.validateEmit = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var event = this.events[key];
        if (!event) {
            return false;
        }
        for (var _a = 0, event_2 = event; _a < event_2.length; _a++) {
            var cb = event_2[_a];
            if (!cb.apply(void 0, args)) {
                return false;
            }
        }
        return true;
    };
    /**
     * Just like "emit" calls all callbacks, but unlike "emit" it passes the
     * result of the previous callback to the next one as an argument.
     * As aresult, it will return the result of the last callback.
     */
    EventEmitter.prototype.seriesEmit = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var event = this.events[key];
        if (!event) {
            return;
        }
        var params;
        for (var i = 0; i < event.length; i++) {
            if (i === 0) {
                params = event[i].apply(event, args);
            }
            else {
                params = event[i](params);
            }
        }
        return params;
    };
    return EventEmitter;
}());
/* harmony default export */ __webpack_exports__["default"] = (EventEmitter);


/***/ }),

/***/ "./node_modules/@xaro/event-emitter/src/index.ts":
/*!*******************************************************!*\
  !*** ./node_modules/@xaro/event-emitter/src/index.ts ***!
  \*******************************************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./node_modules/@xaro/event-emitter/src/EventEmitter.ts");
;
/* harmony default export */ __webpack_exports__["default"] = (_EventEmitter__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ }),

/***/ "./src/Button.ts":
/*!***********************!*\
  !*** ./src/Button.ts ***!
  \***********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @xaro/event-emitter */ "./node_modules/@xaro/event-emitter/src/index.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/helpers.ts");
;

var Button = /** @class */ (function () {
    /**
     * Create button
     */
    function Button(config) {
        this.isLock = false;
        this.customEvents = {};
        this.emitter = new _xaro_event_emitter__WEBPACK_IMPORTED_MODULE_0__.default(config.on);
        this.el = config.el;
        this.el.addEventListener('click', this.click.bind(this));
        if (config.on) {
            // config.on.mouseenter  && this.el.addEventListener('mouseenter', this.mouseenter.bind(this) as EventListener);
            // config.on.mouseover   && this.el.addEventListener('mouseover',  this.mouseover.bind(this) as EventListener);
            // config.on.mouseleave  && this.el.addEventListener('mouseleave', this.mouseleave.bind(this) as EventListener);
        }
        if ((0,_helpers__WEBPACK_IMPORTED_MODULE_1__.checkButtonType)(this.el)) {
            this.disabledObj = {
                can: true,
                target: this.el,
                constructor: this.el.constructor
            };
        }
        else {
            var btn = this.el.querySelector('.button');
            if (btn && (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.checkButtonType)(btn)) {
                this.disabledObj = {
                    can: true,
                    target: btn,
                    constructor: btn.constructor
                };
            }
            else {
                this.disabledObj = {
                    can: false
                };
            }
        }
    }
    /**
     * DOM listener
     */
    Button.prototype.click = function (originalEvent) {
        originalEvent.preventDefault();
        if (this.isLock) {
            return;
        }
        this.emitter.emit('beforeClick', this, originalEvent);
        this.emitter.emit('afterClick', this, originalEvent);
    };
    // protected mouseenter(originalEvent: MouseEvent) {
    //   this.emitter.emit('mouseenter', this, originalEvent);
    // }
    // protected mouseover(originalEvent: MouseEvent) {
    //   this.emitter.emit('mouseover', this, originalEvent);
    // }
    // protected mouseleave(originalEvent: MouseEvent) {
    //   this.emitter.emit('mouseleave', this, originalEvent);
    // }
    /**
     * Add custom event
     */
    Button.prototype.on = function (key, cb) {
        var _this = this;
        var result = {
            listener: (function (originalEvent) { return _this.emitter.emit(key, _this, originalEvent); }).bind(this),
            dispose: this.emitter.subscribe(key, cb)
        };
        this.el.addEventListener(key, result.listener);
        this.customEvents[key] = result;
        return result;
    };
    /**
     * Remove custom event
     */
    Button.prototype.off = function (key) {
        if (!this.customEvents.hasOwnProperty(key)) {
            return;
        }
        // remove dom listener
        this.el.removeEventListener(key, this.customEvents[key].listener);
        // dispose emitter listeners
        for (var _i = 0, _a = this.customEvents[key].dispose; _i < _a.length; _i++) {
            var dispose = _a[_i];
            dispose();
        }
        // check and remove event key
        if (!this.emitter.listenerCount(key)) {
            this.emitter.unsubscribe(key);
        }
        // remove instance customEvent by key
        delete this.customEvents[key];
    };
    /**
     * Lock button;
     */
    Button.prototype.lock = function () {
        this.emitter.emit('beforeLock', this);
        if (this.disabledObj.can) {
            this.disabledObj.target.disabled = true;
        }
        this.isLock = true;
        this.el.classList.add('disabled');
        this.emitter.emit('afterLock', this);
    };
    /**
     * Unlock button
     */
    Button.prototype.unlock = function () {
        this.emitter.emit('beforeUnlock', this);
        if (this.disabledObj.can) {
            this.disabledObj.target.disabled = false;
        }
        this.isLock = false;
        this.el.classList.remove('disabled');
        this.emitter.emit('afterUnlock', this);
    };
    return Button;
}());
/* harmony default export */ __webpack_exports__["default"] = (Button);


/***/ }),

/***/ "./src/helpers.ts":
/*!************************!*\
  !*** ./src/helpers.ts ***!
  \************************/
/*! namespace exports */
/*! export checkButtonType [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkButtonType": function() { return /* binding */ checkButtonType; }
/* harmony export */ });
var allowInputTypes = [
    'button',
    'submit',
    'reset'
];
function checkButtonType(el) {
    return el instanceof HTMLButtonElement || (el instanceof HTMLInputElement && allowInputTypes.includes(el.type));
}


/***/ }),

/***/ "./src/index.dev.ts":
/*!**************************!*\
  !*** ./src/index.dev.ts ***!
  \**************************/
/*! namespace exports */
/*! exports [not provided] [maybe used in Button (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ */ "./src/index.ts");
;
var btn1 = new ___WEBPACK_IMPORTED_MODULE_0__.default({
    el: document.querySelector('.button-1'),
    on: {
        beforeClick: function (button, originalEvent) {
            console.log('[button-1] beforeClick');
        },
        afterClick: function (button, originalEvent) {
            console.log('[button-1] afterClick');
        },
        // mouseenter:   (button: I_Button, originalEvent: MouseEvent) => {
        //   console.log('[button-1] mouseenter');
        // },
        // mouseover:    (button: I_Button, originalEvent: MouseEvent) => {
        //   console.log('[button-1] mouseover');
        // },
        // mouseleave:   (button: I_Button, originalEvent: MouseEvent) => {
        //   console.log('[button-1] mouseleave');
        // },
        beforeLock: function (button) {
            console.log('[button-1] beforeLock');
        },
        afterLock: function (button) {
            console.log('[button-1] afterLock');
        },
        beforeUnlock: function (button) {
            console.log('[button-1] beforeUnlock');
        },
        afterUnlock: function (button) {
            console.log('[button-1] afterUnlock');
        }
    }
});
btn1.on('mouseenter', function (button, originalEvent) {
    console.log('[button-1] mouseenter');
});
btn1.on('blur', function (button, originalEvent) {
    console.log('[button-1] blur');
});
btn1.on('focus', function (button, originalEvent) {
    console.log('[button-1] focus');
});
// btn1.removeEvent('mouseenter');
window.btn1 = btn1;
var btn2 = new ___WEBPACK_IMPORTED_MODULE_0__.default({
    el: document.querySelector('.button-2'),
    on: {
        // click: [
        //   (button: I_Button) => {
        //     console.log('[button-2] click', button)
        //   }
        // ],
        afterLock: function (button) {
            console.log('[button-2] afterLock');
        },
        afterUnlock: function (button) {
            console.log('[button-2] afterUnlock');
        }
    }
});


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.* */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ "./src/Button.ts");
;
/* harmony default export */ __webpack_exports__["default"] = (_Button__WEBPACK_IMPORTED_MODULE_0__.default);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.dev.ts");
/******/ })()
;
});
//# sourceMappingURL=Button.dev.js.map