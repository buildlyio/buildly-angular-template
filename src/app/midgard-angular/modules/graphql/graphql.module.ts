import { InjectionToken, NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import { Store } from 'projects/midgard-angular/src/lib/modules/store/store';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ReduxCache } from '@libs/midgard-angular/src/lib/modules/graphql/apollo-cache-redux';
import { setContext } from 'apollo-link-context';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../src/environments/environment';
import { OAuthService } from '@libs/midgard-angular/src/lib/modules/oauth/oauth.service';
import { GraphQlService } from '@libs/midgard-angular/src/lib/modules/graphql/graphql.service';

const uri = `${environment.API_URL}/graphql/`; // <-- add the URL of the GraphQL server here

/**
 * a function that will intialiase apollo graphQl client
 * @param {HttpLink} httpLink
 * @param {Store<any>} store - our store in case we want to use it as graphQl cac`he
 * @param {boolean } useReduxCache - wether to use redux as graphQl cache or not
 * @returns {link: ApolloLink; cache: ReduxCache | InMemoryCache}
 */
export function createApollo(httpLink: HttpLink, store: Store<any>, useReduxCache) {
  const cache = (useReduxCache) ? new ReduxCache({store}) : new InMemoryCache();
  const http = httpLink.create(
      {
        uri,
      }
    );
  const auth = setContext((_, { headers }) => {
    // get the authentication token, this is temporary hardcoded
    const token = '94a37ce5e4a7a00f59f939fd57b0a3186db92bfd';
    // return the headers to the context so httpLink can read them
    // in this example we assume headers property exists
    // and it is an instance of HttpHeaders
    if (!token) {
      return {};
    } else {
      return {
        headers: new HttpHeaders().set('Authorization', `Token ${token}`)
      };
    }
  });
  return {
    link: auth.concat(http),
    cache: cache,
  };
}
export const USE_REDUX_CACHE = new InjectionToken<any>('');

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: USE_REDUX_CACHE,
      useValue: true
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, Store, USE_REDUX_CACHE],
    },
    OAuthService,
    GraphQlService
  ],
})
export class MidgardGraphQLModule {}
