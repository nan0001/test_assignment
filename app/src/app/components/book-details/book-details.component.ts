import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { LibraryService } from '../../services/library.service';
import { Observable, map, take, tap } from 'rxjs';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { DetailsDisplayedField } from '../../models/details.model';
import { mapDisplayFields } from '../../utils/map-display-fields';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-book-details',
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailsComponent implements OnInit {
  @Input() bookId: string = '';

  private libraryService = inject(LibraryService);

  public details$!:Observable<DetailsDisplayedField[] | null>;
  public coverLink = '';
  public isLoading = false;

  ngOnInit(): void {
    this.isLoading = true
    this.details$ = this.libraryService.getWorkInfo(this.bookId)
    .pipe(
      take(1),
      tap(() => {
        this.isLoading = false;
      }),
      map(mapDisplayFields)
      );
    this.coverLink = this.getCoverLink();
  }

  private getCoverLink(): string {
    const imgSize = 'M';
    return `https://covers.openlibrary.org/w/olid/${this.bookId}-${imgSize}.jpg`;
  }
}
