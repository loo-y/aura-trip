'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GalleryImage } from '@/data/images';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import Image from 'next/image';

interface GalleryCarouselProps {
	images: GalleryImage[];
	onImageClick: (image: GalleryImage, e: React.MouseEvent) => void;
	selectedImageId?: string;
}

export function GalleryCarousel({ images, onImageClick, selectedImageId }: GalleryCarouselProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);
	const autoScrollInterval = useRef<NodeJS.Timeout>();

	useEffect(() => {
		// Initialize GSAP animation for each image card with 45-degree tilt
		const imageCards = document.querySelectorAll('.image-card');

		gsap.fromTo(
			imageCards,
			{
				y: 100,
				opacity: 0,
				rotateX: '45deg',
				transformPerspective: 1000,
			},
			{
				y: 0,
				opacity: 1,
				rotateX: '45deg',
				transformPerspective: 1000,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out',
			},
		);

		// Auto-scroll functionality
		const startAutoScroll = () => {
			if (!trackRef.current) return;

			const scrollAmount = 1; // Pixels per frame
			let currentScroll = 0;

			autoScrollInterval.current = setInterval(() => {
				if (!isDragging.current && trackRef.current) {
					currentScroll += scrollAmount;
					if (currentScroll >= trackRef.current.scrollWidth - trackRef.current.clientWidth) {
						currentScroll = 0;
					}
					trackRef.current.scrollLeft = currentScroll;
				}
			}, 30);
		};

		startAutoScroll();

		return () => {
			if (autoScrollInterval.current) {
				clearInterval(autoScrollInterval.current);
			}
		};
	}, []);

	const handleMouseDown = (e: React.MouseEvent) => {
		if (!trackRef.current) return;
		isDragging.current = true;
		startX.current = e.pageX - trackRef.current.offsetLeft;
		scrollLeft.current = trackRef.current.scrollLeft;
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDragging.current || !trackRef.current) return;
		e.preventDefault();
		const x = e.pageX - trackRef.current.offsetLeft;
		const walk = (x - startX.current) * 2;
		trackRef.current.scrollLeft = scrollLeft.current - walk;
	};

	const handleMouseUp = () => {
		isDragging.current = false;
	};

	const cardVariants = {
		hover: {
			scale: 1.05,
			rotateY: 15,
			boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
			transition: { duration: 0.3, ease: 'easeOut' },
		},
		initial: {
			scale: 1,
			rotateY: 0,
			boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
			transition: { duration: 0.3, ease: 'easeOut' },
		},
	};

	return (
		<div className="relative w-full overflow-hidden perspective-1000" ref={wrapperRef}>
			<div
				ref={trackRef}
				className="carousel-track flex items-start gap-6 md:gap-8 overflow-x-auto pb-12 pt-4 cursor-grab scroll-smooth hide-scrollbar transform-style-3d rotate-x-45"
				style={{
					transform: 'rotateX(45deg)',
					transformStyle: 'preserve-3d',
					perspective: '1000px',
				}}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
			>
				{images.map((image) => (
					<motion.div
						key={image.id}
						className={cn(
							'image-card flex-none w-[350px] md:w-[450px] rounded-xl overflow-hidden relative transform-gpu',
							'transition-all duration-300 ease-out backdrop-blur-sm',
							selectedImageId === image.id ? 'opacity-0' : 'opacity-100',
						)}
						variants={cardVariants}
						initial="initial"
						whileHover="hover"
						onClick={(e) => onImageClick(image, e)}
						id={`gallery-image-${image.id}`}
					>
						<div className="aspect-[4/3] w-full relative">
							<Image
								src={image.src}
								alt={image.alt}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover transition-all will-change-transform"
								quality={90}
								priority={parseInt(image.id) <= 3}
							/>
						</div>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 opacity-0 hover:opacity-100 transition-opacity duration-300">
							<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
								<p className="font-medium text-lg">{image.alt}</p>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			<div className="absolute left-0 bottom-0 w-full h-32 pointer-events-none bg-gradient-to-t from-background to-transparent opacity-90"></div>
		</div>
	);
}
