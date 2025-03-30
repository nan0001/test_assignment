import { Details, DetailsDisplayedField } from '../models/details.model';

export function mapDisplayFields(info: Details | null): DetailsDisplayedField[] | null {
  if (!info) {
    return null;
  }

  return [
    {
      label: 'Title',
      value: info.title ?? '',
      type: 'text',
    },
   {
      label: 'Authors',
      value: info.authors ?? [],
      type: 'array',
    },
   {
      label: 'Description',
      value: info.description ?? '',
      type: 'text',
    },
   {
      label: 'First published at',
      value: info.first_publish_date ?? '',
      type: 'text',
    },
   {
      label: 'Publishers',
      value: info.first_publishers ?? '',
      type: 'array',
    },
    {
      label: 'Number of pages',
      value: info.number_of_pages ? `${info.number_of_pages}` : '',
      type: 'text',
    },
   {
      label: 'Genres',
      value: info.genres ?? '',
      type: 'array',
    },
    {
      label: 'Editions found',
      value: info.editionsCount ? `${info.editionsCount}` : '',
      type: 'text',
    },
  ]
}
