// Generated by https://quicktype.io

export interface DiscoverResponse {
  results: Result[];
}

export interface Result {
  title: string;
  highlightedTitle: string;
  href: string;
  resultType: ResultType;
  vicinity?: string;
  highlightedVicinity?: string;
  position?: number[];
  id?: string;
  distance?: number;
  chainIds?: string[];
  bbox?: number[];
  completion?: string;
}

export enum ResultType {
  Address = "address",
  Category = "category",
  Place = "place",
  Query = "query"
}
