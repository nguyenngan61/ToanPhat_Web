<script lang="ts">
    import './layout.css'; 
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import { page } from '$app/stores';
    import { afterNavigate } from '$app/navigation';

    let { children } = $props();
    let isScrollableHeader = $derived($page.url.pathname === '/flash-sale');
    let mainContent: HTMLElement;

    afterNavigate(() => {
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'instant' });
        }
    });
</script>

<div class="h-dvh w-full flex flex-col overflow-hidden bg-white">
    
    {#if !isScrollableHeader}
        <header class="flex-none z-50 shadow-sm relative">
            <Header />
        </header>
    {/if}

    <main 
        bind:this={mainContent}
        class="flex-1 overflow-y-auto scroll-smooth"
    >
        
        {#if isScrollableHeader}
            <header class="w-full shadow-sm relative">
                <Header />
            </header>
        {/if}

        {@render children()}
    <footer class="flex-none z-50 bg-[#00305B]">
        <Footer />
    </footer>
    </main>
</div>