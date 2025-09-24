import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';
import { SWRProvider } from '@/components/providers/swr-provider';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'PetDo - Everything Your Dog Needs',
	description: 'Premium quality products for your furry friends',
	generator: 'v0.app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head>
				<script
					src='https://pay.google.com/gp/p/js/pay.js'
					async
				/>
			</head>
			<body className={inter.className}>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<SWRProvider>
						<Toaster
							position='top-right'
							richColors
						/>
						<div className='flex min-h-screen flex-col'>
							<Header />
							<main className='flex-1'>{children}</main>
							<Footer />
						</div>
					</SWRProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
