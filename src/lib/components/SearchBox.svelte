<script lang="ts">
	import { Combobox, Portal, type ComboboxRootProps, useListCollection } from '@skeletonlabs/skeleton-svelte';
	import { ChevronDown } from '@lucide/svelte';
	import { goto } from '$app/navigation';

	// 1. STATE
	let items = $state<any[]>([]); // Start empty
	let searchValue = $state("");
    let debounceTimer: any;

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.name, // Use 'name' from db.json
			itemToValue: (item) => item.id,
		}),
	);

    // 2. FETCH FUNCTION
    async function fetchSuggestions(query: string) {
        if (!query) {
            items = [];
            return;
        }
        try {
            // JSON Server supports partial search with 'q='
            // Example: GET /products?q=chuối
            const res = await fetch(`http://localhost:3001/products?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            
            // Limit to top 5 suggestions to keep dropdown clean
            items = data.slice(0, 5);
        } catch (error) {
            console.error("Search Error:", error);
        }
    }

	const onOpenChange = () => { 
        // Optional: Load default suggestions when opening empty
        if (items.length === 0) fetchSuggestions(""); 
    };

	// 3. INPUT HANDLER (With Debounce)
	const onInputValueChange = (event: any) => {
		searchValue = event.inputValue;
        
        // Clear previous timer
        clearTimeout(debounceTimer);
        
        // Set new timer (wait 300ms before fetching)
        debounceTimer = setTimeout(() => {
            fetchSuggestions(searchValue);
        }, 300);
	};

	const handleSearch = () => {
		if (searchValue.trim().length > 0) {
			goto(`/search?q=${encodeURIComponent(searchValue)}`);
		}
	};
</script>

<div class="flex w-full max-w-md shadow-md rounded-md relative z-20">
	
	<Combobox 
		class="w-full" 
		{collection} 
		{onOpenChange} 
		{onInputValueChange} 
		inputBehavior="autohighlight"
	>
		<Combobox.Control class="relative">
			<Combobox.Input 
				class="input w-full border-none focus:ring-0 bg-gray-50 rounded-l-md rounded-r-none text-black placeholder:text-gray-400 pr-10" 
				placeholder="Nhập từ khóa..." 
				onkeydown={(e) => e.key === 'Enter' && handleSearch()}
			/>
			<Combobox.Trigger class="absolute right-2 top-1/2 -translate-y-1/2 text-black/50 hover:text-black p-1">
				<ChevronDown class="size-4" />
			</Combobox.Trigger>
		</Combobox.Control>

		<Portal>
			<Combobox.Positioner style="z-index: 99999;">
				<Combobox.Content class="bg-[#0E3A6B] border-[#0E3A6B] text-white rounded-md mt-1 shadow-2xl overflow-hidden w-(--bits-combobox-anchor-width)">
					{#if items.length > 0}
						{#each items as item (item.id)}
							<Combobox.Item 
								{item} 
								class="px-4 py-2 cursor-pointer transition-colors hover:bg-white/20 focus:bg-white/20 outline-none"
								onclick={() => {
									searchValue = item.name; 
									handleSearch(); 
								}}
							>
								<Combobox.ItemText>{item.name}</Combobox.ItemText>
							</Combobox.Item>
						{/each}
					{:else if searchValue.length > 2}
                        <div class="px-4 py-2 text-white/70 italic text-sm">Không tìm thấy sản phẩm...</div>
					{/if}
				</Combobox.Content>
			</Combobox.Positioner>
		</Portal>
	</Combobox>

	<button 
		onclick={handleSearch}
		class="bg-[#0E3A6B] text-white font-bold px-6 rounded-r-md hover:brightness-110 whitespace-nowrap"
	>
		Tìm Kiếm
	</button>
</div>