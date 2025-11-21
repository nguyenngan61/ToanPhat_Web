<script lang="ts">
    import './layout.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';

    let { children } = $props();
</script>

<div class="h-dvh w-full flex flex-col overflow-hidden bg-surface-50-950 text-surface-950-50">
    
    <header class="flex-none z-10 shadow-md">
        <Header />
    </header>

    <main class="flex-1 overflow-y-auto p-4 scroll-smooth">
        {@render children()}
    </main>

    <footer class="flex-none z-50 bg-[#00305B]">
        <Footer />
    </footer>

</div>
