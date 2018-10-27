import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as bookActions from "../state/book.action";
import * as fromBook from "../state/book.reducer";
import { Book } from "../book.model";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromBook.AppState>
  ) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      name: ["", Validators.required],
      author: ["", Validators.required],
    });
  }

  createBook() {
    const newBook: Book = {
      name: this.bookForm.get("name").value,
      author: this.bookForm.get("author").value,
      id: Date.now()
    };

    this.store.dispatch(new bookActions.CreateBook(newBook));

    this.bookForm.reset();
  }

}
