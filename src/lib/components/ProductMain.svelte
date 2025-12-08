<script lang="ts">
    import { onMount } from 'svelte';
	import { LayoutGrid, ShoppingBasket, Star, Phone, Ban } from '@lucide/svelte';
    import { cart } from '$lib/stores/cart.svelte';

    // 1. Accept Props
	let { filters, selectedCategory = "Tất Cả" } = $props();

	const tabs = [
		"Tất Cả", 
        "Máy Băm Chuối", 
        "Máy Băm Cỏ", 
        "Máy Chăn Nuôi", 
		"Máy Chế Biến Thực Phẩm", 
        "Máy Ép Cám Viên", 
		"Máy Nông Nghiệp", 
        "Máy & Công Nghệ Khác", 
        "Thiết Bị Sấy Hấp"
	];

   let activeTab = $state("Tất Cả");

    // This ensures activeTab updates whenever the URL param changes
    $effect(() => {
        if (selectedCategory) {
            // 1. Decode the URL parameter (e.g. "M%C3%A1y..." -> "Máy...")
            const decoded = decodeURIComponent(selectedCategory);
            
            // 2. Check if it matches a valid tab
            if (tabs.includes(decoded)) {
                activeTab = decoded;
            } else if (decoded === "Tất Cả") {
                activeTab = "Tất Cả";
            } else {
                // If no match found (e.g. slight spelling diff), log it and default to All
                console.log("Tab mismatch:", decoded); 
                activeTab = "Tất Cả";
            }
        }
    });

	let allProducts = $state<any[]>([]);
    let isLoading = $state(true);
    let error = $state("");

    async function fetchProducts() {
        try {
            const response = await fetch('/api/products');
            
            if (!response.ok) {
                throw new Error('Failed to connect to API');
            }

            const data = await response.json();

            allProducts = data;
            isLoading = false;
            
        } catch (err) {
            console.error("Error:", err);
            error = "Không thể tải dữ liệu sản phẩm.";
            isLoading = false;
        }
    }

    onMount(() => {
        fetchProducts();
    });

    // 4. FILTER LOGIC
    let displayProducts = $derived.by(() => {
        let result = [...allProducts];

        // Filter by Tab
        if (activeTab !== "Tất Cả") {
            result = result.filter(p => p.category === activeTab);
        }

        // Filter by Sidebar Type
        if (filters.type !== "all") {
            result = result.filter(p => p.type === filters.type);
        }

        // Filter by Price
        if (filters.priceRange !== "all") {
             // Exclude contact price items from range filters
             result = result.filter(p => !p.isContactPrice);
             switch (filters.priceRange) {
                case "under_500": result = result.filter(p => p.price < 500000); break;
                case "500_1000": result = result.filter(p => p.price >= 500000 && p.price <= 1000000); break;
                case "1000_2000": result = result.filter(p => p.price >= 1000000 && p.price <= 2000000); break;
                case "2000_5000": result = result.filter(p => p.price >= 2000000 && p.price <= 5000000); break;
                case "5000_10000": result = result.filter(p => p.price >= 5000000 && p.price <= 10000000); break;
                case "above_10000": result = result.filter(p => p.price > 10000000); break;
            }
        }

        // Sort
        if (filters.sort !== "default") {
            if (filters.sort === "name_asc") result.sort((a, b) => a.name.localeCompare(b.name));
            if (filters.sort === "name_desc") result.sort((a, b) => b.name.localeCompare(a.name));
            if (filters.sort === "price_asc") result = result.filter(p => !p.isContactPrice).sort((a, b) => a.price - b.price);
            if (filters.sort === "price_desc") result = result.filter(p => !p.isContactPrice).sort((a, b) => b.price - a.price);
        }

        return result;
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const getProductUrl = (p: any) => {
        return `/products/${p.id}`;
    }
</script>

<div id="shop-section" class="flex-1 flex flex-col gap-8 w-full scroll-mt-24">
	
	<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
		
		<div class="flex items-center gap-3 mb-6">
			<LayoutGrid class="size-8 text-blue-500 fill-blue-500" />
			<h2 class="text-xl font-bold text-black uppercase">MÁY MÓC - THIẾT BỊ</h2>
		</div>

		<div class="flex flex-wrap gap-3 mb-8 border-b border-gray-200 pb-4">
			{#each tabs as tab}
				<button 
					onclick={() => activeTab = tab}
					class="px-4 py-1.5 rounded border text-sm font-medium transition-all whitespace-nowrap
					{activeTab === tab 
						? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' 
						: 'bg-white text-gray-400 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'
					}"
				>
					{tab}
				</button>
			{/each}
		</div>

        {#if isLoading}
            <div class="flex justify-center items-center py-20">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0E3A6B]"></div>
            </div>
        {:else if error}
            <div class="text-center py-20 text-red-500">{error}</div>
        {:else}

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each displayProducts as p (p.id)}
				<a 
                    href={getProductUrl(p)}
                    class="bg-white border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-[380px] text-left relative {p.isOutOfStock ? 'opacity-70' : ''}"
                >
                    
                    {#if p.isOutOfStock}
                        <div class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <span class="bg-gray-800/90 text-white font-bold text-xl px-6 py-3 rounded-lg uppercase shadow-lg backdrop-blur-sm flex items-center gap-2">
                                <Ban class="size-6" /> Hết hàng
                            </span>
                        </div>
                    {/if}

                    {#if !p.isContactPrice && p.discount && p.discount > 0}
                        <div class="absolute top-0 left-0 bg-linear-to-b from-[#ffdd00] to-[#FF4500] text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg z-10 shadow-sm">
                            -{p.discount}%
                        </div>
                    {/if}

					<div class="h-[200px] w-full overflow-hidden rounded-md mb-3 bg-gray-50 border border-gray-100 flex items-center justify-center">
						<img src={p.img} alt={p.name} class="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />
					</div>

					<div class="flex flex-col grow justify-between">
                        <div>
                            <h3 class="text-sm font-bold text-gray-800 line-clamp-2 h-[42px] mb-1 leading-tight">{p.name}</h3>
                            <div class="flex gap-0.5 mb-1 mt-1">
                                {#each Array(5) as _, i}<Star class="size-3 {i < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}" />{/each}
                            </div>
                            <div class="flex flex-row items-baseline gap-2">
                                {#if p.isContactPrice}
                                    <p class="text-[#0E3A6B] font-bold text-lg flex items-center gap-1">Liên hệ</p>
                                {:else}
                                    <p class="text-[#0E3A6B] font-extrabold text-lg">{formatPrice(p.price)}</p>
                                    {#if p.oldPrice}<span class="text-gray-400 text-xs line-through">{formatPrice(p.oldPrice)}</span>{/if}
                                {/if}
                            </div>
                        </div>

						<div class="flex items-end justify-between mt-2 border-t border-gray-100 pt-2">
                            {#if !p.isContactPrice && p.sold !== undefined}
                                <div class="flex-1 flex flex-col gap-1 mr-2">
                                    <span class="text-[10px] font-bold text-gray-500">Đã bán: {p.sold}</span>
                                    <div class="w-full bg-blue-100 rounded-full h-1.5 relative overflow-hidden border border-blue-200">
                                        <div class="bg-[#0E3A6B] h-full rounded-full" style="width: {(p.sold / 10) * 100}%"></div>
                                    </div>
                                </div>
                            {:else}
                                <div class="flex-1"></div>
                            {/if}
                                
							<button 
                                onclick={(e) => { e.preventDefault(); if(p.isOutOfStock) return; if(p.isContactPrice) { alert("Vui lòng gọi 0965.060.363"); } else { cart.add(p, 1); } }}
                                class="size-8 shrink-0 rounded-full border flex items-center justify-center transition-colors {p.isOutOfStock ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : p.isContactPrice ? 'border-blue-100 bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white' : 'border-red-100 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white'}"
                                disabled={p.isOutOfStock}
                            >
                                {#if p.isContactPrice}<Phone class="size-4" />{:else}<ShoppingBasket class="size-4" />{/if}
							</button>
						</div>
					</div>
				</a>
			{/each}

            {#if displayProducts.length === 0}
                <div class="col-span-full py-20 text-center text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p>Không tìm thấy sản phẩm phù hợp cho danh mục: <span class="font-bold text-[#0E3A6B]">{activeTab}</span></p>
                    <button onclick={() => { activeTab = "Tất Cả"; }} class="text-[#0E3A6B] underline mt-2 hover:text-blue-500">Xem Tất Cả</button>
                </div>
            {/if}
		</div>

    {/if}
	</div>
    
	<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[200px] flex flex-col">
		<div class="flex items-center gap-3 mb-6"><LayoutGrid class="size-8 text-blue-500 fill-blue-500" /><h2 class="text-xl font-bold text-black uppercase">PHỤ KIỆN</h2></div>
		<div class="flex-1 flex items-center justify-center border-t border-gray-200 mt-2"><p class="text-gray-400 italic text-sm underline decoration-gray-300 underline-offset-4">Sắp được lên kệ</p></div>
	</div>

</div>