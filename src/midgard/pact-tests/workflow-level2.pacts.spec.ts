import { Matchers, PactWeb } from '@pact-foundation/pact-web';
import { WorkflowLevel2 } from '../state/workflow-level2/workflow-level2.model';
import { HttpService } from '../modules/http/http.service';

let provider;

beforeAll(function (done) {
  provider = new PactWeb({
    consumer: 'midgard',
    provider: 'bifrost',
    port: 1234,
    host: '127.0.0.1',
  });

  // required for slower CI environments
  setTimeout(done, 2000);

  // Required if run with `singleRun: false`
  provider.removeInteractions();
});

afterAll(function (done) {
  // tells the mock server to write all currently available interactions into a contract file.
  provider.finalize()
    .then(function () {
      done();
    }, function (err) {
      done.fail(err);
    });
});

describe('create workflowlevel2', () => {
  const newWorkflowLevel2: WorkflowLevel2 = {
    description: 'expected workflow level 2',
    level2_uuid: 'asdsad-sadsda-assd-mock',
    name: 'Test'
  };

  const createdWorkflowLevel2Id = 42;

  beforeAll((done) => {
    provider.addInteraction({
      state: `provider accepts a new workflow level 2`,
      uponReceiving: 'a request to POST a workflow level 2',
      withRequest: {
        method: 'POST',
        path: '/bifrost/workflowlevel2',
        body: newWorkflowLevel2,
        headers: {
          'Content-Type': 'application/json'
        }
      },
      willRespondWith: {
        status: 201,
        body: Matchers.somethingLike({
          id: createdWorkflowLevel2Id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }).then(done, error => done.fail(error));
  });

  it('should create a Workflow level2', (done) => {
    const httpService: HttpService = new HttpService();
    httpService.makeRequest('post', `/bifrost/workflowlevel2`, newWorkflowLevel2).subscribe(response => {
      expect(response.data).toEqual({id : createdWorkflowLevel2Id } );
      done();
    }, error => {
      done.fail(error);
    });
  });
});
