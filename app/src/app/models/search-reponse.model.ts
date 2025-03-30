export interface SearchResponse {
  docs: BookResponse[];
  documentation_url: string;
  numFound: number;
  numFoundExact: boolean;
  num_found: number;
  offset: null;
  q: string;
  start: number;
}

export interface BookResponse {
  author_name: string[];
  key: string;
  title: string;
  editions: WorkEditions;
}

export interface WorkEditions {
  numFound: number;
  numFoundExact: boolean;
  start: number;
  docs: { key: string; title: string }[]
}
