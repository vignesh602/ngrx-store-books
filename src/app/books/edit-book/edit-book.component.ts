import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as bookActions from "../state/book.action";
import * as fromBook from "../state/book.reducer";
import { Book } from "../book.model";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  bookForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<fromBook.AppState>
  ) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      name: ["", Validators.required],
      author: ["", Validators.required],
      id: null
    });

  const book$: Observable<Book> = this.store.select(
    fromBook.getCurrentBook
  )
  book$.subscribe(currentBook => {
    console.log(currentBook)
    if (currentBook) {
      this.bookForm.patchValue({
        name: currentBook.name,
        author: currentBook.author,
        id: currentBook.id
      });
    }
  })
}

updateBook() {
  const updatedBook: Book = {
    name: this.bookForm.get("name").value,
    author: this.bookForm.get("author").value,
    id: this.bookForm.get("id").value
  };
  console.log(updatedBook)

  this.store.dispatch(new bookActions.UpdateBook(updatedBook))
}


}
