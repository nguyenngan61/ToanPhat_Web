import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit'; // 1. Import Type
import db from '$lib/db.json';

// 2. Apply Type to the argument
export function GET({ params }: RequestEvent) {
	const { id } = params;

	// Find product by ID (String comparison)
	// We use String() to be safe since params are always strings
	const product = db.products.find((p: any) => String(p.id) === String(id));

	if (product) {
		return json(product);
	}

	return new Response('Not Found', { status: 404 });
}
