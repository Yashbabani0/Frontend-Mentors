import Designedforthefuture from './Components/Designedforthefuture'
import Footer from './Components/Footer'
import Freeopensimple from './Components/Freeopensimple'
import Hero from './Components/Hero'
import StateoftheartInfrastructure from './Components/StateoftheartInfrastructure'

export default function App() {
  return (
    <div className='bg-white overflow-hidden'>
      <Hero />
      <Designedforthefuture />
      <StateoftheartInfrastructure />
      <Freeopensimple />
      <Footer />
    </div>
  )
}
