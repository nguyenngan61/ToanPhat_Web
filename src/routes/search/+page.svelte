<script lang="ts">
	import { page } from '$app/stores';
	import ProductFilter from '$lib/components/ProductFilter.svelte';
	import { Home, ShoppingBasket, Star, ChevronLeft, ChevronRight } from '@lucide/svelte';
    import { onMount } from 'svelte';
    import { cart } from '$lib/stores/cart.svelte';

	// 1. STATE
    // Start with empty array
	let allProducts = $state<any[]>([]);
    let isLoading = $state(true);

    // Get search query from URL
	let searchQuery = $derived($page.url.searchParams.get('q') || "");
    
	let filterState = $state({
		sort: "default",
		priceRange: "all",
		type: "all"
	});

	let currentPage = $state(1);
	const itemsPerPage = 12;

    // 2. FETCH DATA FROM API
    onMount(async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            allProducts = data;
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        isLoading = false;
    });

	// 3. FILTERING LOGIC (Applied to the API data)
	let displayProducts = $derived.by(() => {
        // Wait for data to load
        if (allProducts.length === 0) return [];

		// A. Filter by Search Keyword (Name contains query)
		let result = allProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

		// B. Filter by Type (Sidebar)
		if (filterState.type !== "all") {
			result = result.filter(p => p.type === filterState.type);
		}

		// C. Filter by Price (Sidebar)
		if (filterState.priceRange !== "all") {
            // Exclude Contact Price items from price filtering
            result = result.filter(p => !p.isContactPrice);
			switch (filterState.priceRange) {
				case "under_500": result = result.filter(p => p.price < 500000); break;
				case "500_1000": result = result.filter(p => p.price >= 500000 && p.price <= 1000000); break;
				case "1000_2000": result = result.filter(p => p.price >= 1000000 && p.price <= 2000000); break;
				case "2000_5000": result = result.filter(p => p.price >= 2000000 && p.price <= 5000000); break;
				case "5000_10000": result = result.filter(p => p.price >= 5000000 && p.price <= 10000000); break;
				case "above_10000": result = result.filter(p => p.price > 10000000); break;
			}
		}

		// D. Sort (Sidebar)
		if (filterState.sort !== "default") {
			if (filterState.sort === "name_asc") result.sort((a, b) => a.name.localeCompare(b.name));
			if (filterState.sort === "name_desc") result.sort((a, b) => b.name.localeCompare(a.name));
			if (filterState.sort === "price_asc") result = result.filter(p => !p.isContactPrice).sort((a, b) => a.price - b.price);
			if (filterState.sort === "price_desc") result = result.filter(p => !p.isContactPrice).sort((a, b) => b.price - a.price);
		}

		return result;
	});

	// 4. PAGINATION
	let totalPages = $derived(Math.ceil(displayProducts.length / itemsPerPage));
	let paginatedList = $derived(
		displayProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
	};

    const getProductUrl = (p: any) => {
        // Use new ID logic
        return `/products/${p.id}`;
    }
</script>

<div class="min-h-screen bg-white pb-20">
	
	<div class="w-[95%] mx-auto flex flex-col gap-6 pt-6">

		<div class="flex items-center gap-2 text-sm text-gray-500 border-b border-gray-200 pb-4">
			<a href="/" class="hover:text-[#0E3A6B]"><Home class="size-4" /></a>
			<span>|</span>
			<a href="/products" class="hover:text-[#0E3A6B]">Sản Phẩm</a>
			<span>|</span>
			<span class="text-[#0E3A6B] font-medium capitalize">Tìm kiếm: "{searchQuery}"</span>
		</div>

		<div class="flex flex-col lg:flex-row gap-8 items-start">
			
			<ProductFilter bind:filters={filterState} />

			<div class="flex-1 w-full">
				
				<div class="mb-6">
                    {#if isLoading}
                        <p class="text-gray-500">Đang tìm kiếm...</p>
                    {:else}
					    <p class="text-gray-600 text-sm">Kết quả tìm kiếm cho: <span class="font-bold text-[#0E3A6B]">"{searchQuery}"</span></p>
					    <h1 class="text-xl font-bold text-[#0E3A6B] mt-1 uppercase">
						    SẢN PHẨM ({displayProducts.length})
					    </h1>
                    {/if}
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{#each paginatedList as p (p.id)}
						
                        <a 
                            href={getProductUrl(p)}
                            class="bg-white border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-[380px] text-left relative 
                            {p.isOutOfStock ? 'opacity-70' : ''}"
                        >
                            {#if !p.isContactPrice && p.discount && p.discount > 0}
                                <div class="absolute top-0 left-0 bg-linear-to-b from-[#ffdd00] to-[#FF4500] text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg z-10 shadow-sm">
                                    -{p.discount}%
                                </div>
                            {/if}

                            {#if p.isOutOfStock}
                                <div class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                    <span class="text-gray-500 font-bold text-xl uppercase bg-white/80 px-4 py-2 rounded-md border border-gray-300 shadow-sm transform -rotate-12">Hết Hàng</span>
                                </div>
                            {/if}
                            
							<div class="h-[200px] w-full overflow-hidden rounded-md mb-3 bg-gray-50 border border-gray-100 flex items-center justify-center">
								<img src={p.img} alt={p.name} class="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />
							</div>

							<div class="flex flex-col grow justify-between">
								<div>
									<h3 class="text-sm font-bold text-gray-800 line-clamp-2 h-[42px] mb-1 leading-tight">
										{p.name}
									</h3>
                                    
                                    <div class="flex flex-row items-baseline gap-2 mt-2">
                                        {#if p.isContactPrice}
                                            <p class="text-red-500 font-bold text-lg">Liên hệ</p>
                                        {:else}
										    <p class="text-[#0E3A6B] font-extrabold text-lg">{formatPrice(p.price)}</p>
                                            {#if p.oldPrice}
                                                <span class="text-gray-400 text-xs line-through">{formatPrice(p.oldPrice)}</span>
                                            {/if}
                                        {/if}
									</div>
								</div>

								<div class="flex items-end justify-between mt-2 border-t border-gray-100 pt-2">
                                    {#if !p.isContactPrice && p.sold !== undefined}
                                        <div class="flex-1 flex flex-col gap-1 mr-2">
                                            <span class="text-[10px] font-bold text-gray-500">Đã bán: {p.sold}</span>
                                            <div class="w-full bg-red-100 rounded-full h-1.5 relative overflow-hidden border border-red-200">
                                                <div class="bg-red-600 h-full rounded-full" style="width: {(p.sold / 10) * 100}%"></div>
                                            </div>
                                        </div>
                                    {:else}
                                        <div class="flex-1"></div>
                                    {/if}

                                    <button 
                                        onclick={(e) => { 
                                            e.preventDefault(); 
                                            e.stopPropagation();
                                            if (p.isOutOfStock) return;
                                            if (p.isContactPrice) { alert("Vui lòng liên hệ 0965.060.363"); }
                                            else { cart.add(p, 1); }
                                        }}
                                        disabled={p.isOutOfStock}
                                        class="size-8 rounded-full border border-red-100 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors {p.isOutOfStock ? 'opacity-50 cursor-not-allowed grayscale' : ''}"
                                    >
										<ShoppingBasket class="size-4" />
									</button>
								</div>
							</div>
						</a>
					{/each}

                    {#if !isLoading && displayProducts.length === 0}
                        <div class="col-span-full py-20 text-center text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <p>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{searchQuery}".</p>
                        </div>
                    {/if}
				</div>

				{#if totalPages > 1}
					<div class="flex justify-center items-center gap-2 mt-10">
						<button onclick={() => currentPage = Math.max(1, currentPage - 1)} disabled={currentPage === 1} class="w-8 h-8 flex items-center justify-center rounded bg-[#0E3A6B] text-white disabled:bg-gray-200 disabled:text-gray-400 transition-colors"><ChevronLeft class="size-4" /></button>
						{#each Array(totalPages) as _, i}
							<button onclick={() => currentPage = i + 1} class="w-8 h-8 flex items-center justify-center rounded font-bold text-sm border transition-colors {currentPage === i + 1 ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}">{i + 1}</button>
						{/each}
						<button onclick={() => currentPage = Math.min(totalPages, currentPage + 1)} disabled={currentPage === totalPages} class="w-8 h-8 flex items-center justify-center rounded bg-[#0E3A6B] text-white disabled:bg-gray-200 disabled:text-gray-400 transition-colors"><ChevronRight class="size-4" /></button>
					</div>
				{/if}

			</div>

		</div>

	</div>
</div>