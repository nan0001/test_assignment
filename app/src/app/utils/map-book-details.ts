import { Book } from '../models/book.model';
import { WorkDetails, WorkEdition } from '../models/details-response.model';
import { Details } from '../models/details.model';

export function mapBookDetails(
  workDetails: WorkDetails | null, editions: WorkEdition | null, selectedWork: Book | null
  ): Details | null {
    if (!workDetails || !editions || !selectedWork) {
      return null;
    }

    const editionsSortedByDate =
    editions.entries
    .filter(entry => !!entry.publish_date)
    .sort((a,b) =>
      new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime()
    );

    const firstPublishedEdition = !!editionsSortedByDate.length ? editionsSortedByDate[0] : editions.entries[0];

    return {
      title: workDetails.title,
      authors: selectedWork.author,
      description: typeof workDetails.description === 'string' ? workDetails.description : workDetails.description?.value,
      editionsCount: editions.size,
      number_of_pages: firstPublishedEdition.number_of_pages,
      first_publish_date: firstPublishedEdition.publish_date,
      first_publishers: firstPublishedEdition.publishers,
      genres: firstPublishedEdition.genres,
    }
}
