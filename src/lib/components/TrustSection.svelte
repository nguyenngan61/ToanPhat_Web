<script lang="ts">
	import { Users, MapPin, Medal, Package } from '@lucide/svelte';

	const features = [
		{
			title: "ĐỘI NGŨ NHÂN VIÊN CHUYÊN NGHIỆP",
			desc: "Đội ngũ tư vấn viên luôn quan tâm tới nhu cầu của khách hàng chu đáo",
			icon: Users,
			color: "text-blue-600",
			bg: "bg-blue-100"
		},
		{
			title: "PHÂN PHỐI TRÊN TOÀN QUỐC",
			desc: "Với mạng lưới phân phối trên toàn quốc, chúng tôi mang đến dịch vụ hỗ trợ tối ưu",
			icon: MapPin,
			color: "text-green-600",
			bg: "bg-green-100"
		},
		{
			title: "LIÊN TỤC NÂNG CAO CHẤT LƯỢNG",
			desc: "Để thỏa mãn nhu cầu của Quý Khách, chúng tôi liên tục cải tiến và phát triển",
			icon: Medal,
			color: "text-yellow-600",
			bg: "bg-yellow-100"
		},
		{
			title: "DANH MỤC SẢN PHẨM ĐA DẠNG",
			desc: "Công ty của chúng tôi có mọi thứ các bạn cần cho nhu cầu sản xuất",
			icon: Package,
			color: "text-purple-600",
			bg: "bg-purple-100"
		}
	];

	const certs = [
		{ name: "CE", img: "/assets/cert-ce.png" },
		{ name: "ISO 9001:2015", img: "/assets/cert-iso.png" },
		{ name: "Hàng Việt Nam CLC", img: "/assets/cert-vn.png" },
		{ name: "Trusted Green", img: "/assets/cert-green.png" }
	];
</script>

<section class="w-full bg-white pb-20">
	
	<div class="w-full bg-linear-to-r from-[#0E3A6B] to-[#265c96] pt-16 pb-32 text-center text-white">
		<div class="w-[75%] mx-auto">
			<h2 class="text-2xl font-bold">Bạn Có Thể Đặt Niềm Tin Vào Toàn Phát Vì:</h2>
		</div>
	</div>

	<div class="w-[75%] mx-auto relative z-10">
		
		<div class="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-24">
			{#each features as item}
				<div class="bg-white rounded-xl shadow-lg p-6 text-center flex flex-col items-center gap-4 hover:-translate-y-2 transition-transform duration-300 ease-out border border-gray-100">
					
					<div class={`p-2 rounded-full ${item.bg} ${item.color}`}>
						<svelte:component this={item.icon} size={32} />
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