!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n(require("esri-loader"),require("react"),require("react-redux"));else if("function"==typeof define&&define.amd)define(["esri-loader","react","react-redux"],n);else{var t="object"==typeof exports?n(require("esri-loader"),require("react"),require("react-redux")):n(e["esri-loader"],e.react,e["react-redux"]);for(var a in t)("object"==typeof exports?exports:e)[a]=t[a]}}(this,function(e,n,t){return function(e){function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}var t={};return n.m=e,n.c=t,n.i=function(e){return e},n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n.p="",n(n.s=3)}([function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.setInitialLegend=n.fetchLegend=n.showLayersNotVisibleForScale=n.reverseLayerOrder=n.toggleShowSettings=n.toggleNodeVisible=n.toggleNodeExpanded=n.toggleExpanded=n.TOGGLE_LEGEND_EXPANDED=n.SET_INITIAL_LEGEND_GRAPHICSLAYER_DATA=n.SET_INITIAL_LEGEND_MAPIMAGELAYER_DATA=n.INIT_MAP_OPTIONS=n.SHOW_LAYERS_NOT_VISIBLE_FOR_SCALE=n.REVERSE_LAYER_ORDER=n.TOGGLE_SHOW_SETTINGS=n.SET_LEGEND_DOM_DATA=n.TOGGLE_LEGEND_NODE_EXPANDED=n.RECEIVE_LEGEND_DATA=n.REQUEST_LEGEND_DATA=n.RESET_LEGEND_IS_FETCHING=n.TOGGLE_LEGEND_NODE_VISIBLE=n.SET_CURRENT_SCALE=void 0;var a=t(4),r=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}(a),i=n.SET_CURRENT_SCALE="map-legend/SET_CURRENT_SCALE",l=n.TOGGLE_LEGEND_NODE_VISIBLE="map-legend/TOGGLE_LEGEND_NODE_VISIBLE",o=n.RESET_LEGEND_IS_FETCHING="map-legend/RESET_LEGEND_IS_FETCHING",d=n.REQUEST_LEGEND_DATA="map-legend/REQUEST_LEGEND_DATA",s=n.RECEIVE_LEGEND_DATA="map-legend/RECEIVE_LEGEND_DATA",c=n.TOGGLE_LEGEND_NODE_EXPANDED="map-legend/TOGGLE_LEGEND_NODE_EXPANDED",u=n.SET_LEGEND_DOM_DATA="map-legend/SET_LEGEND_DOM_DATA",p=n.TOGGLE_SHOW_SETTINGS="map-legend/TOGGLE_SHOW_SETTINGS",g=n.REVERSE_LAYER_ORDER="map-legend/REVERSE_LAYER_ORDER",E=n.SHOW_LAYERS_NOT_VISIBLE_FOR_SCALE="map-legend/SHOW_LAYERS_NOT_VISIBLE_FOR_SCALE",f=n.INIT_MAP_OPTIONS="map-legend/INIT_MAP_OPTIONS",m=n.SET_INITIAL_LEGEND_MAPIMAGELAYER_DATA="map-legend/SET_INITIAL_LEGEND_MAPIMAGELAYER_DATA",y=n.SET_INITIAL_LEGEND_GRAPHICSLAYER_DATA="map-legend/SET_INITIAL_LEGEND_GRAPHICSLAYER_DATA",L=n.TOGGLE_LEGEND_EXPANDED="map-legend/TOGGLE_LEGEND_EXPANDED",b=(n.toggleExpanded=function(e,n){return{type:L,payload:{mapId:e,expanded:n}}},n.toggleNodeExpanded=function(e,n){return{type:c,payload:{nodeId:e,mapId:n}}},n.toggleNodeVisible=function(e,n){return{type:l,payload:{nodeId:e,mapId:n}}},n.toggleShowSettings=function(e){return{type:p,payload:{mapId:e}}},n.reverseLayerOrder=function(e){return{type:g,payload:{mapId:e}}},n.showLayersNotVisibleForScale=function(e,n){return{type:E,payload:{mapId:e,show:n}}},n.fetchLegend=function(e,n){return function(t){t({type:d,payload:{url:e,mapId:n}}),r.dojoRequire(["esri/request","esri/config"],function(a,r){return r.request.corsDetection=!1,a(e+"/legend",{query:{f:"json"},responseType:"json"}).then(function(a){t({type:s,payload:{layers:a.data.layers,url:e,mapId:n}})},function(e){console.error(e),t({type:o})})})}},function(e,n){var t=e._buildLegendDOMForLayer;e._buildLegendDOMForLayer=function(a,r){var i=t.call(e,a,r);return n(i,e),i}}),_=function(e,n,t){var a;return function(){var r=this,i=arguments,l=function(){a=null,t||e.apply(r,i)},o=t&&!a;clearTimeout(a),a=setTimeout(l,n),o&&e.apply(r,i)}}(function(e,n,t){e({type:i,payload:{scale:n,mapId:t}})},250),I=function(e,n,t,a){r.dojoRequire(["esri/widgets/Legend"],function(r){b(new r({view:e,layerInfos:[{layer:t}]}),function(e,t){setTimeout(function(){e&&e.widget&&a({type:u,payload:{legendWidget:e.widget,mapId:n}}),t&&t.destroy&&t.destroy()},250)})})};n.setInitialLegend=function(e,n){return function(t){e.then(function(){t({type:f,payload:{mapId:n}}),_(t,e.scale,n),e.watch("scale",function(e){_(t,e,n)});var a=1;e.map.layers.forEach(function(r){r.__index=a,a++,r.then(function(a){a.loaded&&a.type&&["map-image"].indexOf(a.type.toLowerCase())>-1&&a.allSublayers&&a.legendEnabled&&t({type:m,payload:{view:e,mapId:n,layer:a}}),a.loaded&&a.type&&["csv","feature","graphics","scene","stream"].indexOf(a.type.toLowerCase())>-1&&(r.url||r.source)&&a.legendEnabled&&(t({type:y,payload:{view:e,mapId:n,layer:a}}),I(e,n,a,t))},function(e){console.error("Failed to load a layer for use with the legend control.",e)})})})}}},function(e,n,t){"use strict";function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function i(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}Object.defineProperty(n,"__esModule",{value:!0});var l=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),o=t(5),d=function(e){return e&&e.__esModule?e:{default:e}}(o),s=t(6),c=t(0),u={clickLegendNode:{cursor:"pointer",marginRight:6,display:"inline-block"},inlineBlockDisplay:{display:"inline-block",marginTop:8,marginBottom:0},marginTop:{marginTop:8},titleContainer:{paddingTop:10,paddingBottom:10,paddingLeft:12,backgroundColor:"#ebebeb",margin:0},titleControls:{float:"right",cursor:"pointer",marginRight:12,marginLeft:12},options:{opacity:.5},optionsOn:{opacity:1},settingsPanel:{position:"absolute",top:30,right:8,backgroundColor:"whitesmoke",zIndex:101,width:"90%",border:"solid 1px rgba(0,0,0,0.2)"},legendPadding:{paddingRight:12,paddingBottom:10,paddingLeft:12},legendCheckbox:{cursor:"pointer",marginRight:8,color:"#EF5350"},legendCheckboxSelected:{cursor:"pointer",marginRight:8},legendCheckboxLabel:{fontWeight:400,cursor:"pointer"},textStyle:{display:"inline-block",verticalAlign:"bottom",fontWeight:500},iconMargin:{marginRight:4}},p=function(e){var n={width:e.imageWidth+8,height:e.imageHeight,backgroundImage:"url(data:image/png;base64,"+e.image+")",backgroundRepeat:"no-repeat",display:"inline-block"},t={marginLeft:16,marginTop:6};return d.default.createElement("div",{key:e.id,style:t},d.default.createElement("div",{style:n}),d.default.createElement("label",{style:u.textStyle},e.label))},g=function(e,n,t,a,r){var i={marginLeft:8,opacity:1},l=e.expanded&&e.subLayerLegendData?e.subLayerLegendData.map(p):null;t&&e.subLayerScaleRestricted&&(0!==e.subLayerMinScale&&e.subLayerMinScale<t||0!==e.subLayerMaxScale&&e.subLayerMaxScale>t)&&(i.opacity=.5);var o=e.subLayerLegendData?d.default.createElement("div",{onClick:function(){return a(e.id,n)},style:u.clickLegendNode},e.expanded?d.default.createElement("span",{className:"esri-icon-down"}):d.default.createElement("span",{className:"esri-icon-right"})):null,s=d.default.createElement("div",{style:u.inlineBlockDisplay},d.default.createElement("div",{style:u.inlineBlockDisplay},d.default.createElement("span",{style:e.visible?u.legendCheckboxSelected:u.legendCheckbox,onClick:function(){return r(e.id,n)},className:e.visible?"esri-icon-visible":"esri-icon-non-visible"}),d.default.createElement("label",{style:u.legendCheckboxLabel,onClick:function(){return r(e.id,n)}},e.subLayerName)));return d.default.createElement("div",{key:e.id,style:i},o,s,l)},E=function(e,n,t,a,r,i){if(!e.alreadyLoaded)return null;var l={marginLeft:4,marginTop:8,opacity:1},o={marginLeft:8};if(t&&e.scaleRestricted&&(0!==e.minScale&&e.minScale<t||0!==e.maxScale&&e.maxScale>t)){if(i===!1)return null;l.opacity=.4}var s=e.expanded&&(e.legendLayers||e.hasDomNode)?e.legendLayers?e.legendLayers.map(function(e,i){return g(e,n,t,a,r)}):e.hasDomNode?d.default.createElement("div",{style:o,dangerouslySetInnerHTML:{__html:e.domNode}}):null:null,c=e.legendLayers||e.hasDomNode?d.default.createElement("div",{onClick:function(){return a(e.id,n)},style:u.clickLegendNode},e.expanded?d.default.createElement("span",{className:"esri-icon-down"}):d.default.createElement("span",{className:"esri-icon-right"})):null,p=d.default.createElement("div",{style:u.inlineBlockDisplay},d.default.createElement("span",{style:e.visible?u.legendCheckboxSelected:u.legendCheckbox,onClick:function(){return r(e.id,n)},className:e.visible?"esri-icon-visible":"esri-icon-non-visible"}),d.default.createElement("label",{style:u.legendCheckboxLabel,onClick:function(){return r(e.id,n)}},e.layerName));return d.default.createElement("div",{key:e.id,style:l},c,p,s)},f=function(e){function n(){var e,t,i,l;a(this,n);for(var o=arguments.length,d=Array(o),s=0;s<o;s++)d[s]=arguments[s];return t=i=r(this,(e=n.__proto__||Object.getPrototypeOf(n)).call.apply(e,[this].concat(d))),i.initialise=function(){var e=i.props,n=e.legend,t=e.mapId,a=e.fetchLegend;n&&n.forEach(function(e){!e.url||e.isFetching||e.alreadyLoaded||a(e.url,t)})},l=t,r(i,l)}return i(n,e),l(n,[{key:"componentDidMount",value:function(){this.initialise()}},{key:"componentDidUpdate",value:function(e,n){this.initialise()}},{key:"render",value:function(){var e=this.props,n=e.legend,t=e.mapId,a=e.scale,r=e.optionsShowOptions,i=e.optionsShowLayersNotVisibleForScale,l=e.optionsReverseLayerOrder,o=e.toggleExpanded,s=e.reverseLayerOrder,c=e.showLayersNotVisibleForScale,p=e.toggleShowSettings,g=e.toggleNodeExpanded,f=e.toggleNodeVisible;return n?d.default.createElement("div",{className:"arcgis-legend"},d.default.createElement("div",null,d.default.createElement("div",{style:u.titleContainer},d.default.createElement("label",null,t.split("-").join(" - ")),d.default.createElement("div",{style:u.titleControls},d.default.createElement("span",{title:"Expand all",className:"esri-icon-down-arrow",style:u.iconMargin,onClick:function(){return o(t,!0)}}),d.default.createElement("span",{title:"Collapse all",className:"esri-icon-right-triangle-arrow",style:u.iconMargin,onClick:function(){return o(t,!1)}}),d.default.createElement("span",{title:"Options",style:r?u.optionsOn:u.options,className:"esri-icon-settings",onClick:function(){return p(t)}}))),r?d.default.createElement("div",{style:u.settingsPanel},d.default.createElement("div",{style:u.titleContainer},d.default.createElement("label",null,"Options")),d.default.createElement("div",{style:u.legendPadding},d.default.createElement("div",{style:u.marginTop},d.default.createElement("span",{style:u.legendCheckboxSelected,onClick:function(){return s(t)},className:l?"esri-icon-checkbox-checked":"esri-icon-checkbox-unchecked"}),d.default.createElement("label",{style:u.legendCheckboxLabel,onClick:function(){return s(t)}},"Reverse order")),d.default.createElement("div",{style:u.marginTop},d.default.createElement("span",{style:u.legendCheckboxSelected,onClick:function(){return c(t,!i)},className:i?"esri-icon-checkbox-checked":"esri-icon-checkbox-unchecked"}),d.default.createElement("label",{style:u.legendCheckboxLabel,onClick:function(){return c(t,!i)}},"Show layers not visible for current scale")))):null),d.default.createElement("div",{style:u.legendPadding},n.map(function(e,n){return E(e,t,a,g,f,i)}))):null}}]),n}(d.default.PureComponent),m=function(e,n){var t=e.mapLegendConfig.legends[n.mapId],a=e.mapLegendConfig.options[n.mapId],r=e.mapLegendConfig.scales[n.mapId];return{legend:t,optionsShowOptions:!!a&&a.showOptions,optionsReverseLayerOrder:!!a&&a.reverseLayerOrder,optionsShowLayersNotVisibleForScale:!a||a.showLayersNotVisibleForScale,scale:r}},y=function(e){return{fetchLegend:function(n,t){e((0,c.fetchLegend)(n,t))},toggleExpanded:function(n,t){e((0,c.toggleExpanded)(n,t))},toggleNodeExpanded:function(n,t){e((0,c.toggleNodeExpanded)(n,t))},toggleNodeVisible:function(n,t){e((0,c.toggleNodeVisible)(n,t))},toggleShowSettings:function(n){e((0,c.toggleShowSettings)(n))},reverseLayerOrder:function(n){e((0,c.reverseLayerOrder)(n))},showLayersNotVisibleForScale:function(n,t){e((0,c.showLayersNotVisibleForScale)(n,t))}}};f.propTypes={mapId:d.default.PropTypes.string.isRequired},n.default=(0,s.connect)(m,y)(f)},function(e,n,t){"use strict";function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(n,"__esModule",{value:!0});var r,i=t(0),l=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)},o=function(){return l()+l()+"-"+l()+"-"+l()+"-"+l()+"-"+l()+l()+l()},d=function(e,n){return e.mapIndex-n.mapIndex},s=function(e,n){return n.mapIndex-e.mapIndex},c=function(e,n){n.forEach(function(n){if(n.alreadyLoaded===!0){var t=e.map.layers.find(function(e){return e.uid===n.uid});if(!t)return null;n.visible&&n.subLayersVisible&&t.sublayers&&t.sublayers&&(t.sublayers=t.sublayers.map(function(e){var t=n.subLayersVisible.filter(function(n){return e.id===n});return e.visible=t&&1===t.length,e})),t.visible!==n.visible&&(t.visible=n.visible)}})},u={isFetching:!1,legends:{},views:{},scales:{},options:{}};n.default=function(e,n){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,a=arguments[1],r=n[a.type];return r?r(t,a.payload):t}}(u,(r={},a(r,i.SET_CURRENT_SCALE,function(e,n){var t=Object.assign({},e.scales);return t[n.mapId]=n.scale,Object.assign({},e,{scales:t})}),a(r,i.RESET_LEGEND_IS_FETCHING,function(e,n){return Object.assign({},e,{isFetching:!1})}),a(r,i.TOGGLE_SHOW_SETTINGS,function(e,n){var t=Object.assign({},e.options);return t[n.mapId].showOptions=!t[n.mapId].showOptions,Object.assign({},e,{options:t})}),a(r,i.REVERSE_LAYER_ORDER,function(e,n){var t=Object.assign({},e.legends),a=t[n.mapId],r=Object.assign({},e.options);return r[n.mapId].reverseLayerOrder=!r[n.mapId].reverseLayerOrder,t[n.mapId]=a.sort(r[n.mapId].reverseLayerOrder?s:d),Object.assign({},e,{legends:t,options:r})}),a(r,i.SHOW_LAYERS_NOT_VISIBLE_FOR_SCALE,function(e,n){var t=Object.assign({},e.options);return t[n.mapId].showLayersNotVisibleForScale=n.show,Object.assign({},e,{options:t})}),a(r,i.REQUEST_LEGEND_DATA,function(e,n){var t=Object.assign({},e.legends),a=t[n.mapId],r=a.map(function(e,t){return e.url===n.url&&(e.isFetching=!0),e});return t[n.mapId]=r,Object.assign({},e,{isFetching:!0,legends:t})}),a(r,i.RECEIVE_LEGEND_DATA,function(e,n){var t=Object.assign({},e.legends),a=t[n.mapId],r=a.map(function(e,t){return e.url===n.url&&(e.legendLayers=n.layers.map(function(n){var t=n.legend.map(function(e){return{label:e.label,image:e.imageData,imageHeight:e.height,imageWidth:e.width,id:o()}});return{subLayerId:n.layerId,subLayerName:n.layerName,subLayerMinScale:n.minScale,subLayerMaxScale:n.maxScale,subLayerScaleRestricted:0!==n.minScale||0!==n.maxScale,subLayerLegendData:t,visible:!e.subLayersVisible||e.subLayersVisible.indexOf(n.layerId)>-1,expanded:!0,id:o()}}),e.alreadyLoaded=!0,e.expanded=!0),e});return t[n.mapId]=r,Object.assign({},e,{isFetching:!1,legends:t})}),a(r,i.INIT_MAP_OPTIONS,function(e,n){var t=Object.assign({},e.options);return t[n.mapId]={reverseLayerOrder:!1,showLayersNotVisibleForScale:!0,showOptions:!1},Object.assign({},e,{options:t})}),a(r,i.SET_INITIAL_LEGEND_MAPIMAGELAYER_DATA,function(e,n){var t=Object.assign({},e.views);t[n.mapId]=n.view;var a=n.layer,r=[];a.allSublayers.items.forEach(function(e){e.visible&&r.push(e.id)});var i=[{layerId:a.id,layerName:a.title||a.id,minScale:a.minScale,maxScale:a.maxScale,scaleRestricted:0!==a.minScale||0!==a.maxScale,visible:a.visible,subLayersVisible:r,url:a.url.replace(/\/+$/,""),legendLayers:null,hasDomNode:!1,alreadyLoaded:!1,isFetching:!1,expanded:!1,id:o(),uid:a.uid,mapIndex:a.__index,reverseLayerOrder:!1,showLayersNotVisibleForScale:!0}],l=Object.assign({},e.legends);return l[n.mapId]=l[n.mapId]&&l[n.mapId].length?l[n.mapId].concat(i):i,l[n.mapId].sort(d),Object.assign({},e,{legends:l,views:t})}),a(r,i.SET_INITIAL_LEGEND_GRAPHICSLAYER_DATA,function(e,n){var t=Object.assign({},e.views);t[n.mapId]=n.view;var a=n.layer,r=[{layerId:a.id,layerName:a.title||a.id,minScale:a.minScale,maxScale:a.maxScale,scaleRestricted:0!==a.minScale||0!==a.maxScale,visible:a.visible,legendLayers:null,hasDomNode:!1,alreadyLoaded:!1,isFetching:!1,expanded:!1,id:o(),uid:a.uid,mapIndex:a.__index,reverseLayerOrder:!1,showLayersNotVisibleForScale:!0}],i=Object.assign({},e.legends);return i[n.mapId]=i[n.mapId]&&i[n.mapId].length?i[n.mapId].concat(r):r,i[n.mapId].sort(d),Object.assign({},e,{legends:i,views:t})}),a(r,i.SET_LEGEND_DOM_DATA,function(e,n){var t=Object.assign({},e.legends);return t[n.mapId]=t[n.mapId].map(function(e,t){if(n.legendWidget&&n.legendWidget.children&&n.legendWidget.children.length>0){for(var a=null,r=0;r<n.legendWidget.children.length;r++){var i=n.legendWidget.children[r];if(i.id.split("_").pop()===e.uid){a=i;break}}e.hasDomNode===!1&&a&&a.children&&a.children.length>1&&(e.alreadyLoaded=!0,e.hasDomNode=!0,e.domNode=a.children[1].outerHTML,e.expanded=!0)}return e}),Object.assign({},e,{legends:t})}),a(r,i.TOGGLE_LEGEND_NODE_EXPANDED,function(e,n){var t=Object.assign({},e.legends),a=t[n.mapId],r=a.map(function(e,t){if(e.id===n.nodeId)e.expanded=!e.expanded;else if(e.legendLayers){var a=e.legendLayers.map(function(e){return e.id===n.nodeId&&(e.expanded=!e.expanded),e});e.legendLayers=a}return e});return t[n.mapId]=r,Object.assign({},e,{legends:t})}),a(r,i.TOGGLE_LEGEND_NODE_VISIBLE,function(e,n){var t=Object.assign({},e.legends),a=t[n.mapId],r=a.map(function(e,t){if(e.id===n.nodeId)e.visible=!e.visible;else if(e.legendLayers){var a=e.legendLayers.map(function(e){return e.id===n.nodeId&&(e.visible=!e.visible),e}),r=[];e.legendLayers.forEach(function(e){e.visible&&r.push(e.subLayerId)}),e.subLayersVisible=r,e.legendLayers=a}return e});return t[n.mapId]=r,c(e.views[n.mapId],a),Object.assign({},e,{legends:t})}),a(r,i.TOGGLE_LEGEND_EXPANDED,function(e,n){var t=Object.assign({},e.legends),a=t[n.mapId],r=a.map(function(e,t){if(e.expanded=n.expanded,e.legendLayers){var a=e.legendLayers.map(function(e){return e.expanded=n.expanded,e});e.legendLayers=a}return e});return t[n.mapId]=r,Object.assign({},e,{legends:t})}),r))},function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.MapLegend=t(1).default,n.reducer=t(2).default,n.setInitialLegend=t(0).setInitialLegend,n.reverseLayerOrder=t(0).reverseLayerOrder,n.showLayersNotVisibleForScale=t(0).showLayersNotVisibleForScale,n.toggleExpanded=t(0).toggleExpanded,n.toggleNodeExpanded=t(0).toggleNodeExpanded,n.toggleNodeVisible=t(0).toggleNodeVisible,n.toggleShowSettings=t(0).toggleShowSettings},function(e,n){e.exports=require("esri-loader")},function(e,n){e.exports=require("react")},function(e,n){e.exports=require("react-redux")}])});
//# sourceMappingURL=arcgis-react-redux-legend.js.map