import { Result } from "./Result";

export interface SearchResponse {
    hasMore: boolean;
    nexrCursor: string | null;
    object: string;
    results: Result[];
}