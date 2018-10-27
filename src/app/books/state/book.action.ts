import { Action } from "@ngrx/store";
import { Book } from "../book.model";

import { Update } from '@ngrx/entity'

export enum bookActionTypes {
  LOAD_BOOKS = "[Book] Load Books",
  LOAD_BOOKS_SUCCESS = "[Book] Load Books Success",
  LOAD_BOOKS_FAIL = "[Book] Load Books Fail",
  LOAD_BOOK = "[Book] Load Book",
  LOAD_BOOK_SUCCESS = "[Book] Load Book Success",
  LOAD_BOOK_FAIL = "[Book] Load Book Fail",
  CREATE_BOOK = "[Book] Create Book",
  CREATE_BOOK_SUCCESS = "[Book] Create Book Success",
  CREATE_BOOK_FAIL = "[Book] Create Book Fail",
  UPDATE_BOOK = "[Book] Update Book",
  UPDATE_BOOK_SUCCESS = "[Book] Update Book Success",
  UPDATE_BOOK_FAIL = "[Book] Update Book Fail",
  DELETE_BOOK = "[Book] Delete Book",
  DELETE_BOOK_SUCCESS = "[Book] Delete Book Success",
  DELETE_BOOK_FAIL = "[Book] Delete Book Fail",
}
  // actions for loading books
export class LoadBooks implements Action {
  readonly type = bookActionTypes.LOAD_BOOKS;
}

export class LoadBooksSuccess implements Action {
  readonly type = bookActionTypes.LOAD_BOOKS_SUCCESS;
  constructor(public payload: Book[]){
    console.log(payload)
  }
}

export class LoadBooksFail implements Action {
  readonly type = bookActionTypes.LOAD_BOOKS_FAIL;
  constructor(public payload: string){}
}
//  actions for loading single book
export class LoadBook implements Action {
  readonly type = bookActionTypes.LOAD_BOOK;
  constructor(public payload: number){}
}

export class LoadBookSuccess implements Action {
  readonly type = bookActionTypes.LOAD_BOOK_SUCCESS;
  constructor(public payload: Book){
    console.log(payload)
  }
}

export class LoadBookFail implements Action {
  readonly type = bookActionTypes.LOAD_BOOK_FAIL;
  constructor(public payload: string){}
}
  //  actions for creating book 
export class CreateBook implements Action {
  readonly type = bookActionTypes.CREATE_BOOK;
  constructor(public payload: Book){}
}

export class CreateBookSuccess implements Action {
  readonly type = bookActionTypes.CREATE_BOOK_SUCCESS;
  constructor(public payload: Book){
    console.log(payload)
  }
}

export class CreateBookFail implements Action {
  readonly type = bookActionTypes.CREATE_BOOK_FAIL;
  constructor(public payload: string){}
}

//update
export class UpdateBook implements Action {
  readonly type = bookActionTypes.UPDATE_BOOK;
  constructor(public payload: Book){}
}

export class UpdateBookSuccess implements Action {
  readonly type = bookActionTypes.UPDATE_BOOK_SUCCESS;
  constructor(public payload: Update<Book>){
    console.log(payload)
  }
}

export class UpdateBookFail implements Action {
  readonly type = bookActionTypes.UPDATE_BOOK_FAIL;
  constructor(public payload: string){}
}
//delete
export class DeleteBook implements Action {
  readonly type = bookActionTypes.DELETE_BOOK;
  constructor(public payload: number){}
}

export class DeleteBookSuccess implements Action {
  readonly type = bookActionTypes.DELETE_BOOK_SUCCESS;
  constructor(public payload: number){
    console.log(payload)
  }
}

export class DeleteBookFail implements Action {
  readonly type = bookActionTypes.DELETE_BOOK_FAIL;
  constructor(public payload: string){}
}




export type Action = LoadBooks | LoadBooksSuccess |  LoadBooksFail | LoadBook | LoadBookFail 
                      | LoadBookSuccess | CreateBook | CreateBookFail | CreateBookSuccess 
                      | DeleteBook | DeleteBookFail | DeleteBookSuccess | UpdateBook | UpdateBookSuccess | UpdateBookFail;