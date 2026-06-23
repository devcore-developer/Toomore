import Hero from '@/components/home/Hero'
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

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSeller />
      <MixedBoxes />
      <WhyToomore />
      <StorySection />
      <Features />
      <Testimonials />
      <GiftingSection />
      <FAQSection />
      <InstagramSection />
      <FinalCTA />
    </>
  )
}