import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {searchQuery} from '@/lib/data';
import {Fallback} from '@/components/fallback';

export const SearchPage = () => {
  const [queryInput, setQueryInput] = useState('브이하고 있는 사람');
  const [limitInput, setLimitInput] = useState('12');

  const [query, setQuery] = useState(queryInput);
  const [limit, setLimit] = useState(Number(limitInput));

  const {data, isLoading} = useQuery({
    queryKey: ['search', query, limit],
    queryFn: () => searchQuery(query, limit),
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(queryInput);
    setLimit(Number(limitInput));
  };

  return (
    <div className="m-auto max-w-3xl p-4">
      <form onSubmit={handleSearch}>
        <div className="flex flex-row gap-2">
          <Input
            className="flex-[10]"
            type="text"
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
            placeholder="검색어를 입력해 주세요."
          />
          <Input
            className="flex-1"
            type="number"
            value={limitInput}
            onChange={e => setLimitInput(e.target.value)}
            min={0}
            placeholder="이미지 개수를 입력해 주세요."
          />
        </div>
        <Button type="submit" className="mt-2 w-full">
          검색
        </Button>
      </form>

      {isLoading && <Fallback />}
      <div className="mt-4 grid grid-cols-3 gap-1">
        {data?.items.map(item => (
          <a
            key={item.id}
            href={`https://www.instagram.com/p/${item.shortcode}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={item.imageUrl} className="aspect-square object-cover " />
          </a>
        ))}
      </div>
    </div>
  );
};
