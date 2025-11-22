<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';

	const articles = [
		{
			title: "Khám Phá Sức Mạnh 'Cỗ Máy In Tiền': Đánh Giá Chi Tiết Máy Ép Cám Viên S200 Trục Liền Đời Mới Nhất.",
			img: "https://images.unsplash.com/photo-1718824331840-399943ff5c1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTY2MzF8MHwxfHNlYXJjaHw2fHxtYWNoaW5lfGVufDB8fHx8MTc2MzgwMTY2N3ww&ixlib=rb-4.1.0&q=80&w=1080"
		},
		{
			title: "Tại Sao Tủ Sấy Thực Phẩm Toàn Phát Là Lựa Chọn Số 1 Cho Các Xưởng Khởi Nghiệp Đặc Sản Khô?",
			img: "https://images.unsplash.com/photo-1754294437681-4ec491072dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTY2MzF8MHwxfHNlYXJjaHwyMHx8ZHJpZWQlMjBnb29kc3xlbnwwfHx8fDE3NjM4MDE3Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
		},
		{
			title: "Giải Phóng Sức Lao Động: Đánh Giá Chi Tiết Máy Băm Cỏ Đa Năng Toàn Phát – 'Cỗ Máy' Xử Lý Gọn Mọi Phụ Phẩm Nông Nghiệp.",
			img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=200&auto=format&fit=crop"
		}
	];

	const tips = [
		{
			title: "5 Công Thức Tự Phối Trộn Cám Viên Tăng Trọng Nhanh, Siêu Tiết Kiệm Chỉ Với Máy S150 Plus Của Toàn Phát.",
			img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=200&auto=format&fit=crop"
		},
		{
			title: "Tận Dụng Phụ Phẩm Nông Nghiệp (Rau, Vỏ Trái Cây) Để Làm Thức Ăn Vi Sinh Bằng Máy Băm Cỏ Đa Năng.",
			img: "https://images.unsplash.com/photo-1728751676767-5393e4141ad7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTY2MzF8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHBlZWx8ZW58MHx8fHwxNzYzODAxOTUwfDA&ixlib=rb-4.1.0&q=80&w=1080"
		},
		{
			title: "Mẹo cân bằng độ ẩm để cám ép ra viên đẹp và máy không bị nghẹt",
			img: "https://images.unsplash.com/photo-1578653038026-f06c760f1833?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTY2MzF8MHwxfHNlYXJjaHwzfHxodW1pZGl0eXxlbnwwfHx8fDE3NjM4MDE4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
		}
	];
</script>

<div class="w-full bg-white rounded-xl shadow-sm p-6">
	
	<div class="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
		<h2 class="text-[#0E3A6B] font-extrabold text-lg uppercase">ĐÁNG CHÚ Ý!!!</h2>
		<a href="/news" class="flex items-center gap-1 text-[#0E3A6B] hover:text-blue-500 font-medium text-sm transition-colors">
			Xem Thêm 
			<ArrowRight class="size-4" />
		</a>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1.3fr_0.9fr] gap-6 items-start">
		
		<div class="flex flex-col gap-3">
			<div class="w-full aspect-video rounded-lg overflow-hidden relative group cursor-pointer shadow-sm">
				<img 
					src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop" 
					alt="Promotion" 
					class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
				/>
				<div class="absolute inset-0 bg-red-600/90 flex flex-col items-center justify-center text-white p-4 text-center">
					<span class="text-4xl font-extrabold uppercase leading-none drop-shadow-md">MUA 1</span>
					<span class="text-4xl font-extrabold uppercase leading-none drop-shadow-md">TẶNG 1</span>
				</div>
			</div>

			<h3 class="text-base font-bold text-black leading-tight">
				🔥 BÙNG NỔ ƯU ĐÃI "BÃO SALE CHÀO VỤ MỚI" TỪ TOÀN PHÁT! 🔥
			</h3>

			<p class="text-xs text-gray-600 leading-relaxed text-justify">
				👉 Khi mua 01 Máy Ép Cám Viên S160 đa năng. 🎁 <br>
				Bà con sẽ được TẶNG NGAY 01 Máy Băm Chuối Mini siêu tiện lợi, trị giá lên đến 500.000 đồng!
			</p>
		</div>

		<div class="flex flex-col gap-8">
			{#each articles as item}
				<div class="flex gap-4 group cursor-pointer items-start">
					
					<div class="w-[100px] h-[65px] shrink-0 overflow-hidden rounded-md border border-gray-100">
						<img 
							src={item.img} 
							alt="News" 
							class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
						/>
					</div>
					
					<h4 class="text-[13px] font-semibold text-gray-800 leading-tight group-hover:text-[#0E3A6B] transition-colors line-clamp-3 flex-1">
						{item.title}
					</h4>
				</div>
			{/each}
		</div>

		<div class="border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col">
			
			<div class="bg-[#0E3A6B] text-white py-2 px-3 font-bold uppercase text-xs tracking-wide">
				MẸO VẶT
			</div>

			<div class="p-3 flex flex-col gap-7 bg-white flex-1">
				{#each tips as item}
					<div class="flex gap-2 group cursor-pointer items-start">
						
						<div class="w-[70px] h-[50px] shrink-0 overflow-hidden rounded-md border border-gray-100">
							<img 
								src={item.img} 
								alt="Tip" 
								class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
							/>
						</div>
						
						<h4 class="text-[11px] font-medium text-gray-700 leading-snug group-hover:text-[#0E3A6B] transition-colors line-clamp-3 flex-1">
							{item.title}
						</h4>
					</div>
				{/each}
			</div>

		</div>

	</div>

</div>