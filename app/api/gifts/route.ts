import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const giftRequest = {
    id: `GR-${Date.now().toString(36).toUpperCase()}`,
    ...body,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  // TODO: Save to database
  console.log('New gift request:', giftRequest)

  return NextResponse.json(
    { success: true, requestId: giftRequest.id },
    { status: 201 }
  )
}