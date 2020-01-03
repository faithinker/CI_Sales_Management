!function(e,t){for(var i in t)e[i]=t[i]}(exports,function(e){var t={};function i(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,i),s.l=!0,s.exports}return i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)i.d(r,s,function(t){return e[t]}.bind(null,s));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=5)}([function(e,t){e.exports=require("vscode")},function(e,t){e.exports=require("path")},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,s,n,o,a,c=i(1),u=i(7),l=Object.prototype.toString;function d(e){return void 0!==e}function h(e){return"[object String]"===l.call(e)}function g(e){return JSON.parse(u.readFileSync(e,"utf8"))}function v(e,t){return a&&(e="［"+e.replace(/[aouei]/g,"$&$&")+"］"),0===t.length?e:e.replace(/\{(\d+)\}/g,function(e,i){var r=i[0],s=t[r],n=e;return"string"==typeof s?n=s:"number"!=typeof s&&"boolean"!=typeof s&&void 0!==s&&null!==s||(n=String(s)),n})}function f(e){return function(t,i){for(var r=[],s=2;s<arguments.length;s++)r[s-2]=arguments[s];return function(e){return"[object Number]"===l.call(e)}(t)?t>=e.length?void console.error("Broken localize call found. Index out of bounds. Stacktrace is\n: "+new Error("").stack):v(e[t],r):h(i)?(console.warn("Message "+i+" didn't get externalized correctly."),v(i,r)):void console.error("Broken localize call found. Stacktrace is\n: "+new Error("").stack)}}function p(e,t){for(var i=[],r=2;r<arguments.length;r++)i[r-2]=arguments[r];return v(t,i)}function w(e,t){return n[e]=t,t}function m(e,t){var i,r=c.join(o.cacheRoot,e.id+"-"+e.hash+".json"),s=!1,n=!1;try{return i=JSON.parse(u.readFileSync(r,{encoding:"utf8",flag:"r"})),function(e){var t=new Date;u.utimes(e,t,t,function(){})}(r),i}catch(e){if("ENOENT"===e.code)n=!0;else{if(!(e instanceof SyntaxError))throw e;console.log("Syntax error parsing message bundle: "+e.message+"."),u.unlink(r,function(e){e&&console.error("Deleting corrupted bundle "+r+" failed.")}),s=!0}}if(!(i=function(e,t){var i=o.translationsConfig[e.id];if(i){var r=g(i).contents,s=g(c.join(t,"nls.metadata.json")),n=Object.create(null);for(var a in s){var u=s[a],l=r[e.outDir+"/"+a];if(l){for(var d=[],v=0;v<u.keys.length;v++){var f=u.keys[v],p=l[h(f)?f:f.key];void 0===p&&(p=u.messages[v]),d.push(p)}n[a]=d}else n[a]=u.messages}return n}}(e,t))||s)return i;if(n)try{u.writeFileSync(r,JSON.stringify(i),{encoding:"utf8",flag:"wx"})}catch(e){if("EEXIST"===e.code)return i;throw e}return i}function S(e){try{return function(e){var t=g(c.join(e,"nls.metadata.json")),i=Object.create(null);for(var r in t){var s=t[r];i[r]=s.messages}return i}(e)}catch(e){return void console.log("Generating default bundle from meta data failed.",e)}}function y(e,t){var i;if(!0===o.languagePackSupport&&void 0!==o.cacheRoot&&void 0!==o.languagePackId&&void 0!==o.translationsConfigFile&&void 0!==o.translationsConfig)try{i=m(e,t)}catch(e){console.log("Load or create bundle failed ",e)}if(!i){if(o.languagePackSupport)return S(t);var r=function(e){for(var t=o.locale;t;){var i=c.join(e,"nls.bundle."+t+".json");if(u.existsSync(i))return i;var r=t.lastIndexOf("-");t=r>0?t.substring(0,r):void 0}if(void 0===t&&(i=c.join(e,"nls.bundle.json"),u.existsSync(i)))return i}(t);if(r)try{return g(r)}catch(e){console.log("Loading in the box message bundle failed.",e)}i=S(t)}return i}function b(e){if(!e)return p;var t=c.extname(e);if(t&&(e=e.substr(0,e.length-t.length)),o.messageFormat===r.both||o.messageFormat===r.bundle){var i=function(e){for(var t,i=c.dirname(e);t=c.join(i,"nls.metadata.header.json"),!u.existsSync(t);){var r=c.dirname(i);if(r===i){t=void 0;break}i=r}return t}(e);if(i){var s=c.dirname(i),l=n[s];if(void 0===l)try{var h=JSON.parse(u.readFileSync(i,"utf8"));try{var v=y(h,s);l=w(s,v?{header:h,nlsBundle:v}:null)}catch(e){console.error("Failed to load nls bundle",e),l=w(s,null)}}catch(e){console.error("Failed to read header file",e),l=w(s,null)}if(l){var m=e.substr(s.length+1).replace(/\\/g,"/"),S=l.nlsBundle[m];return void 0===S?(console.error("Messages for file "+e+" not found. See console for details."),function(){return"Messages not found."}):f(S)}}}if(o.messageFormat===r.both||o.messageFormat===r.file)try{var b=g(function(e){var t;if(o.cacheLanguageResolution&&t)t=t;else{if(a||!o.locale)t=".nls.json";else for(var i=o.locale;i;){var r=".nls."+i+".json";if(u.existsSync(e+r)){t=r;break}var s=i.lastIndexOf("-");s>0?i=i.substring(0,s):(t=".nls.json",i=null)}o.cacheLanguageResolution&&(t=t)}return e+t}(e));return Array.isArray(b)?f(b):d(b.messages)&&d(b.keys)?f(b.messages):(console.error("String bundle '"+e+"' uses an unsupported format."),function(){return"File bundle has unsupported format. See console for details"})}catch(e){"ENOENT"!==e.code&&console.error("Failed to load single file bundle",e)}return console.error("Failed to load message bundle for file "+e),function(){return"Failed to load message bundle. See console for details."}}!function(e){e.file="file",e.bundle="bundle",e.both="both"}(r=t.MessageFormat||(t.MessageFormat={})),function(e){e.is=function(e){var t=e;return t&&d(t.key)&&d(t.comment)}}(s||(s={})),function(){if(o={locale:void 0,languagePackSupport:!1,cacheLanguageResolution:!0,messageFormat:r.bundle},h(process.env.VSCODE_NLS_CONFIG))try{var e=JSON.parse(process.env.VSCODE_NLS_CONFIG);if(h(e.locale)&&(o.locale=e.locale.toLowerCase()),function(e){return!0===e||!1===e}(e._languagePackSupport)&&(o.languagePackSupport=e._languagePackSupport),h(e._cacheRoot)&&(o.cacheRoot=e._cacheRoot),h(e._languagePackId)&&(o.languagePackId=e._languagePackId),h(e._translationsConfigFile)){o.translationsConfigFile=e._translationsConfigFile;try{o.translationsConfig=g(o.translationsConfigFile)}catch(t){e._corruptedFile&&u.writeFile(e._corruptedFile,"corrupted","utf8",function(e){console.error(e)})}}}catch(e){}a="pseudo"===o.locale,void 0,n=Object.create(null)}(),t.loadMessageBundle=b,t.config=function(e){return e&&(h(e.locale)&&(o.locale=e.locale.toLowerCase(),void 0,n=Object.create(null)),void 0!==e.messageFormat&&(o.messageFormat=e.messageFormat)),a="pseudo"===o.locale,b}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(0),s=i(4);t.PreviewStatusBarEntry=class extends s.Disposable{constructor(e){super(),this.entry=this._register(r.window.createStatusBarItem(e))}showItem(e,t){this._showOwner=e,this.entry.text=t,this.entry.show()}hide(e){e===this._showOwner&&(this.entry.hide(),this._showOwner=void 0)}}},function(e,t,i){"use strict";function r(e){for(;e.length;){const t=e.pop();t&&t.dispose()}}Object.defineProperty(t,"__esModule",{value:!0}),t.disposeAll=r;t.Disposable=class{constructor(){this._isDisposed=!1,this._disposables=[]}dispose(){this._isDisposed||(this._isDisposed=!0,r(this._disposables))}_register(e){return this._isDisposed?e.dispose():this._disposables.push(e),e}get isDisposed(){return this._isDisposed}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(0),s=i(6),n=i(8),o=i(9),a=i(10);t.activate=function(e){const t=r.Uri.file(e.extensionPath),i=new n.SizeStatusBarEntry;e.subscriptions.push(i);const c=new o.BinarySizeStatusBarEntry;e.subscriptions.push(c);const u=new a.ZoomStatusBarEntry;e.subscriptions.push(u);const l=new s.PreviewManager(t,i,c,u);e.subscriptions.push(r.window.registerWebviewEditorProvider(s.PreviewManager.viewType,l)),e.subscriptions.push(r.commands.registerCommand("imagePreview.zoomIn",()=>{var e;null===(e=l.activePreview)||void 0===e||e.zoomIn()})),e.subscriptions.push(r.commands.registerCommand("imagePreview.zoomOut",()=>{var e;null===(e=l.activePreview)||void 0===e||e.zoomOut()}))}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(0),s=i(2),n=i(4),o=s.loadMessageBundle(i(1).join(__dirname,"preview.ts"));class a{constructor(e,t,i,r){this.extensionRoot=e,this.sizeStatusBarEntry=t,this.binarySizeStatusBarEntry=i,this.zoomStatusBarEntry=r,this._previews=new Set}async resolveWebviewEditor(e,t){const i=new c(this.extensionRoot,e.resource,t,this.sizeStatusBarEntry,this.binarySizeStatusBarEntry,this.zoomStatusBarEntry);return this._previews.add(i),this.setActivePreview(i),t.onDidDispose(()=>{this._previews.delete(i)}),t.onDidChangeViewState(()=>{t.active?this.setActivePreview(i):this._activePreview!==i||t.active||this.setActivePreview(void 0)}),{}}get activePreview(){return this._activePreview}setActivePreview(e){this._activePreview=e,this.setPreviewActiveContext(!!e)}setPreviewActiveContext(e){r.commands.executeCommand("setContext","imagePreviewFocus",e)}}t.PreviewManager=a,a.viewType="imagePreview.previewEditor";class c extends n.Disposable{constructor(e,t,i,s,n,o){super(),this.extensionRoot=e,this.resource=t,this.webviewEditor=i,this.sizeStatusBarEntry=s,this.binarySizeStatusBarEntry=n,this.zoomStatusBarEntry=o,this.id=`${Date.now()}-${Math.random().toString()}`,this._previewState=1;const a=t.with({path:t.path.replace(/\/[^\/]+?\.\w+$/,"/")});i.webview.options={enableScripts:!0,localResourceRoots:[a,e]},this._register(i.webview.onDidReceiveMessage(e=>{switch(e.type){case"size":this._imageSize=e.value,this.update();break;case"zoom":this._imageZoom=e.value,this.update()}})),this._register(o.onDidChangeScale(e=>{2===this._previewState&&this.webviewEditor.webview.postMessage({type:"setScale",scale:e.scale})})),this._register(i.onDidChangeViewState(()=>{this.update(),this.webviewEditor.webview.postMessage({type:"setActive",value:this.webviewEditor.active})})),this._register(i.onDidDispose(()=>{2===this._previewState&&(this.sizeStatusBarEntry.hide(this.id),this.binarySizeStatusBarEntry.hide(this.id),this.zoomStatusBarEntry.hide(this.id)),this._previewState=0}));const c=this._register(r.workspace.createFileSystemWatcher(t.fsPath));this._register(c.onDidChange(e=>{e.toString()===this.resource.toString()&&this.render()})),this._register(c.onDidDelete(e=>{e.toString()===this.resource.toString()&&this.webviewEditor.dispose()})),r.workspace.fs.stat(t).then(({size:e})=>{this._imageBinarySize=e,this.update()}),this.render(),this.update(),this.webviewEditor.webview.postMessage({type:"setActive",value:this.webviewEditor.active})}zoomIn(){2===this._previewState&&this.webviewEditor.webview.postMessage({type:"zoomIn"})}zoomOut(){2===this._previewState&&this.webviewEditor.webview.postMessage({type:"zoomOut"})}render(){0!==this._previewState&&(this.webviewEditor.webview.html=this.getWebiewContents())}update(){0!==this._previewState&&(this.webviewEditor.active?(this._previewState=2,this.sizeStatusBarEntry.show(this.id,this._imageSize||""),this.binarySizeStatusBarEntry.show(this.id,this._imageBinarySize),this.zoomStatusBarEntry.show(this.id,this._imageZoom||"fit")):(2===this._previewState&&(this.sizeStatusBarEntry.hide(this.id),this.binarySizeStatusBarEntry.hide(this.id),this.zoomStatusBarEntry.hide(this.id)),this._previewState=1))}getWebiewContents(){const e=Date.now().toString(),t={isMac:"darwin"===process.platform,src:this.getResourcePath(this.webviewEditor,this.resource,e)},i=Date.now().toString();return`<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t\x3c!-- Disable pinch zooming --\x3e\n\t<meta name="viewport"\n\t\tcontent="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">\n\t<title>Image Preview</title>\n\t<link rel="stylesheet" href="${u(this.extensionResource("/media/main.css"))}" type="text/css" media="screen" nonce="${i}">\n\t<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src 'self' data: ${this.webviewEditor.webview.cspSource}; script-src 'nonce-${i}'; style-src 'self' 'nonce-${i}';">\n\t<meta id="image-preview-settings" data-settings="${u(JSON.stringify(t))}">\n</head>\n<body class="container image scale-to-fit loading">\n\t<div class="loading-indicator"></div>\n\t<div class="image-load-error-message">${o(0,null)}</div>\n\t<script src="${u(this.extensionResource("/media/main.js"))}" nonce="${i}"><\/script>\n</body>\n</html>`}getResourcePath(e,t,i){switch(t.scheme){case"data":return t.toString(!0);case"git":return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42gEFAPr/AP///wAI/AL+Sr4t6gAAAABJRU5ErkJggg==";default:return t.query?e.webview.asWebviewUri(t).toString(!0):e.webview.asWebviewUri(t).with({query:`version=${i}`}).toString(!0)}}extensionResource(e){return this.webviewEditor.webview.asWebviewUri(this.extensionRoot.with({path:this.extensionRoot.path+e}))}}function u(e){return e.toString().replace(/"/g,"&quot;")}},function(e,t){e.exports=require("fs")},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(0),s=i(2),n=i(3),o=s.loadMessageBundle(i(1).join(__dirname,"sizeStatusBarEntry.ts"));t.SizeStatusBarEntry=class extends n.PreviewStatusBarEntry{constructor(){super({id:"imagePreview.size",name:o(0,null),alignment:r.StatusBarAlignment.Right,priority:101})}show(e,t){this.showItem(e,t)}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(0),s=i(2),n=i(3),o=s.loadMessageBundle(i(1).join(__dirname,"binarySizeStatusBarEntry.ts"));class a{static formatSize(e){return e<a.KB?o(0,null,e):e<a.MB?o(1,null,(e/a.KB).toFixed(2)):e<a.GB?o(2,null,(e/a.MB).toFixed(2)):e<a.TB?o(3,null,(e/a.GB).toFixed(2)):o(4,null,(e/a.TB).toFixed(2))}}a.KB=1024,a.MB=a.KB*a.KB,a.GB=a.MB*a.KB,a.TB=a.GB*a.KB;t.BinarySizeStatusBarEntry=class extends n.PreviewStatusBarEntry{constructor(){super({id:"imagePreview.binarySize",name:o(5,null),alignment:r.StatusBarAlignment.Right,priority:100})}show(e,t){"number"==typeof t?super.showItem(e,a.formatSize(t)):this.hide(e)}}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=i(0),s=i(2),n=i(3),o=s.loadMessageBundle(i(1).join(__dirname,"zoomStatusBarEntry.ts")),a="_imagePreview.selectZoomLevel";t.ZoomStatusBarEntry=class extends n.PreviewStatusBarEntry{constructor(){super({id:"imagePreview.zoom",name:o(0,null),alignment:r.StatusBarAlignment.Right,priority:102}),this._onDidChangeScale=this._register(new r.EventEmitter),this.onDidChangeScale=this._onDidChangeScale.event,this._register(r.commands.registerCommand(a,async()=>{const e=[10,5,2,1,.5,.2,"fit"].map(e=>({label:this.zoomLabel(e),scale:e})),t=await r.window.showQuickPick(e,{placeHolder:o(1,null)});t&&this._onDidChangeScale.fire({scale:t.scale})})),this.entry.command=a}show(e,t){this.showItem(e,this.zoomLabel(t))}zoomLabel(e){return"fit"===e?o(2,null):`${Math.round(100*e)}%`}}}]));
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/9579eda04fdb3a9bba2750f15193e5fafe16b959/extensions/image-preview/dist/extension.js.map