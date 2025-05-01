'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { MicIcon, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { AudioVisualizer } from '@/components/audio-visualizer';
import { useToast } from '@/hooks/use-toast';

export function LandingHero() {
	const router = useRouter();
	const { toast } = useToast();
	const heroRef = useRef<HTMLDivElement>(null);
	const [inputValue, setInputValue] = useState('');
	const [isRecording, setIsRecording] = useState(false);
	const [isProcessingInput, setIsProcessingInput] = useState(false);

	// Background images for inspiration
	const backgrounds = [
		'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg',
		'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg',
		'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
	];

	// Animation setup
	useEffect(() => {
		if (heroRef.current) {
			gsap.fromTo(
				heroRef.current.querySelectorAll('.animate-item'),
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
					duration: 0.8,
					ease: 'power2.out',
				},
			);
		}
	}, []);

	// Handle voice input
	const startRecording = async () => {
		try {
			// In a real implementation, this would use WebRTC to capture audio
			setIsRecording(true);
			toast({
				title: 'Listening...',
				description: 'Tell us about your travel plans',
			});

			// Simulate recording for demo purposes
			setTimeout(() => {
				setIsRecording(false);
				setInputValue('I want to visit Japan for 10 days with cultural experiences and beautiful nature');
				toast({
					title: 'Voice captured!',
					description: 'Processing your request...',
				});
			}, 5000);
		} catch (error) {
			console.error('Error accessing microphone:', error);
			setIsRecording(false);
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Could not access microphone. Please check permissions.',
			});
		}
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!inputValue.trim()) {
			toast({
				variant: 'destructive',
				title: 'Input required',
				description: 'Please enter your travel preferences or use voice input.',
			});
			return;
		}

		setIsProcessingInput(true);

		// Simulate processing the input
		setTimeout(() => {
			// In a real app, this would send the input to a backend for processing
			router.push('/itinerary');
		}, 3000);
	};

	return (
		<div ref={heroRef} className="min-h-screen w-full relative flex flex-col">
			{/* Background with overlay */}
			<div className="absolute inset-0 z-0">
				<Image src={backgrounds[0]} alt="Travel destination" fill className="object-cover" priority />
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			{/* Hero content */}
			<div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-screen z-10 text-white">
				<h1 className="text-4xl md:text-6xl font-bold text-center mb-6 animate-item">Discover Your Perfect Aura Trip</h1>
				<p className="text-xl md:text-2xl text-center mb-12 max-w-2xl animate-item">
					Tell us what you're looking for, and we'll craft the ideal travel experience for you.
				</p>

				{/* Input form */}
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-4xl animate-item bg-black/30 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/10 outline-none focus:outline-none"
				>
					<div className="relative flex items-center">
						<Input
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							placeholder="Describe your dream vacation..."
							className="pr-24 py-6 text-base bg-white/10 border-white/20 text-white placeholder:text-white/60 outline-none !focus:outline-none"
							disabled={isRecording || isProcessingInput}
						/>
						<div className="absolute right-2 flex space-x-2">
							<Button
								type="button"
								size="icon"
								variant="ghost"
								className="text-white hover:bg-white/20"
								onClick={startRecording}
								disabled={isRecording || isProcessingInput}
							>
								<MicIcon className={`h-5 w-5 ${isRecording ? 'text-red-500' : 'text-white'}`} />
							</Button>
							<Button
								type="submit"
								size="icon"
								className="bg-white/20 hover:bg-white/30 text-white"
								disabled={isRecording || isProcessingInput || !inputValue.trim()}
							>
								<Send className="h-5 w-5" />
							</Button>
						</div>
					</div>

					{/* Voice visualization */}
					{isRecording && (
						<div className="mt-4 flex justify-center">
							<AudioVisualizer />
						</div>
					)}

					{/* Processing indicator */}
					{isProcessingInput && (
						<div className="mt-4 flex justify-center items-center space-x-2">
							<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
							<span>Processing your request...</span>
						</div>
					)}

					<div className="mt-4 text-sm text-white/70 text-center">
						Try saying: "I want to visit Japan for 10 days with cultural experiences"
					</div>
				</form>

				{/* Features */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center animate-item">
						<div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-mic"
							>
								<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
								<path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
								<line x1="12" x2="12" y1="19" y2="22"></line>
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Voice Recognition</h3>
						<p>Speak naturally and we'll understand your travel preferences</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center animate-item">
						<div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-map"
							>
								<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
								<line x1="9" x2="9" y1="3" y2="18"></line>
								<line x1="15" x2="15" y1="6" y2="21"></line>
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Smart Planning</h3>
						<p>Get personalized itineraries based on your preferences</p>
					</div>

					<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-center animate-item">
						<div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-sparkles"
							>
								<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
								<path d="M5 3v4"></path>
								<path d="M19 17v4"></path>
								<path d="M3 5h4"></path>
								<path d="M17 19h4"></path>
							</svg>
						</div>
						<h3 className="text-xl font-semibold mb-2">Unique Experiences</h3>
						<p>Discover hidden gems and authentic local experiences</p>
					</div>
				</div>
			</div>
		</div>
	);
}
