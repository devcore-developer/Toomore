import Hero from '@/components/home/Hero'
import FlavorShowcase from '@/components/home/FlavorShowcase'
import BestSeller from '@/components/home/BestSeller'
import MixedBoxes from '@/components/home/MixedBoxes'
import WhyToomore from '@/components/home/WhyToomore'
import StorySection from '@/components/home/StorySection'
import Features from '@/components/home/Features'
import Testimonials from '@/components/home/Testimonials'
import GiftingSection from '@/components/home/GiftingSection'
import FAQSection from '@/components/home/FAQSection'
import InstagramSection from '@/components/home/InstagramSection'
import FinalCTA from '@/components/home/FinalCTA'
import { adminDb } from '@/lib/firebase-admin'

// جلب البيانات من السيرفر مباشرة قبل إرسال الـ HTML للمتصفح
async function getCMSData() {
  try {
    const docSnap = await adminDb.doc('cms/content').get()
    return docSnap.exists ? docSnap.data() : {}
  } catch (error) {
    console.error('Failed to fetch CMS data on server:', error)
    return {}
  }
}

export default async function HomePage() {
  // البيانات تُجلب على السيرفر وتُحقن في الكمبوننتس (يمنع وميض الصور القديمة)
  const cmsData = await getCMSData()

  return (
    <>
      <Hero cmsData={cmsData} />
      <FlavorShowcase />
      <BestSeller cmsData={cmsData} />
      <MixedBoxes />
      <WhyToomore />
      <StorySection />
      <Features
        images={[
          '/images/step-pick-date.png',
          '/images/step-fill-it.png',
          '/images/step-coat-it.png',
          '/images/step-pack-it.png',
        ]}
      />
      <Testimonials />
      <GiftingSection cmsData={cmsData} />
      <FAQSection limit={5} />
      <InstagramSection />
      <FinalCTA />
    </>
  )
}