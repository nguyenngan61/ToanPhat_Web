<script lang="ts">
	import { ChevronRight } from '@lucide/svelte';

const categories = [
		{ 
			title: "Máy Băm Chuối", 
			desc: "Hai chức năng, đa năng 3kW, thái chuối mịn",
			img: "/assets/may-bam-chuoi.png"  
		},
		{ 
			title: "Máy Băm Cỏ", 
			desc: "Hai chức năng, đa năng 3kW, đa chức năng",
			img: "/assets/may-bam-co.png" 
		},
		{ 
			title: "Máy Chăn Nuôi", 
			desc: "Nghiền thức ăn chăn nuôi B12/ B20",
			img: "/assets/may-chan-nuoi.png" 
		},
		{ 
			title: "Máy Chế Biến Thực Phẩm", 
			desc: "Máy nổ bỏng, nghiền bột siêu mịn",
			img: "/assets/may-che-bien-thuc-pham.png" 
		},
		{ 
			title: "Máy Ép Cám Viên", 
			desc: "Máy ép cám viên S150/ S160/ S180",
			img: "/assets/may-ep-cam-vien.png" 
		},
		{ 
			title: "Máy Nông Nghiệp", 
			desc: "Máy ép cám viên S150/ S160/ S180",
			img: "/assets/may-nong-nghiep.png" 
		},
		{ 
			title: "Máy & Công Nghệ Khác", 
			desc: "Air shower, máy bóc lạc, máy băm gỗ",
			img: "/assets/may-cn-khac.png" 
		},
		{ 
			title: "Thiết Bị Sấy Hấp", 
			desc: "Máy sấy dân dụng đa năng MS10/ MS30",
			img: "/assets/thiet-bi-say-hap.png" 
		},
	];
</script>

<div class="py-10 bg-white">
	
	<div class="w-[75%] mx-auto flex justify-between items-center mb-8">
		<h2 class="text-2xl font-bold text-[#0E3A6B] uppercase">Danh Mục Sản Phẩm</h2>
		
		<a href="/products?tab=Tất Cả#shop-section" class="group flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-[#00AEEF] transition-colors border px-4 py-1 rounded shadow-sm hover:shadow-md bg-gray-50">
			Xem Tất Cả
			<ChevronRight class="size-4 group-hover:translate-x-1 transition-transform" />
		</a>
	</div>

	<div class="flex justify-center gap-1 flex-wrap px-4">
		{#each categories as cat}
			
			<a href={`/products?tab=${cat.title}#shop-section`} class="block w-[140px] h-[250px] bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer group overflow-hidden relative">
				
				<div class="h-[130px] w-full overflow-hidden p-2">
					<img 
						src={cat.img} 
						alt={cat.title} 
						class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
					/>
				</div>

				<div class="px-1 pt-7 pb-4 text-center flex flex-col items-center gap-2">
					<h3 class="text-[#0E3A6B] font-bold text-sm leading-tight group-hover:text-[#00AEEF] transition-colors">
						{cat.title}
					</h3>
					
					<p class="text-[11px] pt-1 text-gray-500 leading-tight line-clamp-4">
						{cat.desc}
					</p>
				</div>

                <div class="absolute bottom-0 left-0 w-full h-1 bg-[#00AEEF] opacity-0 group-hover:opacity-100 transition-opacity"></div>
			</a>
		{/each}
	</div>

</div>