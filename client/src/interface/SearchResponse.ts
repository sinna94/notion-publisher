import { Result } from './Result';

export interface SearchResponse {
  hasMore: boolean;
  nextCursor: string | undefined;
  object: string;
  results: Result[];
}
