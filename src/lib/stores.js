import { writable } from 'svelte/store';

// In a .js file, we don't use <Types>. Just use the empty array [].
export const checkoutItems = writable([]);
