import * as ts from 'typescript';

export class AddToModuleContext {
  source: ts.SourceFile; // source of the module file
  relativePath: string; // the relative path that points from the module file to the new module file
  classifiedName: string; // name of the component class
}

