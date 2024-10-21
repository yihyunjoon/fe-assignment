export interface SearchQueryItem {
  id: string;
  imageUrl: string;
  shortcode: string;
  username: string;
}

export interface SearchQueryResponse {
  items: SearchQueryItem[];
}

export const searchQuery = async (query: string, limit: number) => {
  // TODO: 코드를 완성해 주세요.
};
