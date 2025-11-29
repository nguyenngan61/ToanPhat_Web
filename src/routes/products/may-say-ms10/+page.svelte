<script lang="ts">
	import { House, Star, Minus, Plus, ShoppingBag, Phone, MessageCircle, X, ChevronLeft, ChevronRight, RefreshCw, ShieldCheck, Truck, Search, Ban, Link as LinkIcon, Facebook, Twitter, Linkedin, Mail } from '@lucide/svelte';
	import { cart } from '$lib/stores/cart.svelte';

	// 1. Product Data
	const mainImg = "/assets/may-say-ms10.png";
	const product = {
		name: "Máy sấy hoa quả máy sấy dân dụng đa năng MS10",
		brand: "TOANPHAT",
		code: "MS10",
		status: "Còn hàng",
		price: 0,
		isContact: true,
		rating: 4,
		images: [mainImg, mainImg, mainImg]
	};

    const suggestedProducts = [
        { name: "Máy băm chuối đa năng 3kw", img: "/assets/may-bam-chuoi.png", price: 600000, oldPrice: 1000000, discount: 40, rating: 5 },
        { name: "Máy băm cỏ, xay nghiền đa năng", img: "/assets/may-bam-co.png", price: 700000, oldPrice: 1000000, discount: 30, rating: 5 },
        { name: "Máy trộn thức ăn chăn nuôi 50kg", img: "/assets/may-chan-nuoi.png", price: 800000, oldPrice: 1000000, discount: 20, rating: 4 },
        { name: "Máy Rang Đa Năng 15 kg", img: "/assets/may-che-bien-thuc-pham.png", price: 700000, oldPrice: 1000000, discount: 30, rating: 5 }
    ];

	// 2. State
	let selectedImage = $state(product.images[0]);
	let selectedIndex = $state(0);
	let quantity = $state(1);
    let activeTab = $state('overview');
    
    // Popups
	let showLightbox = $state(false);
	let showQuotePopup = $state(false); // Ensure this defaults to false
	let showCartPopup = $state(false);
    let showThankYouMessage = $state(false);

	// Form State
	let customerName = $state('');
	let customerPhone = $state('');
	let customerNote = $state('');

	// 3. Logic
	function selectImg(i: number) { selectedIndex = i; selectedImage = product.images[i]; }
	function nextImg() { selectImg((selectedIndex + 1) % product.images.length); }
	function prevImg() { selectImg((selectedIndex - 1 + product.images.length) % product.images.length); }
	function decreaseQty() { if (quantity > 1) quantity--; }
	function increaseQty() { quantity++; }

	function handleAddToCart() {
		cart.add(product, quantity);
		showCartPopup = true;
	}

	function submitQuote() {
		if (!customerName.trim()) {
			alert("Vui lòng nhập Họ và tên!");
			return;
		}
        if (!customerPhone.trim()) {
            alert("Vui lòng nhập Số điện thoại!");
            return;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(customerPhone.trim())) {
            alert("Vui lòng nhập số điện thoại hợp lệ!");
            return;
        }
        showThankYouMessage = true;
        
        customerName = '';
        customerPhone = '';
        customerNote = '';

        setTimeout(() => {
            showQuotePopup = false;
            showThankYouMessage = false;
        }, 3000);
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
			<a href="/products?tab=Thiết Bị Sấy Hấp" class="hover:text-[#0E3A6B]">Thiết Bị Sấy Hấp</a>
			<span>|</span>
			<span class="text-[#0E3A6B] font-medium truncate">{product.name}</span>
		</div>

		<div class="bg-white rounded-xl shadow-sm p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
			
			<div class="lg:col-span-5 flex flex-col gap-6">
				<div class="w-full h-[400px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4 relative group bg-white">
					<img src={selectedImage} alt={product.name} class="w-full h-full object-contain transition-all duration-300" />
					<button onclick={() => showLightbox = true} class="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md border border-gray-100 text-black hover:bg-gray-100"><Search class="size-5" /></button>
					<button onclick={prevImg} class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 opacity-0 group-hover:opacity-100"><ChevronLeft class="size-6" /></button>
					<button onclick={nextImg} class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 opacity-0 group-hover:opacity-100"><ChevronRight class="size-6" /></button>
				</div>
				<div class="flex gap-3 overflow-x-auto pb-2 justify-center">
					{#each product.images as img, i}
						<button onclick={() => selectImg(i)} class="size-20 rounded-md overflow-hidden shrink-0 p-1 cursor-pointer transition-all bg-white border border-gray-200 {selectedIndex === i ? 'opacity-100 ring-2 ring-[#0E3A6B]' : 'opacity-30 hover:opacity-70'}">
							<img src={img} alt="thumbnail" class="w-full h-full object-contain" />
						</button>
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

			<div class="lg:col-span-7 flex flex-col relative pr-4"> 
				
				<h1 class="text-2xl lg:text-3xl font-bold text-[#0E3A6B] mb-2">{product.name}</h1>
				
                <div class="flex items-center gap-1 mb-4">
                    {#each Array(5) as _, i}
                        <Star class="size-4 {i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}" />
                    {/each}
                </div>

				<div class="flex flex-col gap-1 text-sm text-gray-600 mb-6">
					<p>Thương hiệu: <span class="text-[#00AEEF] font-semibold">{product.brand}</span></p>
                    <p>
                        Mã sản phẩm: <span class="text-[#00AEEF] font-semibold">{product.code}</span> 
                        | Tình trạng: <span class="text-[#00AEEF] font-semibold">{product.status}</span>
                    </p>
				</div>

				<div class="mb-8">
                    <button 
                        onclick={() => showQuotePopup = true}
                        type="button"
                        class="text-3xl font-extrabold text-[#0E3A6B] hover:underline transition-colors cursor-pointer flex items-center gap-2"
                    >
                        Liên hệ
                    </button>
				</div>

				<div class="flex items-center gap-4 mb-8">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="text-sm font-semibold text-[#0E3A6B]">Số lượng:</label>
					<div class="flex items-center border border-gray-300 rounded-md bg-white">
						<button onclick={decreaseQty} class="p-2 text-gray-500 hover:bg-gray-100 rounded-l-md"><Minus class="size-4" /></button>
						<input type="number" bind:value={quantity} min="1" class="w-14 text-center border-x border-gray-300 py-1 font-semibold text-gray-700 focus:outline-none"/>
						<button onclick={increaseQty} class="p-2 text-gray-500 hover:bg-gray-100 rounded-r-md"><Plus class="size-4" /></button>
					</div>
				</div>

				<div class="flex flex-col gap-4 mb-10">
					
                    <div class="flex items-center gap-4">
                        <!-- <button 
                            onclick={handleAddToCart}
                            class="border-2 border-[#0E3A6B] text-[#0E3A6B] bg-white p-4 rounded-lg hover:bg-blue-50 transition-all flex items-center justify-center shadow-sm shrink-0" 
                            title="Thêm vào giỏ hàng"
                        >
                            <ShoppingBag class="size-6" />
                        </button> -->

                        <a href="tel:0965060363" class="flex-1 bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] text-white text-lg font-bold py-3 rounded-lg hover:brightness-125 transition-all shadow-md flex items-center justify-center gap-3">
                            <Phone class="size-6 fill-current" />
                            <span>GỌI 0965.060.363</span>
                        </a>
                    </div>

                    <a href="https://zalo.me/0965060363" target="_blank" class="w-full bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] text-white text-lg font-bold py-3 rounded-lg hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-3">
                        <MessageCircle class="size-6 fill-current" />
                        <span>CHAT ZALO NGAY</span>
                    </a>

				</div>

				<div class="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6">
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600">
                        <RefreshCw class="size-6 text-[#0E3A6B]" />
                        <span>Đổi trả dễ dàng</span>
                    </div>
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600">
                        <ShieldCheck class="size-6 text-[#0E3A6B]" />
                        <span>Hàng chính hãng</span>
                    </div>
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600">
                        <Truck class="size-6 text-[#0E3A6B]" />
                        <span>Miễn phí vận chuyển</span>
                    </div>
				</div>
			</div>

		<div class="grid grid-cols-1 lg:grid-cols-12 gap-23 mt-8">
            
            <div class="lg:col-span-8">
                <div class="flex flex-wrap gap-4 mb-6">
                    <button onclick={() => activeTab = 'overview'} class="px-8 py-2 rounded-md font-bold text-sm border transition-all {activeTab === 'overview' ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}">Tổng quan</button>
                    <button onclick={() => activeTab = 'specs'} class="px-8 py-2 rounded-md font-bold text-sm border transition-all {activeTab === 'specs' ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}">Thông số kỹ thuật</button>
                    <button onclick={() => activeTab = 'guide'} class="px-8 py-2 rounded-md font-bold text-sm border transition-all {activeTab === 'guide' ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}">Hướng dẫn sử dụng</button>
                </div>

                <div class="bg-white rounded-xl shadow-sm p-8 text-gray-700 leading-relaxed text-sm">
                    
                    {#if activeTab === 'overview'}
                        <h3 class="text-[#0E3A6B] font-bold text-lg mb-4">Tổng quan</h3>
                        <h1 class="text-2xl font-bold text-gray-900 mb-6">Máy sấy hoa quả máy sấy dân dụng đa năng MS10</h1>
                        
                        <div class="space-y-4 text-justify">
                            <p>
                                <strong class="text-gray-900">Máy sấy đa năng MS10</strong> là dòng máy sấy công nghiệp mini của <strong class="text-[#0E3A6B]">Công ty Cổ phần Công nghệ Cơ khí Toàn Phát</strong>.
                            </p>
                            <p>
                                Máy sấy đa năng rất tiện lợi trong việc sử dụng mọi lúc mọi nơi, phù hợp với các hộ gia đình và các cơ sở kinh doanh nhỏ lẻ.
                            </p>
                            <p>
                                Máy có khả năng sấy khô bất cứ sản phẩm nào như: hoa quả, thực phẩm, dược liệu, thủy hải sản, các loại tinh bột, các loại thịt khô... nên có thể đáp ứng mọi yêu cầu sấy khô của khách hàng.
                            </p>
                            <p>
                                Tủ sấy có công suất nhỏ nên tiết kiệm chi phí, đồng thời vẫn đảm bảo sấy khô nhanh, tiết kiệm thời gian và công sức cho người sử dụng.
                            </p>
                        </div>

                    {:else if activeTab === 'specs'}
                        <h3 class="text-[#0E3A6B] font-bold text-lg mb-6">Thông số kỹ thuật</h3>
                        
                        <div class="border border-gray-200 rounded-lg overflow-hidden">
                            <table class="w-full text-sm text-left">
                                <tbody class="divide-y divide-gray-200">
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold w-1/3">Kích thước phủ bì (DxRxC)</td><td class="p-4">530x530x1100 mm</td></tr>
                                    <tr><td class="p-4 font-semibold">Thể tích buồng sấy</td><td class="p-4">100 lít</td></tr>
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold">Buồng sấy</td><td class="p-4">Cấu tạo tủ sấy vỏ bằng sắt sơn tĩnh điện chịu nhiệt bọc trong bằng bông thủy tinh cách nhiệt dày 40 mm</td></tr>
                                    <tr><td class="p-4 font-semibold">Cánh cửa</td><td class="p-4">Cấu tạo bản lề chắc chắn có gioăng chịu nhiệt lên đến 200 độ C làm kín.</td></tr>
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold">Công suất sấy cho mỗi lần (kg)</td><td class="p-4">10</td></tr>
                                    <tr><td class="p-4 font-semibold">Khay sấy</td><td class="p-4">Inox 304 đột lỗ pi 6 (Kích thước: 300x400x25mm)</td></tr>
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold">Số khay sấy</td><td class="p-4">6</td></tr>
                                    <tr><td class="p-4 font-semibold">Khoảng cách giữa các khay</td><td class="p-4">100 mm</td></tr>
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold">Nhiệt độ sấy</td><td class="p-4">30 – 95 ºC</td></tr>
                                    <tr><td class="p-4 font-semibold">Công suất tiêu thụ trung bình</td><td class="p-4">400w/H</td></tr>
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold">Nguồn điện</td><td class="p-4">1 pha 220V/50hZ</td></tr>
                                    <tr><td class="p-4 font-semibold">Nguyên lý</td><td class="p-4">Quạt tản nhiệt lớn, cưỡng bức đối lưu không khí cung cấp nhiệt đảm bảo nhiệt tuần hoàn liên tục.</td></tr>
                                </tbody>
                            </table>
                        </div>

                    {:else if activeTab === 'guide'}
                        <h3 class="text-[#0E3A6B] font-bold text-lg mb-6">Hướng dẫn năng suất sấy</h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-orange-50 p-4 rounded-lg border border-orange-100 flex gap-3 items-start">
                                <div class="bg-orange-100 p-2 rounded-full text-orange-600"><span class="text-xl">🍎</span></div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-1">Trái cây (Mít, chuối, nhãn...)</h4>
                                    <p class="text-xs text-gray-600">Mít, chuối, thanh long, hồng đỏ, nho, nhãn, gừng, mơ, dứa, khế, cà chua.</p>
                                    <div class="mt-2 text-sm font-bold text-[#0E3A6B]">2 kg/khay → 12 kg/máy</div>
                                </div>
                            </div>

                            <div class="bg-green-50 p-4 rounded-lg border border-green-100 flex gap-3 items-start">
                                <div class="bg-green-100 p-2 rounded-full text-green-600"><span class="text-xl">🥬</span></div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-1">Rau họ cải</h4>
                                    <p class="text-xs text-gray-600">Bắp cải, cải xanh, cải thìa...</p>
                                    <div class="mt-2 text-sm font-bold text-[#0E3A6B]">1 kg/khay → 6 kg/máy</div>
                                </div>
                            </div>

                            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100 flex gap-3 items-start">
                                <div class="bg-yellow-100 p-2 rounded-full text-yellow-600"><span class="text-xl">🥕</span></div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-1">Củ quả</h4>
                                    <p class="text-xs text-gray-600">Củ cải, cà rốt, khoai, mướp đắng, su hào, hành, tỏi...</p>
                                    <div class="mt-2 text-sm font-bold text-[#0E3A6B]">2 kg/khay → 12 kg/máy</div>
                                </div>
                            </div>

                            <div class="bg-emerald-50 p-4 rounded-lg border border-emerald-100 flex gap-3 items-start">
                                <div class="bg-emerald-100 p-2 rounded-full text-emerald-600"><span class="text-xl">🌿</span></div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-1">Các loại lá</h4>
                                    <p class="text-xs text-gray-600">Chùm ngây, chè, lá chanh, hành lá...</p>
                                    <div class="mt-2 text-sm font-bold text-[#0E3A6B]">1 kg/khay → 6 kg/máy</div>
                                </div>
                            </div>

                            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100 flex gap-3 items-start">
                                <div class="bg-blue-100 p-2 rounded-full text-blue-600"><span class="text-xl">🦐</span></div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-1">Thủy hải sản</h4>
                                    <p class="text-xs text-gray-600">Tôm, cá, mực...</p>
                                    <div class="mt-2 text-sm font-bold text-[#0E3A6B]">2 kg/khay → 12 kg/máy</div>
                                </div>
                            </div>

                            <div class="bg-purple-50 p-4 rounded-lg border border-purple-100 flex gap-3 items-start">
                                <div class="bg-purple-100 p-2 rounded-full text-purple-600"><span class="text-xl">💊</span></div>
                                <div>
                                    <h4 class="font-bold text-gray-800 mb-1">Dược liệu & Hạt</h4>
                                    <p class="text-xs text-gray-600">Thân cây thuốc, hạt sen, đỗ tương, ngô...</p>
                                    <div class="mt-2 text-sm font-bold text-[#0E3A6B]">1 kg/khay → 6 kg/máy</div>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="lg:col-span-4">
                <h3 class="text-[#0E3A6B] font-bold text-lg mb-4 uppercase">Sản phẩm bạn có thể thích</h3>
                <div class="flex flex-col gap-4">
                    {#each suggestedProducts as p}
                        <a 
                            href={p.name.includes("Máy băm chuối") ? "/products/may-bam-chuoi-da-nang-3kw" : "#"}
                            class="flex gap-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0E3A6B] transition-all group"
                        >
                            <div class="w-24 h-24 shrink-0 border border-gray-100 rounded-md overflow-hidden flex items-center justify-center relative">
                                <img src={p.img} alt={p.name} class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                                <div class="absolute top-0 left-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-md">
                                    -{p.discount}%
                                </div>
                            </div>
                            
                            <div class="flex flex-col gap-1">
                                <h4 class="text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-[#0E3A6B] transition-colors">
                                    {p.name}
                                </h4>
                                
                                <div class="flex gap-0.5">
                                    {#each Array(5) as _, i}
                                        <Star class="size-3 {i < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}" />
                                    {/each}
                                </div>

                                <div class="flex flex-col mt-0.5">
                                    <div class="text-[#0E3A6B] font-extrabold text-base">
                                        {formatPrice(p.price)}
                                    </div>
                                    <div class="text-gray-400 text-xs line-through">
                                        {formatPrice(p.oldPrice)}
                                    </div>
                                </div>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>

        </div>
	</div>
</div>

    {#if showQuotePopup}
        <!-- svelte-ignore a11y_interactive_supports_focus -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div 
            class="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
            onclick={() => showQuotePopup = false}
            role="dialog"
            aria-modal="true"
        >
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div 
                class="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden p-6 relative animate-in zoom-in duration-200"
                onclick={(e) => e.stopPropagation()}
            >
                <button onclick={() => showQuotePopup = false} class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X class="size-6" /></button>
                
                <h2 class="text-xl font-bold text-[#0E3A6B] mb-4 text-center uppercase">
                    {showThankYouMessage ? "Gửi thành công!" : "Yêu cầu báo giá"}
                </h2>

                {#if showThankYouMessage}
                    <div class="text-center py-6 flex flex-col items-center gap-4">
                        <ShieldCheck class="size-16 text-green-500" />
                        <p class="text-gray-700 font-medium">
                            Toàn Phát đã ghi nhận thông tin, chúng tôi sẽ liên hệ lại với quý khách sớm nhất có thể, xin cảm ơn!
                        </p>
                    </div>
                {:else}
                    <div class="flex gap-4 mb-6 items-center bg-gray-50 p-3 rounded-lg">
                        <div class="size-16 border bg-white rounded p-1 shrink-0"><img src={mainImg} class="w-full h-full object-contain" alt="" /></div>
                        <div>
                            <h4 class="text-sm font-bold text-gray-800 line-clamp-2">{product.name}</h4>
                            <p class="text-xs text-[#0E3A6B] mt-1">Số lượng: <span class="font-bold">{quantity}</span></p>
                        </div>
                    </div>

                    <div class="flex flex-col gap-5">
                        
                        <div class="relative">
                            <!-- svelte-ignore a11y_label_has_associated_control -->
                            <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">
                                Họ và tên <span class="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                bind:value={customerName} 
                                class="w-full text-gray-800 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] bg-transparent relative z-0" 
                            />
                        </div>
                        
                        <div class="relative">
                            <!-- svelte-ignore a11y_label_has_associated_control -->
                            <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">
                                Số điện thoại <span class="text-red-500">*</span>
                            </label>
                            <input 
                                type="tel" 
                                bind:value={customerPhone} 
                                class="w-full border text-gray-800 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] relative z-0" 
                            />
                        </div>
                        
                        <div class="relative">
                            <!-- svelte-ignore a11y_label_has_associated_control -->
                            <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">
                                Yêu cầu thêm (Tùy chọn)
                            </label>
                            <textarea 
                                bind:value={customerNote} 
                                class="w-full border text-gray-800 border-gray-300 rounded-md px-4 py-3 h-24 resize-none focus:outline-none focus:border-[#0E3A6B] relative z-0"
                            ></textarea>
                        </div>
                        
                        <button onclick={submitQuote} class="w-full bg-[#0E3A6B] text-white font-bold py-3 rounded hover:bg-blue-900 transition-colors">Gửi Yêu Cầu</button>
                    </div>
                {/if}
            </div>
        </div>
    {/if}

    {#if showCartPopup}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="fixed inset-0 z-9999 bg-black/40 flex items-start justify-center pt-20 p-4 backdrop-blur-[1px]" onclick={() => showCartPopup = false}>
            <div class="bg-white w-full max-w-[500px] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200" onclick={(e) => e.stopPropagation()}>
                <div class="p-4 border-b border-gray-200 flex items-center justify-center gap-2"><ShoppingBag class="size-5 text-gray-600" /><h2 class="text-lg font-bold uppercase text-gray-700">GIỎ HÀNG</h2></div>
                <div class="p-5 flex items-start gap-4">
                    <div class="w-16 h-16 border border-gray-200 rounded bg-white p-1 shrink-0"><img src={mainImg} class="w-full h-full object-contain" alt="" /></div>
                    <div class="flex-1"><h3 class="text-[14px] font-bold text-[#0E3A6B]">{product.name}</h3><p class="text-sm text-gray-500 mt-1">{quantity} x <span class="text-red-600 font-bold">Liên hệ</span></p></div>
                </div>
                <div class="bg-[#F8F9FA] p-5 border-t border-gray-200">
                    <button onclick={() => showCartPopup = false} class="w-full bg-[#0E3A6B] text-white font-bold py-3 rounded hover:brightness-110">Tiếp tục mua sắm</button>
                </div>
            </div>
        </div>
    {/if}

	{#if showLightbox}
		<div class="fixed inset-0 z-9999 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
			<button onclick={() => showLightbox = false} class="absolute top-5 right-5 text-white p-2 hover:bg-white/20 rounded-full"><X class="size-8" /></button>
			<div class="relative max-w-[90vw] max-h-[90vh]">
				<img src={selectedImage} alt="Zoom" class="max-w-full max-h-[85vh] object-contain" />
				<button onclick={prevImg} class="absolute -left-12 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"><ChevronLeft class="size-10" /></button>
				<button onclick={nextImg} class="absolute -right-12 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/20 rounded-full"><ChevronRight class="size-10" /></button>
			</div>
		</div>
	{/if}
</div>

<style>
	input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; appearance: none; margin: 0; }
	input[type=number] { -moz-appearance: textfield; appearance: textfield; }
</style>