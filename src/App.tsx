import {Input} from '@/components/ui/input';
import {Button} from './components/ui/button';

const App = () => {
  return (
    <div className="p-4">
      <div className="flex flex-row gap-2">
        <Input type="text" placeholder="검색어를 입력해주세요" />
        <Input
          type="number"
          defaultValue={12}
          min={12}
          placeholder="이미지 개수를 입력해주세요"
        />
      </div>

      <Button className="mt-2 w-full">검색</Button>

      {/* 이미지 그리드 */}
    </div>
  );
};

export default App;
