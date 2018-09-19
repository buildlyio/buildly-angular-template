
// Option A: Directly referencing the private APIs
import { Rule, Tree, SchematicsException } from '@angular-devkit/schematics';
import { InsertChange } from '@schematics/angular/utility/change';
import { AddToModuleContext } from './add-to-module-context';
import * as ts from 'typescript';
import { addImportToModule } from '@schematics/angular/utility/ast-utils';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { ModuleOptions } from '@schematics/angular/utility/find-module';

const stringUtils = { dasherize, classify };

export function addImportToNgModule(options: ModuleOptions): Rule {
  return (host: Tree) => {
    addImport(host, options);
    return host;
  };
}

function createAddToModuleContext(host: Tree, options: ModuleOptions): AddToModuleContext {

  const result = new AddToModuleContext();

  if (!options.module) {
    throw new SchematicsException(`Module not found.`);
  }

  const text = host.read(options.module);

  if (text === null) {
    throw new SchematicsException(`File ${options.module} does not exist.`);
  }
  const sourceText = text.toString('utf-8');
  result.source = ts.createSourceFile(options.module, sourceText, ts.ScriptTarget.Latest, true);

  result.relativePath = `@libs/${options.name}/src/lib/${options.name}.module.ts`;

  result.classifiedName = stringUtils.classify(`${options.name}Module`);

  return result;

}

function addImport(host: Tree, options: ModuleOptions) {

  const context = createAddToModuleContext(host, options);
  const modulePath = options.module || '';

  const importChanges = addImportToModule(context.source,
    modulePath,
    context.classifiedName,
    context.relativePath);

  const importRecorder = host.beginUpdate(modulePath);
  for (const change of importChanges) {
    if (change instanceof InsertChange) {
      importRecorder.insertLeft(change.pos, change.toAdd);
    }
  }
  host.commitUpdate(importRecorder);
}
