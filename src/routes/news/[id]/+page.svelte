<script lang="ts">
	import { page } from '$app/stores';
	import { House, Calendar, Clock, ChevronRight, Share2, Facebook, Twitter, Linkedin } from '@lucide/svelte';
    import { onMount } from 'svelte';

    // 1. Get ID
	let newsId = $derived($page.params.id);
	
    // 2. State
    let article = $state<any>(null);
	let relatedNews = $state<any[]>([]);
	let isLoading = $state(true);

    // 3. Fetch Data
    $effect(() => {
        if (newsId) {
            async function loadData() {
                isLoading = true;
                try {
                    // Fetch the specific article
                    // json-server returns an array when filtering by id, so we take [0]
                    const res = await fetch(`http://localhost:3001/news?id=${newsId}`);
                    const data = await res.json();
                    
                    if (data.length > 0) {
                        article = data[0];
                    }

                    // Fetch related news (All news, excluding current)
                    const resRel = await fetch('http://localhost:3001/news');
                    const allNews = await resRel.json();
                    relatedNews = allNews.filter((n: any) => n.id !== newsId && n.type === 'main').slice(0, 5);
                    
                } catch (error) {
                    console.error("Error loading news:", error);
                }
                isLoading = false;
            }
            loadData();
        }
    });
</script>

<div class="min-h-screen bg-gray-50 py-8 pb-20">
	<div class="w-[75%] mx-auto">
		
		{#if isLoading}
			<div class="text-center py-20 text-gray-500 italic">Đang tải bài viết...</div>
		{:else if article}
			
			<div class="flex items-center gap-2 text-sm text-gray-500 mb-8">
				<a href="/" class="hover:text-[#0E3A6B]"><House class="size-4" /></a>
				<span>|</span>
				<a href="/news" class="hover:text-[#0E3A6B]">Tin Tức</a>
				<span>|</span>
				<span class="text-[#0E3A6B] font-medium truncate max-w-[400px]">{article.title}</span>
			</div>

			<div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
				
				<div class="lg:col-span-8 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
					
                    <h1 class="text-2xl lg:text-3xl font-bold text-[#0E3A6B] mb-4 leading-tight">
						{article.title}
					</h1>

					<div class="flex items-center justify-between text-xs text-gray-500 mb-8 border-b border-gray-100 pb-4">
						<div class="flex items-center gap-4">
                            <div class="flex items-center gap-1">
                                <Calendar class="size-3" /> 
                                <span>{article.date || '20/11/2025'}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <Clock class="size-3" /> 
                                <span>5 phút đọc</span>
                            </div>
                        </div>
						<div class="flex gap-3">
                            <button class="hover:text-blue-600"><Facebook class="size-4" /></button>
                            <button class="hover:text-sky-500"><Twitter class="size-4" /></button>
                            <button class="hover:text-blue-700"><Linkedin class="size-4" /></button>
                        </div>
					</div>

                    <div class="text-base font-medium text-gray-600 italic mb-6 bg-gray-50 p-4 rounded-lg border-l-4 border-[#0E3A6B]">
                        {article.desc}
                    </div>

					<div class="text-gray-800 leading-relaxed text-justify space-y-4">
						{#if article.content}
							{@html article.content}
						{:else}
                            <p>Nội dung chi tiết cho bài viết này đang được cập nhật. Vui lòng quay lại sau.</p>
						{/if}
					</div>

                    <div class="mt-10 pt-6 border-t border-gray-100 flex gap-2">
                        <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">#maynongnghiep</span>
                        <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">#toanphat</span>
                        <span class="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">#tintuc</span>
                    </div>

				</div>

				<div class="lg:col-span-4 sticky top-6">
					<div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
						<h3 class="text-[#0E3A6B] font-bold text-lg px-5 py-4 border-b border-gray-100 bg-gray-50/50">
							Bài Viết Liên Quan
						</h3>
						<div class="p-5 flex flex-col gap-5">
							{#each relatedNews as item}
								<a href={`/news/${item.id}`} class="group flex gap-3 items-start">
									{#if item.img}
										<div class="w-24 h-16 shrink-0 rounded-md overflow-hidden border border-gray-200">
											<img src={item.img} alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
										</div>
									{/if}
                                    <div class="flex flex-col gap-1">
                                        <h4 class="text-sm font-bold text-gray-800 leading-snug group-hover:text-[#0E3A6B] transition-colors line-clamp-2">
                                            {item.title}
                                        </h4>
                                        <span class="text-[10px] text-gray-400">{item.date}</span>
                                    </div>
								</a>
								<div class="border-b border-gray-100 last:hidden"></div>
							{/each}
						</div>
					</div>

                    <div class="mt-6 rounded-xl overflow-hidden shadow-sm">
                         <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=400&auto=format&fit=crop" alt="Ad" class="w-full h-auto" />
                    </div>
				</div>

			</div>

		{:else}
			<div class="flex flex-col items-center justify-center py-20 text-center">
                <div class="text-6xl mb-4">😕</div>
                <h2 class="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bài viết</h2>
                <p class="text-gray-500 mb-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                <a href="/news" class="text-[#0E3A6B] font-bold hover:underline flex items-center gap-1">
                    <ChevronRight class="size-4" /> Quay lại trang Tin Tức
                </a>
            </div>
		{/if}

	</div>
</div>