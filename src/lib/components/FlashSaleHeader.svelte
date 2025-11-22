<script lang="ts">
	import { onMount } from 'svelte';
	import { Zap } from '@lucide/svelte';


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
</script>

<div class="w-full h-[150px] bg-[#001E3C] relative flex items-center justify-center overflow-hidden">
    
    <div class="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,#3b82f6_0%,#001E3C_70%)] opacity-80"></div>
    
    <div class="relative z-10 flex flex-col items-center gap-2">
        
        <div class="flex items-center gap-4">
            <div class="w-8 h-1px bg-gray-400/50"></div>
            
            <div class="flex items-center gap-2">
                <Zap class="size-6 text-[#FBFF1F] fill-[#FBFF1F]" />
                
                <span class="text-2xl font-black italic text-[#FBFF1F] tracking-wider">
                    FLASH SALE
                </span>
                
                <span class="text-sm text-white font-medium tracking-wide">
                    Kết thúc trong
                </span>
            </div>

            <div class="w-8 h-1px bg-gray-400/50"></div>
        </div>

        <div class="flex gap-3 mt-1">
            {@render timerItem(time.days, "Ngày")}
            {@render timerItem(time.hours, "Giờ")}
            {@render timerItem(time.minutes, "Phút")}
            {@render timerItem(time.seconds, "Giây")}
        </div>

    </div>

</div>

{#snippet timerItem(value: number, label: string)}
    <div class="bg-[#FFE4E1] rounded-md w-14 h-16 flex flex-col items-center justify-center shadow-lg border border-white/20">
        <span class="text-2xl font-extrabold text-[#FFD700] leading-none drop-shadow-sm" style="-webkit-text-stroke: 0.5px #d6a600;">
            {value}
        </span>
        <span class="text-[11px] font-bold text-gray-800 mt-1">
            {label}
        </span>
    </div>
{/snippet}