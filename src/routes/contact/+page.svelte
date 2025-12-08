<script lang="ts">
	import { MapPin, Phone, Mail, Send, CheckCircle, X } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';

    let name = $state('');
    let email = $state('');
    let phone = $state('');
    let subject = $state('');
    let message = $state('');
    let showSuccessPopup = $state(false);

    async function handleSubmit(e: Event) {
        e.preventDefault();
        
        const messageData = {
            name, email, phone, subject, message,
            date: new Date().toISOString()
        };

        try {
            // POST request to save message
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(messageData)
            });

            if (res.ok) {
                showSuccessPopup = true;
                // Reset form
                name = ''; email = ''; phone = ''; subject = ''; message = '';
                setTimeout(() => { showSuccessPopup = false; }, 5000);
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi kết nối server.");
        }
    }
</script>

<div class="min-h-screen bg-white py-12 relative">
    <div class="w-[85%] mx-auto">
        
        <h1 class="text-[#0E3A6B] font-extrabold text-3xl text-center mb-10 uppercase">
            Liên Hệ Với Chúng Tôi
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div class="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm border border-gray-100 h-full justify-center">
                <div class="size-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm"><MapPin class="size-7 text-[#0E3A6B]" /></div>
                <h3 class="font-bold text-base text-[#0E3A6B] mb-1">Địa chỉ trụ sở</h3>
                <p class="text-sm text-gray-600 leading-relaxed px-4">Số 37 lô 5 – Khu công nghiệp Duyên Thái – Thường Tín – Hà Nội</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm border border-gray-100 h-full justify-center">
                <div class="size-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm"><Phone class="size-7 text-[#0E3A6B]" /></div>
                <h3 class="font-bold text-base text-[#0E3A6B] mb-1">Điện thoại</h3>
                <p class="text-gray-600 text-sm"><a href="tel:0965060363" class="hover:underline">0965.060.363</a></p>
            </div>
            <div class="bg-gray-50 rounded-xl p-5 flex flex-col items-center text-center shadow-sm border border-gray-100 h-full justify-center">
                <div class="size-14 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm"><Mail class="size-7 text-[#0E3A6B]" /></div>
                <h3 class="font-bold text-base text-[#0E3A6B] mb-1">Email</h3>
                <p class="text-sm text-gray-600"><a href="mailto:info@toanphat.com" class="hover:underline">info@toanphat.com</a></p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            <div class="rounded-xl overflow-hidden shadow-md h-full min-h-[450px] relative border border-gray-200">
                <iframe 
                    title="Google Map"
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    class="absolute inset-0"
                    src="https://maps.google.com/maps?q=Khu%20c%C3%B4ng%20nghi%E1%BB%87p%20Duy%C3%AAn%20Th%C3%A1i&t=&z=15&ie=UTF8&iwloc=&output=embed"
                ></iframe>
            </div>

            <div class="bg-gray-50 rounded-xl p-8 shadow-md border border-gray-100">
                <div class="mb-6 text-center">
                    <h2 class="text-xl font-bold text-[#0E3A6B] mb-2">Gửi tin nhắn cho chúng tôi</h2>
                    <p class="text-sm text-gray-600">Hãy bắt đầu bằng một cuộc trò chuyện với chúng tôi, mọi mong muốn của bạn sẽ được lắng nghe.</p>
                </div>

                <form onsubmit={handleSubmit} class="flex flex-col gap-5"> <div class="relative">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-xs text-gray-500 ml-3 bg-gray-50 px-1 absolute -top-2 left-0 z-10">Họ và tên</label>
                        <input type="text" bind:value={name} required class="w-full border text-black border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#0E3A6B] focus:ring-1 focus:ring-[#0E3A6B] bg-transparent relative z-0" />
                    </div>

                    <div class="relative">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-xs text-gray-500 ml-3 bg-gray-50 px-1 absolute -top-2 left-0 z-10">Email</label>
                        <input type="email" bind:value={email} required class="w-full border text-black border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#0E3A6B] focus:ring-1 focus:ring-[#0E3A6B] bg-transparent relative z-0" />
                    </div>

                    <div class="relative">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-xs text-gray-500 ml-3 bg-gray-50 px-1 absolute -top-2 left-0 z-10">Số điện thoại</label>
                        <input type="tel" bind:value={phone} required class="w-full border text-black border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#0E3A6B] focus:ring-1 focus:ring-[#0E3A6B] bg-transparent relative z-0" />
                    </div>

                    <div class="relative">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-xs text-gray-500 ml-3 bg-gray-50 px-1 absolute -top-2 left-0 z-10">Tiêu đề</label>
                        <input type="text" bind:value={subject} required class="w-full border text-black border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#0E3A6B] focus:ring-1 focus:ring-[#0E3A6B] bg-transparent relative z-0" />
                    </div>

                    <div class="relative">
                        <!-- svelte-ignore a11y_label_has_associated_control -->
                        <label class="text-xs text-gray-500 ml-3 bg-gray-50 px-1 absolute -top-2 left-0 z-10">Nội dung</label>
                        <textarea bind:value={message} rows="5" required class="w-full border text-black border-gray-300 rounded-md px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#0E3A6B] focus:ring-1 focus:ring-[#0E3A6B] bg-transparent relative z-0"></textarea>
                    </div>

                    <button type="submit" class="bg-[#0E3A6B] text-white font-bold px-6 py-3 rounded-md hover:bg-[#0c2e54] transition-colors flex items-center justify-center gap-2 mt-2 group">
                        Gửi <Send class="size-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>
            </div>
        </div>
    </div>

    {#if showSuccessPopup}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" transition:fade={{ duration: 200 }} onclick={() => showSuccessPopup = false}>
            <div class="bg-white rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl" transition:scale={{ duration: 250, start: 0.9 }} onclick={(e) => e.stopPropagation()}>
                <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors" onclick={() => showSuccessPopup = false}><X class="size-6" /></button>
                <div class="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle class="size-10 text-green-600" /></div>
                <h3 class="text-2xl font-bold text-[#0E3A6B] mb-4">Gửi thành công!</h3>
                <p class="text-gray-600 leading-relaxed mb-6">Cảm ơn bạn đã quan tâm, <strong class="text-[#0E3A6B]">Toàn Phát</strong> đã ghi nhận yêu cầu của bạn và sẽ liên hệ lại trong thời gian sớm nhất.</p>
                <button class="bg-[#0E3A6B] text-white font-bold px-8 py-3 rounded-full hover:bg-[#0c2e54] transition-colors w-full" onclick={() => showSuccessPopup = false}>Đóng</button>
            </div>
        </div>
    {/if}
</div>