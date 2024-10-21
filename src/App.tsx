import {SearchPage} from '@/pages/search';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
