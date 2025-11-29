<script lang="ts">
	import { House, Star, Minus, Plus, ShoppingBag, Phone, MessageCircle, X, ChevronLeft, ChevronRight, RefreshCw, ShieldCheck, Truck, Search, Ban, Link as LinkIcon, Facebook, Twitter, Linkedin, Mail } from '@lucide/svelte';
	import { cart } from '$lib/stores/cart.svelte';

	const mainImg = "/assets/may-nghien-bot-inox.png"; 
	const product = {
		name: "Máy nghiền bột mịn inox",
		brand: "TOANPHAT",
		code: "I300",
		status: "Hết hàng",
		price: 0,
		isContact: true,
		rating: 5,
		images: [mainImg, mainImg, mainImg]
	};

    let isOutOfStock = $derived(product.status === 'Hết hàng');

    const suggestedProducts = [
        { name: "Máy băm chuối đa năng 3kw", img: "/assets/may-bam-chuoi.png", price: 600000, oldPrice: 1000000, discount: 40, rating: 5 },
        { name: "Máy băm cỏ, xay nghiền đa năng", img: "/assets/may-bam-co.png", price: 700000, oldPrice: 1000000, discount: 30, rating: 5 },
        { name: "Máy trộn thức ăn chăn nuôi 50kg", img: "/assets/may-chan-nuoi.png", price: 800000, oldPrice: 1000000, discount: 20, rating: 4 },
        { name: "Máy Rang Đa Năng 15 kg", img: "/assets/may-che-bien-thuc-pham.png", price: 700000, oldPrice: 1000000, discount: 30, rating: 5 }
    ];

	let selectedImage = $state(product.images[0]);
	let selectedIndex = $state(0);
	let quantity = $state(1);
    let activeTab = $state('overview');
	
	let showLightbox = $state(false);
	let showQuotePopup = $state(false);
	let showCartPopup = $state(false);
    let showThankYouMessage = $state(false);

	let customerName = $state('');
	let customerPhone = $state('');
	let customerNote = $state('');

	function selectImg(i: number) { selectedIndex = i; selectedImage = product.images[i]; }
	function nextImg() { selectImg((selectedIndex + 1) % product.images.length); }
	function prevImg() { selectImg((selectedIndex - 1 + product.images.length) % product.images.length); }
	function decreaseQty() { if (quantity > 1) quantity--; }
	function increaseQty() { quantity++; }

	function handleAddToCart() {
        if(isOutOfStock) return;
		cart.add(product, quantity);
		showCartPopup = true;
	}

	function submitQuote() {
		if (!customerName.trim() || !customerPhone.trim()) {
			alert("Vui lòng nhập tên và số điện thoại!");
			return;
		}
        showThankYouMessage = true;
        customerName = ''; customerPhone = ''; customerNote = '';
        setTimeout(() => { showQuotePopup = false; showThankYouMessage = false; }, 3000);
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
			<a href="/products?tab=Máy Chế Biến Thực Phẩm" class="hover:text-[#0E3A6B]">Máy Chế Biến Thực Phẩm</a>
			<span>|</span>
			<span class="text-[#0E3A6B] font-medium truncate">{product.name}</span>
		</div>

		<div class="bg-white rounded-xl shadow-sm p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
			
			<div class="lg:col-span-5 flex flex-col gap-6">
				<div class="w-full h-[400px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4 relative group bg-white">
					
                    <img 
                        src={selectedImage} 
                        alt={product.name} 
                        class="w-full h-full object-contain transition-all duration-300 {isOutOfStock ? 'opacity-50 grayscale-50' : ''}" 
                    />
					
                    {#if isOutOfStock}
                        <div class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                            <span class="bg-gray-800/90 text-white font-bold text-xl px-6 py-3 rounded-lg uppercase shadow-lg backdrop-blur-sm flex items-center gap-2">
                                <Ban class="size-6" /> Hết hàng
                            </span>
                        </div>
                    {/if}

                    {#if !isOutOfStock}
					    <button onclick={() => showLightbox = true} class="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md border border-gray-100 text-black hover:bg-gray-100 z-10"><Search class="size-5" /></button>
					    <button onclick={prevImg} class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 opacity-0 group-hover:opacity-100 z-10"><ChevronLeft class="size-6" /></button>
					    <button onclick={nextImg} class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 opacity-0 group-hover:opacity-100 z-10"><ChevronRight class="size-6" /></button>
                    {/if}
				</div>

                <div class="flex gap-3 overflow-x-auto pb-2 justify-center">
					{#each product.images as img, i}
						<button 
                            onclick={() => selectImg(i)} 
                            class="size-20 rounded-md overflow-hidden shrink-0 p-1 cursor-pointer transition-all bg-white border border-gray-200 
                            {selectedIndex === i ? 'opacity-100 ring-2 ring-[#0E3A6B]' : (isOutOfStock ? 'opacity-40' : 'opacity-30 hover:opacity-70')}"
                        >
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
					<p>Mã sản phẩm: <span class="text-[#00AEEF] font-semibold">{product.code}</span> | Tình trạng: <span class="{isOutOfStock ? 'text-red-600' : 'text-[#00AEEF]'} font-semibold">{product.status}</span></p>
				</div>

				<div class="mb-8">
                    <button 
                        onclick={() => !isOutOfStock && (showQuotePopup = true)}
                        disabled={isOutOfStock}
                        class="text-3xl font-extrabold text-[#0E3A6B] flex items-center gap-2 transition-colors {isOutOfStock ? 'cursor-not-allowed' : 'hover:underline cursor-pointer'}"
                    >
                        Liên hệ
                    </button>
				</div>

				<div class="flex items-center gap-4 mb-8">
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label class="text-sm font-semibold text-gray-700">Số lượng:</label>
					<div class="flex items-center border border-gray-300 rounded-md bg-white {isOutOfStock ? 'opacity-50 pointer-events-none bg-gray-100' : ''}">
						<button onclick={decreaseQty} disabled={isOutOfStock} class="p-2 text-gray-500 hover:bg-gray-100 rounded-l-md"><Minus class="size-4" /></button>
						<input type="number" bind:value={quantity} min="1" disabled={isOutOfStock} class="w-14 text-center border-x border-gray-300 py-1 font-semibold text-gray-700 focus:outline-none {isOutOfStock ? 'bg-gray-100' : ''}"/>
						<button onclick={increaseQty} disabled={isOutOfStock} class="p-2 text-gray-500 hover:bg-gray-100 rounded-r-md"><Plus class="size-4" /></button>
					</div>
				</div>

				<div class="flex flex-col gap-4 mb-10">
                    <div class="flex items-center gap-4">
                        
                        <!-- <button 
                            onclick={handleAddToCart}
                            disabled={isOutOfStock}
                            class="border-2 p-4 rounded-lg transition-all flex items-center justify-center shadow-sm shrink-0 {isOutOfStock ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-70' : 'border-[#0E3A6B] text-[#0E3A6B] bg-white hover:bg-blue-50'}"
                            title={isOutOfStock ? "Sản phẩm hiện đang hết hàng" : "Thêm vào giỏ hàng"}
                        >
                            <ShoppingBag class="size-6" />
                        </button> -->

                        <a 
                            href={isOutOfStock ? undefined : "tel:0965060363"}
                            class="flex-1 text-white text-lg font-bold py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-3 {isOutOfStock ? 'bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] cursor-not-allowed' : 'bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] hover:brightness-125'}"
                            onclick={(e) => isOutOfStock && e.preventDefault()}
                        >
                            <Phone class="size-6 fill-current" />
                            <span>GỌI 0965.060.363</span>
                        </a>
                    </div>

                    <a 
                        href={isOutOfStock ? undefined : "https://zalo.me/0965060363"}
                        target={isOutOfStock ? undefined : "_blank"}
                        class="w-full text-white text-lg font-bold py-3 rounded-lg transition-all shadow-md flex items-center justify-center gap-3 {isOutOfStock ? 'bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] cursor-not-allowed' : 'bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] hover:brightness-110'}"
                        onclick={(e) => isOutOfStock && e.preventDefault()}
                    >
                        <MessageCircle class="size-6 fill-current" />
                        <span>CHAT ZALO NGAY</span>
                    </a>
				</div>

				<div class="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6">
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600"><RefreshCw class="size-6 text-[#0E3A6B]" /><span>Đổi trả dễ dàng</span></div>
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600"><ShieldCheck class="size-6 text-[#0E3A6B]" /><span>Hàng chính hãng</span></div>
					<div class="flex flex-col items-center text-center gap-2 text-xs text-gray-600"><Truck class="size-6 text-[#0E3A6B]" /><span>Miễn phí vận chuyển</span></div>
				</div>
			</div>
		</div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div class="lg:col-span-8">
                <div class="flex flex-wrap gap-4 mb-6">
                    <button onclick={() => activeTab = 'overview'} class="px-8 py-2 rounded-md font-bold text-sm border transition-all {activeTab === 'overview' ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}">Tổng quan</button>
                    <button onclick={() => activeTab = 'specs'} class="px-8 py-2 rounded-md font-bold text-sm border transition-all {activeTab === 'specs' ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}">Thông số kỹ thuật</button>
                    <button onclick={() => activeTab = 'guide'} class="px-8 py-2 rounded-md font-bold text-sm border transition-all {activeTab === 'guide' ? 'bg-[#0E3A6B] text-white border-[#0E3A6B]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#0E3A6B] hover:text-[#0E3A6B]'}">Hướng dẫn sử dụng</button>
                </div>
                <div class="bg-white rounded-xl shadow-sm p-8 text-gray-700 leading-relaxed text-sm">
                    
                    {#if activeTab === 'overview'}
                        <h3 class="text-[#0E3A6B] font-bold text-lg mb-4">Tổng quan</h3>
                        <h1 class="text-2xl font-bold text-[#0E3A6B] mb-6">Máy nghiền bột inox 300 (Siêu Mịn)</h1>
                        
                        <div class="space-y-4 text-justify">
                            <p>Máy nghiền bột inox 300 có khả năng nghiền siêu mịn. Đây là sản phẩm ưu việt trong dòng máy chế biến thực phẩm của Công ty Toàn Phát, được cải tiến từ dòng máy nghiền bột inox 200 với các tính năng hiện đại.</p>
                            <p>Máy có chức năng nghiền các loại hạt ngũ cốc như gạo, lá chè xanh, đường... thành bột siêu mịn.</p>
                            <p>Đặc biệt, với thiết kế búa cánh quạt tiên tiến, máy còn có thể nghiền các loại hạt chứa nhiều tinh dầu như macca, đậu nành, óc chó, sachi... mà không bị bó máy hay tắc sàng (tỷ lệ dầu từ 5 - 10%).</p>
                            <p>Máy được thiết kế hoàn toàn bằng chất liệu inox, chống gỉ, chống dính, cho ra thành phẩm thơm ngon, sạch sẽ, đảm bảo vệ sinh an toàn thực phẩm và dễ dàng vệ sinh cọ rửa.</p>
                            <p>Máy nhỏ gọn, trang bị 4 bánh xe thuận tiện di chuyển, phù hợp sử dụng trong các gia đình và hộ kinh doanh.</p>
                        </div>

                    {:else if activeTab === 'specs'}
                        <h3 class="text-[#0E3A6B] font-bold text-lg mb-6">Thông số kỹ thuật</h3>
                        <div class="border border-gray-200 rounded-lg overflow-hidden">
                            <table class="w-full text-sm text-left">
                                <tbody class="divide-y divide-gray-200">
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold w-1/3">Nguồn điện</td><td class="p-4">380V (3 pha)</td></tr>
                                    <tr><td class="p-4 font-semibold">Công suất động cơ</td><td class="p-4">5.5 - 7.5 kW</td></tr>
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold">Năng suất</td><td class="p-4">30 - 50 kg/giờ</td></tr>
                                    <tr><td class="p-4 font-semibold">Chất liệu</td><td class="p-4">100% Inox cao cấp (Chống gỉ)</td></tr>
                                    <tr class="bg-gray-50"><td class="p-4 font-semibold">Hệ thống nghiền</td><td class="p-4">Búa cánh quạt quay quanh trục</td></tr>
                                    <tr><td class="p-4 font-semibold">Kích thước sàng</td><td class="p-4">0.3mm; 0.4mm; 0.5mm (Tùy chọn)</td></tr>
                                </tbody>
                            </table>
                        </div>

                    {:else if activeTab === 'guide'}
                        <h3 class="text-[#0E3A6B] font-bold text-lg mb-6">Hướng dẫn & Giải đáp thắc mắc</h3>
                        
                        <div class="space-y-6">
                            <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 class="font-bold text-[#0E3A6B] mb-2">1. Máy nghiền được những loại hạt nào?</h4>
                                <p class="text-gray-600 text-xs">Máy nghiền được hầu hết các loại hạt ngũ cốc không chứa dầu hoặc chứa ít hơn 10% dầu. Nếu nghiền hỗn hợp, cần tính toán tỷ lệ sao cho hạt có dầu chỉ chiếm 1-8%.</p>
                            </div>

                            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                <h4 class="font-bold text-yellow-700 mb-2">2. Lưu ý khi nghiền hạt có dầu?</h4>
                                <p class="text-gray-600 text-xs mb-2">Hạt có dầu khi nghiền sẽ sinh nhiệt làm tách dầu, gây tắc lỗ sàng. Tỷ lệ dầu bắt buộc phải dưới 10%.</p>
                                <ul class="list-disc pl-5 text-xs text-gray-500">
                                    <li>Lạc (Đậu phộng): 40-50% dầu (Cần phối trộn)</li>
                                    <li>Vừng (Mè): 45-55% dầu (Cần phối trộn)</li>
                                    <li>Đậu nành: 13-19% dầu (Cần phối trộn)</li>
                                </ul>
                            </div>

                            <div>
                                <h4 class="font-bold text-gray-800 mb-1">3. Có thể nghiền lại lần 2 cho mịn hơn không?</h4>
                                <p class="text-gray-600 text-xs">Không cần thiết và không hiệu quả. Khi nghiền lần 1, hạt đã thành bột nhẹ, mất trọng lực nên cho vào lại máy sẽ không thể nghiền mịn thêm. Nghiền 1 lần là đủ tiêu chuẩn.</p>
                            </div>

                            <div>
                                <h4 class="font-bold text-gray-800 mb-1">4. Máy dùng điện 1 pha (220V) được không?</h4>
                                <p class="text-gray-600 text-xs">Đây là dòng công suất lớn nên cần động cơ 3 pha (380V) để đạt tốc độ cao. Nếu quý khách chỉ có điện 220V, vui lòng tham khảo dòng <strong>Máy nghiền inox 200</strong> (năng suất thấp hơn).</p>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="lg:col-span-4">
                <h3 class="text-[#0E3A6B] font-bold text-lg mb-4 uppercase">Sản phẩm bạn có thể thích</h3>
                <div class="flex flex-col gap-4">
                    {#each suggestedProducts as p}
                        <a href="/products" class="flex gap-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0E3A6B] transition-all group">
                            <div class="w-24 h-24 shrink-0 border border-gray-100 rounded-md overflow-hidden flex items-center justify-center relative">
                                <img src={p.img} alt={p.name} class="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                                <div class="absolute top-0 left-0 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-md">-{p.discount}%</div>
                            </div>
                            <div class="flex flex-col gap-1">
                                <h4 class="text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-[#0E3A6B] transition-colors">{p.name}</h4>
                                <div class="flex gap-0.5">{#each Array(5) as _, i}<Star class="size-3 {i < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}" />{/each}</div>
                                <div class="flex flex-col mt-0.5"><div class="text-[#0E3A6B] font-extrabold text-base">{formatPrice(p.price)}</div><div class="text-gray-400 text-xs line-through">{formatPrice(p.oldPrice)}</div></div>
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        </div>
	</div>

    {#if showQuotePopup}
        <!-- svelte-ignore a11y_interactive_supports_focus -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div class="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm" onclick={() => showQuotePopup = false} role="dialog" aria-modal="true">
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div class="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden p-6 relative" onclick={(e) => e.stopPropagation()}>
                <button onclick={() => showQuotePopup = false} class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X class="size-6" /></button>
                <h2 class="text-xl font-bold text-[#0E3A6B] mb-4 text-center uppercase">{showThankYouMessage ? "Gửi thành công!" : "Yêu cầu báo giá"}</h2>
                {#if showThankYouMessage}
                    <div class="text-center py-6 flex flex-col items-center gap-4"><ShieldCheck class="size-16 text-green-500" /><p class="text-gray-700 font-medium">Toàn Phát đã ghi nhận thông tin, chúng tôi sẽ liên hệ lại với quý khách sớm nhất có thể, xin cảm ơn!</p></div>
                {:else}
                    <div class="flex gap-4 mb-6 items-center bg-gray-50 p-3 rounded-lg"><div class="size-16 border bg-white rounded p-1 shrink-0"><img src={mainImg} class="w-full h-full object-contain" alt="" /></div><div><h4 class="text-sm font-bold text-gray-800 line-clamp-2">{product.name}</h4><p class="text-xs text-gray-500 mt-1">Số lượng: <span class="font-bold">{quantity}</span></p></div></div>
                    <div class="flex flex-col gap-5">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <div class="relative"><label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Họ và tên <span class="text-red-500">*</span></label><input type="text" bind:value={customerName} class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] bg-transparent relative z-0" /></div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <div class="relative"><label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Số điện thoại <span class="text-red-500">*</span></label><input type="tel" bind:value={customerPhone} class="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] relative z-0" /></div>
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <div class="relative"><label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Yêu cầu thêm (Tùy chọn)</label><textarea bind:value={customerNote} class="w-full border border-gray-300 rounded-md px-4 py-3 h-24 resize-none focus:outline-none focus:border-[#0E3A6B] relative z-0"></textarea></div>
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
                <div class="p-5 flex items-start gap-4"><div class="w-16 h-16 border border-gray-200 rounded bg-white p-1 shrink-0"><img src={mainImg} class="w-full h-full object-contain" alt="" /></div><div class="flex-1"><h3 class="text-[14px] font-bold text-[#0E3A6B]">{product.name}</h3><p class="text-sm text-gray-500 mt-1">{quantity} x <span class="text-red-600 font-bold">Liên hệ</span></p></div></div>
                <div class="bg-[#F8F9FA] p-5 border-t border-gray-200"><button onclick={() => showCartPopup = false} class="w-full bg-[#0E3A6B] text-white font-bold py-3 rounded hover:brightness-110">Tiếp tục mua sắm</button></div>
            </div>
        </div>
    {/if}

	{#if showLightbox && !isOutOfStock}
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