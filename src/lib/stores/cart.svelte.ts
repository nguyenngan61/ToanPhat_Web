import { browser } from '$app/environment';

class CartStore {
	items = $state<any[]>([]);

	// Derived values
	count = $derived(this.items.length);
	totalQuantity = $derived(this.items.reduce((sum, item) => sum + item.quantity, 0));
	totalMoney = $derived(this.items.reduce((sum, item) => sum + item.price * item.quantity, 0));

	constructor() {
		// 1. LOAD FROM LOCAL STORAGE ON START
		if (browser) {
			const stored = localStorage.getItem('toanphat_cart');
			if (stored) {
				try {
					this.items = JSON.parse(stored);
				} catch (e) {
					console.error('Error loading cart', e);
				}
			}
		}
	}

	// 2. SAVE HELPER
	save() {
		if (browser) {
			localStorage.setItem('toanphat_cart', JSON.stringify(this.items));
		}
	}

	add(product: any, quantity: number) {
		this.items.push({
			...product,
			quantity,
			id: Date.now() + Math.random()
		});
		this.save(); // Save after adding
	}

	remove(id: number) {
		this.items = this.items.filter((item) => item.id !== id);
		this.save(); // Save after removing
	}

	updateQuantity(id: number, change: number) {
		const item = this.items.find((i) => i.id === id);
		if (item) {
			const newQty = item.quantity + change;
			if (newQty > 0) {
				item.quantity = newQty;
				this.save(); // Save after update
			}
		}
	}
}

export const cart = new CartStore();
