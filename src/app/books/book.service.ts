import { Injectable } from "@angular/core";
import { forkJoin, Observable } from "rxjs";
import { Book } from "./book.model";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class BookService {
  private booksUrl = "http://localhost:3000/books";

  constructor(private http: HttpClient){}


  // getBooks(){
  //   return forkJoin(
  //     this.http.get(this.booksUrl)
  //   )
  // }

  getBooks(): Observable<Book[]>{
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBookById(payload: number): Observable<Book> {
    return this.http.get<Book>(`${this.booksUrl}/${payload}`);
  }

  createBook(payload: Book): Observable<Book> {
    console.log(payload)
    return this.http.post<Book>(this.booksUrl, payload);
  }

  updateBook(book: Book): Observable<Book> {
    console.log(book)
    return this.http.patch<Book>(
      `${this.booksUrl}/${book.id}`,
      book
    );
  }

  deleteBook(payload: number) {
    return this.http.delete(`${this.booksUrl}/${payload}`);
  }
}