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

/***/ 974:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ src_0; }
});

// CONCATENATED MODULE: ./node_modules/@xaro/event-emitter/src/EventEmitter.ts
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
                this.multipleSubsribe(key, on[key]);
            }
        }
    }
    /**
     * Calls the subscribe method on each element in the array.
     */
    EventEmitter.prototype.multipleSubsribe = function (key, value) {
        if (Array.isArray(value)) {
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var cb = value_1[_i];
                this.multipleSubsribe(key, cb);
            }
        }
        else if (typeof value === 'function') {
            this.subscribe(key, value);
        }
    };
    /**
     * Creates a key for the event and subscribes the passed callback to it.
     */
    EventEmitter.prototype.subscribe = function (key, cb) {
        var _this = this;
        if (!this.has(key)) {
            this.events[key] = [];
        }
        this.events[key].push(cb);
        return {
            dispose: function () { return _this.removeListener(key, cb); }
        };
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
        var remove = this.subscribe(key, function (data) {
            remove.dispose();
            cb(data);
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
/* harmony default export */ var src_EventEmitter = (EventEmitter);

// CONCATENATED MODULE: ./node_modules/@xaro/event-emitter/src/index.ts
;
/* harmony default export */ var src = (src_EventEmitter);

// CONCATENATED MODULE: ./src/helpers.ts
var allowInputTypes = [
    'button',
    'submit',
    'reset'
];
function checkButtonType(el) {
    return el instanceof HTMLButtonElement || (el instanceof HTMLInputElement && allowInputTypes.includes(el.type));
}

// CONCATENATED MODULE: ./src/Button.ts
;

var Button = /** @class */ (function () {
    function Button(config) {
        this.isLock = false;
        this.emitter = new src(config.on);
        this.el = config.el;
        this.el.addEventListener('click', this.click.bind(this));
        if (config.on) {
            config.on.mouseenter && this.el.addEventListener('mouseenter', this.mouseenter.bind(this));
            config.on.mouseout && this.el.addEventListener('mouseout', this.mouseout.bind(this));
            config.on.mouseover && this.el.addEventListener('mouseover', this.mouseover.bind(this));
        }
        if (checkButtonType(this.el)) {
            this.disabledObj = {
                can: true,
                target: this.el,
                constructor: this.el.constructor
            };
        }
        else {
            var btn = this.el.querySelector('.button');
            if (btn && checkButtonType(btn)) {
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
    Button.prototype.click = function (originalEvent) {
        originalEvent.preventDefault();
        if (this.isLock) {
            return;
        }
        this.emitter.emit('beforeClick', this, originalEvent);
        this.emitter.emit('click', this, originalEvent);
        this.emitter.emit('afterClick', this, originalEvent);
    };
    Button.prototype.mouseenter = function (originalEvent) {
        this.emitter.emit('mouseenter', this, originalEvent);
    };
    Button.prototype.mouseout = function (originalEvent) {
        this.emitter.emit('mouseout', this, originalEvent);
    };
    Button.prototype.mouseover = function (originalEvent) {
        this.emitter.emit('mouseover', this, originalEvent);
    };
    Button.prototype.lock = function () {
        this.emitter.emit('beforeLock', this);
        if (this.disabledObj.can) {
            this.disabledObj.target.disabled = true;
        }
        this.isLock = true;
        this.el.classList.add('disabled');
        this.emitter.emit('afterLock', this);
    };
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
/* harmony default export */ var src_Button = (Button);

// CONCATENATED MODULE: ./src/index.ts
;
/* harmony default export */ var src_0 = (src_Button);


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
/******/ 	return __webpack_require__(974);
/******/ })()
;
});
//# sourceMappingURL=Button.js.map