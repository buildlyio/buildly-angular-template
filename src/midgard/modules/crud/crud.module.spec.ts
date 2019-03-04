import { MidgardCrudModule } from './crud.module';

describe('CrudModuleModule', () => {
  let crudModuleModule: MidgardCrudModule;

  beforeEach(() => {
    crudModuleModule = new MidgardCrudModule();
  });

  it('should create an instance', () => {
    expect(crudModuleModule).toBeTruthy();
  });
});
