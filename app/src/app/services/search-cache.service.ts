import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchCacheService {
  private cache = new Map();

  public addData(key: string, value: unknown): void {
    this.cache.set(key, value);
  }

  public getData<T>(key: string): T | null {
    return this.cache.get(key) ?? null;
  }

  public clear(): void {
    return this.cache.clear();
  }
}
