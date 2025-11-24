<script lang="ts">
	import { House, X, Minus, Plus, Check } from '@lucide/svelte';
	import { cart } from '$lib/stores/cart.svelte';
    
    // 1. ADD THESE IMPORTS
    import { checkout } from '$lib/stores/checkout.svelte';
    import { goto } from '$app/navigation';

	let selectedIds = $state<number[]>([]);

	function toggleSelection(id: number) {
		if (selectedIds.includes(id)) {
			selectedIds = selectedIds.filter(i => i !== id);
		} else {
			selectedIds.push(id);
		}
	}

	function removeItem(id: number) {
		cart.remove(id);
		selectedIds = selectedIds.filter(i => i !== id);
	}

    // 2. ADD CHECKOUT FUNCTION
    function proceedToCheckout() {
        // Filter only the items that are checked
        const itemsToBuy = cart.items.filter(item => selectedIds.includes(item.id));
        
        if (itemsToBuy.length > 0) {
            checkout.setItems(itemsToBuy); // Save to store
            goto('/checkout'); // Go to page
        } else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán.");
        }
    }

	let finalTotal = $derived(
		cart.items
			.filter(item => selectedIds.includes(item.id))
			.reduce((sum, item) => sum + (item.price * item.quantity), 0)
	);

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
	};
</script>

<div class="min-h-screen bg-white pb-20 pt-6">
	<div class="w-[90%] mx-auto">
		
		<div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
			<a href="/" class="hover:text-[#0E3A6B]"><House class="size-4" /></a>
			<span>|</span>
			<span class="text-[#0E3A6B] font-medium">Giỏ Hàng</span>
		</div>

		<h1 class="text-2xl font-bold text-[#0E3A6B] mb-6 uppercase">Giỏ hàng của bạn</h1>

		{#if cart.items.length === 0}
			<div class="text-center py-20 border border-dashed border-gray-300 rounded-lg bg-gray-50">
				<p class="text-gray-500">Giỏ hàng của bạn đang trống.</p>
				<a href="/products" class="text-[#0E3A6B] underline mt-2 inline-block hover:text-blue-600">Tiếp tục mua sắm</a>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full border-collapse border border-gray-200 min-w-[800px]">
					<thead>
						<tr class="bg-gray-50 text-gray-700 font-bold text-sm uppercase border-b border-gray-200">
							<th class="p-4 text-left w-[150px]">Chọn / Xóa</th> 
							<th class="p-4 text-left">Sản phẩm</th>
							<th class="p-4 text-center">Đơn giá</th>
							<th class="p-4 text-center">Số lượng</th>
							<th class="p-4 text-right">Tạm tính</th>
						</tr>
					</thead>
					<tbody class="text-gray-700">
						{#each cart.items as item (item.id)}
							<tr class="border-b border-gray-200 hover:bg-gray-50/50 transition-colors">
								<td class="p-4">
									<div class="flex items-center gap-4">
										<button onclick={() => toggleSelection(item.id)} class="w-8 h-8 border border-[#0E3A6B] flex items-center justify-center rounded hover:bg-blue-50 transition-colors" title="Chọn sản phẩm">
                                            {#if selectedIds.includes(item.id)}<Check class="size-5 text-[#0E3A6B]" strokeWidth="1.5" />{/if}
										</button>
										<button onclick={() => removeItem(item.id)} class="w-8 h-8 border border-red-300 text-red-500 flex items-center justify-center rounded hover:bg-red-50 transition-colors" title="Xóa sản phẩm"><X class="size-5" /></button>
									</div>
								</td>
								<td class="p-4">
									<div class="flex items-center gap-4">
										<div class="w-16 h-16 border border-gray-200 rounded bg-white shrink-0 flex items-center justify-center">
											<img src={item.images ? item.images[0] : "/assets/may-bam-chuoi.png"} alt={item.name} class="w-full h-full object-contain p-1" />
										</div>
										<a href="/products/may-bam-chuoi-da-nang-3kw" class="font-medium text-gray-800 hover:text-[#0E3A6B] line-clamp-2 max-w-[250px]">{item.name}</a>
									</div>
								</td>
								<td class="p-4 text-center font-medium text-gray-600">{formatPrice(item.price)}</td>
								<td class="p-4 text-center">
									<div class="inline-flex items-center border border-gray-300 rounded bg-white">
										<button onclick={() => cart.updateQuantity(item.id, -1)} class="p-1 px-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50" disabled={item.quantity <= 1}><Minus class="size-3" /></button>
										<span class="px-2 w-8 text-center text-sm font-semibold">{item.quantity}</span>
										<button onclick={() => cart.updateQuantity(item.id, 1)} class="p-1 px-2 hover:bg-gray-100 text-gray-600"><Plus class="size-3" /></button>
									</div>
								</td>
								<td class="p-4 text-right font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<div class="flex flex-col items-end gap-4 mt-8">
				<div class="flex items-center gap-8 text-lg">
					<span class="font-bold text-gray-700">Tổng tiền ({selectedIds.length} món):</span>
					<span class="font-extrabold text-[#0E3A6B] text-2xl">{formatPrice(finalTotal)}</span>
				</div>

                <button 
                    onclick={proceedToCheckout}
                    class="bg-[#004A8F] text-white font-bold px-10 py-3 rounded hover:brightness-110 transition-all shadow-md uppercase text-sm"
                >
					Thanh Toán
				</button>
			</div>
		{/if}

	</div>
</div>