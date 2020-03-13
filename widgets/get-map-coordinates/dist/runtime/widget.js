define(["jimu-arcgis","jimu-core"], function(__WEBPACK_EXTERNAL_MODULE_jimu_arcgis__, __WEBPACK_EXTERNAL_MODULE_jimu_core__) { return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./get-map-coordinates-experience-builder/widgets/get-map-coordinates/src/runtime/widget.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./get-map-coordinates-experience-builder/widgets/get-map-coordinates/src/runtime/translations/default.ts":
/*!****************************************************************************************************************!*\
  !*** ./get-map-coordinates-experience-builder/widgets/get-map-coordinates/src/runtime/translations/default.ts ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = {\r\n    _widgetLabel: \"Get Map Coordinates\",\r\n    latLon: \"Lat/Lon\",\r\n    zoom: \"Zoom\",\r\n    latLonWillBeHere: \"Lat/Lon (None - please mouse over map)\"\r\n};\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9nZXQtbWFwLWNvb3JkaW5hdGVzLWV4cGVyaWVuY2UtYnVpbGRlci93aWRnZXRzL2dldC1tYXAtY29vcmRpbmF0ZXMvc3JjL3J1bnRpbWUvdHJhbnNsYXRpb25zL2RlZmF1bHQudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9nZXQtbWFwLWNvb3JkaW5hdGVzLWV4cGVyaWVuY2UtYnVpbGRlci93aWRnZXRzL2dldC1tYXAtY29vcmRpbmF0ZXMvc3JjL3J1bnRpbWUvdHJhbnNsYXRpb25zL2RlZmF1bHQudHM/NTdkMiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcbiAgX3dpZGdldExhYmVsOiBcIkdldCBNYXAgQ29vcmRpbmF0ZXNcIixcclxuICBsYXRMb246IFwiTGF0L0xvblwiLFxyXG4gIHpvb206IFwiWm9vbVwiLFxyXG4gIGxhdExvbldpbGxCZUhlcmU6IFwiTGF0L0xvbiAoTm9uZSAtIHBsZWFzZSBtb3VzZSBvdmVyIG1hcClcIlxyXG59O1xyXG4iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./get-map-coordinates-experience-builder/widgets/get-map-coordinates/src/runtime/translations/default.ts\n");

/***/ }),

/***/ "./get-map-coordinates-experience-builder/widgets/get-map-coordinates/src/runtime/widget.tsx":
/*!***************************************************************************************************!*\
  !*** ./get-map-coordinates-experience-builder/widgets/get-map-coordinates/src/runtime/widget.tsx ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar __spreadArrays = (this && this.__spreadArrays) || function () {\r\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\r\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\r\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\r\n            r[k] = a[j];\r\n    return r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n/** @jsx jsx */\r\nvar jimu_core_1 = __webpack_require__(/*! jimu-core */ \"jimu-core\");\r\nvar jimu_arcgis_1 = __webpack_require__(/*! jimu-arcgis */ \"jimu-arcgis\");\r\nvar default_1 = __webpack_require__(/*! ./translations/default */ \"./get-map-coordinates-experience-builder/widgets/get-map-coordinates/src/runtime/translations/default.ts\");\r\nvar Widget = /** @class */ (function (_super) {\r\n    __extends(Widget, _super);\r\n    function Widget() {\r\n        var _this = _super !== null && _super.apply(this, arguments) || this;\r\n        _this.state = {\r\n            latitude: \"\",\r\n            longitude: \"\",\r\n            zoom: 0,\r\n            scale: 0,\r\n            mapViewReady: false,\r\n            jimuMapView: null\r\n        };\r\n        _this.activeViewChangeHandler = function (jmv) {\r\n            if (jmv) {\r\n                _this.setState({\r\n                    jimuMapView: jmv\r\n                });\r\n                // When the extent moves, update the state with all the updated values.\r\n                jmv.view.watch(\"extent\", function (evt) {\r\n                    _this.setState({\r\n                        latitude: _this.state.jimuMapView.view.center.latitude.toFixed(3),\r\n                        longitude: _this.state.jimuMapView.view.center.longitude.toFixed(3),\r\n                        scale: Math.round(_this.state.jimuMapView.view.scale * 1) / 1,\r\n                        zoom: _this.state.jimuMapView.view.zoom,\r\n                        // this is set to false initially, then once we have the first set of data (and all subsequent) it's set\r\n                        // to true, so that we can hide the text until everything is ready:\r\n                        mapViewReady: true\r\n                    });\r\n                });\r\n                // When the pointer moves, take the pointer location and create a Point\r\n                // Geometry out of it (`view.toMap(...)`), then update the state.\r\n                jmv.view.on(\"pointer-move\", function (evt) {\r\n                    var point = _this.state.jimuMapView.view.toMap({\r\n                        x: evt.x,\r\n                        y: evt.y\r\n                    });\r\n                    _this.setState({\r\n                        latitude: point.latitude.toFixed(3),\r\n                        longitude: point.longitude.toFixed(3),\r\n                        scale: Math.round(_this.state.jimuMapView.view.scale * 1) / 1,\r\n                        zoom: _this.state.jimuMapView.view.zoom,\r\n                        mapViewReady: true\r\n                    });\r\n                });\r\n            }\r\n        };\r\n        return _this;\r\n    }\r\n    Widget.prototype.render = function () {\r\n        var sections = [];\r\n        sections.push(jimu_core_1.jsx(\"span\", null,\r\n            default_1.default.latLon,\r\n            \" \",\r\n            this.state.latitude,\r\n            \" \",\r\n            this.state.longitude));\r\n        if (this.props.config.showZoom === true) {\r\n            sections.push(jimu_core_1.jsx(\"span\", null,\r\n                \"Zoom \",\r\n                this.state.zoom.toFixed(0)));\r\n        }\r\n        if (this.props.config.showScale === true) {\r\n            sections.push(jimu_core_1.jsx(\"span\", null,\r\n                \"Scale 1:\",\r\n                this.state.scale));\r\n        }\r\n        // We have 1, 2, or 3 JSX Elements in our array, we want to join them\r\n        // with \" | \" between them. You cannot use `sections.join(\" | \")`, sadly.\r\n        // So we use array.reduce(...) to return an array of JSX elements.\r\n        var allSections = sections.reduce(function (previousValue, currentValue) {\r\n            return previousValue === null\r\n                ? [currentValue]\r\n                : __spreadArrays(previousValue, [\" | \", currentValue]);\r\n        }, null);\r\n        return (jimu_core_1.jsx(\"div\", { className: \"widget-get-map-coordinates jimu-widget m-2\" },\r\n            this.props.hasOwnProperty(\"useMapWidgetIds\") &&\r\n                this.props.useMapWidgetIds &&\r\n                this.props.useMapWidgetIds.length === 1 && (jimu_core_1.jsx(jimu_arcgis_1.JimuMapViewComponent, { useMapWidgetIds: this.props.useMapWidgetIds, onActiveViewChange: this.activeViewChangeHandler })),\r\n            jimu_core_1.jsx(\"p\", null, this.state.mapViewReady === true ? allSections : default_1.default.latLonWillBeHere)));\r\n    };\r\n    return Widget;\r\n}(jimu_core_1.BaseWidget));\r\nexports.default = Widget;\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9nZXQtbWFwLWNvb3JkaW5hdGVzLWV4cGVyaWVuY2UtYnVpbGRlci93aWRnZXRzL2dldC1tYXAtY29vcmRpbmF0ZXMvc3JjL3J1bnRpbWUvd2lkZ2V0LnRzeC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2dldC1tYXAtY29vcmRpbmF0ZXMtZXhwZXJpZW5jZS1idWlsZGVyL3dpZGdldHMvZ2V0LW1hcC1jb29yZGluYXRlcy9zcmMvcnVudGltZS93aWRnZXQudHN4P2Q5NWEiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIEBqc3gganN4ICovXHJcbmltcG9ydCB7IEFsbFdpZGdldFByb3BzLCBCYXNlV2lkZ2V0LCBqc3ggfSBmcm9tIFwiamltdS1jb3JlXCI7XHJcbmltcG9ydCB7IElNQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xyXG5pbXBvcnQgeyBKaW11TWFwVmlldywgSmltdU1hcFZpZXdDb21wb25lbnQgfSBmcm9tIFwiamltdS1hcmNnaXNcIjtcclxuXHJcbmltcG9ydCBQb2ludCA9IHJlcXVpcmUoXCJlc3JpL2dlb21ldHJ5L1BvaW50XCIpO1xyXG5cclxuaW1wb3J0IGRlZmF1bHRNZXNzYWdlcyBmcm9tIFwiLi90cmFuc2xhdGlvbnMvZGVmYXVsdFwiO1xyXG5cclxuaW50ZXJmYWNlIElTdGF0ZSB7XHJcbiAgbGF0aXR1ZGU6IHN0cmluZztcclxuICBsb25naXR1ZGU6IHN0cmluZztcclxuICBzY2FsZTogbnVtYmVyO1xyXG4gIHpvb206IG51bWJlcjtcclxuICBtYXBWaWV3UmVhZHk6IGJvb2xlYW47XHJcbiAgamltdU1hcFZpZXc6IEppbXVNYXBWaWV3O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaWRnZXQgZXh0ZW5kcyBCYXNlV2lkZ2V0PFxyXG4gIEFsbFdpZGdldFByb3BzPElNQ29uZmlnPixcclxuICBJU3RhdGVcclxuPiB7XHJcbiAgc3RhdGUgPSB7XHJcbiAgICBsYXRpdHVkZTogXCJcIixcclxuICAgIGxvbmdpdHVkZTogXCJcIixcclxuICAgIHpvb206IDAsXHJcbiAgICBzY2FsZTogMCxcclxuICAgIG1hcFZpZXdSZWFkeTogZmFsc2UsXHJcbiAgICBqaW11TWFwVmlldzogbnVsbFxyXG4gIH07XHJcblxyXG4gIGFjdGl2ZVZpZXdDaGFuZ2VIYW5kbGVyID0gKGptdjogSmltdU1hcFZpZXcpID0+IHtcclxuICAgIGlmIChqbXYpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgamltdU1hcFZpZXc6IGptdlxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFdoZW4gdGhlIGV4dGVudCBtb3ZlcywgdXBkYXRlIHRoZSBzdGF0ZSB3aXRoIGFsbCB0aGUgdXBkYXRlZCB2YWx1ZXMuXHJcbiAgICAgIGptdi52aWV3LndhdGNoKFwiZXh0ZW50XCIsIGV2dCA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICBsYXRpdHVkZTogdGhpcy5zdGF0ZS5qaW11TWFwVmlldy52aWV3LmNlbnRlci5sYXRpdHVkZS50b0ZpeGVkKDMpLFxyXG4gICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLnN0YXRlLmppbXVNYXBWaWV3LnZpZXcuY2VudGVyLmxvbmdpdHVkZS50b0ZpeGVkKDMpLFxyXG4gICAgICAgICAgc2NhbGU6IE1hdGgucm91bmQodGhpcy5zdGF0ZS5qaW11TWFwVmlldy52aWV3LnNjYWxlICogMSkgLyAxLFxyXG4gICAgICAgICAgem9vbTogdGhpcy5zdGF0ZS5qaW11TWFwVmlldy52aWV3Lnpvb20sXHJcbiAgICAgICAgICAvLyB0aGlzIGlzIHNldCB0byBmYWxzZSBpbml0aWFsbHksIHRoZW4gb25jZSB3ZSBoYXZlIHRoZSBmaXJzdCBzZXQgb2YgZGF0YSAoYW5kIGFsbCBzdWJzZXF1ZW50KSBpdCdzIHNldFxyXG4gICAgICAgICAgLy8gdG8gdHJ1ZSwgc28gdGhhdCB3ZSBjYW4gaGlkZSB0aGUgdGV4dCB1bnRpbCBldmVyeXRoaW5nIGlzIHJlYWR5OlxyXG4gICAgICAgICAgbWFwVmlld1JlYWR5OiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gV2hlbiB0aGUgcG9pbnRlciBtb3ZlcywgdGFrZSB0aGUgcG9pbnRlciBsb2NhdGlvbiBhbmQgY3JlYXRlIGEgUG9pbnRcclxuICAgICAgLy8gR2VvbWV0cnkgb3V0IG9mIGl0IChgdmlldy50b01hcCguLi4pYCksIHRoZW4gdXBkYXRlIHRoZSBzdGF0ZS5cclxuICAgICAgam12LnZpZXcub24oXCJwb2ludGVyLW1vdmVcIiwgZXZ0ID0+IHtcclxuICAgICAgICBjb25zdCBwb2ludDogUG9pbnQgPSB0aGlzLnN0YXRlLmppbXVNYXBWaWV3LnZpZXcudG9NYXAoe1xyXG4gICAgICAgICAgeDogZXZ0LngsXHJcbiAgICAgICAgICB5OiBldnQueVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgbGF0aXR1ZGU6IHBvaW50LmxhdGl0dWRlLnRvRml4ZWQoMyksXHJcbiAgICAgICAgICBsb25naXR1ZGU6IHBvaW50LmxvbmdpdHVkZS50b0ZpeGVkKDMpLFxyXG4gICAgICAgICAgc2NhbGU6IE1hdGgucm91bmQodGhpcy5zdGF0ZS5qaW11TWFwVmlldy52aWV3LnNjYWxlICogMSkgLyAxLFxyXG4gICAgICAgICAgem9vbTogdGhpcy5zdGF0ZS5qaW11TWFwVmlldy52aWV3Lnpvb20sXHJcbiAgICAgICAgICBtYXBWaWV3UmVhZHk6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgbGV0IHNlY3Rpb25zID0gW107XHJcblxyXG4gICAgc2VjdGlvbnMucHVzaChcclxuICAgICAgPHNwYW4+XHJcbiAgICAgICAge2RlZmF1bHRNZXNzYWdlcy5sYXRMb259IHt0aGlzLnN0YXRlLmxhdGl0dWRlfSB7dGhpcy5zdGF0ZS5sb25naXR1ZGV9XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICk7XHJcblxyXG4gICAgaWYgKHRoaXMucHJvcHMuY29uZmlnLnNob3dab29tID09PSB0cnVlKSB7XHJcbiAgICAgIHNlY3Rpb25zLnB1c2goPHNwYW4+Wm9vbSB7dGhpcy5zdGF0ZS56b29tLnRvRml4ZWQoMCl9PC9zcGFuPik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucHJvcHMuY29uZmlnLnNob3dTY2FsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICBzZWN0aW9ucy5wdXNoKDxzcGFuPlNjYWxlIDE6e3RoaXMuc3RhdGUuc2NhbGV9PC9zcGFuPik7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2UgaGF2ZSAxLCAyLCBvciAzIEpTWCBFbGVtZW50cyBpbiBvdXIgYXJyYXksIHdlIHdhbnQgdG8gam9pbiB0aGVtXHJcbiAgICAvLyB3aXRoIFwiIHwgXCIgYmV0d2VlbiB0aGVtLiBZb3UgY2Fubm90IHVzZSBgc2VjdGlvbnMuam9pbihcIiB8IFwiKWAsIHNhZGx5LlxyXG4gICAgLy8gU28gd2UgdXNlIGFycmF5LnJlZHVjZSguLi4pIHRvIHJldHVybiBhbiBhcnJheSBvZiBKU1ggZWxlbWVudHMuXHJcbiAgICBjb25zdCBhbGxTZWN0aW9ucyA9IHNlY3Rpb25zLnJlZHVjZSgocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSA9PiB7XHJcbiAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlID09PSBudWxsXHJcbiAgICAgICAgPyBbY3VycmVudFZhbHVlXVxyXG4gICAgICAgIDogWy4uLnByZXZpb3VzVmFsdWUsIFwiIHwgXCIsIGN1cnJlbnRWYWx1ZV07XHJcbiAgICB9LCBudWxsKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1nZXQtbWFwLWNvb3JkaW5hdGVzIGppbXUtd2lkZ2V0IG0tMlwiPlxyXG4gICAgICAgIHt0aGlzLnByb3BzLmhhc093blByb3BlcnR5KFwidXNlTWFwV2lkZ2V0SWRzXCIpICYmXHJcbiAgICAgICAgICB0aGlzLnByb3BzLnVzZU1hcFdpZGdldElkcyAmJlxyXG4gICAgICAgICAgdGhpcy5wcm9wcy51c2VNYXBXaWRnZXRJZHMubGVuZ3RoID09PSAxICYmIChcclxuICAgICAgICAgICAgPEppbXVNYXBWaWV3Q29tcG9uZW50XHJcbiAgICAgICAgICAgICAgdXNlTWFwV2lkZ2V0SWRzPXt0aGlzLnByb3BzLnVzZU1hcFdpZGdldElkc31cclxuICAgICAgICAgICAgICBvbkFjdGl2ZVZpZXdDaGFuZ2U9e3RoaXMuYWN0aXZlVmlld0NoYW5nZUhhbmRsZXJ9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICB7LyogT25seSBzaG93IHRoZSBkYXRhIG9uY2UgdGhlIE1hcFZpZXcgaXMgcmVhZHkgKi99XHJcbiAgICAgICAgPHA+e3RoaXMuc3RhdGUubWFwVmlld1JlYWR5ID09PSB0cnVlID8gYWxsU2VjdGlvbnMgOiBkZWZhdWx0TWVzc2FnZXMubGF0TG9uV2lsbEJlSGVyZX08L3A+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBSUE7QUFXQTtBQUFBO0FBQUE7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUE0Q0E7QUExQ0E7QUFDQTtBQUVBO0FBRUE7O0FBQUE7O0FBQUE7QUFJQTtBQUNBOztBQUFBO0FBQ0E7QUFFQTtBQUNBOztBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFRQTtBQUdBO0FBQ0E7QUFBQTs7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./get-map-coordinates-experience-builder/widgets/get-map-coordinates/src/runtime/widget.tsx\n");

/***/ }),

/***/ "jimu-arcgis":
/*!******************************!*\
  !*** external "jimu-arcgis" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_arcgis__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamltdS1hcmNnaXMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqaW11LWFyY2dpc1wiPzlmMWMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2ppbXVfYXJjZ2lzX187Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///jimu-arcgis\n");

/***/ }),

/***/ "jimu-core":
/*!****************************!*\
  !*** external "jimu-core" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_jimu_core__;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamltdS1jb3JlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiamltdS1jb3JlXCI/YzY5NSJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfamltdV9jb3JlX187Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///jimu-core\n");

/***/ })

/******/ })});;