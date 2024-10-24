import {useEffect, useState} from 'react';
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

  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: ['search', query, limit],
    queryFn: () => searchQuery(query, limit),
  });

  // 이미지 로드가 완료되면 loadedImages에 추가
  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  // loadedImages가 data.items.length와 같아지면 모든 이미지가 로드된 것으로 판단
  useEffect(() => {
    if (data?.items.length === loadedImages.size) {
      setAllImagesLoaded(true);
    }
  }, [loadedImages]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAllImagesLoaded(false);
    setLoadedImages(new Set());
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
      {error && (
        <div className="mt-4 flex items-center rounded-md bg-red-100 p-4">
          <div className="flex-1 text-red-500 ">
            다음과 같은 에러가 발생하였습니다. {error.message}. 다시 시도하시겠습니까?
          </div>
          <Button variant="outline" className="" onClick={() => refetch()}>
            다시 시도
          </Button>
        </div>
      )}
      {isLoading && <Fallback amount={limit} />}
      <div className="mt-4 grid grid-cols-3 gap-1">
        {data?.items.map(item => (
          <a
            key={item.id}
            href={`https://www.instagram.com/p/${item.shortcode}`}
            target="_blank"
            rel="noreferrer noopener"
            className={`transition-opacity duration-200 ${allImagesLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={item.imageUrl}
              className="aspect-square w-full object-cover "
              onLoad={() => handleImageLoad(item.id)}
            />
          </a>
        ))}
      </div>
    </div>
  );
};
