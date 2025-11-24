import { browser } from '$app/environment';

class CheckoutStore {
	items = $state<any[]>([]);

	// NEW: Customer Info State
	info = $state({
		name: '',
		phone: '',
		city: '',
		district: '',
		ward: '',
		address: '', // Specific street address/note
		paymentMethod: 'cod',
		shippingFee: 35000
	});

	constructor() {
		if (browser) {
			const stored = localStorage.getItem('toanphat_checkout');
			if (stored) {
				try {
					const data = JSON.parse(stored);
					this.items = data.items || [];
					// Load info if exists
					if (data.info) this.info = data.info;
				} catch (e) {
					console.error(e);
				}
			}
		}
	}

	// Save Items AND Info
	save() {
		if (browser) {
			localStorage.setItem(
				'toanphat_checkout',
				JSON.stringify({
					items: this.items,
					info: this.info
				})
			);
		}
	}

	setItems(products: any[]) {
		this.items = products;
		this.save();
	}

	// Update Info
	updateInfo(newInfo: any) {
		this.info = { ...this.info, ...newInfo };
		this.save();
	}
}

export const checkout = new CheckoutStore();
