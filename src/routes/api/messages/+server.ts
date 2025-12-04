import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ request }: RequestEvent) {
	const data = await request.json();
	console.log('Message Received:', data);
	return json({ success: true });
}
