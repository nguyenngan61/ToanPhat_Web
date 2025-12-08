<script lang="ts">
	import { Users, MapPin, Medal, Package } from '@lucide/svelte';
    import { onMount } from 'svelte';

    // 1. Icon Mapping (Database String -> Svelte Component)
    // The DB has "icon": "users", we map it to the Users component here.
    const iconMap: Record<string, any> = {
        "users": Users,
        "mapPin": MapPin,
        "medal": Medal,
        "package": Package
    };

    // 2. STATE
	let trust_reasons = $state<any[]>([]);
	
    // 3. Static Data for Certificates (These remain static as they are assets)
	const certs = [
		{ name: "CE", img: "/assets/cert-ce.png" },
		{ name: "ISO 9001:2015", img: "/assets/cert-iso.png" },
		{ name: "Hàng Việt Nam CLC", img: "/assets/cert-vn.png" },
		{ name: "Trusted Green", img: "/assets/cert-green.png" }
	];

    // 4. FETCH DATA
    onMount(async () => {
        try {
            const res = await fetch('/api/trust_reasons');
            if (res.ok) {
                trust_reasons = await res.json();
            }
        } catch (error) {
            console.error("Error loading trust section:", error);
        }
    });
</script>

<section class="w-full bg-white pb-20">
	
	<div class="w-full bg-linear-to-r from-[#0E3A6B] to-[#265c96] pt-16 pb-32 text-center text-white">
		<div class="w-[75%] mx-auto">
			<h2 class="text-2xl font-bold">Bạn Có Thể Đặt Niềm Tin Vào Toàn Phát Vì:</h2>
		</div>
	</div>

	<div class="w-[75%] mx-auto relative z-10">
		
        {#if trust_reasons.length === 0}
            <div class="text-center py-10 -mt-24 bg-white rounded-xl shadow-lg">Đang tải dữ liệu...</div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-24">
                {#each trust_reasons as item}
                    <div class="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300 ease-out border border-gray-100">
                        
                        <div class={`p-4 rounded-full ${item.bg} ${item.color}`}>
                            <!-- svelte-ignore svelte_component_deprecated -->
                            <svelte:component this={iconMap[item.icon] || Package} size={32} />
                        </div>

                        <h3 class="font-bold text-[#0E3A6B] text-sm uppercase leading-tight h-10 flex items-center justify-center">
                            {item.title}
                        </h3>
                        <p class="text-xs text-gray-500 leading-relaxed">
                            {item.desc}
                        </p>

                    </div>
                {/each}
            </div>
        {/if}

	</div>

	<div class="w-[75%] mx-auto mt-16">
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			{#each certs as cert}
				<div class="flex flex-col items-center gap-3">
					<div class="w-full h-[100px] border border-gray-300 rounded-2xl flex items-center justify-center p-4 bg-white hover:border-[#0E3A6B] transition-colors">
						<img src={cert.img} alt={cert.name} class="w-full h-full object-contain" />
					</div>
					<span class="text-sm font-bold text-gray-700">{cert.name}</span>
				</div>
			{/each}
		</div>
	</div>

</section>