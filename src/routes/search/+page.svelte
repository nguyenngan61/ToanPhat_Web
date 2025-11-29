<script lang="ts">
	import { page } from '$app/stores';
	import ProductFilter from '$lib/components/ProductFilter.svelte';
	import { Home, ShoppingBasket, Star, ChevronLeft, ChevronRight, ShoppingCart } from '@lucide/svelte';
	import { cart } from '$lib/stores/cart.svelte';

	// 1. MASTER DATA (In a real app, this comes from a database/API)
    // I am using a large list to demonstrate pagination and search
	const allProducts = Array(30).fill([
		{ id: 1, name: "Máy băm chuối 2 chức năng", price: 1780000, img: "/assets/may-bam-chuoi.png", rating: 5, category: "Máy Băm Chuối", type: "machine" },
		{ id: 2, name: "Máy băm chuối đa năng 3kw Toàn Phát", price: 1550000, img: "/assets/may-bam-co.png", rating: 5, category: "Máy Băm Chuối", type: "machine" },
		{ id: 3, name: "Máy băm cỏ xay nghiền đa năng", price: 1250000, img: "/assets/may-chan-nuoi.png", rating: 4, category: "Máy Băm Cỏ", type: "machine" },
		{ id: 4, name: "Máy thái chuối mịn", price: 990000, img: "/assets/may-che-bien-thuc-pham.png", rating: 5, category: "Máy Chế Biến Thực Phẩm", type: "machine" },
        { id: 5, name: "Máy Ép Cám Viên S150", price: 3500000, img: "/assets/may-ep-cam-vien.png", rating: 5, category: "Máy Ép Cám Viên", type: "machine" },
	]).flat().map((p, i) => ({...p, id: i}));

	// 2. STATE
	// Get search query from URL (e.g., ?q=chuối)
	let searchQuery = $derived($page.url.searchParams.get('q') || "");
    
    // Filter state for Sidebar
	let filterState = $state({
		sort: "default",
		priceRange: "all",
		type: "all"
	});

	let currentPage = $state(1);
	const itemsPerPage = 12; // 4 columns * 3 rows

	// 3. FILTERING LOGIC CHAIN
	let displayProducts = $derived.by(() => {
		// A. First, filter by Search Keyword
		let result = allProducts.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

		// B. Filter by Type (Sidebar)
		if (filterState.type !== "all") {
			result = result.filter(p => p.type === filterState.type);
		}

		// C. Filter by Price (Sidebar)
		if (filterState.priceRange !== "all") {
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
			if (filterState.sort === "price_asc") result.sort((a, b) => a.price - b.price);
			if (filterState.sort === "price_desc") result.sort((a, b) => b.price - a.price);
		}

		return result;
	});

	// 4. PAGINATION LOGIC
	let totalPages = $derived(Math.ceil(displayProducts.length / itemsPerPage));
	let paginatedList = $derived(
		displayProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
	};
</script>

<div class="min-h-screen bg-white pb-20">
	
	<div class="w-[95%] mx-auto flex flex-col gap-6 pt-6">

		<div class="flex items-center gap-2 text-sm text-gray-500 border-b border-gray-200 pb-4">
			<a href="/" class="hover:text-[#0E3A6B]"><Home class="size-4" /></a>
			<span>|</span>
			<a href="/products" class="hover:text-[#0E3A6B]">Sản Phẩm</a>
			<span>|</span>
			<span class="text-[#0E3A6B] font-medium capitalize">{searchQuery || "Tất cả"}</span>
		</div>

		<div class="flex flex-col lg:flex-row gap-8 items-start">
			
			<ProductFilter bind:filters={filterState} />

			<div class="flex-1 w-full">
				
				<div class="mb-6">
					<p class="text-gray-600 text-sm">Kết quả tìm kiếm: <span class="font-bold text-[#0E3A6B]">"{searchQuery}"</span></p>
					<h1 class="text-xl font-bold text-[#0E3A6B] mt-1 uppercase">
						SẢN PHẨM ({displayProducts.length})
					</h1>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
					{#each paginatedList as p (p.id)}
                    <a 
                        href={p.name.includes("Máy băm chuối") ? "/products/may-bam-chuoi-da-nang-3kw" : "#"}
                        class="bg-white rounded-lg p-3 flex flex-col justify-between relative shadow-md group cursor-pointer hover:-translate-y-1 transition-transform text-left h-320px"
                    >
                        <div class="absolute top-0 left-0 bg-linear-to-b from-[#ffdd00] to-[#FF4500] text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg z-10 shadow-sm">
                            -15%
                        </div>

                        <div class="h-[140px] w-full flex items-center justify-center overflow-hidden mt-2">
                            <img src={p.img} alt={p.name} class="h-full object-contain group-hover:scale-105 transition-transform" />
                        </div>

                        <div class="flex flex-col gap-1">
                            <h3 class="text-sm font-bold text-gray-800 line-clamp-2 h-10 leading-tight">
                                {p.name}
                            </h3>

                            <div class="flex gap-0.5">
                                {#each Array(5) as _, i}
                                    <Star class="size-3 {i < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}" />
                                {/each}
                            </div>

                            <div class="flex flex-row items-baseline gap-2">
                                <span class="text-red-600 font-bold text-lg">{formatPrice(p.price)}</span>
                            </div>

                            <div class="flex items-end gap-2 mt-2">
                                <div class="flex-1 flex flex-col gap-1">
                                    <span class="text-[10px] font-bold text-gray-500">Đã bán: 2</span>
                                    <div class="w-full bg-red-100 rounded-full h-2 relative overflow-hidden border border-red-200">
                                        <div class="bg-red-600 h-full rounded-full" style="width: 20%"></div>
                                    </div>
                                </div>
                                <!-- <button 
									onclick={(e) => { e.preventDefault(); e.stopPropagation(); cart.add(p, 1); }}
									class="size-8 rounded-full border border-red-100 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
								>
									<ShoppingBasket class="size-4" />
								</button> -->
                            </div>
                        </div>
                    </a>
                {/each}

                    {#if displayProducts.length === 0}
                        <div class="col-span-full py-20 text-center text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <p>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{searchQuery}".</p>
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

		</div>

	</div>
</div>