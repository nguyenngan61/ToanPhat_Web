import { json } from '@sveltejs/kit';
import db from '$lib/db.json';

// FIX: Removed arguments. No need for ({ url }) here.
export function GET() {
	return json(db.locations);
}
