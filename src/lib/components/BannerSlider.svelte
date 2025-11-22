<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
const images = [
		{
			src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop", 
			alt: "Agricultural Machine Harvesting" 
		},
		{
			src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1200&auto=format&fit=crop", 
			alt: "Farmer in rice field" 
		},
		{
			src: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1200&auto=format&fit=crop", 
			alt: "Wheat and Bran close up" 
		}
	];

	let currentIndex = $state(0);
	let timer: any;

	const nextSlide = () => { currentIndex = (currentIndex + 1) % images.length; };
	const prevSlide = () => { currentIndex = (currentIndex - 1 + images.length) % images.length; };

	onMount(() => {
		startTimer();
		return () => stopTimer();
	});

	function startTimer() { timer = setInterval(nextSlide, 3000); }
	function stopTimer() { clearInterval(timer); }
</script>

<div 
	class="card w-[75%] mx-auto h-[400px] relative group overflow-hidden border-surface-200-800"
	onmouseenter={stopTimer}
	onmouseleave={startTimer}
	role="region"
	aria-label="Banner Slider"
>
	
	{#each images as image, index}
		<div 
			class="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out bg-surface-100-900"
			class:opacity-100={index === currentIndex}
			class:opacity-0={index !== currentIndex}
		>
			<img src={image.src} alt={image.alt} class="w-full h-full object-cover" />
		</div>
	{/each}

	<button 
		onclick={prevSlide}
		class="btn-icon absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all bg-white/80 hover:bg-white text-black shadow-md"
		aria-label="Previous Slide"
	>
		<ChevronLeft size={28} />
	</button>

	<button 
		onclick={nextSlide}
		class="btn-icon absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all bg-white/80 hover:bg-white text-black shadow-md"
		aria-label="Next Slide"
	>
		<ChevronRight size={28} />
	</button>

</div>