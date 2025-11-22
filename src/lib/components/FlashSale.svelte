<script lang="ts">
	import { onMount } from 'svelte';
	import { Zap, ShoppingCart, ArrowRight } from '@lucide/svelte';

	const flashSaleProducts = [
		{
			name: "Máy băm chuối đa năng 3kw",
			img: "/assets/may-bam-chuoi.png",
			price: 600000,
			oldPrice: 1000000,
			discount: 40,
			sold: 4,
			totalStock: 10
		},
		{
			name: "Máy băm cỏ, xay nghiền đa năng",
			img: "/assets/may-bam-co.png",
			price: 700000,
			oldPrice: 1000000,
			discount: 30,
			sold: 2,
			totalStock: 10
		},
		{
			name: "Máy trộn thức ăn chăn nuôi 50kg",
			img: "/assets/may-chan-nuoi.png",
			price: 800000,
			oldPrice: 1000000,
			discount: 20,
			sold: 0,
			totalStock: 10
		},
		{
			name: "Máy Rang Đa Năng 15 kg",
			img: "/assets/may-che-bien-thuc-pham.png",
			price: 700000,
			oldPrice: 1000000,
			discount: 30,
			sold: 5,
			totalStock: 10
		}
	];

	let time = $state({ days: 0, hours: 1, minutes: 59, seconds: 48 });
	
	onMount(() => {
		const interval = setInterval(() => {
			if (time.seconds > 0) { time.seconds--; } 
            else { 
                time.seconds = 59;
				if (time.minutes > 0) time.minutes--;
				else time.minutes = 59; 
			}
		}, 1000);
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
        
        {#each flashSaleProducts.slice(0, 4) as product}
            <div class="w-[220px] flex-none h-320px bg-white rounded-lg p-3 flex flex-col justify-between relative shadow-md group cursor-pointer hover:-translate-y-1 transition-transform">
                
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
                        <span class="text-gray-400 text-xs line-through">{formatPrice(product.oldPrice)}</span>
                    </div>

                    <div class="flex items-end gap-2 mt-2">
                        <div class="flex-1 flex flex-col gap-1">
                            <span class="text-[10px] font-bold text-gray-500">Đã bán: {product.sold}</span>
                            <div class="w-full bg-red-100 rounded-full h-2 relative overflow-hidden border border-red-200">
                                <div 
                                    class="bg-red-600 h-full rounded-full" 
                                    style="width: {(product.sold / product.totalStock) * 100}%"
                                ></div>
                            </div>
                        </div>
                        <button class="shrink-0 p-1.5 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                            <ShoppingCart class="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        {/each}

        <a href="/flash-sale" class="self-center flex flex-col items-center gap-1 ml-4 group text-[#FBFF1F] hover:scale-110 transition-transform shrink-0">
            
            <div class="w-9 h-9 rounded-full border-2px border-[#FBFF1F] flex items-center justify-center bg-white/10 group-hover:bg-[#FBFF1F] group-hover:text-[#0E3A6B] transition-colors shadow-lg">
                <ArrowRight class="size-4" />
            </div>
            
            <span class="font-bold uppercase text-[10px] tracking-wide drop-shadow-md text-center">Xem<br>Tất Cả</span>
        </a>

    </div>

</div>

{#snippet timerBox({ label, value }: { label: string; value: number })}
    <div class="bg-white border-2 border-[#fcdc0a] rounded-md w-14 h-14 flex flex-col items-center justify-center shadow-sm">
        <span   class="text-2xl font-extrabold uppercase text-[#fbff00]"
                style="-webkit-text-stroke: 1.5px #BEA733; text-shadow: 2px 2px 0px rgba(0,0,0,0.1);">{value}</span>
        <span class="text-[11px] font-bold text-black uppercase mt-0.5">{label}</span>
    </div>
{/snippet}