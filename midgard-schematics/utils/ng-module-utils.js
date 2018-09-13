"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Option A: Directly referencing the private APIs
const schematics_1 = require("@angular-devkit/schematics");
const change_1 = require("@schematics/angular/utility/change");
const add_to_module_context_1 = require("./add-to-module-context");
const ts = require("typescript");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
const stringUtils = { dasherize: strings_1.dasherize, classify: strings_1.classify };
function addImportToNgModule(options) {
    return (host) => {
        addImport(host, options);
        return host;
    };
}
exports.addImportToNgModule = addImportToNgModule;
function createAddToModuleContext(host, options) {
    const result = new add_to_module_context_1.AddToModuleContext();
    if (!options.module) {
        throw new schematics_1.SchematicsException(`Module not found.`);
    }
    const text = host.read(options.module);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${options.module} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    result.source = ts.createSourceFile(options.module, sourceText, ts.ScriptTarget.Latest, true);
    result.relativePath = `@libs/${options.name}/src/lib/${options.name}.module.ts`;
    result.classifiedName = stringUtils.classify(`${options.name}Module`);
    return result;
}
function addImport(host, options) {
    const context = createAddToModuleContext(host, options);
    const modulePath = options.module || '';
    const importChanges = ast_utils_1.addImportToModule(context.source, modulePath, context.classifiedName, context.relativePath);
    const importRecorder = host.beginUpdate(modulePath);
    for (const change of importChanges) {
        if (change instanceof change_1.InsertChange) {
            importRecorder.insertLeft(change.pos, change.toAdd);
        }
    }
    host.commitUpdate(importRecorder);
}
//# sourceMappingURL=ng-module-utils.js.map