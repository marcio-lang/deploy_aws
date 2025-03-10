/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/domContentLoaded.js":
/*!***************************************!*\
  !*** ./public/js/domContentLoaded.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fileInputHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fileInputHandler */ \"./public/js/fileInputHandler.js\");\n/* harmony import */ var _formSubmitHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formSubmitHandler */ \"./public/js/formSubmitHandler.js\");\n\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  (0,_fileInputHandler__WEBPACK_IMPORTED_MODULE_0__.handleFileInputChange)();\n  (0,_formSubmitHandler__WEBPACK_IMPORTED_MODULE_1__.handleFormSubmit)();\n});\n\n\n//# sourceURL=webpack://frontend/./public/js/domContentLoaded.js?");

/***/ }),

/***/ "./public/js/fileInputHandler.js":
/*!***************************************!*\
  !*** ./public/js/fileInputHandler.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleFileInputChange: () => (/* binding */ handleFileInputChange)\n/* harmony export */ });\nfunction handleFileInputChange() {\n  const createSpan = document.getElementById('create-span');\n  const fileInput = document.getElementById('file-input');\n  const uploadButton = document.getElementById('upload-button');\n  const errorMessage = document.getElementById('error-message');\n  const downloadButtonArea = document.getElementById('button-dowload-area');\n\n  fileInput.addEventListener('change', () => {\n    createSpan.innerText = 'CRIAR';\n    errorMessage.innerText = '';\n    uploadButton.disabled = false;\n    downloadButtonArea.innerHTML = '';\n    createSpan.classList.remove('spinner-border', 'text-light');\n  });\n}\n\n\n//# sourceURL=webpack://frontend/./public/js/fileInputHandler.js?");

/***/ }),

/***/ "./public/js/formSubmitHandler.js":
/*!****************************************!*\
  !*** ./public/js/formSubmitHandler.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handleFormSubmit: () => (/* binding */ handleFormSubmit)\n/* harmony export */ });\nfunction handleFormSubmit() {\n  const createSpan = document.getElementById('create-span');\n  const radioInput = document.querySelectorAll('[name=\"tamanho\"]');\n  const uploadButton = document.getElementById('upload-button');\n  const errorMessage = document.getElementById('error-message');\n  const downloadButtonArea = document.getElementById('button-dowload-area');\n\n  document.getElementById('form-upload').addEventListener('submit', async (e) => {\n    e.preventDefault();\n\n    uploadButton.disabled = true;\n    createSpan.innerHTML = '';\n    createSpan.classList.add('spinner-border', 'text-light');\n\n    let radioSelect = '';\n\n    radioInput.forEach(input => {\n      if (input.checked) {\n        radioSelect = input.id;\n      }\n    });\n\n    const fileInput = document.getElementById('file-input');\n    const file = fileInput.files[0];\n\n    const reader = new FileReader();\n\n    reader.onload = async (e) => {\n\n      try {\n        const data = new Uint8Array(e.target.result);\n        const XSLX = await __webpack_require__.e(/*! import() */ \"vendors-node_modules_xlsx_xlsx_mjs\").then(__webpack_require__.bind(__webpack_require__, /*! xlsx */ \"./node_modules/xlsx/xlsx.mjs\"));\n        const workbook = XSLX.read(data, { type: 'array' });\n        const sheetName = workbook.SheetNames[0];\n        const worksheet = workbook.Sheets[sheetName];\n\n        // Obter a primeira linha da planilha que contém os nomes das colunas\n        const firstRow = XSLX.utils.sheet_to_json(worksheet, { header: 1 })[0];\n\n        console.log('firstRow', firstRow)\n\n        // Criar um novo mapeamento para as colunas com .trim().toUpperCase()\n        const newHeader = firstRow.map(columnName => columnName.trim().toUpperCase());\n\n        // Converter a planilha em JSON usando o novo cabeçalho\n        const dataJSON = XSLX.utils.sheet_to_json(worksheet, { header: newHeader });\n\n        // Opcionalmente, se você quiser descartar a primeira linha original:\n        dataJSON.shift();\n\n        const headers = Object.keys(dataJSON[0]);\n        const expectedHeaders = ['PRODUTO', 'MEDIDA', 'VALOR'];\n\n        //console.log(headers)\n\n        const validHeaders = headers.every((header, index) => {\n          const isValid = header.trim().toUpperCase() === expectedHeaders[index]\n          return isValid\n        });\n\n        //console.log('validHeaders', validHeaders)\n\n        if (!validHeaders) {\n          uploadButton.disabled = true;\n          errorMessage.classList.remove('d-none');\n          errorMessage.innerText = 'Verifique se a planilha está preenchida corretamente.';\n          createSpan.innerHTML = `<svg\n          xmlns=\"http://www.w3.org/2000/svg\"\n          width=\"40\"\n          height=\"40\"\n          fill=\"currentColor\"\n          class=\"bi bi-x-lg text-danger\"\n          viewBox=\"0 0 16 16\">\n          <path d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"/>\n          </svg>`;\n          createSpan.classList.remove('spinner-border', 'text-light');\n          return;\n        }\n\n        const dataSheetFinal = dataJSON.map(row => {\n          if (row.VALOR) {\n            row.VALOR = String(row.VALOR).replace(/\\./g, ',');\n          }\n          return row;\n        });\n\n\n        console.log('dataSheetFinal', dataSheetFinal)\n\n        const response = await fetch('http://localhost:3333/api/upload', {\n          method: 'POST',\n          headers: {\n            'Content-Type': 'application/json'\n          },\n          body: JSON.stringify({ tamanho: radioSelect, data: dataSheetFinal })\n        });\n\n        const responseData = await response.json();\n        console.log(responseData)\n        await makeButtonDownloadAndDisabledSubmitButton(responseData)\n\n        if (!response.ok) {\n          throw new Error(`Erro na requisição: ${response.statusText}`);\n        }\n\n      } catch (error) {\n        errorMessage.classList.remove('d-none');\n        errorMessage.innerText = 'Verifique se a planilha está preenchida corretamente.';\n        console.error('Erro durante o processamento:', error);\n      }\n\n    };\n\n    reader.readAsArrayBuffer(file);\n  });\n\n  async function makeButtonDownloadAndDisabledSubmitButton(responseData) {\n    uploadButton.disabled = true;\n    createSpan.innerHTML = `<svg\n    xmlns=\"http://www.w3.org/2000/svg\"\n    width=\"40\"\n    height=\"40\"\n    fill=\"currentColor\"\n    class=\"bi bi-check-lg text-success\"\n    viewBox=\"0 0 16 16\">\n    <path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z\"/>\n    </svg>`;\n    createSpan.classList.remove('spinner-border', 'text-light');\n\n    downloadButtonArea.innerHTML = `<div class=\"text-center mb-4\">\n              <p>Seus cartazes ficaram prontos!</p>\n            </div><a class=\"btn btn-primary\"\n    href=\"${responseData.download}\"\n    target=\"_blank\">\n   BAIXAR CARTAZES\n    </a>`;\n\n\n  }\n\n  const myModal = new bootstrap.Modal(document.getElementById('exampleModal'));\n\n  document.getElementById('button-click-here').addEventListener('click', () => {\n    myModal.show();\n  })\n  document.getElementById('button-dimiss-modal').addEventListener('click', () => {\n    myModal.hide();\n  })\n  document.getElementById('button-dimiss-modal2').addEventListener('click', () => {\n    myModal.hide();\n  })\n\n\n}\n\n\n//# sourceURL=webpack://frontend/./public/js/formSubmitHandler.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".bundle.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "frontend:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkfrontend"] = self["webpackChunkfrontend"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/domContentLoaded.js");
/******/ 	
/******/ })()
;