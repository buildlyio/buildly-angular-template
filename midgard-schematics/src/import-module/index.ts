import { Rule, Tree, SchematicContext} from '@angular-devkit/schematics';
import { addImportToNgModule } from '../../utils/ng-module-utils';

export function importModule(options: any): Rule {

  return (host: Tree, context: SchematicContext) => {

    options.module = 'projects/midgard/src/lib/midgard.module.ts';

    const rule = addImportToNgModule(options);

    return rule(host, context);
  };
}
