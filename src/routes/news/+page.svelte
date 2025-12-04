<script lang="ts">
	import { House, ChevronRight, Calendar } from '@lucide/svelte';
    import { onMount } from 'svelte';

    // 1. STATE
	let featuredNews = $state<any[]>([]);
	let tips = $state<any[]>([]);
	let mainNews = $state<any[]>([]);
	const videoId = "d5_AMNbnb7M"; 

    // 2. FETCH
    onMount(async () => {
        try {
            const res = await fetch('http://localhost:3001/news');
            const data = await res.json(); // Fixed: added await

            // Filter data
            featuredNews = data.filter((i: any) => i.type === 'featured').map((i: any) => i.title); 
            tips = data.filter((i: any) => i.type === 'tip');
            mainNews = data.filter((i: any) => i.type === 'main');
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    });
</script>

<div class="min-h-screen bg-gray-50 py-8 pb-20">
	<div class="w-[75%] mx-auto">
		
		<div class="flex items-center gap-2 text-sm text-gray-500 mb-8">
			<a href="/" class="hover:text-[#0E3A6B]"><House class="size-4" /></a>
			<span>|</span>
			<span class="text-[#0E3A6B] font-medium">Tin Tức</span>
		</div>

		<div class="flex flex-col gap-10">

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
				<div class="lg:col-span-8">
					<div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 h-full">
						<div class="w-full h-full aspect-video bg-black rounded-lg overflow-hidden relative">
							<iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}`} title="Video" frameborder="0" allowfullscreen></iframe>
						</div>
					</div>
				</div>
				<div class="lg:col-span-4">
					<div class="bg-white rounded-xl border border-gray-100 shadow-sm h-full overflow-hidden">
						<h2 class="text-[#0E3A6B] font-bold text-lg px-5 py-4 border-b border-gray-100 bg-gray-50/50">Tin Nổi Bật</h2>
						<div class="p-5 flex flex-col gap-4">
							{#each featuredNews as item, i}
								<a href="/news/detail" class="flex items-start gap-3 group">
									<div class="shrink-0 size-6 bg-[#0E3A6B] text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5 group-hover:bg-[#00AEEF] transition-colors">{i + 1}</div>
									<span class="text-sm text-gray-600 group-hover:text-[#0E3A6B] transition-colors line-clamp-2">{item}</span>
								</a>
								{#if i < featuredNews.length - 1}<div class="border-b border-gray-100 w-full ml-9"></div>{/if}
							{/each}
                            {#if featuredNews.length === 0}<p class="text-gray-400 text-sm italic">Đang tải...</p>{/if}
						</div>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
				
				<div class="lg:col-span-4">
					<div class="sticky top-6">
						<div class="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
							<h2 class="text-[#0E3A6B] font-bold text-lg mb-5 border-l-4 border-[#0E3A6B] pl-3">Mẹo Vặt</h2>
							<div class="flex flex-col gap-6">
								{#each tips as item}
									<a href={`/news/${item.id}`} class="group flex flex-col gap-2">
										<div class="w-full aspect-video rounded-md overflow-hidden border border-gray-200">
											<img src={item.img} alt="Tip" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
										</div>
										<h3 class="text-xs font-bold text-gray-800 leading-relaxed group-hover:text-[#0E3A6B] transition-colors">{item.title}</h3>
                                        <div class="w-full h-px bg-gray-100 mt-2"></div>
									</a>
								{/each}
                                {#if tips.length === 0}<p class="text-gray-400 text-sm italic">Đang tải...</p>{/if}
							</div>
						</div>
					</div>
				</div>

				<div class="lg:col-span-8">
					<div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
						<div class="flex flex-col gap-8">
							{#each mainNews as news}
								<a href={`/news/${news.id}`} class="flex flex-col sm:flex-row gap-5 group border-b border-gray-100 pb-8 last:border-0">
									<div class="w-full sm:w-[220px] h-[140px] shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
										<img src={news.img} alt="News" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
									</div>
									<div class="flex flex-col gap-2">
										<h3 class="font-bold text-base text-gray-900 leading-snug group-hover:text-[#0E3A6B] transition-colors">{news.title}</h3>
										<div class="flex items-center gap-1 text-xs text-gray-400"><Calendar class="size-3" /><span>{news.date || '18/11/2025'}</span></div>
										<p class="text-sm text-gray-500 leading-relaxed line-clamp-3">{news.desc}</p>
									</div>
								</a>
							{/each}
                            {#if mainNews.length === 0}<p class="text-gray-400 text-sm italic text-center py-10">Đang tải tin tức...</p>{/if}
						</div>

						<div class="flex justify-center items-center gap-2 mt-8 pt-6 border-t border-gray-100">
							<button class="size-8 flex items-center justify-center bg-[#0E3A6B] text-white rounded text-sm font-bold">1</button>
							<button class="size-8 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded text-sm hover:border-[#0E3A6B] hover:text-[#0E3A6B] transition-colors">2</button>
							<button class="size-8 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded text-sm hover:border-[#0E3A6B] hover:text-[#0E3A6B] transition-colors">3</button>
							<span class="text-gray-400 text-xs px-1">...</span>
							<button class="size-8 flex items-center justify-center bg-white border border-gray-200 text-gray-600 rounded text-sm hover:border-[#0E3A6B] hover:text-[#0E3A6B] transition-colors">10</button>
							<button class="size-8 flex items-center justify-center text-gray-400 hover:text-[#0E3A6B]"><ChevronRight class="size-4" /></button>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>