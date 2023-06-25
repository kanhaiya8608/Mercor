import Dropdown from "./Dropdown";

function NavBar() {
    return (
        <div className='flex grow h-14 justify-end md:justify-between px-3 shadow-lg'>
       
        <div className="relative p-3 hidden sm:inline ">
          <div className="pointer-events-none absolute inset-y-0 left-5 flex items-center ">
            <span className="text-gray-500 sm:text-sm">   <img src="./assets/search-normal.svg" alt=""  /></span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className=" bg-gray-100 w-100 rounded border-0 py-1.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-00 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6 "
            placeholder="Search for anything..."
          />
    
        </div>
        <div className=" flex ml-auto">
        <div className="flex space-x-5 justify-between p-3 hidden sm:flex">
        <img src="./assets/calendar-2.svg" className="h-6" alt="" />
        <img src="./assets/message-question.svg" className="h-6" alt="" />
        <img src="./assets/notification.svg" className="h-6" alt="" />
      
        </div>
        <div className="p-3 space-x-5">
            <Dropdown/>
        </div>
        </div>
      </div>
    );
  }
  
  
  export default NavBar;

