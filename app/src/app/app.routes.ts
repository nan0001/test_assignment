import { Routes } from '@angular/router';
import { BookSearchComponent } from './components/book-list/book-search.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { bookSelectedByUserGuard } from './guards/book-selected-by-user.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: BookSearchComponent },
  {
    path: 'details/:bookId',
    pathMatch: 'full',
    component: BookDetailsComponent,
    canActivate: [bookSelectedByUserGuard],
  },
  { path: '**', redirectTo: '' },
];
