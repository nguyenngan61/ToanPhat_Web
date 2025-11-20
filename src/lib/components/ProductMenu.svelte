<script lang="ts">
	import { Menu, Portal } from '@skeletonlabs/skeleton-svelte';
	import { ChevronDown } from '@lucide/svelte';

	// 1. DATA FROM PICTURE 2 (Welding & Machinery)
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
</script>

<Menu>
	<Menu.Trigger class="flex items-center gap-1 hover:text-[#00AEEF] transition-colors font-normal text-base">
		<span>Sản Phẩm</span>
		<ChevronDown class="size-4 opacity-50" />
	</Menu.Trigger>

	<Portal>
		
		<Menu.Positioner style="z-index: 99999;">
			
			<Menu.Content class="bg-white border border-gray-200 shadow-2xl rounded-md p-4 w-[1000px] max-w-[95vw] mt-2">
				
				<div class="grid grid-cols-4 gap-4">
					{#each productCategories as cat}
						<Menu.Item value={cat.value} class="border border-gray-200 rounded-lg p-4 hover:border-[#00AEEF] hover:bg-blue-50/30 transition-all h-full cursor-pointer flex flex-col gap-2 items-start text-left outline-none">
							
							<Menu.ItemText class="font-bold text-[#0e3a6b] text-lg leading-tight uppercase">
								{cat.type}
							</Menu.ItemText>
							
							<div class="text-xs text-gray-500 leading-relaxed line-clamp-3">
								{cat.list}
							</div>

						</Menu.Item>
					{/each}
				</div>

			</Menu.Content>
		</Menu.Positioner>
	</Portal>
</Menu>