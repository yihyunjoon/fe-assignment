import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {searchQuery} from '@/lib/data';

export const SearchPage = () => {
  const [query] = useState('브이하고 있는 사람');
  const [limit] = useState(12);

  const {data, isLoading} = useQuery({
    queryKey: ['search', query, limit],
    queryFn: () => searchQuery(query, limit),
  });

  return (
    <div className="p-4">
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

      <pre>{isLoading ? 'loading...' : JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
