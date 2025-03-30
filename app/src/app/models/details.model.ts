export interface Details {
  title: string;
  authors: string[];
  description?: string;
  first_publish_date?: string;
  first_publishers?: string[];
  number_of_pages?: number;
  genres?: string[];
  editionsCount?: number;
}

export interface DetailsDisplayedField {
  label: string;
  value: string | string[];
  type: 'text' | 'array';
};
