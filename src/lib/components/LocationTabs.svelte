<script lang="ts">
	import { Phone, Mail, MapPin } from '@lucide/svelte';
	import { onMount } from 'svelte';

	// 1. STATE
    let locations = $state<any[]>([]);
	let activeIndex = $state(0);

    // 2. FETCH DATA
    onMount(async () => {
        try {
            const res = await fetch('/api/locations');
            locations = await res.json();
        } catch (error) {
            console.error("Error loading locations:", error);
        }
    });

	let activeLocation = $derived(locations.length > 0 ? locations[activeIndex] : null);

	function setTab(index: number) { activeIndex = index; }
</script>

<section class="w-full py-12 bg-[#D9D9D9]/33">
	
	<div class="w-[75%] mx-auto flex flex-col gap-10">
		{#if locations.length === 0}
            <div class="text-center py-10 text-gray-500">Đang tải bản đồ...</div>
        {:else}
		<div class="flex flex-wrap justify-center gap-4">
			{#each locations as loc, index}
				<button 
					onclick={() => setTab(index)}
					class="px-6 py-2 rounded-md border font-bold text-sm transition-all duration-300 shadow-sm
					{activeIndex === index 
						? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' 
						: 'bg-white text-gray-500 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'
					}"
				>
					{loc.name}
				</button>
			{/each}
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
			
			<div class="bg-[#0E3A6B] text-white rounded-xl p-8 flex flex-col justify-between shadow-xl h-full">
				
				<div class="flex flex-col gap-6">
					<h3 class="text-lg font-bold uppercase leading-relaxed border-b border-white/20 pb-4">
						{activeLocation.companyName}
					</h3>

					<div class="flex flex-col gap-5 text-sm font-regular">
						
						<div class="flex items-start gap-3">
							<MapPin class="size-5 shrink-0 mt-1 text-white" />
							<p class="leading-relaxed">
								<span class="opacity-70">Địa chỉ:</span> <br/>
								{activeLocation.address}
							</p>
						</div>

						<div class="flex items-center gap-3">
							<Phone class="size-5 shrink-0 text-white" />
							<p>
								<span class="opacity-70">Điện thoại:</span> 
								<a href="tel:0965060363" class="hover:underline">0965060363</a>
							</p>
						</div>

						<div class="flex items-center gap-3">
							<Phone class="size-5 shrink-0 text-red-500" />
							<p>
								<span class="opacity-70">Hotline:</span> 
								<a href="tel:0972929933" class=" text-sm hover:text-red-300 transition-colors">0972929933</a>
							</p>
						</div>

						<div class="flex items-center gap-3">
							<Mail class="size-5 shrink-0 text-white" />
							<p>
								<span class="opacity-70">Email:</span> 
								<span>info@toanphat.com</span>
							</p>
						</div>
					</div>
				</div>

				<div class="mt-8">
					<a 
						href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLocation.mapQuery)}`} 
						target="_blank"
						class="block w-full bg-white text-[#0E3A6B] font-bold text-center py-3 rounded-full hover:bg-gray-100 transition-colors shadow-md"
					>
						Tìm Trên Bản Đồ
					</a>
				</div>

			</div>

			<div class="bg-white p-2 rounded-xl shadow-lg h-[450px]">
				<iframe
					title="Google Map"
					width="100%"
					height="100%"
					style="border:0; border-radius: 0.75rem;"
					loading="lazy"
					allowfullscreen
					referrerpolicy="no-referrer-when-downgrade"
					src={`https://maps.google.com/maps?q=${encodeURIComponent(activeLocation.mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
				></iframe>
			</div>

		</div>
		{/if}
	</div>
</section>