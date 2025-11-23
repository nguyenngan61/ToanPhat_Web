<script lang="ts">
	import { House, Star, Minus, Plus, ShoppingBag, ShoppingCart, Phone, Link as LinkIcon, Facebook, Twitter, Linkedin, Mail, Search, X, ChevronLeft, ChevronRight, RefreshCw, ShieldCheck, Truck } from '@lucide/svelte';

	// 1. Product Data
	const mainImg = "/assets/may-bam-chuoi.png";
	const product = {
		name: "Máy băm chuối đa năng 3kw Toàn Phát",
		brand: "TOANPHAT",
		code: "MBDN",
		status: "Còn hàng",
		price: 600000,
		oldPrice: 1000000,
		discount: 40,
		rating: 5,
		images: [mainImg, mainImg, mainImg, mainImg]
	};

	// 2. State
	let selectedImage = $state(product.images[0]);
	let selectedIndex = $state(0);
	let quantity = $state(1);
	let showLightbox = $state(false);
	let showCartPopup = $state(false);
    let activeTab = $state('overview');

    const relatedProducts = [
        { name: "Máy băm chuối 2 chức năng", img: "/assets/may-bam-chuoi.png", price: 1780000 },
        { name: "Máy băm cỏ xay nghiền đa năng", img: "/assets/may-bam-co.png", price: 1250000 },
        { name: "Máy băm chuối 2 chức năng", img: "/assets/may-nong-nghiep.png", price: 990000 } // Placeholder image
    ];
	// 3. Logic
	function selectImg(index: number) {
		selectedIndex = index;
		selectedImage = product.images[index];
	}

	function nextImage() {
		let newIndex = (selectedIndex + 1) % product.images.length;
		selectImg(newIndex);
	}

	function prevImage() {
		let newIndex = (selectedIndex - 1 + product.images.length) % product.images.length;
		selectImg(newIndex);
	}

	function decreaseQty() { if (quantity > 1) quantity--; }
	function increaseQty() { quantity++; }

	// NEW: Add to Cart Function
	function addToCart() {
		showCartPopup = true;
	}

	function copyLink() {
		navigator.clipboard.writeText(window.location.href);
		alert("Đã sao chép liên kết!");
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
	};
</script>

<div class="min-h-screen bg-gray-50 py-6 relative">
	<div class="w-[90%] lg:w-[80%] mx-auto">
		
		<div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
			<a href="/" class="hover:text-[#0E3A6B]"><House class="size-4" /></a>
			<span>|</span>
			<a href="/products" class="hover:text-[#0E3A6B]">Sản Phẩm</a>
			<span>|</span>
			<a href="/products?tab=Máy Băm Chuối" class="hover:text-[#0E3A6B]">Máy Băm Chuối</a>
			<span>|</span>
			<span class="text-[#0E3A6B] font-medium truncate">{product.name}</span>
		</div>

		<div class="bg-white rounded-xl shadow-sm p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
			
			<div class="lg:col-span-5 flex flex-col gap-6">
				<div class="w-full h-[400px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4 relative group bg-white">
					<img src={selectedImage} alt={product.name} class="w-full h-full object-contain transition-all duration-300" />
					<button onclick={() => showLightbox = true} class="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md border border-gray-100 text-black hover:bg-gray-100 transition-colors"><Search class="size-5" /></button>
					<button onclick={prevImage} class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 opacity-0 group-hover:opacity-100 transition-all"><ChevronLeft class="size-6" /></button>
					<button onclick={nextImage} class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 opacity-0 group-hover:opacity-100 transition-all"><ChevronRight class="size-6" /></button>
				</div>
				<div class="flex gap-3 overflow-x-auto pb-2 justify-center">
					{#each product.images as img, i}
						<button onclick={() => selectImg(i)} class="size-20 rounded-md overflow-hidden shrink-0 p-1 cursor-pointer transition-all bg-white border border-gray-200 {selectedIndex === i ? 'opacity-100 ring-2 ring-[#0E3A6B]' : 'opacity-30'}"><img src={img} alt="thumbnail" class="w-full h-full object-contain" /></button>
					{/each}
				</div>
				<div class="flex items-center justify-center gap-4 text-gray-500 mt-2 border-t border-gray-100 pt-4">
					<button onclick={copyLink} class="hover:text-[#0E3A6B] flex flex-col items-center gap-1 text-xs"><div class="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><LinkIcon class="size-4" /></div>Copy Link</button>
					<a href="/" class="hover:text-blue-600 text-blue-600"><Facebook class="size-6 fill-current" /></a>
					<a href="/" class="hover:text-sky-500 text-sky-500"><Twitter class="size-6 fill-current" /></a>
					<a href="mailto:info@toanphat.com" class="hover:text-red-500 text-red-500"><Mail class="size-6 fill-current" /></a>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<a href="/" class="hover:text-red-600 text-red-600"><svg class="size-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/><path d="M12 5C8.134 5 5 8.134 5 12s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 12c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z"/></svg></a>
					<a href="/" class="hover:text-blue-700 text-blue-700"><Linkedin class="size-6 fill-current" /></a>
				</div>
			</div>

			<div class="lg:col-span-7 flex flex-col relative pr-4 lg:pr-16"> 
				<div class="absolute right-0 top-0 flex flex-col gap-3 z-10">
					<a href="tel:0965060363" class="size-10 lg:size-12 rounded-full bg-[#00AEEF] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"><Phone class="size-5 lg:size-6 fill-current" /></a>
					<a href="/" class="size-10 lg:size-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform overflow-hidden bg-white"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png" alt="Zalo" class="w-full h-full object-cover p-1" /></a>
				</div>

				<h1 class="text-2xl lg:text-3xl font-bold text-[#0E3A6B] mb-2">{product.name}</h1>
				<div class="flex items-center gap-1 mb-4">{#each Array(5) as _}<Star class="size-4 text-yellow-400 fill-yellow-400" />{/each}</div>
				<div class="flex flex-col gap-1 text-sm text-gray-600 mb-6">
					<p>Thương hiệu: <span class="text-[#00AEEF] font-semibold">{product.brand}</span></p>
					<p>Mã sản phẩm: <span class="text-[#00AEEF] font-semibold">{product.code}</span> | Tình trạng: <span class="text-[#00AEEF] font-semibold">{product.status}</span></p>
				</div>

				<div class="flex items-center gap-5 mb-6">
					<div class="text-3xl font-extrabold text-[#0E3A6B]">{formatPrice(product.price)}</div>
					<div class="text-gray-400 text-lg line-through">{formatPrice(product.oldPrice)}</div>
					<div class="bg-linear-to-b from-[#ffdd00] to-[#FF4500] text-white text-sm font-bold px-2 py-0.5 rounded-sm">-{product.discount}%</div>
				</div>

				<div class="flex items-center gap-4 mb-6">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="text-sm font-semibold text-gray-700">Số lượng:</label>
					<div class="flex items-center border border-gray-300 rounded-md bg-white">
						<button onclick={decreaseQty} class="p-2 text-gray-500 hover:bg-gray-100 rounded-l-md transition-colors"><Minus class="size-4" /></button>
						<input type="number" bind:value={quantity} min="1" class="w-14 text-center border-x border-gray-300 py-1 font-semibold text-gray-700 focus:outline-none"/>
						<button onclick={increaseQty} class="p-2 text-gray-500 hover:bg-gray-100 rounded-r-md transition-colors"><Plus class="size-4" /></button>
					</div>
				</div>

				<div class="flex items-center gap-4 mb-10">
					<button 
						onclick={addToCart}
						class="border-2 border-[#0E3A6B] text-[#0E3A6B] bg-white p-3 rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center shadow-sm" 
						title="Thêm vào giỏ hàng"
					>
						<ShoppingBag class="size-7" />
					</button>

					<button class="flex-1 bg-[linear-gradient(to_right,#0E3A6B,#1a528f)] text-white text-lg font-bold py-3 rounded-lg hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2">
						<span>MUA NGAY</span>
						<ShoppingCart class="size-6" />
					</button>
				</div>

				<div class="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6">
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600"><RefreshCw class="size-6 text-[#00AEEF]" /><span>Đổi trả dễ dàng</span></div>
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600"><ShieldCheck class="size-6 text-[#00AEEF]" /><span>Hàng chính hãng</span></div>
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600"><Truck class="size-6 text-[#0E3A6B]" /><span>Miễn phí vận chuyển</span></div>
				</div>
			</div>
		</div>
	</div>

	{#if showLightbox}
		<div class="fixed inset-0 z-9999 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
			<button onclick={() => showLightbox = false} class="absolute top-5 right-5 text-white p-2 hover:bg-white/20 rounded-full"><X class="size-8" /></button>
			<div class="relative max-w-[90vw] max-h-[90vh]">
				<img src={selectedImage} alt="Zoom" class="max-w-full max-h-[85vh] object-contain" />
				<button onclick={prevImage} class="absolute -left-12 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"><ChevronLeft class="size-10" /></button>
				<button onclick={nextImage} class="absolute -right-12 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"><ChevronRight class="size-10" /></button>
			</div>
		</div>
	{/if}

	{#if showCartPopup}
		<!-- svelte-ignore a11y_interactive_supports_focus -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div 
			class="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center p-4"
			onclick={() => showCartPopup = false}
			role="dialog"
			aria-modal="true"
		>
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div 
				class="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden"
				onclick={(e) => e.stopPropagation()} 
			>
				<div class="p-4 border-b border-gray-200 flex items-center justify-center gap-2">
					<ShoppingBag class="size-5 text-gray-600" />
					<h2 class="text-lg font-bold uppercase text-gray-700">GIỎ HÀNG</h2>
				</div>

				<div class="p-4 flex items-start justify-between gap-4">
					<div class="flex flex-col gap-1">
						<h3 class="text-sm font-bold text-[#0E3A6B] leading-tight line-clamp-2">
							{product.name}
						</h3>
						<p class="text-sm text-gray-500">
							{quantity} x <span class="font-regular text-gray-600">{formatPrice(product.price)}</span>
						</p>
					</div>
					<div class="w-16 h-16 border border-gray-200 rounded-md overflow-hidden shrink-0">
						<img src={mainImg} alt="Mini thumbnail" class="w-full h-full object-contain" />
					</div>
				</div>

				<div class="bg-gray-100 p-4 flex flex-col gap-4">
					<div class="flex justify-between items-center text-sm">
						<span class="font-semibold text-gray-600">Tạm tính:</span>
						<span class="font-bold text-gray-600 text-lg">{formatPrice(product.price * quantity)}</span>
					</div>
					<button 
						onclick={() => showCartPopup = false} 
						class="w-full bg-[#0E3A6B] text-white font-bold py-3 rounded-md hover:brightness-110 transition-all"
					>
						Giỏ Hàng
					</button>
				</div>
			</div>
		</div>
	{/if}
<div class="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        
        <div class="lg:col-span-8">
            
            <div class="flex flex-wrap gap-4 mb-6">
                <button 
                    onclick={() => activeTab = 'overview'}
                    class="px-8 py-2 rounded-md font-bold text-sm border transition-all
                    {activeTab === 'overview' 
                        ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' 
                        : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}"
                >
                    Tổng quan
                </button>
                <button 
                    onclick={() => activeTab = 'specs'}
                    class="px-8 py-2 rounded-md font-bold text-sm border transition-all
                    {activeTab === 'specs' 
                        ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' 
                        : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}"
                >
                    Thông số kỹ thuật
                </button>
                <button 
                    onclick={() => activeTab = 'guide'}
                    class="px-8 py-2 rounded-md font-bold text-sm border transition-all
                    {activeTab === 'guide' 
                        ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' 
                        : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}"
                >
                    Hướng dẫn sử dụng
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-8 text-gray-700 leading-relaxed text-sm">
                
                {#if activeTab === 'overview'}
                    <h3 class="text-[#0E3A6B] font-bold text-lg mb-4">Tổng quan</h3>
                    <h1 class="text-2xl font-bold text-gray-900 mb-6">Máy băm chuối đa năng 3kw Toàn Phát</h1>

                    <div class="space-y-6">
                        <div>
                            <h4 class="font-bold text-gray-900 mb-2">Giới thiệu</h4>
                            <p class="text-justify">
                                Máy Băm Chuối Đa Năng Toàn Phát là dòng máy nông nghiệp được thiết kế tối ưu hóa khâu sơ chế thức ăn chăn nuôi. Sản phẩm giúp băm nhuyễn đa dạng các loại phụ phẩm, vận hành an toàn và có độ bền cao. Máy được sản xuất để đáp ứng nhu cầu tự chủ nguồn thức ăn sạch, giảm chi phí và giải phóng sức lao động cho các hộ gia đình và trang trại chăn nuôi.
                            </p>
                        </div>

                        <div>
                            <h4 class="font-bold text-gray-900">Tên đầy đủ: Máy Băm Chuối Đa Năng Toàn Phát 3kw Phiên Bản Mới, Tích Hợp Hộp Điện An Toàn Aptomat Panasonic.</h4>
                        </div>

                        <div>
                            <h4 class="font-bold text-gray-900 mb-3">Đặc điểm nổi bật</h4>
                            
                            <div class="space-y-4">
                                <div>
                                    <strong class="block text-gray-800 mb-1">1. Thiết Kế Tối Ưu – Năng Suất Vượt Trội</strong>
                                    <ul class="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Máy được chế tạo để đáp ứng thực tế nhu cầu băm phụ phẩm nông nghiệp nhanh chóng và hiệu quả, giúp người dùng tiết kiệm thời gian và chi phí.</li>
                                        <li>Hệ thống băm được thiết kế với phễu nạp nguyên liệu hình phễu rộng, tối ưu cho các loại rau củ cồng kềnh, đặc biệt là thân cây chuối.</li>
                                        <li>Trang bị cửa xả nguyên liệu có thể điều chỉnh, cho phép người dùng kiểm soát độ văng xa/gần của thành phẩm, phù hợp với nhiều điều kiện làm việc.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong class="block text-gray-800 mb-1">2. Độ Bền Cao – Hệ Thống Băm Chuyên Dụng</strong>
                                    <ul class="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Bộ dao chính sử dụng vật liệu cao cấp, chịu tải tốt và ít hao mòn. Gồm 1 dao to 2 lưỡi được làm từ nhíp ô tô, đảm bảo độ cứng và tuổi thọ vượt trội so với các dòng dao thép thông thường.</li>
                                        <li>Hệ thống dao băm nhuyễn gồm 14 dao làm bằng inox 304 (chống gỉ sét), đảm bảo vệ sinh cho thức ăn thành phẩm và duy trì độ sắc bén lâu dài.</li>
                                    </ul>
                                </div>

                                <div>
                                    <strong class="block text-gray-800 mb-1">3. Vận Hành An Toàn – Cải Tiến Vượt Trội</strong>
                                    <ul class="list-disc pl-5 space-y-1 text-gray-600">
                                        <li>Phiên bản mới được trang bị hộp điện điều khiển riêng biệt, tích hợp aptomat chống giật của Panasonic và đèn báo nguồn.</li>
                                        <li>Thiết kế này đảm bảo an toàn tuyệt đối cho người vận hành, đồng thời bảo vệ động cơ, tăng tuổi thọ mô tơ (chống chập cháy).</li>
                                        <li>Máy được cải tiến thêm 2 bánh xe và tay đẩy, giúp di chuyển thuận lợi trong khu vực chăn nuôi mà vẫn đảm bảo độ ổn định, không rung lắc khi hoạt động.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <p class="text-justify">
                            Máy Băm Chuối Đa Năng Toàn Phát được ứng dụng rộng rãi để băm thức ăn cho gia súc, gia cầm (cá, lợn, gà, vịt...). Máy chuyên dùng để băm thân cây chuối, cây ngô, củ sắn, cỏ voi và nhiều loại rau, củ, quả khác.
                        </p>
                    </div>
                    

{:else if activeTab === 'specs'}
                    <h3 class="text-[#0E3A6B] font-bold text-lg mb-4">Thông số kỹ thuật</h3>
                    <h1 class="text-2xl font-bold text-gray-900 mb-8">Máy băm chuối đa năng 3kw Toàn Phát</h1>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        
                        <div>
                            <h4 class="font-bold text-[#0E3A6B] text-base uppercase mb-4 border-b border-gray-200 pb-2">ĐỘNG CƠ</h4>
                            <div class="space-y-3 text-gray-600">
                                <div class="flex justify-between">
                                    <span>Công suất động cơ:</span>
                                    <span class="font-medium text-black">3 kw</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Nguồn điện:</span>
                                    <span class="font-medium text-black">220V</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Tốc độ:</span>
                                    <span class="font-medium text-black">1450 (Vòng/phút)</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 class="font-bold text-[#0E3A6B] text-base uppercase mb-4 border-b border-gray-200 pb-2">BẢO HÀNH</h4>
                            <div class="space-y-3 text-gray-600">
                                <div class="flex justify-between">
                                    <span>Kỹ thuật:</span>
                                    <span class="font-medium text-black">12 tháng</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Động cơ:</span>
                                    <span class="font-medium text-black">Theo từng hãng sản xuất</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 class="font-bold text-[#0E3A6B] text-base uppercase mb-4 border-b border-gray-200 pb-2">TRỌNG LƯỢNG</h4>
                            <div class="space-y-3 text-gray-600">
                                <div class="flex justify-between">
                                    <span>Nguyên bộ:</span>
                                    <span class="font-medium text-black">63 kg</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Không động cơ:</span>
                                    <span class="font-medium text-black">42 kg</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 class="font-bold text-[#0E3A6B] text-base uppercase mb-4 border-b border-gray-200 pb-2">THÔNG SỐ KHÁC</h4>
                            <div class="space-y-3 text-gray-600">
                                <div class="flex justify-between">
                                    <span>Năng suất:</span>
                                    <span class="font-medium text-black">5 – 8 tạ/giờ</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Kích thước (DxRxC):</span>
                                    <span class="font-medium text-black">88x46x76 cm</span>
                                </div>
                            </div>
                        </div>

                    </div>

                {:else if activeTab === 'guide'}
                    <h3 class="text-[#0E3A6B] font-bold text-lg mb-4">Hướng dẫn sử dụng</h3>
                    <h1 class="text-2xl font-bold text-gray-900 mb-6">Máy băm chuối đa năng 3kw Toàn Phát</h1>

                    <ul class="list-none space-y-3 text-gray-600 mb-8 pl-2">
                        <li class="relative pl-4 before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                            Lắp đặt máy ở nơi bằng phẳng
                        </li>
                        <li class="relative pl-4 before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                            Khởi động máy sau đó đưa nguyên liệu cần băm vào cửa nạp nguyên liệu, hệ thống dao sẽ làm việc và đưa ra cửa xả nguyên liệu.
                        </li>
                        <li class="relative pl-4 before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                            Vận hành xong chờ máy gạt hết nguyên liệu ra khỏi máy rồi tắt máy.
                        </li>
                    </ul>

                    <div class="w-full aspect-video rounded-lg overflow-hidden shadow-md mb-4 bg-black">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src="https://www.youtube.com/embed/Hr1W3ySJIqE" 
                            title="Video Hướng Dẫn Sử Dụng Máy Băm Chuối Toàn Phát" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen
                        ></iframe>
                    </div>

                    <p class="text-gray-500 text-sm italic">
                        Mọi thắc mắc xin vui lòng liên hệ số Hotline: <a href="tel:0965060363" class="text-[#0E3A6B] underline hover:text-blue-600 font-semibold">0965060363</a>
                    </p>
                {/if}

            </div>
        </div>

        <div class="lg:col-span-4">
            <h3 class="text-[#0E3A6B] font-bold text-lg mb-4 uppercase">Sản phẩm cùng chuyên mục</h3>
            
            <div class="flex flex-col gap-4">
                {#each relatedProducts as p}
                    <a href="/products" class="flex gap-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0E3A6B] transition-all group">
                        <div class="w-24 h-24 shrink-0 border border-gray-100 rounded-md overflow-hidden flex items-center justify-center">
                            <img src={p.img} alt={p.name} class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                        </div>
                        
                        <div class="flex flex-col gap-1">
                            <h4 class="text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-[#0E3A6B] transition-colors">
                                {p.name}
                            </h4>
                            <div class="text-[#0E3A6B] font-extrabold text-base">
                                {formatPrice(p.price)}
                            </div>
                            <div class="flex gap-0.5">
                                {#each Array(5) as _}
                                    <Star class="size-3 text-yellow-400 fill-yellow-400" />
                                {/each}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </div>

    </div>
</div>

<style>
	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; appearance: none; margin: 0; }
	input[type=number] { -moz-appearance: textfield; appearance: textfield; }
</style>
