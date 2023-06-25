import { FiLink2 } from 'react-icons/fi'
import {PiPencilSimpleBold} from 'react-icons/pi'
const Header = () => {
  return (
    <div className='flex flex-col m-7 align-baseline sm:flex-row'>
      <h2 className='text-5xl font-semibold'>Mobile App</h2>
      <button className="text-indigo-600 bg-indigo-300 rounded-lg w-6 h-6 m-3"><PiPencilSimpleBold className='m-1'/></button>
      <button className="text-indigo-600 bg-indigo-300 rounded-lg w-6 h-6 place-content-center m-3"><FiLink2 className='m-1'/></button>
    </div>
  )
}

export default Header
