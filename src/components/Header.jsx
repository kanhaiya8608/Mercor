import { FiLink2 } from 'react-icons/fi';
import { PiPencilSimpleBold } from 'react-icons/pi';

const Header = () => {
  return (
    <div className="flex sm:flex-row justify-between flex-col">
      <div className="flex m-7 items-baseline sm:flex-row">
        <h2 className="text-4xl font-semibold sm:text-5xl">Mobile App</h2>
        <button className="text-indigo-600 bg-indigo-300 rounded-lg w-6 h-6 m-3">
          <PiPencilSimpleBold className="m-1" />
        </button>
        <button className="text-indigo-600 bg-indigo-300 rounded-lg w-6 h-6 m-3">
          <FiLink2 className="m-1" />
        </button>
      </div>
      <div className="flex m-7 items-center justify-center sm:flex-row">
        <button className="text-indigo-600 bg-indigo-300 rounded-lg w-5 h-5 mr-2">+</button>
        <p className="text-indigo-600 pr-2">Invite</p>
        <img
          src="/assets/collaborators/Ellipse12.png"
          className="z-0 w-8 h-8 rounded-full border-2 border-white"
        />
        <img
          src="/assets/collaborators/Ellipse13.png"
          className="z-10 w-8 h-8 -ml-2 rounded-full border-2 border-white"
        />
        <img
          src="/assets/collaborators/Ellipse14.png"
          className="z-20 w-8 h-8 -ml-2 rounded-full border-2 border-white"
        />
        <img
          src="/assets/collaborators/Ellipse15.png"
          className="z-30 w-8 h-8 -ml-2 rounded-full border-2 border-white"
        />
        <div className="z-30 w-8 h-8 -ml-2 flex items-center justify-center text-center rounded-full border-2 bg-red-200 text-red-500 border-white">
          +2
        </div>
      </div>
    </div>
  );
};

export default Header;
