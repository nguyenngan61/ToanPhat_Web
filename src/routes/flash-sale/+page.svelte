<script>
	import FlashSaleHeader from '$lib/components/FlashSaleHeader.svelte';
    import FlashSaleGrid from '$lib/components/FlashSaleGrid.svelte';
</script>

<div class="flex flex-col min-h-screen bg-gray-50">
    
    <FlashSaleHeader />

    <div class="w-full mx-auto">
		<div class="w-full h-[200px] overflow-hidden shadow-md">
			<img 
				src="https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTY2MzF8MHwxfHNlYXJjaHw0fHxzYWxlfGVufDB8fHx8MTc2MzgxNzAwOXww&ixlib=rb-4.1.0&q=80&w=1080" 
				alt="Hot Promotion Banner" 
				class="w-full h-full object-cover"
			/>
		</div>
    </div>
    <FlashSaleGrid />
</div>