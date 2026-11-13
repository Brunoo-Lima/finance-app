import { NotFound } from '@/components/not-found/not-found';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | MasterCash',
  description: '404 | MasterCash',
};
export default function NotFoundPage() {
  return <NotFound />;
}
