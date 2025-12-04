<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	import { Phone, Mail, ShoppingCart, ChevronDown } from '@lucide/svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
    import ProductMenu from '$lib/components/ProductMenu.svelte';
	import { cart } from '$lib/stores/cart.svelte';
</script>

<AppBar class="bg-white border-b border-gray-200 shadow-sm">
	<div class="w-[75%] mx-auto">
		<AppBar.Toolbar class="grid-cols-[auto_1fr] gap-8 py-4">
			
			<AppBar.Lead>
				<a href="/">
					<img src="/assets/logocokhitoanphat.png" alt="Logo" class="h-20 w-auto object-contain" />
				</a>
			</AppBar.Lead>

			<AppBar.Headline class="flex flex-col w-full gap-3">
				
				<div class="flex justify-between items-center relative z-50">
					<SearchBox />

					<div class="flex items-center gap-6 text-sm font-medium text-gray-600">
						<div class="flex items-center gap-2">
							<Phone class="size-4 text-[#0E3A6B] fill-current" />
							<span>0965.060.363</span>
						</div>
						<div class="flex items-center gap-2">
							<Mail class="size-4 text-[#0E3A6B]" />
							<span>info@toanphat.com</span>
						</div>
					</div>
				</div>

				<div class="flex justify-between items-center border-t border-gray-100 pt-3 relative z-0">
					<nav class="flex items-center gap-25 text-black font-normal text-base">
						<a href="/" class="hover:text-[#00AEEF] transition-colors">Trang Chủ</a>
						
                        <ProductMenu />

						<a href="/news" class="hover:text-[#00AEEF] transition-colors">Tin Tức</a>
						<a href="/policy" class="hover:text-[#00AEEF] transition-colors">Chính Sách</a>
						<a href="/contact" class="hover:text-[#00AEEF] transition-colors">Liên Hệ</a>
						<a href="/cart" class="text-[#0E3A6B] hover:opacity-80 transition-opacity relative inline-block"> 
    
							{#if cart.count > 0}
								<span class="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm">
									{cart.count}
								</span>
							{/if}

							<ShoppingCart class="size-7 fill-current" />
						</a>
                    </nav>
				</div>

			</AppBar.Headline>
		</AppBar.Toolbar>
	</div>
</AppBar>