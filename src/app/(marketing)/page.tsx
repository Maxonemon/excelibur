import ClientSection from '~/src/components/landing/client-section'
import CallToActionSection from '~/src/components/landing/cta-section'
import HeroSection from '~/src/components/landing/hero-section'
import PricingSection from '~/src/components/landing/pricing-section'
import Particles from '~/src/components/ui/particles'
import { SphereMask } from '~/src/components/ui/sphere-mask'

export default async function Page() {
   return (
      <>
         <HeroSection />
         <ClientSection />
         <SphereMask />
         <PricingSection />
         <CallToActionSection />
         <Particles
            className="absolute inset-0 -z-10"
            quantity={50}
            ease={70}
            size={0.05}
            staticity={40}
            color="#ffffff"
         />
      </>
   )
}
