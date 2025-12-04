import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit'; // 1. Import Type

// 2. Apply Type
export async function POST({ request }: RequestEvent) {
	const data = await request.json();
	console.log('Order Received:', data);

	// Return fake success (since Vercel is read-only)
	return json({ success: true, id: Date.now() });
}
