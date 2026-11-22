import { NextResponse } from 'next/server'
import { getFlavors } from '@/lib/flavors-server'

// force-dynamic: النكهات لازم تتقرأ من قاعدة البيانات عند كل طلب.
// بدون هذا السطر Next.js يخزّن استجابة الـ GET وقت الـ build (static)،
// فتظهر نكهات قديمة في تخصيص البوكسات ولا تظهر النكهات الجديدة إلا بعد redeploy.
export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const flavors = await getFlavors()
  return NextResponse.json({ flavors })
}