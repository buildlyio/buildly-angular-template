import { GraphQlService } from '@libs/midgard-angular/src/lib/modules/graphql/graphql.service';
import { TestBed } from '@angular/core/testing';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import gql from 'graphql-tag';

describe( 'GraphQlService', () => {
  let graphQlBackend: ApolloTestingController;
  let graphQlService: GraphQlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [GraphQlService]
    });
    graphQlBackend = TestBed.get(ApolloTestingController);
    graphQlService = TestBed.get(GraphQlService);
  });

  it('should send a graphQl query and return results', (done) => {
    const queryArgument = `
        {
          authors {
            book {
              id
              name
            }
          }
        }
      `;
    const expectedQuery = gql(queryArgument);
    const mockServerRes = {
      'data': {
        'authors': [
          {
            book: {
              id: 1,
              name: 'book1'
            }
          },
          {
            book: {
              id: 2,
              name: 'book2'
            }
          }
        ]
      }
    };
    graphQlService.watchQuery(queryArgument, {}).subscribe(result => {
      expect(result.data).toEqual(mockServerRes.data);
      done();
    });
    graphQlBackend.expectOne(expectedQuery).flush(mockServerRes);

  });

  afterEach(() => {
    graphQlBackend.verify();
  });

});
