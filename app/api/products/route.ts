import { NextResponse } from 'next/server'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let q = collection(db, 'products')
    if (category && category !== 'all') {
      q = query(q, where('category', '==', category))
    }

    const snap = await getDocs(q)
    const products: any[] = []
    snap.forEach((doc) => products.push({ id: doc.id, ...doc.data() }))

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { products: [] },
      { status: 500 }
    )
  }
}