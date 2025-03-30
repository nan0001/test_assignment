import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { NgOptimizedImage, AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { LibraryService } from '../../services/library.service';
import { BehaviorSubject, take } from 'rxjs';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { mapBookList } from '../../utils/map-book-list';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { HighlightWordsDirective } from '../../directives/highlight-words.directive';
import { SearchCacheService } from '../../services/search-cache.service';

@Component({
  selector: 'app-book-search',
  imports: [
    NgOptimizedImage,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    AsyncPipe,
    HighlightWordsDirective,
  ],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSearchComponent implements OnInit {
  public query: string | null = null;
  public emptyQuery = false;
  public bookList$ = new BehaviorSubject<Book[] | null>(null);
  public totalResults = 0;
  public isLoadingResults = false;
  public currentPageIndex = 0;

  public displayedColumns: string[] = ['number', 'name', 'author'];

  private libraryService = inject(LibraryService);
  private router = inject(Router);
  private stateService = inject(StateService);
  private searchCacheService = inject(SearchCacheService);

  ngOnInit(): void {
    const savedQuery = this.stateService.getQuery();
    if (savedQuery) {
      this.query = savedQuery;
      this.loadBooks(savedQuery);
    }
    this.stateService.resetSelectedWork();
  }

  public search(): void {
    this.searchCacheService.clear();

    if (!this.query) {
      this.emptyQuery = true;
      return;
    }

    this.stateService.setQuery(this.query);
    this.loadBooks(this.query);
  }

  public updateQuery(value: string): void {
    this.emptyQuery = false;
    this.query = value;
    this.bookList$.next(null);
  }

  public handlePageEvent(pageEvent: PageEvent): void {
    this.currentPageIndex = pageEvent.pageIndex;
    this.loadBooks(this.query as string, pageEvent.pageIndex + 1);
  }

  public openDetails(book: Book): void {
    this.stateService.setSelectedWork(book);
    this.router.navigate([`./details/${ book.id }`]);
  }

  private loadBooks(query: string, page = 1): void {
    this.isLoadingResults = true;

    this.libraryService.getBooksList(query, page).pipe(
      take(1),
    ).subscribe(response => {
      this.isLoadingResults = false;

      if(!response || !response?.docs?.length) {
        this.bookList$.next([]);
        return;
      }

      this.totalResults = response.numFound;
      this.bookList$.next(mapBookList(response.docs, response.start));
    });
  }
}
