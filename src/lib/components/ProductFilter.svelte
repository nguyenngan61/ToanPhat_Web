<script lang="ts">
	import { Check } from '@lucide/svelte';

	interface FilterState {
		sort: string;
		priceRange: string;
		type: string;
	}

	let { filters = $bindable() }: { filters: FilterState } = $props();

	function toggleSort(value: string) {
		filters.sort = filters.sort === value ? "default" : value;
	}

	function togglePrice(value: string) {
		filters.priceRange = filters.priceRange === value ? "all" : value;
	}
    
    function toggleType(value: string) {
        filters.type = filters.type === value ? "all" : value;
    }
</script>

{#snippet filterItem(label: string, group: string, value: string, current: string, clickHandler: Function)}
	<label class="flex items-center gap-3 cursor-pointer group select-none">
		<div class="relative flex items-center">
			<input 
				type="checkbox" 
				checked={current === value} 
				onclick={() => clickHandler(value)}
				class="peer appearance-none w-4 h-4 border border-gray-300 rounded-sm checked:bg-[#0E3A6B] checked:border-[#0E3A6B]" 
			/>
			<Check class="absolute inset-0 text-white w-3 h-3 m-auto opacity-0 peer-checked:opacity-100 pointer-events-none" />
		</div>
		<span class="text-sm text-gray-600 group-hover:text-[#0E3A6B] transition-colors">{label}</span>
	</label>
{/snippet}

<aside class="w-[260px] shrink-0 flex flex-col gap-0 border border-[#0E3A6B] rounded-lg overflow-hidden bg-white self-start h-fit">
	
	<div class="bg-[#0E3A6B] text-white py-3 text-center font-bold text-lg uppercase">
		Danh Mục
	</div>

	<div class="p-5 flex flex-col gap-8">
		
		<div class="flex flex-col gap-3">
			<h3 class="font-bold text-gray-800">Bộ Lọc</h3>
			<div class="flex flex-col gap-2">
				{@render filterItem("Liên quan", "sort", "default", filters.sort, toggleSort)}
				{@render filterItem("Bán chạy", "sort", "default", filters.sort, toggleSort)}
				{@render filterItem("Mới nhất", "sort", "default", filters.sort, toggleSort)}
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<h3 class="font-bold text-gray-800">Sắp Xếp</h3>
			<div class="flex flex-col gap-2">
				{@render filterItem("Mặc định", "sort", "default", filters.sort, toggleSort)}
				{@render filterItem("Tên A - Z", "sort", "name_asc", filters.sort, toggleSort)}
				{@render filterItem("Tên Z - A", "sort", "name_desc", filters.sort, toggleSort)}
				{@render filterItem("Giá thấp đến cao", "sort", "price_asc", filters.sort, toggleSort)}
				{@render filterItem("Giá cao xuống thấp", "sort", "price_desc", filters.sort, toggleSort)}
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<h3 class="font-bold text-gray-800">Mức Giá</h3>
			<div class="flex flex-col gap-2">
				{@render filterItem("Dưới 500.000đ", "price", "under_500", filters.priceRange, togglePrice)}
				{@render filterItem("500.000đ - 1.000.000đ", "price", "500_1000", filters.priceRange, togglePrice)}
				{@render filterItem("1.000.000đ - 2.000.000đ", "price", "1000_2000", filters.priceRange, togglePrice)}
				{@render filterItem("2.000.000đ - 5.000.000đ", "price", "2000_5000", filters.priceRange, togglePrice)}
                {@render filterItem("5.000.000đ - 10.000.000đ", "price", "5000_10000", filters.priceRange, togglePrice)}
				{@render filterItem("Trên 10.000.000đ", "price", "above_10000", filters.priceRange, togglePrice)}
			</div>
		</div>

		<div class="flex flex-col gap-3">
			<h3 class="font-bold text-gray-800">Loại</h3>
			<div class="flex flex-col gap-2">
				{@render filterItem("Máy móc - Thiết bị", "type", "machine", filters.type, toggleType)}
				{@render filterItem("Phụ kiện", "type", "accessory", filters.type, toggleType)}
			</div>
		</div>

	</div>
</aside>