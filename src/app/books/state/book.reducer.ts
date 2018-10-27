import { Book } from "../book.model";
import * as fromRoot from "../../state/app-state";
import * as booksActions from "../state/book.action";

import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity'

import { createFeatureSelector, createSelector } from "@ngrx/store"

export interface BookState extends EntityState<Book> {
  selectedBookId: number | null;
  loading: boolean,
  loaded: boolean,
  error: string
}

export interface AppState extends fromRoot.AppState {
  books : BookState;
}

export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const defaultBook: BookState = {
  ids: [],
  entities: {},
  selectedBookId: null,
  loading: false,
  loaded: false,
  error: ''
}

export const initialState = booksAdapter.getInitialState(defaultBook)

export function bookReducer(state = initialState, action: booksActions.Action): BookState {
  switch(action.type){
    case booksActions.bookActionTypes.LOAD_BOOKS:{
      return {
        ...state,
        loading: true
      }
    }
    case booksActions.bookActionTypes.LOAD_BOOKS_SUCCESS: {
      return booksAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      })
    }
    case booksActions.bookActionTypes.LOAD_BOOKS_FAIL : {
      return {
        ...state,
        entities : {},
        loading: false,
        loaded: false,
        error: action.payload
      }
    }
   // load book
    case booksActions.bookActionTypes.LOAD_BOOK_SUCCESS: {
      return booksAdapter.addOne(action.payload, {
        ...state,
        selectedBookId: action.payload.id
      });
    }
    case booksActions.bookActionTypes.LOAD_BOOK_FAIL : {
      return {
        ...state,
        error: action.payload
      };
    }

    // create book
    case booksActions.bookActionTypes.CREATE_BOOK: {
      return booksAdapter.addOne(action.payload, state);
    }

    case booksActions.bookActionTypes.CREATE_BOOK_FAIL : {
      return {
        ...state,
        error: action.payload
      };
    }

    // update book
    case booksActions.bookActionTypes.UPDATE_BOOK_SUCCESS: {
      return booksAdapter.updateOne(action.payload, state);
    }
    
    case booksActions.bookActionTypes.UPDATE_BOOK_FAIL : {
      return {
        ...state,
        error: action.payload
      };
    }

    // delete book
    case booksActions.bookActionTypes.DELETE_BOOK: {
      return booksAdapter.removeOne(action.payload, state);
    }
    
    case booksActions.bookActionTypes.DELETE_BOOK_FAIL : {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state
    }
  }
}

export const getBooksFeatureSelector = createFeatureSelector<BookState>(
  "books"
);

export const getBooks = createSelector(
  getBooksFeatureSelector,
  booksAdapter.getSelectors().selectAll
)

export const getBooksLoading = createSelector(
  getBooksFeatureSelector,
  (state: BookState) => state.loading
)

export const getBooksLoaded = createSelector(
  getBooksFeatureSelector,
  (state: BookState) => state.loaded  
)

export const getBooksError = createSelector(
  getBooksFeatureSelector,
  (state: BookState) => state.error
)

export const getCurrentBookId = createSelector(
  getBooksFeatureSelector,
  (state: BookState) => state.selectedBookId
)

export const getCurrentBook = createSelector(
  getBooksFeatureSelector,
  getCurrentBookId,
  state => state.entities[state.selectedBookId]
)