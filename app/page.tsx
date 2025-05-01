import { LandingHero } from '@/components/landing-hero';
import { Header } from '@/components/header';

export default function Home() {
	return (
		<main className="w-full h-screen bg-background flex flex-col">
			<Header />
			<LandingHero />
		</main>
	);
}
