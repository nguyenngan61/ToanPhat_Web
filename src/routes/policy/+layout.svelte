<script lang="ts">
	import { House, List } from '@lucide/svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	// Menu Configuration
	const menuItems = [
        { name: "Quy Định Chung", path: "/policy" }, // Default page
		{ name: "Bán Hàng & Chất Lượng Hàng", path: "/policy/sales" },
		{ name: "Vận Chuyển, Giao Nhận Hàng", path: "/policy/shipping" },
		{ name: "Đổi – Trả Hàng", path: "/policy/returns" },
		{ name: "Bảo Hành Cho Sản Phẩm", path: "/policy/warranty" }
	];

    // Function to check if link is active
    const isActive = (path: string) => {
        // Exact match for root /policy, startsWith for sub-pages
        if (path === '/policy') return $page.url.pathname === path;
        return $page.url.pathname.startsWith(path);
    };
</script>

<div class="min-h-screen bg-white py-8 pb-20">
	<div class="w-[85%] mx-auto">
		
		<div class="flex items-center gap-2 text-sm text-gray-500 mb-8">
			<a href="/" class="hover:text-[#0E3A6B]"><House class="size-4" /></a>
			<span>|</span>
			<span class="text-[#0E3A6B] font-medium">Chính Sách</span>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
			
			<div class="lg:col-span-3">
				<div class="border border-gray-200 rounded-lg overflow-hidden shadow-sm sticky top-4">
					
					<div class="bg-[#0E3A6B] text-white py-3 px-4 flex items-center gap-2 font-bold uppercase text-lg">
						<List class="size-6" />
						Mục Lục
					</div>

					<div class="bg-white flex flex-col">
						{#each menuItems as item}
							<a 
								href={item.path}
								class="text-left px-4 py-4 border-b border-gray-100 text-sm transition-colors last:border-0
								{isActive(item.path)
									? 'text-[#0E3A6B] font-bold bg-blue-50 underline' 
									: 'text-gray-600 hover:bg-gray-50 hover:text-[#0E3A6B]'}"
							>
								{item.name}
							</a>
						{/each}
					</div>

				</div>
			</div>

			<div class="lg:col-span-9 text-gray-700 leading-relaxed text-justify min-h-[400px]">
                {@render children()}
			</div>

		</div>

	</div>
</div>