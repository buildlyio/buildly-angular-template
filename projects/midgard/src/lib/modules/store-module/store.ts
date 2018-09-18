import { Injectable } from '@angular/core';
import { redux } from 'midgard-core';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import { midgardEpics } from '@libs/midgard/src/lib/state/midgard.epics';
import { midgardReducer } from '@libs/midgard/src/lib/state/midgard.reducer';
import { Observable } from 'rxjs';


@Injectable()
export class Store<T> extends Observable<T> {
  constructor() {
    super();
    const reducers = {
      midgardReducer
      // add othe modules reducers here
    };
    const epics = [
      midgardEpics
      // add other modules epics here
    ];
    const combinedReducers = redux.combineReducers(reducers); // combine the reducers to one reducer that can be used when creating the store
    const combinedEpics = combineEpics(...epics); // combine redux-observable epics
    const epicMiddleware = createEpicMiddleware(); // create an instance of redux-observable middleware
    const store = redux.createStore(
      combinedReducers,
      composeWithDevTools(
        redux.applyMiddleware(epicMiddleware),
        // other store enhancers if any
      )
    );
    epicMiddleware.run(combinedEpics); // activate redux-observable epics
    return store;
  }

  dispatch: (action: any) => {};
  getState: () => any;
}
