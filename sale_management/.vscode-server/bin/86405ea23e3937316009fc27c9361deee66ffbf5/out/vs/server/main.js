/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
if("--exec"===process.argv[2])process.argv.splice(1,2),require(process.argv[1]);else{const e=require("path");process.env.VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH=process.env.VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH||e.join(__dirname,"..","..","..","remote","node_modules"),require("../../bootstrap").injectNodeModuleLookupPath(process.env.VSCODE_INJECT_NODE_MODULE_LOOKUP_PATH),require("../../bootstrap-amd").load("vs/server/remoteExtensionHostAgent")}
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/86405ea23e3937316009fc27c9361deee66ffbf5/core/vs/server/main.js.map
