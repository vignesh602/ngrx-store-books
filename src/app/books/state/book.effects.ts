import { Actions, Effect, ofType} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { BookService } from '../book.service';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as bookActions from '../state/book.action';
import { Book } from '../book.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class BookEffects {

  constructor(
    private actions$: Actions,
    private bookService: BookService
  ){}

  @Effect()
  loadBooks : Observable<Action> = this.actions$.pipe(
    ofType<bookActions.LoadBooks>(
      bookActions.bookActionTypes.LOAD_BOOKS
    ),
    mergeMap((actions: bookActions.LoadBooks) =>
    this.bookService.getBooks().pipe(
      map(
        (books: Book[]) =>
          new bookActions.LoadBooksSuccess(books)
      ),
      catchError(err => of(new bookActions.LoadBooksFail(err)))
    )
    )
  )

  @Effect()
  loadBook : Observable<Action> = this.actions$.pipe(
    ofType<bookActions.LoadBook>(
      bookActions.bookActionTypes.LOAD_BOOK
    ),
    mergeMap((action: bookActions.LoadBook) =>
    this.bookService.getBookById(action.payload).pipe(
      map(
        (book: Book) =>
          new bookActions.LoadBookSuccess(book)
      ),
      catchError(err => of(new bookActions.LoadBookFail(err)))
    )
    )
  )

  @Effect()
  createBook : Observable<Action> = this.actions$.pipe(
    ofType<bookActions.CreateBook>(
      bookActions.bookActionTypes.CREATE_BOOK
    ),
    map((action: bookActions.CreateBook) => action.payload),
    mergeMap((book : Book) =>
    this.bookService.createBook(book).pipe(
      map(
        (newBook: Book) =>
          new bookActions.CreateBookSuccess(newBook)
      ),
      catchError(err => of(new bookActions.CreateBookFail(err)))
    )
    )
  )

  @Effect()
  updateBook : Observable<Action> = this.actions$.pipe(
    ofType<bookActions.UpdateBook>(
      bookActions.bookActionTypes.UPDATE_BOOK
    ),
    map((action: bookActions.UpdateBook) => action.payload),
    mergeMap((book : Book) =>
    this.bookService.updateBook(book).pipe(
      map(
        (updateBook: Book) =>
          new bookActions.UpdateBookSuccess({
            id: updateBook.id,
            changes: updateBook
          })
      ),
      catchError(err => of(new bookActions.UpdateBookFail(err)))
    )
    )
  )

  @Effect()
  deleteBook : Observable<Action> = this.actions$.pipe(
    ofType<bookActions.DeleteBook>(
      bookActions.bookActionTypes.DELETE_BOOK
    ),
    map((action: bookActions.DeleteBook) => action.payload),
    mergeMap((id: number) =>
    this.bookService.deleteBook(id).pipe(
      map(
        () =>
          new bookActions.DeleteBookSuccess(id)),
      catchError(err => of(new bookActions.DeleteBookFail(err)))
    )
    )
  )
}