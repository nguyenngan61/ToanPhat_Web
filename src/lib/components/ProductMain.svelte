<script lang="ts">
	import { LayoutGrid, ShoppingBasket, Star } from '@lucide/svelte';

	interface FilterState {
		sort: string;
		priceRange: string;
		type: string;
	}

	let { filters }: { filters: FilterState } = $props();

	const allProducts = [
		{
			id: 1,
			name: "Máy băm chuối 2 chức năng",
			price: 1780000,
			img: "/assets/may-bam-chuoi.png",
			rating: 5,
			category: "Máy Băm Chuối",
            type: "machine"
		},
		{
			id: 2,
			name: "Máy băm chuối đa năng 3kw Toàn Phát",
			price: 450000,
			img: "/assets/may-bam-co.png", 
			rating: 5,
			category: "Máy Băm Chuối",
            type: "machine"
		},
		{
			id: 3,
			name: "Máy băm cỏ xay nghiền đa năng",
			price: 1250000,
			img: "/assets/may-chan-nuoi.png",
			rating: 4,
			category: "Máy Băm Cỏ",
            type: "machine"
		},
        {
			id: 4,
			name: "Máy thái chuối mịn",
			price: 990000,
			img: "/assets/may-che-bien-thuc-pham.png",
			rating: 5,
			category: "Máy Chế Biến Thực Phẩm",
            type: "machine"
		},
        {
			id: 31,
			name: "Máy băm cỏ voi công suất lớn",
			price: 3250000,
			img: "/assets/may-nong-nghiep.png",
			rating: 5,
			category: "Máy Băm Cỏ",
            type: "machine"
		}
	];

	const tabs = [
		"Tất Cả", "Máy Băm Chuối", "Máy Băm Cỏ", "Máy Chăn Nuôi", 
		"Máy Chế Biến Thực Phẩm", "Máy Ép Cám Viên", 
		"Máy Nông Nghiệp", "Máy & Công Nghệ Khác", "Thiết Bị Sấp Hấp"
	];

	let activeTab = $state("Tất Cả");

    let displayProducts = $derived.by(() => {
        let result = [...allProducts];

        if (activeTab !== "Tất Cả") {
            result = result.filter(p => p.category === activeTab);
        }

        if (filters.type !== "all") {
            result = result.filter(p => p.type === filters.type);
        }

        if (filters.priceRange !== "all") {
            switch (filters.priceRange) {
                case "under_500": result = result.filter(p => p.price < 500000); break;
                case "500_1000": result = result.filter(p => p.price >= 500000 && p.price <= 1000000); break;
                case "1000_2000": result = result.filter(p => p.price >= 1000000 && p.price <= 2000000); break;
                case "2000_5000": result = result.filter(p => p.price >= 2000000 && p.price <= 5000000); break;
                case "5000_10000": result = result.filter(p => p.price >= 5000000 && p.price <= 10000000); break;
                case "above_10000": result = result.filter(p => p.price > 10000000); break;
            }
        }

        if (filters.sort !== "default") {
            if (filters.sort === "name_asc") result.sort((a, b) => a.name.localeCompare(b.name));
            if (filters.sort === "name_desc") result.sort((a, b) => b.name.localeCompare(a.name));
            if (filters.sort === "price_asc") result.sort((a, b) => a.price - b.price);
            if (filters.sort === "price_desc") result.sort((a, b) => b.price - a.price);
        }

        return result;
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
</script>

<div class="flex-1 flex flex-col gap-8 w-full">
	
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

		<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {#each displayProducts as p (p.id)}
				<div class="bg-white border border-gray-300 rounded-lg p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-[380px]">
					
					<div class="h-[200px] w-full overflow-hidden rounded-md mb-3 bg-gray-50 border border-gray-100 flex items-center justify-center">
						<img src={p.img} alt={p.name} class="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500" />
					</div>

					<div class="flex flex-col grow justify-between">
                        <div>
                            <h3 class="text-sm font-bold text-gray-800 line-clamp-2 h-[42px] mb-1 leading-tight">
                                {p.name}
                            </h3>
                            <p class="text-[#0E3A6B] font-extrabold text-lg">
                                {formatPrice(p.price)}
                            </p>
                        </div>

						<div class="flex items-center justify-between mt-2 border-t border-gray-100 pt-2">
							<div class="flex gap-0.5">
								{#each Array(5) as _, i}
									<Star class="size-3.5 {i < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}" />
								{/each}
							</div>
							<button class="size-8 rounded-full border border-red-100 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
								<ShoppingBasket class="size-4" />
							</button>
						</div>
					</div>

				</div>
			{/each}

            {#if displayProducts.length === 0}
                <div class="col-span-full py-20 text-center text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <p>Không tìm thấy sản phẩm phù hợp.</p>
                    <button onclick={() => { activeTab = "Tất Cả"; filters.priceRange = "all"; filters.sort = "default"; }} class="text-[#0E3A6B] underline mt-2 hover:text-blue-500">
                        Xóa bộ lọc
                    </button>
                </div>
            {/if}
		</div>
	</div>

	<div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 min-h-[200px] flex flex-col">
		<div class="flex items-center gap-3 mb-6">
			<LayoutGrid class="size-8 text-blue-500 fill-blue-500" />
			<h2 class="text-xl font-bold text-black uppercase">PHỤ KIỆN</h2>
		</div>
		<div class="flex-1 flex items-center justify-center border-t border-gray-200 mt-2">
			<p class="text-gray-400 italic text-sm underline decoration-gray-300 underline-offset-4">Sắp được lên kệ</p>
		</div>
	</div>

</div>