import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // TODO: Implement file upload (e.g., to S3 or local storage)
  return NextResponse.json(
    { success: false, message: 'Upload not implemented yet' },
    { status: 501 }
  )
}