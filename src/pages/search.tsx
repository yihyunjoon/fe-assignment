import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {searchQuery} from '@/lib/data';
import {Fallback} from '@/components/fallback';

export const SearchPage = () => {
  const [query] = useState('브이하고 있는 사람');
  const [limit] = useState(12);

  const {data, isLoading} = useQuery({
    queryKey: ['search', query, limit],
    queryFn: () => searchQuery(query, limit),
  });

  return (
    <div className="m-auto max-w-3xl p-4">
      <div className="flex flex-row gap-2">
        <Input
          className="flex-[10]"
          type="text"
          defaultValue="브이하고 있는 사람"
          placeholder="검색어를 입력해 주세요."
        />
        <Input
          className="flex-1"
          type="number"
          defaultValue={12}
          min={0}
          placeholder="이미지 개수를 입력해 주세요."
        />
      </div>

      <Button className="mt-2 w-full">검색</Button>

      {isLoading && <Fallback />}
      <div className="mt-4 grid grid-cols-3 gap-1">
        {data?.items.map(item => (
          <a key={item.id}>
            <img src={item.imageUrl} className="aspect-square object-cover" />
          </a>
        ))}
      </div>
    </div>
  );
};
