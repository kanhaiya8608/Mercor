
import Button from './Button'
import { RiFilterLine } from 'react-icons/ri';
import {CiCalendarDate} from 'react-icons/ci';
import {MdOutlineGroup} from 'react-icons/md';
function ButtonRow() {
  return (
    <div className='flex flex-col sm:flex-row items-center  justify-between mx-7'>
        <div className='flex items-center space-x-5 py-2'>
      <Button initialIcon={<RiFilterLine className="-mr-1 h-5 w-5" aria-hidden="true" />} buttonText="Filter" menuItems={['Item 1', 'Item 2']} />
      <Button initialIcon={<CiCalendarDate className="-mr-1 h-5 w-5" aria-hidden="true" />} buttonText="Today" menuItems={['Item 3', 'Item 4']} />
      </div>
      <div className='flex items-center space-x-5'>
      <button className="flex text-gray-500  justify-center gap-x-1.5 font-medium rounded-md  px-3 py-2 text-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"><MdOutlineGroup className='-mr-1 h-5 w-5'/>Share</button>
      <img className='w-3 h-8' src="./assets/vr.svg" alt="" />
      <img className='w-5 h-5' src="./assets/menu.png" alt="" />
      
      <img className='w-6 h-6' src="./assets/Bluebt.png" alt="" />
      </div>
    </div>
  )
}

export default ButtonRow
