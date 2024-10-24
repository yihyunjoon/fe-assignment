import {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {searchQuery, type SearchQueryItem} from '@/lib/data';
import {Fallback} from '@/components/fallback';

export const SearchPage = () => {
  const [queryInput, setQueryInput] = useState('브이하고 있는 사람');
  const [limitInput, setLimitInput] = useState('12');

  const [query, setQuery] = useState(queryInput);
  const [limit, setLimit] = useState(Number(limitInput));

  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const {data, isLoading, error, refetch} = useQuery({
    queryKey: ['search', query, limit],
    queryFn: () => searchQuery(query, limit),
    enabled: isQueryEnabled,
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색 버튼 클릭 후 부터 useQuery를 실행하도록 함
    setIsQueryEnabled(true);
    // 이전 query와 limit가 같은 경우 refetch
    if (queryInput === query && Number(limitInput) === limit) {
      refetch();
    } else {
      // 새로운 query와 limit가 입력된 경우 초기화 후 새로운 query 실행
      setQuery(queryInput);
      setLimit(Number(limitInput));
    }
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
      {data && <ImageGrid items={data.items} />}
    </div>
  );
};

interface ImageGridProps {
  items: SearchQueryItem[];
}

function ImageGrid({items}: ImageGridProps) {
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // 이미지 로드가 완료되면 loadedImages에 추가
  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set([...prev, id]));
  };

  // loadedImages가 data.items.length와 같아지면 모든 이미지가 로드된 것으로 판단
  useEffect(() => {
    if (items.length === loadedImages.size) {
      setAllImagesLoaded(true);
    }
  }, [loadedImages]);

  return (
    <>
      <Fallback amount={items.length} className={allImagesLoaded ? 'hidden' : 'grid'} />
      <div
        className={`mt-4 grid grid-cols-3 gap-1 ${allImagesLoaded ? 'grid' : 'hidden'}`}
      >
        {items.map(item => (
          <ImageCard
            key={item.id}
            item={item}
            handleImageLoad={handleImageLoad}
            // 9의 배수보다 1 적은 인덱스 (8, 17, 26, ...)의 요소가 마지막 요소가 아니라면 2x2 크기로 확장
            className="[&:nth-child(9n-1):not(:last-child)]:col-span-2 [&:nth-child(9n-1):not(:last-child)]:row-span-2"
          />
        ))}
      </div>
    </>
  );
}

interface ImageCardProps {
  item: SearchQueryItem;
  handleImageLoad: (id: string) => void;
  className?: string;
}

function ImageCard({item, handleImageLoad, className}: ImageCardProps) {
  return (
    <a
      key={item.id}
      href={`https://www.instagram.com/p/${item.shortcode}`}
      target="_blank"
      rel="noreferrer noopener"
      className={className}
    >
      <img
        src={item.imageUrl}
        className="aspect-square w-full object-cover"
        onLoad={() => handleImageLoad(item.id)}
      />
    </a>
  );
}
