<script lang="ts">
	import { Heart, ChevronRight, ChevronLeft, ShoppingCart, Star } from '@lucide/svelte';

	// 1. DATA
	const baseProducts = [
		{ name: "Máy băm chuối đa năng 3kw", img: "/assets/may-bam-chuoi.png", price: 600000, oldPrice: 1000000, discount: 40, sold: 4, category: "Máy Băm Chuối", rating: 5, isSelected: false },
		{ name: "Máy băm cỏ, xay nghiền đa năng", img: "/assets/may-bam-co.png", price: 700000, oldPrice: 1000000, discount: 30, sold: 2, category: "Máy Băm Cỏ", rating: 4.5, isSelected: false },
		{ name: "Máy trộn thức ăn chăn nuôi 50kg", img: "/assets/may-chan-nuoi.png", price: 800000, oldPrice: 1000000, discount: 20, sold: 8, category: "Máy Chăn Nuôi", rating: 4, isSelected: false },
		{ name: "Máy Rang Đa Năng 15 kg", img: "/assets/may-che-bien-thuc-pham.png", price: 700000, oldPrice: 1000000, discount: 30, sold: 5, category: "Máy Chế Biến Thực Phẩm", rating: 5, isSelected: false },
        { name: "Máy Ép Cám Viên S150", img: "/assets/may-ep-cam-vien.png", price: 2500000, oldPrice: 3000000, discount: 15, sold: 9, category: "Máy Ép Cám Viên", rating: 4.5, isSelected: false }
	];

	let allProducts = $state(Array(10).fill(baseProducts).flat().map((p, i) => ({...p, id: i})));

	const categories = ["DEAL HOT", "Máy Băm Chuối", "Máy Băm Cỏ", "Máy Chăn Nuôi", "Máy Chế Biến Thực Phẩm", "Máy Ép Cám Viên", "Máy Nông Nghiệp", "Máy & Công Nghệ Khác", "Thiết Bị Sấy Hấp"];
	let activeTab = $state("DEAL HOT");
	let scrollContainer: HTMLDivElement;

	let currentPage = $state(1);
	const itemsPerPage = 8;

	let filteredList = $derived.by(() => {
		if (activeTab === "DEAL HOT") return allProducts;
		return allProducts.filter(p => p.category === activeTab);
	});

	let totalPages = $derived(Math.ceil(filteredList.length / itemsPerPage));
	let paginatedList = $derived(
		filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	function toggleHeart(id: number) {
		const product = allProducts.find(p => p.id === id);
		if (product) product.isSelected = !product.isSelected;
	}

    // SCROLL LOGIC (Left & Right)
    const scrollRight = () => {
		if (scrollContainer) scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
	};
    const scrollLeft = () => {
		if (scrollContainer) scrollContainer.scrollBy({ left: -200, behavior: 'smooth' });
	};

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
</script>

<div class="w-full bg-white pb-12">
	
	<div class="border-b border-gray-200 mb-6 sticky top-0 bg-white z-20 shadow-sm">
		<div class="w-[75%] mx-auto flex items-center gap-2">
			
            <button onclick={scrollLeft} class="shrink-0 p-2 text-gray-400 hover:text-[#0E3A6B] hover:bg-gray-50 rounded-full transition-colors">
				<ChevronLeft class="size-6" />
			</button>

			<div 
				bind:this={scrollContainer}
				class="flex overflow-x-auto py-4 gap-0 grow scroll-smooth"
                style="scrollbar-width: none; -ms-overflow-style: none;" 
			>
				{#each categories as cat, i}
					<button 
						onclick={() => { activeTab = cat; currentPage = 1; }}
						class="shrink-0 px-5 font-bold text-sm uppercase transition-colors relative flex items-center
						{activeTab === cat ? 'text-[#FF8C00]' : 'text-[#0E3A6B]/70 hover:text-[#0E3A6B]'}"
					>
						{cat}
						{#if activeTab === cat}
							<div class="absolute bottom-[-17px] left-0 w-full h-[3px] bg-[#FF8C00]"></div>
						{/if}
						{#if i < categories.length - 1}
							<div class="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-1px bg-gray-300"></div>
						{/if}
					</button>
				{/each}
			</div>

            <button onclick={scrollRight} class="shrink-0 p-2 text-gray-400 hover:text-[#0E3A6B] hover:bg-gray-50 rounded-full transition-colors">
				<ChevronRight class="size-6" />
			</button>

		</div>
	</div>

	<div class="w-[75%] mx-auto min-h-[400px]">
		{#if filteredList.length === 0}
			<div class="flex flex-col items-center justify-center h-[200px] text-gray-400">
				<p class="italic">Hiện chưa có sản phẩm.</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{#each paginatedList as product (product.id)}
					
					<div class="bg-white border border-gray-200 hover:border-[#0E3A6B] rounded-xl p-4 shadow-sm hover:shadow-2xl transition-all duration-300 relative group flex flex-col h-[300px]">
						
						<button 
							onclick={() => toggleHeart(product.id)}
							class="absolute top-3 left-3 z-10 transition-all duration-200
							{product.isSelected 
								? 'text-[#0E3A6B] fill-[#0E3A6B]' 
								: 'text-gray-300 hover:text-[#0E3A6B]'
							}"
						>
							<Heart class="size-5" fill={product.isSelected ? "#0E3A6B" : "none"} />
						</button>

						<div class="h-[140px] w-full flex items-center justify-center overflow-hidden mb-3">
							<img src={product.img} alt={product.name} class="h-full w-full object-contain group-hover:scale-105 transition-transform" />
						</div>

						<div class="flex flex-col flex-1 justify-between">
							
                            <div>
                                <h3 class="text-xs font-bold text-gray-800 line-clamp-2 mb-1 h-32px leading-tight">
                                    {product.name}
                                </h3>

                                <div class="flex gap-0.5 mb-2">
                                    {#each Array(5) as _, i}
                                        {@render starIcon(i, product.rating)}
                                    {/each}
                                </div>

                                <div class="flex items-center gap-2 text-[10px] mb-1">
                                    <span class="text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                                    <span class="bg-linear-to-r from-[#ff9a44] to-[#fc6076] text-white px-2 py-0.5 rounded-md font-bold shadow-sm">
                                        -{product.discount}%
                                    </span>
                                </div>

                                <div class="text-[#FF8C00] font-extrabold text-lg">
                                    {formatPrice(product.price)}
                                </div>
                            </div>

							<div class="flex items-end justify-between gap-2 mt-2">
								
                                <div class="flex-1 flex flex-col gap-1 pb-0.5">
									<span class="text-[9px] text-gray-500 font-semibold">Đã bán: {product.sold}</span>
									<div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                        <div 
                                            class="bg-linear-to-r from-[#ff9a44] to-[#fc6076] h-full rounded-full" 
                                            style="width: {(product.sold / 10) * 100}%"
                                        ></div>
									</div>
								</div>

								<button class="bg-linear-to-r from-[#0E3A6B] to-[#1a528f] text-white text-[10px] font-bold px-3 py-1.5 rounded-md hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md shrink-0">
                                    <ShoppingCart class="size-3.5" />
									Mua
								</button>

							</div>
						</div>

					</div>
				{/each}
			</div>
		{/if}
	</div>

	{#if totalPages > 1}
		<div class="flex justify-center items-center gap-2 mt-10">
			<button onclick={() => currentPage = Math.max(1, currentPage - 1)} disabled={currentPage === 1} class="w-8 h-8 flex items-center justify-center rounded bg-[#0E3A6B] text-white disabled:bg-gray-200 disabled:text-gray-400 transition-colors"><ChevronLeft class="size-4" /></button>
			{#each Array(totalPages) as _, i}
				<button onclick={() => currentPage = i + 1} class="w-8 h-8 flex items-center justify-center rounded font-bold text-sm border transition-colors {currentPage === i + 1 ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' : 'bg-white text-gray-500 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}">{i + 1}</button>
			{/each}
			<button onclick={() => currentPage = Math.min(totalPages, currentPage + 1)} disabled={currentPage === totalPages} class="w-8 h-8 flex items-center justify-center rounded bg-[#0E3A6B] text-white disabled:bg-gray-200 disabled:text-gray-400 transition-colors"><ChevronRight class="size-4" /></button>
		</div>
	{/if}

</div>

{#snippet starIcon(index: number, rating: number)}
    {#if index + 1 <= rating}
        <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
    {:else if index < rating && index + 1 > rating}
        <svg class="w-3 h-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><defs><linearGradient id="halfStar"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#e5e7eb"/></linearGradient></defs><path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
    {:else}
        <svg class="w-3 h-3 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
    {/if}
{/snippet}