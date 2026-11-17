import Hero from '../components/home/Hero'
import Highlights from '../components/home/Highlights'
import WhyFoco from '../components/home/WhyFoco'
import Personalize from '../components/home/Personalize'
import Pillars from '../components/home/Pillars'
import VideoSection from '../components/home/VideoSection'
import Compare from '../components/home/Compare'

/** Página inicial — as seções seguem a ordem dos anexos de referência. */
export default function Home() {
  return (
    <>
      <Hero />          {/* anexo 1 */}
      <Highlights />    {/* anexo 2 */}
      <WhyFoco />       {/* anexo 3 */}
      <Personalize />   {/* anexo 4 */}
      <Pillars />       {/* anexos 5 e 6 */}
      <VideoSection />  {/* anexo 7 */}
      <Compare />       {/* anexo 8 */}
    </>
  )
}
