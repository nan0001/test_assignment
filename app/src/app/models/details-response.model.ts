export interface WorkDetails {
  title: string;
  key: string;
  authors: Author[];
  type: string;
  description?: {
    type: string;
    value: string;
  } | string;
  covers?: number[];
  subjects?: string[];
}

export interface Author {
  author: {
    key: string;
  };
  type : {
    key: string;
  };
}

export interface WorkEdition {
  links: {
    self: string;
    work: string;
  };
  size: number;
  entries: EditionEntry[];
}

export interface EditionEntry {
  authors: {key: string}[];
  covers: number[];
  key: string;
  languages: {key: string}[];
  number_of_pages: number;
  publish_date: string;
  publishers: string[];
  title: string;
  genres?: string[];
  notes?: {
    type: string;
    value: string;
  }
}
