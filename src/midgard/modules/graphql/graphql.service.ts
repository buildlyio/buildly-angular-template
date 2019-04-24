import { Injectable } from '@angular/core';
import { http } from 'midgard-core';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class GraphQlService {

  constructor(
    private apollo: Apollo // apollo client instance
  ) {}

  /**
   * query the graphQl endpoint and watch for changes
   * @param query - graphQl query as string
   * @param variables - object with variables of the query
   * @returns {Observable<any>} - the result of the query as an observable
   */
  watchQuery(query: string, variables: {} = null): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: gql(query),
      variables
    }).valueChanges
      .pipe(shareReplay(1));
  }

  /**
   * query the graphQl endpoint just once to fetch data from the server
   * @param query - graphQl query as string
   * @param variables - object with variables of the query
   * @returns {Observable<any>} - the result of the query as an observable
   */
  query(query: string, variables: {} = null): Observable<any> {
    return this.apollo.query<any>({
      query: gql(query),
      fetchPolicy: 'network-only',
      variables
    });
  }

  /**
   * @param mutate - graphQl mutation as string
   * @param variables - object with variables of the query
   * @returns {Observable<any>} - the result of the query as an observable
   */
  mutate(mutation: string, variables: {} = null): Observable<any> {
    return this.apollo.mutate<any>({
      mutation: gql(mutation),
      variables
    });
  }
}
