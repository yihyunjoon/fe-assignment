import {cn} from '@/lib/utils';
import {Skeleton} from '@/components/ui/skeleton';

export const Fallback = ({amount, className}: {amount: number; className?: string}) => {
  return (
    <div className={cn('mt-4 grid grid-cols-3 gap-1', className)}>
      {Array.from({length: amount}).map((_, index) => (
        <Skeleton key={index} className="aspect-square" />
      ))}
    </div>
  );
};
