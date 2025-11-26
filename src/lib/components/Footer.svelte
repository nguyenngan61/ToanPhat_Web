<script lang="ts">
	import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from '@lucide/svelte';
</script>

<footer class="bg-[#00305B] text-white h-[310px] flex flex-col justify-center font-sans text-xs overflow-hidden">
	
	<div class="w-[75%] mx-auto h-full flex flex-col justify-center">

		<div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-4 border-b border-white/20">
			
			<div class="flex flex-col gap-1">
				<h3 class="font-bold text-sm">Trụ Sở Chính</h3>
				<div class="flex gap-2 opacity-90">
					<MapPin class="size-3 shrink-0 mt-0.5 text-white" />
					<p class="leading-tight">Số 37 lô 5 – KCN Duyên Thái – Thường Tín – Hà Nội</p>
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<h3 class="font-bold text-sm">GBTECH Hà Nội</h3>
				<div class="flex gap-2 opacity-90">
					<MapPin class="size-3 shrink-0 mt-0.5 text-white" />
					<p class="leading-tight">Nhà B20, TT 301 phố Đội Cấn – Ba Đình – Hà Nội</p>
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<h3 class="font-bold text-sm">Văn Phòng Giao Dịch</h3>
				<div class="flex gap-2 opacity-90">
					<MapPin class="size-3 shrink-0 mt-0.5 text-white" />
					<p class="leading-tight">VP6 Linh Đàm – Thịnh Liệt- Hoàng Mai – Hà Nội</p>
				</div>
			</div>

			<div class="flex flex-col gap-1">
				<h3 class="font-bold text-sm">Xưởng Sản Xuất</h3>
				<div class="flex gap-2 opacity-90">
					<MapPin class="size-3 shrink-0 mt-0.5 text-white" />
					<p class="leading-tight">Xóm 1- Thôn Tương Chúc – Ngũ Hiệp – Thanh Trì</p>
				</div>
			</div>

		</div>

		<div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-8 pt-4">
			
			<div class="flex flex-col gap-2 pr-4">
				<h3 class="font-bold text-sm uppercase tracking-wide">CÔNG TY CP CÔNG NGHỆ CƠ KHÍ TOÀN PHÁT</h3>
				<p class="text-[11px] leading-relaxed opacity-80 text-justify line-clamp-4">
					Công ty Cổ phần Công nghệ Cơ khí Toàn Phát là đơn vị chuyên sản xuất và phân phối đa dạng các dòng máy móc. Các sản phẩm chủ lực bao gồm máy móc nông nghiệp, máy chăn nuôi (máy ép cám viên, máy băm cỏ), máy chế biến thực phẩm và các loại thiết bị sấy hấp công nghiệp.
				</p>
			</div>

			<div class="flex flex-col gap-2">
				<h3 class="font-bold text-sm uppercase tracking-wide">HỖ TRỢ KHÁCH HÀNG</h3>
				
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2">
						<Phone class="size-4 text-white" />
						<span class="font-semibold size-7 text-base text-[14px]">0965060363</span>
					</div>
					<div class="flex items-center gap-2">
						<Mail class="size-4 text-white" />
						<span>info@toanphat.com</span>
					</div>
				</div>

				<div class="flex gap-2 mt-1">
					<a href="/" class="bg-linear-to-tr from-yellow-400 via-red-500 to-purple-500 p-1 rounded hover:brightness-110">
						<Instagram class="size-4 text-white" />
					</a>
					<a href="/" class="bg-[#1877F2] p-1 rounded hover:brightness-110">
						<Facebook class="size-4 text-white fill-current" />
					</a>
                    <a href="/" class="bg-[#FF0000] p-1 rounded hover:brightness-110 flex items-center justify-center">
						<Youtube class="size-4 text-white" />
					</a>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<h3 class="font-bold text-sm uppercase tracking-wide">LIÊN KẾT NHANH</h3>
				<nav class="flex flex-col gap-1 opacity-90 text-[12px]">
					<a href="/" class="hover:text-[#00AEEF]">Trang Chủ</a>
					<a href="/products" class="hover:text-[#00AEEF]">Sản Phẩm</a>
					<a href="/news" class="hover:text-[#00AEEF]">Tin Tức</a>
					<a href="/policy" class="hover:text-[#00AEEF]">Chính Sách</a>
					<a href="/contact" class="hover:text-[#00AEEF]">Liên Hệ Với Chúng Tôi</a>
				</nav>
			</div>

		</div>

	</div>
</footer>