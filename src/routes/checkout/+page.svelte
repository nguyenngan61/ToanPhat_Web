<script lang="ts">
	import { checkout } from '$lib/stores/checkout.svelte';
	import { cart } from '$lib/stores/cart.svelte'; // Import Cart to clear it later
	import { ChevronLeft, CreditCard, Banknote, ChevronDown } from '@lucide/svelte';
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    const locationData: Record<string, any> = {
        "Hà Nội": {
            "Quận Ba Đình": ["Phường Cống Vị", "Phường Liễu Giai", "Phường Kim Mã"],
            "Huyện Thường Tín": ["Xã Duyên Thái", "Xã Vạn Điểm", "Xã Hà Hồi"],
            "Quận Hoàng Mai": ["Phường Đại Kim", "Phường Định Công", "Phường Thịnh Liệt"]
        },
        "Hồ Chí Minh": {
            "Quận 1": ["Phường Bến Nghé", "Phường Bến Thành", "Phường Đa Kao"],
            "Quận 7": ["Phường Tân Phong", "Phường Tân Phú", "Phường Bình Thuận"],
            "Thành phố Thủ Đức": ["Phường Thảo Điền", "Phường An Phú", "Phường Hiệp Bình Chánh"]
        }
    };

    // Local variables to bind inputs
    let name = $state('');
    let phone = $state('');
    let note = $state('');
    let selectedCity = $state("");
    let selectedDistrict = $state("");
    let selectedWard = $state("");
    
    let shippingFee = $state(35000); 
    let paymentMethod = $state('cod');

    // Coupon vars
    let couponCode = $state('');
    let appliedDiscount = $state(0);
    let activeCoupon = $state('');
    let showCouponList = $state(false);

    let districts = $derived(selectedCity ? Object.keys(locationData[selectedCity] || {}) : []);
    let wards = $derived(selectedDistrict && selectedCity ? locationData[selectedCity][selectedDistrict] || [] : []);

    const coupons = [
        { code: 'SUPER10', discountPercent: 10, label: 'Giảm 10% cho đơn từ 1tr', condition: 'Đơn hàng tối thiểu 1.000.000đ', isBest: true },
        { code: 'HELLO05', discountPercent: 5, label: 'Giảm 5% cho khách mới', condition: 'Dành cho khách hàng lần đầu mua sắm', isBest: false },
        { code: 'FREESHIP', discountPercent: 2, label: 'Giảm 2% phí vận chuyển', condition: 'Áp dụng cho mọi đơn hàng', isBest: false }
    ];

    let subTotal = $derived(checkout.items.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    let discountAmount = $derived(Math.round(subTotal * (appliedDiscount / 100)));
    let finalTotal = $derived(subTotal + shippingFee - discountAmount);

    function handleCityChange() { selectedDistrict = ""; selectedWard = ""; }
    function handleDistrictChange() { selectedWard = ""; }
    function selectCoupon(c: any) { couponCode = c.code; appliedDiscount = c.discountPercent; activeCoupon = c.code; showCouponList = false; }
    const formatPrice = (price: number) => { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price); };

    // === VALIDATION & SUBMIT ===
    function placeOrder() {
        // 1. Check empty fields
        if (!name.trim() || !phone.trim() || !selectedCity || !selectedDistrict || !selectedWard) {
            alert("Vui lòng điền đầy đủ: Họ tên, Số điện thoại, Tỉnh/Thành, Quận/Huyện, Phường/Xã.");
            return;
        }

        // 2. Create full address string
        const fullAddress = `${selectedWard}, ${selectedDistrict}, ${selectedCity}`;

        // 3. SAVE TO STORE (This sends data to the Success Page)
        checkout.updateInfo({
            name: name,
            phone: phone,
            address: fullAddress,
            note: note,
            paymentMethod: paymentMethod,
            shippingFee: shippingFee,
            discountPercent: appliedDiscount,
            couponCode: activeCoupon
        });

        // 4. CLEAR PURCHASED ITEMS FROM CART
        cart.removePurchasedItems(checkout.items);

        // 5. GO TO SUCCESS
        goto('/success');
    }

    onMount(() => { if (checkout.items.length === 0) goto('/cart'); });
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="min-h-screen bg-white py-10" onclick={() => showCouponList = false}>
    <div class="w-[90%] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-4 flex flex-col gap-6">
            <h2 class="text-[#0E3A6B] font-bold text-lg uppercase">Thông tin nhận hàng</h2>
            <div class="flex flex-col gap-5">
                <div class="relative">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Họ và tên <span class="text-red-500">*</span></label>
                    <input type="text" bind:value={name} class="w-full text-gray-700 border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] bg-transparent relative z-0" placeholder="" />
                </div>
                <div class="relative flex">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Số điện thoại <span class="text-red-500">*</span></label>
                    <div class="w-16 border border-gray-300 border-r-0 rounded-l-md flex items-center justify-center bg-gray-50"><img src="https://flagcdn.com/w20/vn.png" alt="VN" class="w-5" /></div>
                    <input type="text" bind:value={phone} class="w-full border text-gray-700 border-gray-300 rounded-r-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] relative z-0" placeholder="" />
                </div>
                <div class="relative">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Tỉnh thành <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <select bind:value={selectedCity} onchange={handleCityChange} class="w-full border text-gray-700 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] bg-white appearance-none relative z-0"><option value="" disabled selected>Chọn Tỉnh/Thành</option>{#each Object.keys(locationData) as city}<option value={city}>{city}</option>{/each}</select>
                        <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none z-10" />
                    </div>
                </div>
                <div class="relative">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Quận huyện <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <select bind:value={selectedDistrict} onchange={handleDistrictChange} disabled={!selectedCity} class="w-full border text-gray-700 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] bg-white appearance-none disabled:bg-gray-100 relative z-0"><option value="" disabled selected>Chọn Quận/Huyện</option>{#each districts as dist}<option value={dist}>{dist}</option>{/each}</select>
                        <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none z-10" />
                    </div>
                </div>
                <div class="relative">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Phường xã <span class="text-red-500">*</span></label>
                    <div class="relative">
                        <select bind:value={selectedWard} disabled={!selectedDistrict} class="w-full border text-gray-700 border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-[#0E3A6B] bg-white appearance-none disabled:bg-gray-100 relative z-0"><option value="" disabled selected>Chọn Phường/Xã</option>{#each wards as ward}<option value={ward}>{ward}</option>{/each}</select>
                        <ChevronDown class="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none z-10" />
                    </div>
                </div>
                <div class="relative">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label class="text-xs text-gray-500 ml-3 bg-white px-1 absolute -top-2 left-0 z-10">Ghi chú (Tùy chọn)</label>
                    <textarea bind:value={note} class="w-full border text-gray-700 border-gray-300 rounded-md px-4 py-3 h-24 resize-none focus:outline-none focus:border-[#0E3A6B] relative z-0"></textarea>
                </div>
            </div>
        </div>

        <div class="lg:col-span-4 flex flex-col gap-8">
            <div>
                <h2 class="text-[#0E3A6B] font-bold text-lg uppercase mb-4">Vận chuyển</h2>
                <div class="flex flex-col gap-4">
                    <label class="flex items-center justify-between cursor-pointer p-4 rounded-md border transition-all {shippingFee === 35000 ? 'border-[#0E3A6B] bg-[#0E3A6B]/10 ring-1 ring-[#0E3A6B] text-[#0E3A6B] opacity-100' : 'border-[#0E3A6B] bg-white text-gray-700 opacity-50 hover:opacity-100'}">
                        <div class="flex items-center gap-3"><input type="radio" name="shipping" value={35000} bind:group={shippingFee} class="w-5 h-5 accent-[#0E3A6B]" /><span class="text-sm font-bold">Tiết kiệm</span></div><span class="text-sm font-bold">35.000₫</span>
                    </label>
                    <label class="flex items-center justify-between cursor-pointer p-4 rounded-md border transition-all {shippingFee === 50000 ? 'border-[#0E3A6B] bg-[#0E3A6B]/10 ring-1 ring-[#0E3A6B] text-[#0E3A6B] opacity-100' : 'border-[#0E3A6B] bg-white text-gray-700 opacity-50 hover:opacity-100'}">
                        <div class="flex items-center gap-3"><input type="radio" name="shipping" value={50000} bind:group={shippingFee} class="w-5 h-5 accent-[#0E3A6B]" /><span class="text-sm font-bold">Siêu tốc</span></div><span class="text-sm font-bold">50.000₫</span>
                    </label>
                </div>
            </div>
            <div>
                <h2 class="text-[#0E3A6B] font-bold text-lg uppercase mb-4">Phương thức thanh toán</h2>
                <div class="flex flex-col gap-4">
                    <label class="flex items-center justify-between cursor-pointer p-4 rounded-md border transition-all {paymentMethod === 'cod' ? 'border-[#0E3A6B] bg-[#0E3A6B]/10 ring-1 ring-[#0E3A6B] text-[#0E3A6B] opacity-100' : 'border-[#0E3A6B] bg-white text-gray-700 opacity-50 hover:opacity-100'}">
                        <div class="flex items-center gap-3"><input type="radio" name="payment" value="cod" bind:group={paymentMethod} class="w-5 h-5 accent-[#0E3A6B]" /><span class="text-sm font-bold">Thanh toán khi nhận hàng (COD)</span></div><Banknote class="size-5" />
                    </label>
                    <label class="flex items-center justify-between cursor-pointer p-4 rounded-md border transition-all {paymentMethod === 'banking' ? 'border-[#0E3A6B] bg-[#0E3A6B]/10 ring-1 ring-[#0E3A6B] text-[#0E3A6B] opacity-100' : 'border-[#0E3A6B] bg-white text-gray-700 opacity-50 hover:opacity-100'}">
                        <div class="flex items-center gap-3"><input type="radio" name="payment" value="banking" bind:group={paymentMethod} class="w-5 h-5 accent-[#0E3A6B]" /><span class="text-sm font-bold">Chuyển khoản</span></div><CreditCard class="size-5" />
                    </label>
                </div>
            </div>
        </div>

        <div class="lg:col-span-4">
            <h2 class="text-[#0E3A6B] font-bold text-lg uppercase mb-4">Đơn hàng ({checkout.items.length} sản phẩm)</h2>
            <div class="border border-gray-200 rounded-md p-4 bg-white shadow-sm relative z-0">
                <div class="flex flex-col gap-4 border-b border-gray-200 pb-4 max-h-[300px] overflow-y-auto custom-scrollbar relative z-0">
                    {#each checkout.items as item}
                        <div class="flex justify-between items-start gap-3">
                            <div class="relative shrink-0"><div class="w-14 h-14 border border-gray-200 rounded bg-white overflow-hidden"><img src={item.images ? item.images[0] : item.img} alt={item.name} class="w-full h-full object-contain" /></div></div>
                            <div class="flex-1"><h4 class="text-sm text-gray-700 leading-tight line-clamp-2 font-medium">{item.name}</h4><div class="flex justify-between items-center mt-1 text-xs"><span class="text-gray-400">Toàn Phát</span><span class="text-gray-600"><span class="font-bold text-[#0E3A6B]">Số lượng: {item.quantity}</span></span></div></div>
                            <div 
                             class="text-sm font-bold text-gray-700">{formatPrice(item.price * item.quantity)}</div>
                        </div>
                    {/each}
                </div>
                <div class="py-4 border-b border-gray-200 relative z-50">
                <div class="relative" onclick={(e) => e.stopPropagation()}>
                    
                    <div class="flex gap-2">
                        <input 
                            type="text" 
                            bind:value={couponCode} 
                            placeholder="Chọn mã giảm giá" 
                            readonly
                            onclick={() => showCouponList = !showCouponList}
                            class="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#0E3A6B] focus:outline-none cursor-pointer bg-white text-[#0E3A6B] font-bold placeholder:font-normal placeholder:text-gray-400"
                        />
                        
                        <button 
                            onclick={() => showCouponList = !showCouponList}
                            class="bg-[#0E3A6B] text-white border border-[#0E3A6B] rounded px-3 hover:brightness-110 transition-colors"
                        >
                            <ChevronDown class="size-4" />
                        </button>
                    </div>

                    {#if showCouponList}
                        <div class="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-xl z-50 max-h-[300px] overflow-y-auto">
                            {#each coupons as c}
                                <div 
                                    onclick={() => selectCoupon(c)}
                                    class="p-3 border-b border-gray-100 hover:bg-blue-50 cursor-pointer flex justify-between items-start group"
                                >
                                    <div class="flex flex-col gap-1">
                                        <div class="flex items-center gap-2">
                                            <span class="font-bold text-[#0E3A6B]">{c.code}</span>
                                            {#if c.isBest}
                                                <span class="bg-yellow-400 text-[8px] text-black px-1 rounded font-bold">BEST CHOICE</span>
                                            {/if}
                                        </div>
                                        <span class="text-xs font-bold text-gray-700">{c.label}</span>
                                        <span class="text-[10px] text-gray-500">{c.condition}</span>
                                    </div>
                                    <div class="text-xs font-bold text-green-600 group-hover:underline">Áp dụng</div>
                                </div>
                            {/each}
                        </div>
                    {/if}
                    
                </div>
            </div>
                <div class="py-4 border-b border-gray-200 flex flex-col gap-2 text-sm text-gray-600 relative z-0">
                    <div class="flex justify-between"><span>Tạm tính</span><span>{formatPrice(subTotal)}</span></div>
                    <div class="flex justify-between"><span>Phí vận chuyển</span><span>{formatPrice(shippingFee)}</span></div>
                    {#if appliedDiscount > 0}<div class="flex justify-between text-red-600"><span>Giảm giá ({appliedDiscount}%)</span><span>-{formatPrice(discountAmount)}</span></div>{/if}
                    <div class="flex justify-between text-gray-500 italic border-t border-dashed border-gray-200 pt-2 mt-1"><span>Thanh toán:</span><span>{paymentMethod === 'cod' ? 'Tiền mặt (COD)' : 'Chuyển khoản'}</span></div>
                </div>
                <div class="py-4 flex justify-between items-center relative z-0"><span class="text-gray-600 font-medium">Tổng cộng</span><div class="flex flex-col items-end"><span class="text-xl font-bold text-[#0E3A6B]">{formatPrice(finalTotal)}</span></div></div>
                <div class="flex justify-between items-center mt-2 relative z-0"><a href="/cart" class="text-[#00AEEF] text-sm flex items-center gap-1 hover:underline"><ChevronLeft class="size-4" /> Quay về Giỏ hàng</a><button onclick={placeOrder} class="bg-linear-to-r from-[#001E3C] to-[#00AEEF] text-white font-bold px-8 py-3 rounded hover:brightness-110 transition-all shadow-md">Đặt hàng</button></div>
            </div>
        </div>
    </div>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #ccc; border-radius: 2px; }
</style>