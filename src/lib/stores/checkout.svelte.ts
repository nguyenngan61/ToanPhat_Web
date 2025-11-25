import { browser } from '$app/environment';

class CheckoutStore {
	// 1. Items (Products)
	items = $state<any[]>([]);

	// 2. Info (Customer Details)
	// We initialize with empty strings so the Success page doesn't error out
	info = $state({
		name: '',
		phone: '',
		city: '',
		district: '',
		ward: '',
		address: '',
		note: '',
		paymentMethod: 'cod',
		shippingFee: 35000,
		discountPercent: 0,
		couponCode: ''
	});

	constructor() {
		if (browser) {
			const stored = localStorage.getItem('toanphat_checkout');
			if (stored) {
				try {
					const data = JSON.parse(stored);
					this.items = data.items || [];
					if (data.info) this.info = { ...this.info, ...data.info }; // Merge saved data
				} catch (e) {
					console.error(e);
				}
			}
		}
	}

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

	updateInfo(newInfo: any) {
		this.info = { ...this.info, ...newInfo };
		this.save();
	}
}

export const checkout = new CheckoutStore();
