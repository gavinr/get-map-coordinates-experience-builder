define(["jimu-core","jimu-ui","jimu-for-builder"],(function(e,t,o){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1066)}({0:function(t,o){t.exports=e},1066:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var o in e)t.hasOwnProperty(o)||(t[o]=e[o])}(o(1067))},1067:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var o in e)t.hasOwnProperty(o)||(t[o]=e[o])}(o(1068))},1068:function(e,t,o){"use strict";var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),a=o(1069),s=o(3);t.CropType=s.CropType;var p=o(492),c=["image/gif","image/svg+xml"],h=function(e){function t(t){var o=e.call(this,t)||this;return o.eidtInfoStyle={width:"100%",height:"100%",margin:0},o.onCropChange=function(e){o.setState({crop:e})},o.onCropAreaComplete=function(e,t){o.setState({croppedAreaPixels:t})},o.onZoomChange=function(e){o.setState({zoom:e})},o.onConfirmCrop=function(e,t,n){if(c.indexOf(o.props.imageFormat)>-1||o.props.cropType===s.CropType.Fake){var r={cropPosition:o.state.crop,cropZoom:o.state.zoom,svgViewBox:e||"0 0 28 28",svgPath:t||"m0,0l0,28l28,0l0,-28l-28,0z",cropShape:n||"rectangle",cropPixel:o.state.croppedAreaPixels,cropType:s.CropType.Fake};o.props.onConfirmCrop&&o.props.onConfirmCrop(r)}else{var i={cropPosition:o.state.crop,cropZoom:o.state.zoom,svgViewBox:e,svgPath:t,cropShape:n,cropPixel:o.state.croppedAreaPixels,cropType:s.CropType.Real};o.setState({loading:!0}),p.getCroppedImgBlobUrl(o.props.image,i.cropPixel,o.props.originId).then((function(e){o.setState({loading:!1}),o.props.onConfirmCrop&&o.props.onConfirmCrop(i,e)}),(function(){o.setState({loading:!1})}))}},o.state={modal:!0,crop:o.props.crop?o.props.crop:{x:0,y:0},zoom:o.props.cropZoom?o.props.cropZoom:1,aspect:1,showGrid:!1,zoomSpeed:.1,croppedAreaPixels:null,loading:!1},o}return r(t,e),t.prototype.render=function(){var e=window.jimuConfig.isBuilder;return i.ReactDOM.createPortal(i.jsx("div",null,i.jsx("div",{className:"jimu-widget",style:{zIndex:9999,position:"fixed",top:0,left:0,backgroundColor:"rgb(0, 0, 0, .5)"}}),i.jsx("div",{style:{zIndex:1e4,position:"absolute",top:0},className:i.classNames({"jimu-widget d-flex justify-content-center align-items-center":e})},i.jsx(a.Cropper,{image:this.props.image,crop:this.state.crop,zoom:this.state.zoom,aspect:this.state.aspect,showGrid:this.state.showGrid,zoomSpeed:this.state.zoomSpeed,onCropChange:this.onCropChange,onCropComplete:this.onCropAreaComplete,onZoomChange:this.onZoomChange,onCancelCrop:this.props.onCancelCrop,onConfirmCrop:this.onConfirmCrop,widgetArea:this.props.widgetArea,widgetId:this.props.widgetId,svgViewBox:this.props.cropParam&&this.props.cropParam.svgViewBox,svgPath:this.props.cropParam&&this.props.cropParam.svgPath,cropShape:this.props.cropParam&&this.props.cropParam.cropShape,loading:this.state.loading}))),document&&document.getElementsByTagName("body")[0])},t}(i.React.Component);t.ImageCrop=h},1069:function(e,t,o){"use strict";var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)}),i=this&&this.__makeTemplateObject||function(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e};Object.defineProperty(t,"__esModule",{value:!0});var a,s=o(0),p=o(1070),c=o(492),h=function(e){function t(o){var n=e.call(this,o)||this;return n.image=null,n.container=null,n.containerRect={},n.imageSize={width:0,height:0,naturalWidth:0,naturalHeight:0},n.dragStartPosition={x:0,y:0},n.dragStartCrop={x:0,y:0},n.lastPinchDistance=0,n.rafDragTimeout=null,n.rafZoomTimeout=null,n.screenWidth=document?document.documentElement.clientWidth:null,n.screenHeight=document?document.documentElement.clientHeight:null,n.getStyle=function(){var e=window.location.href.replace(window.location.hash,"");return s.css(a||(a=i(['\n      .cropperArea {\n        position: relative;\n        border: 1px solid rgba(255, 255, 255, 0.5);\n        box-sizing: border-box;\n        box-shadow: 0 0 0 9999em;\n        color: rgba(0,0,0,0.5);\n\n        .tool-item {\n          background-color: #EEF0F3;\n          cursor: pointer;\n\n          &:hover {\n            background-color: #c8cbcd;\n            cursor: pointer;\n          }\n        }\n      }\n\n      .gridLines {\n        &::before {\n          content: " ";\n          box-sizing: border-box;\n          position: absolute;\n          border: 1px solid rgba(255, 255, 255, 0.5);\n          top: 0;\n          bottom: 0;\n          left: 33.33%;\n          right: 33.33%;\n          borderTop: 0;\n          borderBottom: 0;\n        }\n\n        &::after {\n          content: " ";\n          box-sizing: border-box;\n          position: absolute;\n          border: 1px solid rgba(255, 255, 255, 0.5);\n          top: 33.33%;\n          bottom: 33.33%;\n          left: 0;\n          right: 0;\n          borderLeft: 0;\n          borderRight: 0;\n        },\n      }\n\n      .roundShape {\n        border-radius: 50%\n      }\n\n      .mask-border {\n        path {\n          transition:all 1s linear;\n          animation-name:ring;\n          animation-duration:9.2s;\n          animation-timing-function: linear;\n          animation-iteration-count:infinite;\n        }\n        \n        @keyframes ring {\n            from {\n                stroke-dashoffset:0;\n            }\n            to {\n                stroke-dashoffset:6000;\n            }\n        }\n      }\n\n      .mask-image {\n        -webkit-mask-image: url(',"#mask-setting-",");\n        mask: url(","#mask-setting-",");\n        mask-image: url(","#mask-setting-",");\n      }\n    "],['\n      .cropperArea {\n        position: relative;\n        border: 1px solid rgba(255, 255, 255, 0.5);\n        box-sizing: border-box;\n        box-shadow: 0 0 0 9999em;\n        color: rgba(0,0,0,0.5);\n\n        .tool-item {\n          background-color: #EEF0F3;\n          cursor: pointer;\n\n          &:hover {\n            background-color: #c8cbcd;\n            cursor: pointer;\n          }\n        }\n      }\n\n      .gridLines {\n        &::before {\n          content: " ";\n          box-sizing: border-box;\n          position: absolute;\n          border: 1px solid rgba(255, 255, 255, 0.5);\n          top: 0;\n          bottom: 0;\n          left: 33.33%;\n          right: 33.33%;\n          borderTop: 0;\n          borderBottom: 0;\n        }\n\n        &::after {\n          content: " ";\n          box-sizing: border-box;\n          position: absolute;\n          border: 1px solid rgba(255, 255, 255, 0.5);\n          top: 33.33%;\n          bottom: 33.33%;\n          left: 0;\n          right: 0;\n          borderLeft: 0;\n          borderRight: 0;\n        },\n      }\n\n      .roundShape {\n        border-radius: 50%\n      }\n\n      .mask-border {\n        path {\n          transition:all 1s linear;\n          animation-name:ring;\n          animation-duration:9.2s;\n          animation-timing-function: linear;\n          animation-iteration-count:infinite;\n        }\n        \n        @keyframes ring {\n            from {\n                stroke-dashoffset:0;\n            }\n            to {\n                stroke-dashoffset:6000;\n            }\n        }\n      }\n\n      .mask-image {\n        -webkit-mask-image: url(',"#mask-setting-",");\n        mask: url(","#mask-setting-",");\n        mask-image: url(","#mask-setting-",");\n      }\n    "])),e,n.props.widgetId,e,n.props.widgetId,e,n.props.widgetId)},n.preventZoomSafari=function(e){return e.preventDefault()},n.cleanEvents=function(){document.removeEventListener("mousemove",n.onMouseMove),document.removeEventListener("mouseup",n.onDragStopped),document.removeEventListener("touchmove",n.onTouchMove),document.removeEventListener("touchend",n.onDragStopped)},n.onImgLoad=function(){n.computeSizes(),n.emitCropData()},n.computeSizes=function(){if(n.image){n.imageSize={width:n.image.width,height:n.image.height,naturalWidth:n.image.naturalWidth,naturalHeight:n.image.naturalHeight};var e=n.props.widgetArea.width,t=n.props.widgetArea.height,o=n.state.minZoom,r=n.state.maxZoom;r=n.image.width/n.image.height>=e/t?(o=t/n.image.height)+5:(o=e/n.image.width)+5,o>n.props.zoom&&n.props.onZoomChange&&n.props.onZoomChange(o);var i={width:e,height:t};n.setState({cropSize:i,minZoom:o,maxZoom:r},n.recomputeCropPosition)}n.container&&(n.containerRect=n.container.getBoundingClientRect())},n.onMouseDown=function(e){e.preventDefault(),document.addEventListener("mousemove",n.onMouseMove),document.addEventListener("mouseup",n.onDragStopped),n.onDragStart(t.getMousePoint(e))},n.onMouseMove=function(e){return n.onDrag(t.getMousePoint(e))},n.onTouchStart=function(e){e.preventDefault(),document.addEventListener("touchmove",n.onTouchMove,{passive:!1}),document.addEventListener("touchend",n.onDragStopped),2===e.touches.length?n.onPinchStart(e):1===e.touches.length&&n.onDragStart(t.getTouchPoint(e.touches[0]))},n.onTouchMove=function(e){2===e.touches.length?n.onPinchMove(e):1===e.touches.length&&n.onDrag(t.getTouchPoint(e.touches[0]))},n.onDragStart=function(e){var t=e.x,o=e.y;n.dragStartPosition={x:t,y:o},n.dragStartCrop={x:n.props.crop.x,y:n.props.crop.y}},n.onDrag=function(e){var t=e.x,o=e.y;n.rafDragTimeout&&window.cancelAnimationFrame(n.rafDragTimeout),n.rafDragTimeout=window.requestAnimationFrame((function(){if(void 0!==t&&void 0!==o){var e=t-n.dragStartPosition.x,r=o-n.dragStartPosition.y,i={x:n.dragStartCrop.x+e,y:n.dragStartCrop.y+r},a=c.restrictPosition(i,n.imageSize,n.state.cropSize,n.props.zoom);n.props.onCropChange(a)}}))},n.onDragStopped=function(){n.cleanEvents(),n.emitCropData()},n.onWheel=function(e){e.preventDefault();var o=t.getMousePoint(e),r=null;r=e.deltaY<=0?1.05*n.props.zoom:.95*n.props.zoom,n.setNewZoom(r,o)},n.getPointOnContainer=function(e,t){var o=e.x,r=e.y;if(!n.containerRect)throw new Error("The Cropper is not mounted");return{x:n.containerRect.width/2-(o-n.containerRect.left),y:n.containerRect.height/2-(r-n.containerRect.top)}},n.getPointOnImage=function(e){var t=e.x,o=e.y,r=n.props,i=r.crop,a=r.zoom;return{x:(t+i.x)/a,y:(o+i.y)/a}},n.setNewZoom=function(e,t){var o=n.getPointOnContainer(t),r=n.getPointOnImage(o),i=Math.min(n.state.maxZoom,Math.max(e,n.state.minZoom)),a={x:r.x*i-o.x,y:r.y*i-o.y},s=c.restrictPosition(a,n.imageSize,n.state.cropSize,i);n.props.onCropChange(s),n.props.onZoomChange&&n.props.onZoomChange(i)},n.emitCropData=function(){if(n.state.cropSize){var e=c.restrictPosition(n.props.crop,n.imageSize,n.state.cropSize,n.props.zoom),t=c.computeCroppedArea(e,n.imageSize,n.state.cropSize,n.props.zoom),o=t.croppedAreaPercentages,r=t.croppedAreaPixels;n.props.onCropComplete&&n.props.onCropComplete(o,r)}},n.recomputeCropPosition=function(){var e=c.restrictPosition(n.props.crop,n.imageSize,n.state.cropSize,n.props.zoom);n.props.onCropChange(e),n.emitCropData()},n.onImgError=function(){var e={width:n.props.widgetArea.width,height:n.props.widgetArea.height};n.setState({cropSize:e})},n.onResize=function(e,t){n.screenWidth=e,n.screenHeight=t},n.state={cropSize:null,minZoom:n.props.minZoom,maxZoom:n.props.maxZoom},n}return r(t,e),t.prototype.componentDidMount=function(){window.addEventListener("resize",this.computeSizes),this.container.addEventListener("gesturestart",this.preventZoomSafari),this.container.addEventListener("gesturechange",this.preventZoomSafari),this.container.addEventListener("wheel",this.onWheel)},t.prototype.componentWillUnmount=function(){window.removeEventListener("resize",this.computeSizes),this.container.removeEventListener("gesturestart",this.preventZoomSafari),this.container.removeEventListener("gesturechange",this.preventZoomSafari),this.container.removeEventListener("wheel",this.onWheel),this.cleanEvents()},t.prototype.componentDidUpdate=function(e){e.aspect!==this.props.aspect?this.computeSizes():e.zoom!==this.props.zoom&&this.recomputeCropPosition()},t.prototype.onPinchStart=function(e){var o=t.getTouchPoint(e.touches[0]),n=t.getTouchPoint(e.touches[1]);this.lastPinchDistance=c.getDistanceBetweenPoints(o,n),this.onDragStart(c.getCenter(o,n))},t.prototype.onPinchMove=function(e){var o=this,n=t.getTouchPoint(e.touches[0]),r=t.getTouchPoint(e.touches[1]),i=c.getCenter(n,r);this.onDrag(i),this.rafZoomTimeout&&window.cancelAnimationFrame(this.rafZoomTimeout),this.rafZoomTimeout=window.requestAnimationFrame((function(){var e=c.getDistanceBetweenPoints(n,r),t=o.props.zoom*(e/o.lastPinchDistance);o.setNewZoom(t,i),o.lastPinchDistance=e}))},t.prototype.render=function(){var e=this,t=this.props,o=t.crop,n=o.x,r=o.y,i=t.zoom,a=t.showGrid,c=(t.style,t.classes),h=c.containerClassName,u=c.cropAreaClassName,m=c.imageClassName;return s.jsx("div",{css:this.getStyle,onMouseDown:this.onMouseDown,onTouchStart:this.onTouchStart,"data-testid":"container",className:h,style:{userSelect:"none",touchAction:"none",cursor:"move",display:"flex",justifyContent:"center",alignItems:"center",position:"absolute",top:this.props.widgetArea.top,left:this.props.widgetArea.left,width:this.props.widgetArea.width,height:this.props.widgetArea.height},ref:function(t){e.container=t}},s.jsx(s.ReactResizeDetector,{handleWidth:!0,handleHeight:!0,onResize:this.onResize}),s.jsx("img",{src:this.props.image,ref:function(t){e.image=t},onLoad:this.onImgLoad,onError:this.onImgError,alt:"",style:{position:"absolute",transform:"translate("+n+"px, "+r+"px) scale("+i+")",willChange:"transform"},className:m}),this.state.cropSize&&s.jsx(p.CropArea,{onCancelCrop:this.props.onCancelCrop,onConfirmCrop:this.props.onConfirmCrop,showGrid:a,style:{width:this.state.cropSize.width,height:this.state.cropSize.height},className:u,svgViewBox:this.props.svgViewBox,svgPath:this.props.svgPath,cropShape:this.props.cropShape,widgetId:this.props.widgetId,screenWidth:this.screenWidth,screenHeight:this.screenHeight,widgetArea:this.props.widgetArea}),this.props.loading&&s.jsx("div",{style:{position:"absolute",left:"50%",top:"50%"},className:"jimu-secondary-loading"}))},t.defaultProps={zoom:1,aspect:4/3,maxZoom:10,minZoom:1,showGrid:!0,style:{},classes:{},zoomSpeed:1},t.getMousePoint=function(e){return{x:Number(e.clientX),y:Number(e.clientY)}},t.getTouchPoint=function(e){return{x:Number(e.clientX),y:Number(e.clientY)}},t}(s.React.Component);t.Cropper=h},1070:function(e,t,o){"use strict";var n,r=this&&this.__extends||(n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])})(e,t)},function(e,t){function o(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(o.prototype=t.prototype,new o)});Object.defineProperty(t,"__esModule",{value:!0});var i=o(0),a=o(3),s=o(38),p=o(216),c=function(e){function t(t){return e.call(this,t)||this}return r(t,e),t.prototype.render=function(){var e=this,t=this.props,o=t.showGrid,n=t.style,r=t.className;r||(r="");var c=n.width,h={display:"flex",alignItems:"center",justifyContent:"flex-end",minWidth:"75px",paddingBottom:"5px",left:"-1px",paddingTop:"5px",position:"absolute",top:"-40px",height:"40px",width:Math.min(this.props.screenWidth,c)+"px",boxShadow:"0 2px 8px 1px rgba(0,0,0,0.20)",backgroundColor:"#fff",borderRadius:"2px",cursor:"default"};this.props.widgetArea.top-40<0&&(h.top=this.props.widgetArea.height+"px");var u=i.React.createElement("div",{onMouseDown:function(e){e.stopPropagation()},style:h},i.React.createElement("div",{className:"tool-item mr-1",style:{float:"right",padding:"0.42rem 0.5rem"},onClick:function(){e.props.onConfirmCrop&&e.props.onConfirmCrop(e.props.svgViewBox,e.props.svgPath,e.props.cropShape)}},i.React.createElement(a.Icon,{icon:s,width:16,height:16,className:"mr-0"})),i.React.createElement("div",{className:"tool-item mr-1",style:{float:"right",padding:"0.42rem 0.5rem",marginLeft:"0.1rem"},onClick:function(){e.props.onCancelCrop&&e.props.onCancelCrop()}},i.React.createElement(a.Icon,{icon:p,width:13,height:13,className:"mr-0"})));return i.React.createElement("div",{style:n,className:i.classNames("cropperArea "+r,{gridLines:o})},i.React.createElement("svg",{width:"100%",height:"100%",viewBox:this.props.svgViewBox?this.props.svgViewBox:"0 0 28 28",preserveAspectRatio:"none"},i.React.createElement("defs",null,i.React.createElement("mask",{id:"mask-setting-"+this.props.widgetId,maskContentUnits:"userSpaceOnUse"},i.React.createElement("rect",{x:"0",y:"0",width:"100%",height:"100%",stroke:"none",fill:"rgb(255, 255, 255, 1)"}),i.React.createElement("svg",{width:"100%",height:"100%",viewBox:this.props.svgViewBox?this.props.svgViewBox:"0 0 28 28",preserveAspectRatio:"none"},i.React.createElement("g",null,i.React.createElement("path",{strokeWidth:"2",strokeDasharray:"10",strokeDashoffset:"0",fill:"#000",d:this.props.svgPath?this.props.svgPath:"m0,0l0,28l28,0l0,-28l-28,0z"}))))),i.React.createElement("rect",{x:"0",y:"0",width:"100%",height:"100%",className:"mask-image",style:{stroke:"none",fill:"rgb(0, 0, 0, 0.7)"}}),i.React.createElement("g",null,i.React.createElement("path",{stroke:"#fff",strokeWidth:".1",fill:"none",strokeDashoffset:"0",d:this.props.svgPath?this.props.svgPath:"m0,0l0,28l28,0l0,-28l-28,0z"}))),u)},t}(i.React.Component);t.CropArea=c},167:function(e,t){e.exports=o},216:function(e,t){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M19.637 15.866L30.951 27.18a2.667 2.667 0 01-3.771 3.771L15.866 19.637 4.552 30.951A2.667 2.667 0 01.781 27.18l11.314-11.314L.781 4.552A2.667 2.667 0 014.552.781l11.314 11.314L27.18.781a2.667 2.667 0 013.771 3.771L19.637 15.866z"></path></svg>'},3:function(e,o){e.exports=t},38:function(e,t){e.exports='<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path d="M4.586 8.657l6.01-6.01a.5.5 0 01.707.707l-6.01 6.01a1 1 0 01-1.414 0L.697 6.182a.5.5 0 01.707-.707l3.182 3.182z" fill="#000"></path><path d="M0 0h12v12H0z"></path></g></svg>'},492:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(167),r=o(0);function i(e,t,o,n){var r=t*n/2-o/2;return Math.min(r,Math.max(e,-r))}function a(e,t){return Math.min(e,Math.max(0,t))}t.getCropSize=function(e,t,o){return e>=t*o?{width:t*o,height:t}:{width:e,height:e/o}},t.restrictPosition=function(e,t,o,n){return{x:i(e.x,t.width,o.width,n),y:i(e.y,t.height,o.height,n)}},t.getDistanceBetweenPoints=function(e,t){return Math.sqrt(Math.pow(e.y-t.y,2)+Math.pow(e.x-t.x,2))},t.computeCroppedArea=function(e,t,o,n){var r={x:a(100,((t.width-o.width/n)/2-e.x/n)/t.width*100),y:a(100,((t.height-o.height/n)/2-e.y/n)/t.height*100),width:a(100,o.width/t.width*100/n),height:a(100,o.height/t.height*100/n)};return{croppedAreaPercentages:r,croppedAreaPixels:{x:a(t.naturalWidth,r.x*t.naturalWidth/100),y:a(t.naturalHeight,r.y*t.naturalHeight/100),width:a(t.naturalWidth,r.width*t.naturalWidth/100),height:a(t.naturalHeight,r.height*t.naturalHeight/100)}}},t.getCenter=function(e,t){return{x:(t.x+e.x)/2,y:(t.y+e.y)/2}},t.getCroppedImgBlobUrl=function(e,t,o){return new Promise((function(i,a){HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(e,t,o){var n=this;setTimeout((function(){for(var r=atob(n.toDataURL(t,o).split(",")[1]),i=r.length,a=new Uint8Array(i),s=0;s<i;s++)a[s]=r.charCodeAt(s);e(new Blob([a],{type:t||"image/png"}))}))}});var s=new Image;s.setAttribute("crossOrigin","anonymous"),s.src=e,s.addEventListener("load",(function(){var e=document.createElement("canvas");e.width=t.width,e.height=t.height,e.getContext("2d").drawImage(s,t.x,t.y,t.width,t.height,0,0,t.width,t.height),e.toBlob((function(e){var t=URL.createObjectURL(e),a={file:t,fileName:(new Date).getTime().toString()+".jpeg",type:n.ResourceType.Image,url:t,blobUrl:t,referedIds:[],fileFormat:"image/jpeg",originId:o};if(window.jimuConfig.isBuilder){var s=n.AppResourceManager.getInstance();return s.getBlobByBlobUrl(a.file).then((function(e){a.file=e,s.upLoadFileToResource(a),a.originId&&n.AppResourceManager.getInstance().updateImageResourceItemInfo(a)})),i(a)}return r.moduleLoader.getJimuForBuilderModules().appBuilderSync.letBuilderAddResource(a),i(a)}),"image/jpeg",.8)})),s.addEventListener("error",(function(){return a()}))}))}}})}));