<script lang="ts">
	import { Combobox, Portal, type ComboboxRootProps, useListCollection } from '@skeletonlabs/skeleton-svelte';
	import { ChevronDown } from '@lucide/svelte';

const data = [
		{ label: 'Chính sách vận chuyển', value: 'chinh-sach-van-chuyen' },
		{ label: 'Mẹo vặt', value: 'meo-vat' },
		{ label: 'Flash Sale', value: 'flash-sale' },
		{ label: 'Máy móc - Thiết bị', value: 'may-moc-thiet-bi' },
		{ label: 'Phụ kiện', value: 'phu-kien' },
	];

	let items = $state(data);
	let searchValue = $state("");

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value,
		}),
	);

	const onOpenChange = () => { items = data; };

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		searchValue = event.inputValue;
		const filtered = data.filter((item) => item.label.toLowerCase().includes(event.inputValue.toLowerCase()));
		items = filtered.length > 0 ? filtered : data;
	};

	const handleSearch = () => { console.log("Search:", searchValue); };
</script>

<div class="flex w-full max-w-md shadow-md rounded-md relative z-20">
	<Combobox class="w-full" {collection} {onOpenChange} {onInputValueChange} inputBehavior="autohighlight">
		<Combobox.Control class="relative">
			<Combobox.Input 
				class="input w-full border-none focus:ring-0 bg-gray-50 rounded-l-md rounded-r-none text-black/58 placeholder:text-black/58 pr-10" 
				placeholder="Nhập từ khóa..." 
				onkeydown={(e) => e.key === 'Enter' && handleSearch()}
			/>
			<Combobox.Trigger class="absolute right-2 top-1/2 -translate-y-1/2 text-black/50 hover:text-black p-1">
				<ChevronDown class="size-4" />
			</Combobox.Trigger>
		</Combobox.Control>

		<Portal>
			<Combobox.Positioner style="z-index: 99999;">
				<Combobox.Content class="bg-[#0E3A6B] border-[#0E3A6B] text-white rounded-md mt-1 shadow-2xl overflow-hidden w-var(--bits-combobox-anchor-width)">
					{#each items as item (item.value)}
						<Combobox.Item {item} class="px-4 py-2 cursor-pointer transition-colors hover:bg-white/20 focus:bg-white/20 outline-none">
							<Combobox.ItemText>{item.label}</Combobox.ItemText>
						</Combobox.Item>
					{/each}
				</Combobox.Content>
			</Combobox.Positioner>
		</Portal>
	</Combobox>

	<button onclick={handleSearch} class="bg-[#0E3A6B] text-white font-bold px-6 rounded-r-md hover:brightness-110 whitespace-nowrap">
		Tìm Kiếm
	</button>
</div>