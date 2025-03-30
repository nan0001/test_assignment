import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, combineLatest, map, of, tap } from 'rxjs';
import { SearchResponse } from '../models/search-reponse.model';
import { WorkDetails, WorkEdition } from '../models/details-response.model';
import { Details } from '../models/details.model';
import { mapBookDetails } from '../utils/map-book-details';
import { SearchCacheService } from './search-cache.service';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private http = inject(HttpClient);
  private searchCacheSevice = inject(SearchCacheService);
  private stateService = inject(StateService);

  private baseLink = 'https://openlibrary.org/';

  public getBooksList(query: string, page = 1): Observable<SearchResponse | null> {
    const formattedQuery = query.replaceAll(' ', '+');
    const requestedFields = ['key', 'title', 'author_name', 'editions'];
    const searchLink = `${this.baseLink}search.json?title=${formattedQuery}&fields=${requestedFields.join()}&page=${page}`;
    const cachedResponse = this.searchCacheSevice.getData<SearchResponse>(searchLink);

    if (cachedResponse) {
      return of(cachedResponse);
    }

    return this.http.get<SearchResponse>(searchLink).pipe(
      tap(response => this.searchCacheSevice.addData(searchLink, response)),
      catchError(() => {
      return of(null);
    }));
  }

  public getWorkDetails(id: string): Observable<WorkDetails | null> {
    return this.http.get<WorkDetails>(`https://openlibrary.org/works/${id}.json`)
    .pipe(catchError(() => {
      return of(null);
    }));
  }

  public getWorkEditions(id: string): Observable<WorkEdition | null> {
    return this.http.get<WorkEdition>(`https://openlibrary.org/works/${id}/editions.json`)
    .pipe(catchError(() => {
      return of(null);
    }));
  }

  public getWorkInfo(id: string): Observable<Details | null> {
    return combineLatest([this.getWorkDetails(id), this.getWorkEditions(id)])
    .pipe(
        map(([workDetails, editions]) => mapBookDetails(workDetails, editions, this.stateService.getSelectedWork())),
    );
  }
}
