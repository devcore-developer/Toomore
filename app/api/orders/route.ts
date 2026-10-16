import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/db'
import { generateOrderId } from '@/lib/utils'
import { FieldValue } from 'firebase-admin/firestore'
import { CMS_DEFAULTS } from '@/lib/cms-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { items, promoCode } = body

    // 1. Server-side validation for flavors and subtotal
    let subtotal = 0
    
    // جلب النكهات المتاحة من الـ CMS للتحقق منها
    const cmsSnap = await adminDb.collection('cms').get()
    let validFlavors: string[] = []
    
    cmsSnap.forEach((doc) => {
      const data = doc.data()
      if (doc.id === 'flavors' || data.id === 'flavors') {
        const flavors = data.items || data.flavors || []
        validFlavors = flavors.map((f: any) => typeof f === 'string' ? f.toUpperCase() : f.name?.toUpperCase())
      } else if (data.flavors && Array.isArray(data.flavors)) {
        const flavors = data.flavors
        validFlavors = flavors.map((f: any) => typeof f === 'string' ? f.toUpperCase() : f.name?.toUpperCase())
      }
    })
    
    if (validFlavors.length === 0) {
      validFlavors = (CMS_DEFAULTS.flavors || []).map((f: any) => typeof f === 'string' ? f.toUpperCase() : f.name?.toUpperCase())
    }

    for (const item of items) {
      subtotal += item.price * item.quantity
      
      // Verify flavor counts and availability for mixed boxes
      if (item.category === 'mixed' && item.pieces) {
        if (!item.flavors || item.flavors.length !== item.pieces * item.quantity) {
          return NextResponse.json(
            { success: false, message: `Flavor selection count for ${item.name} is invalid.` },
            { status: 400 }
          )
        }
        
        // التحقق من أن النكهات المختارة متاحة وموجودة
        const invalidFlavors = item.flavors.filter((f: string) => !validFlavors.includes(f.toUpperCase()))
        if (invalidFlavors.length > 0) {
          return NextResponse.json(
            { success: false, message: `Invalid flavor selected: ${invalidFlavors.join(', ')}` },
            { status: 400 }
          )
        }
      }
    }

    // 2. Validate Promo Code and calculate discount securely
    let discountAmount = 0
    let appliedPromoData = null
    let finalTotal = subtotal

    if (promoCode) {
      const promoRef = adminDb.collection('promo_codes').doc(promoCode.toUpperCase().trim())
      const promoSnap = await promoRef.get()

      if (!promoSnap.exists || !promoSnap.data()?.isActive) {
        return NextResponse.json(
          { success: false, message: 'Invalid or inactive promo code.' },
          { status: 400 }
        )
      }

      const promo = promoSnap.data()!
      const now = new Date()
      
      if (promo.validFrom && new Date(promo.validFrom) > now) {
        return NextResponse.json({ success: false, message: 'Promo code not valid yet.' }, { status: 400 })
      }
      if (promo.validUntil && new Date(promo.validUntil) < now) {
        return NextResponse.json({ success: false, message: 'Promo code expired.' }, { status: 400 })
      }
      if (promo.minOrderAmount && subtotal < promo.minOrderAmount) {
        return NextResponse.json({ success: false, message: 'Order does not meet minimum amount.' }, { status: 400 })
      }
      if (promo.maxUses && (promo.usedCount || 0) >= promo.maxUses) {
        return NextResponse.json({ success: false, message: 'Promo code usage limit reached.' }, { status: 400 })
      }

      discountAmount = (subtotal * (promo.discountValue / 100))
      if (promo.maxDiscountAmount && discountAmount > promo.maxDiscountAmount) {
        discountAmount = promo.maxDiscountAmount
      }
      discountAmount = Math.round(discountAmount)
      finalTotal = subtotal - discountAmount

      appliedPromoData = {
        code: promo.code,
        discountValue: promo.discountValue,
        discountAmount: discountAmount,
        originalSubtotal: subtotal
      }

      await promoRef.update({ usedCount: FieldValue.increment(1) })
    }

    const order = {
      ...body,
      subtotal,
      promoCode: appliedPromoData,
      total: finalTotal,
      id: generateOrderId(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    const docRef = await adminDb.collection('orders').add(order)
    
    const savedOrder = {
      ...order,
      id: docRef.id
    }

    return NextResponse.json(
      { success: true, orderId: docRef.id, order: savedOrder },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 }
      )
    }

    await adminDb.collection('orders').doc(id).delete()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Order deletion error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete order' },
      { status: 500 }
    )
  }
}