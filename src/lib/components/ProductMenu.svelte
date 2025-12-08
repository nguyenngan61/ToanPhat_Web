<script lang="ts">
	import { Menu, Portal } from '@skeletonlabs/skeleton-svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

    // 1. STATE: Start empty
	let productCategories = $state<any[]>([]);

    // 2. FETCH: Get categories from API
    onMount(async () => {
        try {
            const res = await fetch('/api/categories');
            if (res.ok) {
                productCategories = await res.json();
            }
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    });

	function handleCategoryClick(categoryName: string) {
		goto(`/products?tab=${encodeURIComponent(categoryName)}#shop-section`);
	}

	function handleTriggerClick(event: MouseEvent) {
		if (event.detail === 3) {
			event.preventDefault();
			event.stopPropagation();
			goto('/products');
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}
</script>

<Menu positioning={{ placement: 'bottom' }}>
	
	<Menu.Trigger 
		onclick={handleTriggerClick}
		class="flex items-center gap-1 hover:text-[#00AEEF] transition-colors font-normal text-base cursor-pointer outline-none focus:outline-none focus:ring-0 border-none bg-transparent p-0 select-none"
	>
		<span>Sản Phẩm</span>
		<ChevronDown class="size-4 opacity-50" />
	</Menu.Trigger>

	<Portal>
		<Menu.Positioner style="z-index: 99999;">
			
			<Menu.Content class="bg-white border border-gray-200 shadow-2xl rounded-md mt-4 w-[1000px] max-w-[95vw] p-6">
				
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> 
					{#each productCategories as cat}
						<Menu.Item 
							value={cat.value} 
							onclick={() => handleCategoryClick(cat.type)}
							class="
								border border-gray-200 rounded-lg p-4 h-full 
								hover:border-[#00AEEF] hover:shadow-md transition-all 
								cursor-pointer flex flex-col gap-2 items-start text-left outline-none
								bg-white
							"
						>
							<Menu.ItemText class="font-bold text-[#0e3a6b] text-sm uppercase leading-tight">
								{cat.type}
							</Menu.ItemText>
							<div class="text-xs text-gray-500 leading-relaxed">
								{cat.list}
							</div>
						</Menu.Item>
					{/each}
					{#if productCategories.length === 0}
                        <div class="col-span-full text-center py-4 text-gray-400 italic">Đang tải danh mục...</div>
                    {/if}
				</div>

			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu>