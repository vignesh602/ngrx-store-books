import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { bookReducer } from "./state/book.reducer";
import { EffectsModule, Actions} from '@ngrx/effects';
import { BookEffects } from "./state/book.effects";

import { AddBookComponent } from './add-book/add-book.component';
import { DisplayBookComponent } from './display-book/display-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { BooksComponent } from './books/books.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BookService } from './book.service';

const booksRoutes: Routes = [{ path: "", component: BooksComponent }];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(booksRoutes),
    StoreModule.forFeature("books", bookReducer),
    EffectsModule.forFeature([BookEffects]),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [BookService],
  declarations: [AddBookComponent, DisplayBookComponent, EditBookComponent, BooksComponent]
})
export class BooksModule { }
