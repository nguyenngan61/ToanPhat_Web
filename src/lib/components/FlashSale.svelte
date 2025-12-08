<script lang="ts">
	import { onMount } from 'svelte';
	import { Zap, ShoppingCart, ArrowRight } from '@lucide/svelte';
    import { cart } from '$lib/stores/cart.svelte';

    // 1. STATE
	let flashSaleProducts = $state<any[]>([]); 
    let isLoading = $state(true);
	let time = $state({ days: 0, hours: 1, minutes: 59, seconds: 48 });
	
	onMount(() => {
        // A. TIMER LOGIC (Synchronous - Starts immediately)
		const interval = setInterval(() => {
			if (time.seconds > 0) { time.seconds--; } 
            else { 
                time.seconds = 59;
				if (time.minutes > 0) time.minutes--;
				else time.minutes = 59; 
			}
		}, 1000);

        // B. FETCH LOGIC (Async - Wrapped in a separate function)
        const loadData = async () => {
            try {
                const res = await fetch('/api/products');
                const data = await res.json();
                // Filter for items with discount > 0
                flashSaleProducts = data.filter((p: any) => p.discount && p.discount > 0);
            } catch (error) {
                console.error("Error fetching flash sale:", error);
            }
            isLoading = false;
        };

        // Call the async function
        loadData();

        // C. RETURN CLEANUP (Synchronous return required)
		return () => clearInterval(interval);
	});

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
</script>

<div class="w-full rounded-3xl p-5 bg-linear-to-b from-[#9ab5e1] to-[#0E3A6B] shadow-xl relative overflow-hidden">
    
    <div class="flex items-center mb-5">
        <div class="flex items-center gap-2 shrink-0">
            <Zap class="size-8 text-[#FBFF1F] fill-[#FBFF1F]" />
            <h2 
                class="text-3xl font-extrabold italic uppercase text-[#FBFF1F]"
                style="-webkit-text-stroke: 1.5px #BEA733; text-shadow: 2px 2px 0px rgba(0,0,0,0.1);"
            >
                FLASH SALE!!
            </h2>
        </div>

        <div class="flex gap-2 items-center ml-12">
            {@render timerBox({ label: "Ngày", value: time.days })}
            {@render timerBox({ label: "Giờ", value: time.hours })}
            {@render timerBox({ label: "Phút", value: time.minutes })}
            {@render timerBox({ label: "Giây", value: time.seconds })}
        </div>
    </div>

    <div class="flex gap-4">
        
        {#if isLoading}
            <div class="w-full h-80 flex items-center justify-center text-white font-bold">
                Đang tải ưu đãi...
            </div>
        {:else}
            {#each flashSaleProducts.slice(0, 4) as product (product.id)}
                <a 
                    href={`/products/${product.id}`}
                    class="w-[220px] flex-none h-80 bg-white rounded-lg p-3 flex flex-col justify-between relative shadow-md group cursor-pointer hover:-translate-y-1 transition-transform text-left"
                >
                    
                    <div class="absolute top-0 left-0 bg-linear-to-b from-[#ffdd00] to-[#FF4500] text-white text-xs font-bold px-2 py-1 rounded-tl-lg rounded-br-lg z-10 shadow-sm">
                        -{product.discount}%
                    </div>

                    <div class="h-[140px] w-full flex items-center justify-center overflow-hidden mt-2">
                        <img src={product.img} alt={product.name} class="h-full object-contain group-hover:scale-105 transition-transform" />
                    </div>

                    <div class="flex flex-col gap-1">
                        <h3 class="text-sm font-bold text-gray-800 line-clamp-2 h-10 leading-tight">
                            {product.name}
                        </h3>

                        <div class="flex flex-row items-baseline gap-2">
                            <span class="text-red-600 font-bold text-lg">{formatPrice(product.price)}</span>
                            {#if product.oldPrice}
                                <span class="text-gray-400 text-xs line-through">{formatPrice(product.oldPrice)}</span>
                            {/if}
                        </div>

                        <div class="flex items-end gap-2 mt-2">
                            <div class="flex-1 flex flex-col gap-1">
                                <span class="text-[10px] font-bold text-gray-500">Đã bán: {product.sold || 0}</span>
                                <div class="w-full bg-red-100 rounded-full h-2 relative overflow-hidden border border-red-200">
                                    <div 
                                        class="bg-red-600 h-full rounded-full" 
                                        style="width: {Math.min(((product.sold || 0) / 10) * 100, 100)}%"
                                    ></div>
                                </div>
                            </div>
                            
                            </div>
                    </div>
                </a>
            {/each}
        {/if}

        <a href="/products" class="self-center flex flex-col items-center gap-1 ml-4 group text-[#FBFF1F] hover:scale-110 transition-transform shrink-0">
            <div class="w-9 h-9 rounded-full border-2 border-[#FBFF1F] flex items-center justify-center bg-white/10 group-hover:bg-[#FBFF1F] group-hover:text-[#0E3A6B] transition-colors shadow-lg">
                <ArrowRight class="size-4" />
            </div>
            <span class="font-bold uppercase text-[10px] tracking-wide drop-shadow-md text-center">Xem<br>Tất Cả</span>
        </a>

    </div>

</div>

{#snippet timerBox({ label, value }: { label: string; value: number })}
    <div class="bg-white border-2 border-[#FBFF1F] rounded-md w-14 h-14 flex flex-col items-center justify-center shadow-sm">
        <span class="text-2xl font-bold text-[#FBFF1F] leading-none drop-shadow-sm">{value}</span>
        <span class="text-[9px] font-bold text-black uppercase mt-0.5">{label}</span>
    </div>
{/snippet}