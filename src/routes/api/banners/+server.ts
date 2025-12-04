import { json } from '@sveltejs/kit';
import db from '$lib/db.json';

// FIX: Removed arguments.
export function GET() {
	return json(db.banners);
}
