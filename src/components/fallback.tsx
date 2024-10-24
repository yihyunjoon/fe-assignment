import {Skeleton} from '@/components/ui/skeleton';

export const Fallback = ({amount}: {amount: number}) => {
  return (
    <div className="mt-4 grid grid-cols-3 gap-1">
      {Array.from({length: amount}).map((_, index) => (
        <Skeleton key={index} className="aspect-square" />
      ))}
    </div>
  );
};
