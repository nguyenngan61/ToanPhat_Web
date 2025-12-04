import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit'; // 1. Import Type
import db from '$lib/db.json';

// 2. Apply Type to argument
export function GET({ url }: RequestEvent) {
	const id = url.searchParams.get('id');

	if (id) {
		// Note: JSON Server usually returns an array when filtering by ID in query params
		// We mimic that behavior or find the specific item
		const article = db.news.find((n: any) => String(n.id) === String(id));

		// Return as array to match json-server behavior if desired, or single object
		// Based on your frontend code (data[0]), you expect an array.
		return json(article ? [article] : []);
	}

	return json(db.news);
}
