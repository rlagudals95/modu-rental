import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../lib';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60',
        className,
      )}
      {...props}
    />
  );
}
