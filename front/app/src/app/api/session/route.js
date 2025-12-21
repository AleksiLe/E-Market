import { validateSession } from '@/app/lib/session';

export async function GET() {
  const valid = await validateSession();
  return Response.json({ valid });
}