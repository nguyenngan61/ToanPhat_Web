<script>
	import ProductBanner from '$lib/components/ProductBanner.svelte';
	import FlashSale from '$lib/components/FlashSale.svelte';
	import ProductFilter from '$lib/components/ProductFilter.svelte';
	import ProductMain from '$lib/components/ProductMain.svelte';
	import ProductNews from '$lib/components/ProductNews.svelte';
    import { page } from '$app/stores';

	let filterState = $state({
		sort: "default",
		priceRange: "all",
		type: "all"
	});

    // FIX: Add '?? "Tất Cả"' to handle null values
    let currentCategory = $derived($page.url.searchParams.get('tab') ?? "Tất Cả");
</script>

<div class="flex flex-col min-h-screen">
	<ProductBanner />

	<div class="bg-[#D9D9D9]/30 grow pt-8 pb-20 mt-6">
		<div class="flex flex-col gap-10">
             <div class="w-[75%] mx-auto">
                <FlashSale />
             </div>

			<div class="w-[95%] mx-auto flex flex-col lg:flex-row gap-6 items-start">
				<ProductFilter bind:filters={filterState} />

				<ProductMain 
                    filters={filterState} 
                    selectedCategory={currentCategory} 
                />
			</div>

            <div class="w-[75%] mx-auto mt-10">
                <ProductNews />
            </div>
		</div>
	</div>
</div>