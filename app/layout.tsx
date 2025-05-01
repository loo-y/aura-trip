import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
	title: 'Immersive Image Gallery',
	description: 'Beautiful animated image gallery with smooth transitions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning className="dark">
			<body className={`scrollbar-hide-body h-screen`}>
				<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
