import { Component, OnInit } from '@angular/core';

import { Store, select } from "@ngrx/store";

import * as bookActions from '../state/book.action';
import * as fromBook from '../state/book.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../book.model';

@Component({
  selector: 'app-display-book',
  templateUrl: './display-book.component.html',
  styleUrls: ['./display-book.component.css']
})
export class DisplayBookComponent implements OnInit {

  books: Observable<Book[]>;
  error$: Observable<String>;

  constructor(
    private store: Store<fromBook.AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new bookActions.LoadBooks());
    this.books =this.store.pipe(select(fromBook.getBooks))
    console.log(this.books);
    this.error$ = this.store.pipe(select(fromBook.getBooksError));
  }

  deleteBook(book: Book) {
    if (confirm("Are You Sure You want to Delete the Book?")) {
      this.store.dispatch(new bookActions.DeleteBook(book.id));
    }
  }

  editBook(book: Book) {
    console.log(book)
    this.store.dispatch(new bookActions.LoadBook(book.id));
  }

}
