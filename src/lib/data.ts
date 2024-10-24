const SEARCH_URL = 'https://supabase.bzine.co/functions/v1/demo-query/search';

export interface SearchQueryItem {
  id: string;
  imageUrl: string;
  shortcode: string;
  username: string;
}

export interface SearchQueryResponse {
  items: SearchQueryItem[];
}

export interface SearchQueryErrorResponse {
  error: string;
}

export const searchQuery = async (
  query: string,
  limit: number
): Promise<SearchQueryResponse> => {
  const response = await fetch(`${SEARCH_URL}?query=${query}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorData: SearchQueryErrorResponse = await response.json();
    throw new Error(errorData.error);
  }

  const data: SearchQueryResponse = await response.json();
  return data;
};
