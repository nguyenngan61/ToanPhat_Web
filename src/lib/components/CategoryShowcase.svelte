<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
let categories = $state<any[]>([]);

onMount(async () => {
        try {
            const res = await fetch('http://localhost:3001/categories');
            categories = await res.json();
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    });
</script>

<div class="py-10 bg-white">
	
	<div class="w-[75%] mx-auto flex justify-between items-center mb-8">
		<h2 class="text-2xl font-bold text-[#0E3A6B] uppercase">Danh Mục Sản Phẩm</h2>
		
		<a href="/products?tab=Tất Cả#shop-section" class="group flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-[#00AEEF] transition-colors border px-4 py-1 rounded shadow-sm hover:shadow-md bg-gray-50">
			Xem Tất Cả
			<ChevronRight class="size-4 group-hover:translate-x-1 transition-transform" />
		</a>
	</div>

	<div class="flex justify-center gap-1 flex-wrap px-4">
	{#if categories.length === 0}
            <p class="text-gray-400 italic">Đang tải danh mục...</p>
    {:else}	
		{#each categories as cat}
			
			<a href={`/products?tab=${cat.title}#shop-section`} class="block w-[140px] h-[250px] bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group overflow-hidden relative">
				
				<div class="h-[130px] w-full overflow-hidden p-2">
					<img 
						src={cat.img} 
						alt={cat.title} 
						class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
					/>
				</div>

				<div class="px-1 pt-7 pb-4 text-center flex flex-col items-center gap-2">
					<h3 class="text-[#0E3A6B] font-bold text-sm leading-tight group-hover:text-[#00AEEF] transition-colors">
						{cat.title}
					</h3>
					
					<p class="text-[11px] pt-1 text-gray-500 leading-tight line-clamp-4">
						{cat.desc}
					</p>
				</div>

                <div class="absolute bottom-0 left-0 w-full h-1 bg-[#00AEEF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
			</a>
		{/each}
	{/if}
	</div>

</div>