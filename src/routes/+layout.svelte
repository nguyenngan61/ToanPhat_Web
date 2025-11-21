<script lang="ts">
    import './layout.css'; 
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let { children } = $props();
</script>

<div class="h-dvh w-full flex flex-col overflow-hidden bg-white">
    
    <header class="flex-none z-50 shadow-sm relative">
        <Header />
    </header>

    <main class="flex-1 overflow-y-auto scroll-smooth">
        {@render children()}
        <footer class="flex-none z-50 bg-[#00305B]">
            <Footer />
        </footer>
    </main>



</div>