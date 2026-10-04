import type { Metadata } from 'next';
import { CampaignProvider } from '@/components/store';
import { Shell } from '@/components/shell';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/manrope';
import './globals.css';
export const metadata: Metadata = { title: { default: 'AI LaunchPass — Your first AI project starts here', template: '%s | AI LaunchPass' }, description: 'Discover your AI project, try a workshop registration, and explore a transparent 500-registration growth simulation. An independent NxtWave challenge prototype.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CampaignProvider><Shell>{children}</Shell></CampaignProvider></body></html>;
}
