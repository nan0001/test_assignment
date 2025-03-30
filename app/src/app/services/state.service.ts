import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

interface State {
  selectedWork: Book | null;
  query: string | null;
}

const initialState: State = {
  selectedWork: null,
  query: null,
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state: State = initialState;

  public setSelectedWork(selectedWork: Book): void {
    this.state = {
      ...this.state,
      selectedWork,
    }
  }

  public getSelectedWork(): Book | null {
    return this.state.selectedWork;
  }

  public resetSelectedWork(): void {
    this.state = {
      ...this.state,
      selectedWork: null,
    };
  }

  public getQuery(): string | null {
    return this.state.query;
  }

  public setQuery(query: string): void {
    this.state = {
      ...this.state,
      query,
    }
  }
}
