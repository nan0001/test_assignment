import { Book } from '../models/book.model';
import { BookResponse } from '../models/search-reponse.model';

export function mapBookList(response: BookResponse[], start = 0): Book[] {
  return response.map((book, index) => {
    const splittedKey = book.key.split('/');

    return {
      id: splittedKey[splittedKey.length - 1],
      key: book.key,
      number: start + index + 1,
      title: book.title,
      author: book.author_name,
    }
  })
}
