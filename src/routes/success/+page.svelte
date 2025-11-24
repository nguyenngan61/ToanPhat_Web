<script lang="ts">
	import { checkout } from '$lib/stores/checkout.svelte';
	import { CheckCircle, Printer, ArrowRight, MapPin, Phone, CreditCard, Package, Home } from '@lucide/svelte';
	import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    // Generate a random Order ID for realism
    const orderId = "TP" + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleDateString('vi-VN');

    // Calculations
    let subTotal = $derived(checkout.items.reduce((sum, item) => sum + (item.price * item.quantity), 0));
    // Assuming 0 discount for simplicity in display, or you can pull from store
    let total = $derived(subTotal + checkout.info.shippingFee);

    const formatPrice = (price: number) => {
		return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
	};

    // Optional: Clear cart on success (Commented out for demo so you can see the data)
    /* onMount(() => {
        if (checkout.items.length === 0) goto('/');
        // cart.clear(); 
    }); 
    */
</script>

<div class="min-h-screen bg-gray-50 py-12">
    <div class="w-[90%] max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-7 flex flex-col justify-center h-full pt-10">
            
            <div class="flex flex-col gap-6">
                <div class="size-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <CheckCircle class="size-10" strokeWidth="2.5" />
                </div>

                <div>
                    <h1 class="text-[#0E3A6B] font-extrabold text-4xl uppercase leading-tight">
                        Đặt hàng thành công!
                    </h1>
                    <p class="text-gray-500 mt-4 text-lg leading-relaxed">
                        Cảm ơn bạn đã tin tưởng và mua sắm tại <strong>Toàn Phát</strong>. <br>
                        Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến tay bạn.
                    </p>
                </div>

                <div class="flex flex-wrap gap-4 mt-4">
                    <a href="/" class="bg-[#0E3A6B] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
                        <Home class="size-5" /> Về trang chủ
                    </a>
                    <a href="/products" class="bg-white text-[#0E3A6B] border border-[#0E3A6B] px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all flex items-center gap-2">
                        Tiếp tục mua sắm <ArrowRight class="size-5" />
                    </a>
                </div>
            </div>

        </div>

        <div class="lg:col-span-5">
            <div class="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-[#0E3A6B] relative overflow-hidden">
                
                <div class="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none">
                    <img src="/logo.png" alt="" class="w-64" />
                </div>

                <div class="flex justify-between items-start border-b border-dashed border-gray-300 pb-6 mb-6">
                    <div>
                        <h2 class="text-gray-400 text-xs uppercase tracking-widest mb-1">HÓA ĐƠN</h2>
                        <div class="text-2xl font-bold text-[#0E3A6B]">#{orderId}</div>
                        <div class="text-xs text-gray-500 mt-1">{orderDate}</div>
                    </div>
                    <div class="text-right">
                        <div class="flex items-center justify-end gap-1 text-[#0E3A6B] font-bold">
                            <img src="/assets/logocokhitoanphat.png" alt="Logo" class="h-10 w-auto" />
                        </div>
                        <div class="text-[10px] text-gray-400 mt-1">Cơ Khí Toàn Phát</div>
                    </div>
                </div>

                <div class="flex flex-col gap-4 mb-6">
                    <h3 class="font-bold text-gray-800 uppercase text-xs tracking-wide">Thông tin khách hàng</h3>
                    <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col gap-3 text-sm">
                        <div class="flex items-start gap-3">
                            <div class="mt-0.5 text-gray-400"><Package class="size-4" /></div>
                            <div>
                                <span class="font-bold text-gray-800 block">{checkout.info.name || "Khách hàng"}</span>
                                <span class="text-gray-500">{checkout.info.phone || "09xx xxx xxx"}</span>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="mt-0.5 text-gray-400"><MapPin class="size-4" /></div>
                            <span class="text-gray-600">
                                {checkout.info.address || "Địa chỉ chưa cập nhật"}, 
                                {checkout.info.ward}, {checkout.info.district}, {checkout.info.city}
                            </span>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="mt-0.5 text-gray-400"><CreditCard class="size-4" /></div>
                            <span class="text-gray-600">
                                {checkout.info.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="mb-6">
                    <h3 class="font-bold text-gray-800 uppercase text-xs tracking-wide mb-3">Chi tiết đơn hàng</h3>
                    <div class="flex flex-col gap-3">
                        {#each checkout.items as item}
                            <div class="flex justify-between items-start text-sm">
                                <div class="flex gap-3">
                                    <div class="font-bold text-[#0E3A6B] w-6">{item.quantity}x</div>
                                    <div class="text-gray-700 leading-tight">
                                        {item.name}
                                        <div class="text-xs text-gray-400 mt-0.5">Phân loại: Tiêu chuẩn</div>
                                    </div>
                                </div>
                                <div class="font-medium text-gray-900 text-right">
                                    {formatPrice(item.price * item.quantity)}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="border-t border-dashed border-gray-300 pt-4 flex flex-col gap-2 text-sm">
                    <div class="flex justify-between text-gray-600">
                        <span>Tạm tính</span>
                        <span>{formatPrice(subTotal)}</span>
                    </div>
                    <div class="flex justify-between text-gray-600">
                        <span>Phí vận chuyển</span>
                        <span>{formatPrice(checkout.info.shippingFee)}</span>
                    </div>
                    <div class="flex justify-between items-center pt-2 mt-2 border-t border-gray-100">
                        <span class="font-bold text-gray-800 text-base">Tổng thanh toán</span>
                        <span class="font-extrabold text-[#0E3A6B] text-2xl">{formatPrice(total)}</span>
                    </div>
                </div>

                <div class="mt-8 text-center">
                    <button onclick={() => window.print()} class="text-gray-400 hover:text-gray-600 text-xs flex items-center justify-center gap-1 transition-colors mx-auto">
                        <Printer class="size-4" /> In hóa đơn
                    </button>
                </div>

            </div>
        </div>

    </div>
</div>