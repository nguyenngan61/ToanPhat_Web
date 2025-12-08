<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	let images = $state<any[]>([]);

	let currentIndex = $state(0);
	let timer: any;

	const nextSlide = () => { if(images.length) currentIndex = (currentIndex + 1) % images.length; };
	const prevSlide = () => { if(images.length) currentIndex = (currentIndex - 1 + images.length) % images.length; };

	onMount(() => {
        const loadBanners = async () => {
            try {
                const res = await fetch('/api/banners');
                if (res.ok) {
                    images = await res.json();
                }
            } catch (error) {
                console.error("Error loading banners:", error);
            }
        };
        loadBanners();
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
	{#if images.length > 0}
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
	{:else}
        <div class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            Đang tải hình ảnh...
        </div>
    {/if}
</div>