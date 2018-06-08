/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _k_20th_aniv_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./k-20th-aniv.js */ \"./src/k-20th-aniv.js\");\n/* harmony import */ var _k_20th_aniv_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_k_20th_aniv_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/k-20th-aniv.js":
/*!****************************!*\
  !*** ./src/k-20th-aniv.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("window.addEventListener('load', init);\n\nconst HTML = `\n<div class=\"k20th\" aria-hidden=\"true\">\n    <p>k20th</p>\n</div>\n`\n\nconst MODAL = `\n<div class=\"k20th-modal\">\n  <div class=\"k20th-modal__overlay\"></div>\n  <div class=\"k20th-modal__container\">\n    <p>I AM MODAL</p>\n  </div>\n</div>\n`\n\nclass Modal {\n    constructor(option = {}) {\n        this.option = Object.assign({}, this._default, option)\n        this.wrapper = document.createElement('div')\n        this.wrapper.className = `${this.option.namespace}-modal`\n        this.wrapper.setAttribute('aria-hidden', 'true');\n        this.wrapper.innerHTML = this._createInnerHTML(this.option.namespace)\n        document.body.appendChild(this.wrapper);\n\n        this.wrapper.addEventListener('click', () => {\n          this.close();\n        })\n    }\n\n    get _default() {\n        return {\n            namespace: 'k20th',\n        }\n    }\n\n    /**\n     * \n     * @param {string} ns namespace\n     */\n    _createInnerHTML(ns) {\n        return `\n            <div class=\"${ns}-modal__overlay\"></div>\n            <div class=\"${ns}-modal__container\">\n                <p>contents</p>\n            </div>\n        `\n    }\n\n    open() {\n      this.wrapper.setAttribute('aria-hidden', 'false');\n    }\n\n    close() {\n      this.wrapper.setAttribute('aria-hidden', 'true');\n    }\n}\n\nfunction init() {\n    const banner = document.getElementById('k-20th-aniv')\n    if (!banner) {\n        console.error('not found #k-20th-aniv element')\n        return\n    }\n    banner.innerHTML = HTML\n    const modal = new Modal()\n\n    const wrapper = document.querySelector('.k20th');\n    wrapper.addEventListener('click', () => {\n        modal.open();\n    })\n}\n\n//# sourceURL=webpack:///./src/k-20th-aniv.js?");

/***/ })

/******/ });