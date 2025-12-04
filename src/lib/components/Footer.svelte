<script lang="ts">
	import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from '@lucide/svelte';
    import { onMount } from 'svelte';

    // 1. STATE
    let locations = $state<any[]>([]);

    // 2. FETCH DATA
    onMount(async () => {
        try {
            // Use the same 'locations' endpoint we used for the Home Page map
            const res = await fetch('http://localhost:3001/locations');
            if (res.ok) {
                locations = await res.json();
            }
        } catch (error) {
            console.error("Error loading footer locations:", error);
        }
    });
</script>

<footer class="bg-[#00305B] text-white h-[310px] flex flex-col justify-center font-sans text-xs overflow-hidden">
	
	<div class="w-[75%] mx-auto h-full flex flex-col justify-center">

		<div class="grid grid-cols-1 md:grid-cols-4 gap-4 pb-4 border-b border-white/20">
			
            {#if locations.length > 0}
                {#each locations as loc}
                    <div class="flex flex-col gap-1">
                        <h3 class="font-bold text-sm">{loc.name}</h3>
                        <div class="flex gap-2 opacity-90">
                            <MapPin class="size-3 shrink-0 mt-0.5 text-white" />
                            <p class="leading-tight">{loc.address}</p>
                        </div>
                    </div>
                {/each}
            {:else}
                <div class="col-span-4 text-center text-white/50 italic">Đang tải thông tin...</div>
            {/if}

		</div>

		<div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-8 pt-4">
			
			<div class="flex flex-col gap-2 pr-4">
				<h3 class="font-bold text-sm uppercase tracking-wide">CÔNG TY CP CÔNG NGHỆ CƠ KHÍ TOÀN PHÁT</h3>
				<p class="text-[11px] leading-relaxed opacity-80 text-justify line-clamp-4">
					Công ty Cổ phần Công nghệ Cơ khí Toàn Phát là đơn vị chuyên sản xuất và phân phối đa dạng các dòng máy móc. Các sản phẩm chủ lực bao gồm máy móc nông nghiệp, máy chăn nuôi, máy chế biến thực phẩm và các loại thiết bị sấy hấp công nghiệp.
				</p>
			</div>

			<div class="flex flex-col gap-2">
				<h3 class="font-bold text-sm uppercase tracking-wide">HỖ TRỢ KHÁCH HÀNG</h3>
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2">
						<Phone class="size-4 text-white" />
						<span class="font-bold text-base">0965060363</span>
					</div>
					<div class="flex items-center gap-2">
						<Mail class="size-4 text-white" />
						<span>info@toanphat.com</span>
					</div>
				</div>

				<div class="flex gap-2 mt-1">
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" class="bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500 p-1 rounded hover:brightness-110 flex items-center justify-center">
						<Instagram class="size-4 text-white" />
					</a>
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" class="bg-[#1877F2] p-1 rounded hover:brightness-110 flex items-center justify-center">
						<Facebook class="size-4 text-white fill-current" />
					</a>
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" class="bg-[#FF0000] p-1 rounded hover:brightness-110 flex items-center justify-center">
						<Youtube class="size-4 text-white" />
					</a>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<h3 class="font-bold text-sm uppercase tracking-wide">LIÊN KẾT NHANH</h3>
				<nav class="flex flex-col gap-1 opacity-90 text-[11px]">
					<a href="/" class="hover:text-white">Trang Chủ</a>
					<a href="/products" class="hover:text-white">Sản Phẩm</a>
					<a href="/news" class="hover:text-white">Tin Tức</a>
					<a href="/policy/warranty" class="hover:text-white">Bảo Hành</a>
					<a href="/contact" class="hover:text-white">Liên Hệ Với Chúng Tôi</a>
				</nav>
			</div>

		</div>

	</div>
</footer>