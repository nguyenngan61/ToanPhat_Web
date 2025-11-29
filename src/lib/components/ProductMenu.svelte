<script lang="ts">
	import { Menu, Portal } from '@skeletonlabs/skeleton-svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { goto } from '$app/navigation';

	const productCategories = [
		{ 
			type: "Máy Băm Chuối", 
			list: "Hai chức năng, đa năng 3kW, thái chuối mịn",
			value: "may-bam-chuoi"
		},
		{ 
			type: "Máy Băm Cỏ", 
			list: "Hai chức năng, đa năng 3kW, đa chức năng",
			value: "may-bam-co"
		},
		{ 
			type: "Máy Chăn Nuôi", 
			list: "Nghiền thức ăn chăn nuôi B12/ B20",
			value: "may-chan-nuoi"
		},
		{ 
			type: "Máy Chế Biến Thực Phẩm", 
			list: "Máy nổ bỏng, nghiền bột siêu mịn",
			value: "may-che-bien-thuc-pham"
		},
		{ 
			type: "Máy Ép Cám Viên", 
			list: "Máy ép cám viên S150/ S160/ S180/ S200/ S250/ S270",
			value: "may-ep-cam-vien"
		},
		{ 
			type: "Máy Nông Nghiệp", 
			list: "Máy ép cám viên S150/ S160/ S180/ S200/ S250/ S270",
			value: "may-nong-nghiep"
		},
		{ 
			type: "Máy & Công Nghệ Khác", 
			list: "Air shower, máy bóc lạc, máy băm gỗ, pass box",
			value: "may-cong-nghe-khac"
		},
		{ 
			type: "Thiết Bị Sấy Hấp", 
			list: "Máy sấy dân dụng đa năng MS10/ MS30/ MS50",
			value: "thiet-bi-say-hap"
		}
	];

    // FIX: Updated to point to Product Page Tabs instead of Search
	function handleCategoryClick(categoryName: string) {
        // 1. Navigate to /products
        // 2. Set ?tab=... parameter
        // 3. Add #shop-section to scroll down automatically
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
				</div>

			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu>