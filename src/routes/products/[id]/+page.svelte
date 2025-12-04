<script lang="ts">
    import { page } from '$app/stores';
    import { House, Star, Minus, Plus, ShoppingBag, Phone, MessageCircle, Link as LinkIcon, Facebook, Twitter, Linkedin, Mail, Search, X, ChevronLeft, ChevronRight, RefreshCw, ShieldCheck, Truck, ShoppingCart, Ban } from '@lucide/svelte';
    import { cart } from '$lib/stores/cart.svelte';

    // 1. GET ID
    let productId = $derived($page.params.id);

    // 2. STATE
    let product = $state<any>(null);
    let isLoading = $state(true);
    
    // Derived Status Helpers
    let isOutOfStock = $derived(product?.status === "Hết hàng" || product?.isOutOfStock);
    let isContactPrice = $derived(product?.isContactPrice === true);

    // UI State
    let selectedImage = $state("");
    let selectedIndex = $state(0);
    let quantity = $state(1);
    let activeTab = $state('overview');
    
    // Popups
    let showLightbox = $state(false);
    let showQuotePopup = $state(false);
    let showCartPopup = $state(false);
    let showThankYouMessage = $state(false);

    // Form
    let customerName = $state('');
    let customerPhone = $state('');
    let customerNote = $state('');

    // Related Products
    const suggestedProducts = [
        { name: "Máy băm cỏ, xay nghiền đa năng", img: "/assets/may-bam-co.png", price: 700000, oldPrice: 1000000, discount: 30, rating: 5 },
        { name: "Máy trộn thức ăn chăn nuôi 50kg", img: "/assets/may-chan-nuoi.png", price: 800000, oldPrice: 1000000, discount: 20, rating: 4 },
        { name: "Máy Rang Đa Năng 15 kg", img: "/assets/may-che-bien-thuc-pham.png", price: 700000, oldPrice: 1000000, discount: 30, rating: 5 },
        { name: "Máy Ép Cám Viên S150", img: "/assets/may-ep-cam-vien.png", price: 2500000, oldPrice: 3000000, discount: 15, rating: 5 }
    ];

    // 3. FETCH DATA
    $effect(() => {
        if (productId) {
            async function loadData() {
                isLoading = true;
                try {
                    const res = await fetch(`http://localhost:3001/products/${productId}`);
                    if (res.ok) {
                        const data = await res.json();
                        product = data;
                        
                        if (!product.images || product.images.length === 0) {
                            product.images = [product.img, product.img, product.img];
                        }
                        selectedImage = product.images[0];
                    }
                } catch (error) { console.error("Error:", error); }
                isLoading = false;
            }
            loadData();
        }
    });

    // Helper Functions
    function selectImg(i: number) { selectedIndex = i; selectedImage = product.images[i]; }
    function nextImg() { selectImg((selectedIndex + 1) % product.images.length); }
    function prevImg() { selectImg((selectedIndex - 1 + product.images.length) % product.images.length); }
    function decreaseQty() { if (quantity > 1) quantity--; }
    function increaseQty() { quantity++; }
    function handleAddToCart() { if (isOutOfStock) return; cart.add(product, quantity); showCartPopup = true; }
    function submitQuote() { if (!customerName.trim() || !customerPhone.trim()) { alert("Nhập tên & SĐT!"); return; } showThankYouMessage = true; setTimeout(() => { showQuotePopup = false; showThankYouMessage = false; }, 3000); }
    function copyLink() { navigator.clipboard.writeText(window.location.href); alert("Đã sao chép liên kết!"); }
    const formatPrice = (price: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
</script>

<div class="min-h-screen bg-gray-50 py-6 relative">
    <div class="w-[90%] lg:w-[80%] mx-auto">
        
        {#if isLoading}
            <div class="py-20 text-center text-gray-500">Đang tải dữ liệu...</div>
        {:else if product}
            
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <a href="/" class="hover:text-[#0E3A6B]"><House class="size-4" /></a>
                <span>|</span>
                <a href="/products" class="hover:text-[#0E3A6B]">Sản Phẩm</a>
                <span>|</span>
                <a href={`/products?tab=${encodeURIComponent(product.category || 'Tất Cả')}`} class="hover:text-[#0E3A6B]">{product.category || "Sản phẩm"}</a>
                <span>|</span>
                <span class="text-[#0E3A6B] font-medium truncate">{product.name}</span>
            </div>

            <div class="bg-white rounded-xl shadow-sm p-8 grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
                
                <div class="lg:col-span-5 flex flex-col gap-6">
                    <div class="w-full h-[400px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-4 relative group bg-white">
                        
                        <img src={selectedImage} alt={product.name} class="w-full h-full object-contain transition-all duration-300 {isOutOfStock ? 'opacity-50 grayscale-50' : ''}" />
                        
                        {#if isOutOfStock}
                            <div class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                <span class="bg-gray-800/90 text-white font-bold text-xl px-6 py-3 rounded-lg uppercase shadow-lg backdrop-blur-sm flex items-center gap-2"><Ban class="size-6" /> Hết hàng</span>
                            </div>
                        {/if}

                        {#if !isOutOfStock}
                            <button onclick={() => showLightbox = true} class="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md border border-gray-100 text-black hover:bg-gray-100"><Search class="size-5" /></button>
                            <button onclick={prevImg} class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 opacity-0 group-hover:opacity-100"><ChevronLeft class="size-6" /></button>
                            <button onclick={nextImg} class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white text-gray-600 opacity-0 group-hover:opacity-100"><ChevronRight class="size-6" /></button>
                        {/if}
                    </div>
                    
                    <div class="flex gap-3 overflow-x-auto pb-2 justify-center">
                        {#each product.images as img, i}
                            <button onclick={() => selectImg(i)} class="size-20 rounded-md overflow-hidden shrink-0 p-1 cursor-pointer transition-all bg-white border border-gray-200 {selectedIndex === i ? 'opacity-100 ring-2 ring-[#0E3A6B]' : (isOutOfStock ? 'opacity-40' : 'opacity-30 hover:opacity-70')}">
                                <img src={img} alt="thumbnail" class="w-full h-full object-contain" />
                            </button>
                        {/each}
                    </div>
                    
                    <div class="flex items-center justify-center gap-4 text-gray-500 mt-2 border-t border-gray-100 pt-4">
                        <button onclick={copyLink} class="hover:text-[#0E3A6B] flex flex-col items-center gap-1 text-xs"><div class="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><LinkIcon class="size-4" /></div>Copy Link</button>
                        <Facebook class="size-6 fill-current hover:text-blue-600" /> <Twitter class="size-6 fill-current hover:text-sky-500" /> <Mail class="size-6 fill-current hover:text-red-500" />
                    </div>
                </div>

                <div class="lg:col-span-7 flex flex-col relative pr-4 lg:pr-16"> 
                    <div class="absolute right-0 top-0 flex flex-col gap-3 z-10">
                        <a href="tel:0965060363" class="size-10 lg:size-12 rounded-full bg-[#00AEEF] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"><Phone class="size-5 lg:size-6 fill-current" /></a>
                        <!-- svelte-ignore a11y_invalid_attribute -->
                        <a href="#" class="size-10 lg:size-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform overflow-hidden bg-white"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png" alt="Zalo" class="w-full h-full object-cover p-1" /></a>
                    </div>

                    <h1 class="text-2xl lg:text-3xl font-bold text-[#0E3A6B] mb-2">{product.name}</h1>
                    <div class="flex items-center gap-1 mb-4">{#each Array(5) as _, i}<Star class="size-4 {i < (product.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}" />{/each}</div>
                    
                    <div class="flex flex-col gap-1 text-sm text-gray-600 mb-6">
                        <p>Thương hiệu: <span class="text-[#00AEEF] font-semibold">{product.brand || "TOANPHAT"}</span></p>
                        <p>Mã sản phẩm: <span class="text-[#00AEEF] font-semibold">{product.code || "N/A"}</span> | Tình trạng: <span class="{isOutOfStock ? 'text-red-600' : 'text-[#00AEEF]'} font-semibold">{product.status || "Còn hàng"}</span></p>
                    </div>

                    <div class="flex items-center gap-3 mb-6">
                        {#if isContactPrice}
                             <button onclick={() => !isOutOfStock && (showQuotePopup = true)} disabled={isOutOfStock} class="text-3xl font-extrabold text-[#0E3A6B] hover:underline transition-colors cursor-pointer flex items-center gap-2 {isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}">Liên hệ</button>
                        {:else}
                             <div class="text-3xl font-extrabold text-[#0E3A6B]">{formatPrice(product.price)}</div>
                             {#if product.oldPrice}<div class="text-gray-400 text-lg line-through">{formatPrice(product.oldPrice)}</div>{/if}
                             {#if product.discount}
                                <div class="bg-linear-to-r from-[#ffdd00] to-[#FF4500] text-white text-sm font-bold px-2 py-0.5 rounded-sm">
                                    -{product.discount}%
                                </div>
                             {/if}
                        {/if}
                    </div>

                    <div class="flex items-center gap-4 mb-6">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-sm font-semibold text-gray-700">Số lượng:</label>
                        <div class="flex items-center border border-gray-300 rounded-md bg-white {isOutOfStock ? 'opacity-50 pointer-events-none bg-gray-100' : ''}">
                            <button onclick={decreaseQty} disabled={isOutOfStock} class="p-2 text-gray-500 hover:bg-gray-100 rounded-l-md"><Minus class="size-4" /></button>
                            <input type="number" bind:value={quantity} min="1" disabled={isOutOfStock} class="w-14 text-center border-x border-gray-300 py-1 font-semibold text-gray-700 focus:outline-none {isOutOfStock ? 'bg-gray-100' : ''}"/>
                            <button onclick={increaseQty} disabled={isOutOfStock} class="p-2 text-gray-500 hover:bg-gray-100 rounded-r-md"><Plus class="size-4" /></button>
                        </div>
                    </div>

                    <div class="flex flex-col lg:flex-row gap-4 mb-10">
                        {#if isContactPrice}
                             <div class="flex items-center gap-4 w-full">
                                <button onclick={handleAddToCart} disabled={isOutOfStock} class="border-2 p-4 rounded-lg flex items-center justify-center shadow-sm shrink-0 {isOutOfStock ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-[#0E3A6B] text-[#0E3A6B] bg-white hover:bg-blue-50'}" title="Thêm vào giỏ hàng"><ShoppingBag class="size-6" /></button>
                                <!-- svelte-ignore a11y_invalid_attribute -->
                                <a href="#" class="flex-1 bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] text-white text-lg font-bold py-3 rounded-lg shadow-md flex items-center justify-center gap-3 {isOutOfStock ? 'bg-gray-400 cursor-not-allowed opacity-80' : 'hover:brightness-125'}"><Phone class="size-6 fill-current" /><span>GỌI NGAY</span></a>
                             </div>
                             <!-- svelte-ignore a11y_invalid_attribute -->
                             <a href="#" class="w-full bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] text-white text-lg font-bold py-3 rounded-lg shadow-md flex items-center justify-center gap-3 {isOutOfStock ? 'bg-gray-400 cursor-not-allowed opacity-80' : 'hover:brightness-110'}"><MessageCircle class="size-6 fill-current" /><span>CHAT ZALO NGAY</span></a>
                        {:else}
                            <div class="flex items-center gap-4 w-full">
                                <button onclick={handleAddToCart} disabled={isOutOfStock} class="border-2 p-3 rounded-lg flex items-center justify-center shadow-sm {isOutOfStock ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' : 'border-[#0E3A6B] text-[#0E3A6B] bg-white hover:bg-blue-50'}" title="Thêm vào giỏ hàng"><ShoppingBag class="size-7" /></button>
                                <button disabled={isOutOfStock} class="flex-1 bg-linear-to-b from-[#0E3A6B] to-[#00AEEF] text-white text-lg font-bold py-3 rounded-lg hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2 {isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}"><span>MUA NGAY</span><ShoppingCart class="size-6" /></button>
                            </div>
                        {/if}
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

                    <div class="bg-white rounded-xl shadow-sm p-8 text-gray-700 leading-relaxed text-sm min-h-[300px]">
                        
                        {#if activeTab === 'overview' && product.richDetails}
                            <h3 class="text-[#0E3A6B] font-bold text-lg mb-4">Tổng quan</h3>
                            <h1 class="text-2xl font-bold text-gray-900 mb-6">{product.name}</h1>
                            
                            {#if product.richDetails.intro}<div class="mb-6"><h4 class="font-bold text-gray-900 mb-2">Giới thiệu</h4><p class="text-justify">{product.richDetails.intro}</p></div>{/if}
                            {#if product.richDetails.features}
                                <div><h4 class="font-bold text-gray-900 mb-3">Đặc điểm nổi bật</h4><div class="space-y-4">{#each product.richDetails.features as feature, i}<div><strong class="block text-gray-800 mb-1">{feature.title}</strong><ul class="list-disc pl-5 space-y-1 text-gray-600">{#each feature.items as line}<li>{line}</li>{/each}</ul></div>{/each}</div></div>
                            {/if}
                        
                        {:else if activeTab === 'specs' && product.richDetails?.specs}
                            <h3 class="text-[#0E3A6B] font-bold text-lg mb-4">Thông số kỹ thuật</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                                {#each Object.entries(product.richDetails.specs) as [category, details]}
                                    <div>
                                        <h4 class="font-bold text-[#0E3A6B] text-base uppercase mb-4 border-b border-gray-200 pb-2">{category}</h4>
                                        <div class="space-y-3 text-gray-600">
                                            {#each Object.entries(details as any) as [key, val]}
                                                <div class="flex justify-between"><span>{key}:</span><span class="font-medium text-black">{val}</span></div>
                                            {/each}
                                        </div>
                                    </div>
                                {/each}
                            </div>

                        {:else if activeTab === 'guide' && product.richDetails?.guide}
                            <h3 class="text-[#0E3A6B] font-bold text-lg mb-4">Hướng dẫn sử dụng</h3>
                            
                            {#if product.richDetails.guide.type === 'video'}
                                <ul class="list-none space-y-3 text-gray-600 mb-8 pl-2">{#each product.richDetails.guide.steps as step}<li class="relative pl-4 before:content-['–'] before:absolute before:left-0 before:text-gray-400">{step}</li>{/each}</ul>
                                <!-- svelte-ignore a11y_missing_attribute -->
                                <div class="w-full aspect-video rounded-lg overflow-hidden shadow-md mb-4 bg-black"><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${product.richDetails.guide.videoUrl}`} frameborder="0" allowfullscreen></iframe></div>
                            
                            {:else if product.richDetails.guide.type === 'grid'}
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">{#each product.richDetails.guide.items as item}<div class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex gap-3 items-start"><div class="text-2xl">{item.icon}</div><div><h4 class="font-bold text-gray-800 mb-1">{item.title}</h4><p class="text-xs text-gray-600">{item.desc}</p><div class="mt-2 text-sm font-bold text-[#0E3A6B]">{item.cap}</div></div></div>{/each}</div>

                            {:else if product.richDetails.guide.type === 'qa'}
                                <div class="space-y-6">{#each product.richDetails.guide.items as qa}<div class="bg-blue-50 p-4 rounded-lg border border-blue-100"><h4 class="font-bold text-[#0E3A6B] mb-2">{qa.q}</h4><p class="text-gray-600 text-xs">{qa.a}</p></div>{/each}</div>
                            {/if}

                        {:else}
                            <div class="py-10 text-center text-gray-500 italic">Đang cập nhật...</div>
                        {/if}
                    </div>
                </div>

                <div class="lg:col-span-4">
                    <h3 class="text-[#0E3A6B] font-bold text-lg mb-4 uppercase">Sản phẩm cùng chuyên mục</h3>
                    <div class="flex flex-col gap-4">
                        {#each suggestedProducts as p}
                            <a href="/products" class="flex gap-4 bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#0E3A6B] transition-all group">
                                <div class="w-24 h-24 shrink-0 border border-gray-100 rounded-md overflow-hidden flex items-center justify-center relative"><img src={p.img} alt={p.name} class="w-full h-full object-contain group-hover:scale-105 transition-transform" />{#if p.discount}<div class="absolute top-0 left-0 bg-linear-to-r from-[#ffdd00] to-[#FF4500] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-br-md">-{p.discount}%</div>{/if}</div>
                                <div class="flex flex-col gap-1"><h4 class="text-sm font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-[#0E3A6B] transition-colors">{p.name}</h4><div class="flex gap-0.5">{#each Array(5) as _, i}<Star class="size-3 {i < p.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-300'}" />{/each}</div><div class="flex flex-col mt-0.5"><div class="text-[#0E3A6B] font-extrabold text-base">{formatPrice(p.price)}</div><div class="text-gray-400 text-xs line-through">{formatPrice(p.oldPrice)}</div></div></div>
                            </a>
                        {/each}
                    </div>
                </div>
            </div>

        {:else}
            <div class="text-center py-20"><p class="text-red-500 font-bold text-lg">Không tìm thấy sản phẩm!</p></div>
        {/if}
    </div>
    
    {#if showQuotePopup}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="fixed inset-0 z-9999 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm" onclick={() => showQuotePopup = false}>
             <div class="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative" onclick={(e) => e.stopPropagation()}>
                 <button onclick={() => showQuotePopup = false} class="absolute top-4 right-4"><X class="size-6" /></button>
                 <h2 class="text-xl font-bold text-center text-[#0E3A6B] mb-4">{showThankYouMessage ? "Gửi thành công!" : "Yêu cầu báo giá"}</h2>
                 {#if showThankYouMessage}
                     <div class="text-center py-4"><p class="text-green-600 font-bold">Toàn Phát đã ghi nhận thông tin!</p></div>
                 {:else}
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

    <!-- svelte-ignore block_empty -->
    {#if showCartPopup}
        {/if}
    
    <!-- svelte-ignore block_empty -->
    {#if showLightbox}
		{/if}
</div>

<style>
	input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; appearance: none; margin: 0; }
	input[type=number] { -moz-appearance: textfield; appearance: textfield; }
</style>