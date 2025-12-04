import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit'; // 1. Import Type
import db from '$lib/db.json';

// 2. Apply Type
export function GET({ url }: RequestEvent) {
	const q = url.searchParams.get('q')?.toLowerCase();
	const category = url.searchParams.get('category');

	// Note: 'db' is imported as a module, so we access db.products directly if db.json is structured that way
	// If db.json is the root object containing "products", we use db.products
	let products = db.products;

	// Filter by Search Query
	if (q) {
		products = products.filter((p: any) => p.name.toLowerCase().includes(q));
	}

	// Filter by Category
	if (category) {
		const decodedCat = decodeURIComponent(category);
		products = products.filter((p: any) => p.category === decodedCat);
	}

	return json(products);
}
