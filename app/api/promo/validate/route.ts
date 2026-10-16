import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json()
    if (!code) return NextResponse.json({ valid: false, message: 'Invalid promo code.' }, { status: 400 })

    const promoRef = adminDb.collection('promo_codes').doc(code.toUpperCase().trim())
    const promoSnap = await promoRef.get()

    if (!promoSnap.exists) {
      return NextResponse.json({ valid: false, message: 'Invalid promo code.' }, { status: 404 })
    }

    const promo = promoSnap.data()!

    if (!promo.isActive) {
      return NextResponse.json({ valid: false, message: 'This promo code is currently inactive.' }, { status: 400 })
    }

    const now = new Date()
    if (promo.validFrom && new Date(promo.validFrom) > now) {
      return NextResponse.json({ valid: false, message: 'This promo code is not valid yet.' }, { status: 400 })
    }
    if (promo.validUntil && new Date(promo.validUntil) < now) {
      return NextResponse.json({ valid: false, message: 'This promo code has expired.' }, { status: 400 })
    }
    
    if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
      return NextResponse.json({ valid: false, message: `Your order does not meet the minimum amount required for this code (EGP ${promo.minOrderAmount}).` }, { status: 400 })
    }

    if (promo.maxUses && (promo.usedCount || 0) >= promo.maxUses) {
      return NextResponse.json({ valid: false, message: 'This promo code has reached its usage limit.' }, { status: 400 })
    }

    let discountAmount = (subtotal * (promo.discountValue / 100))
    if (promo.maxDiscountAmount && discountAmount > promo.maxDiscountAmount) {
      discountAmount = promo.maxDiscountAmount
    }
    discountAmount = Math.round(discountAmount)

    return NextResponse.json({
      valid: true,
      promo: {
        code: promo.code,
        discountValue: promo.discountValue,
        discountAmount,
        maxDiscountAmount: promo.maxDiscountAmount || 0 // إرجاع الحد الأقصى
      }
    })
  } catch (error) {
    console.error('Promo validation error:', error)
    return NextResponse.json({ valid: false, message: 'Error validating promo code.' }, { status: 500 })
  }
}