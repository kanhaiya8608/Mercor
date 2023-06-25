import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { GoDotFill } from 'react-icons/go';
import { TbDots } from 'react-icons/tb';
import { RxDoubleArrowLeft } from 'react-icons/rx';

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const menuItems = [
    { text: 'Mobile App', color: '#7AC555' },
    { text: 'Website Redesign', color: '#FFA500' },
    { text: 'Design System', color: '#E4CCFD' },
    { text: 'Wireframes', color: '#76A5EA' },
  ];

  return (
    <div style={{ display: 'flex overflow-y-0 h-auto' }}>
      <Sidebar className="scrollbar-hide" style={{ color: '#787486' }} collapsed={collapsed}>
        <Menu className="py-3">
          <MenuItem
            icon={<img src="./assets/colorfilter.png" height={24} alt="Color Filter" />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ borderBottom: '0.5px solid #DBDBDB' }}
            suffix={<RxDoubleArrowLeft size={24} />}
          >
            <h2 className="text-slate-900 text-[20px] font-semibold">Project M.</h2>
          </MenuItem>
        </Menu>
        <div style={{ width: '90%', margin: '0 auto' }}>
          <Menu className="py-2 font-sm" style={{ borderBottom: '0.5px solid #DBDBDB' }}>
            <MenuItem icon={<img src="./assets/category.svg" alt="Home Icon" />}>Home</MenuItem>
            <MenuItem icon={<img src="./assets/message.svg" alt="Team Icon" />}>Team</MenuItem>
            <MenuItem icon={<img src="./assets/task-square.svg" height={20} alt="Contacts Icon" />}>Contacts</MenuItem>
            <MenuItem icon={<img src="./assets/profile-2user.svg" height={20} alt="Profile Icon" />}>Profile</MenuItem>
            <MenuItem icon={<img src="./assets/setting-2.svg" height={20} alt="Calendar Icon" />}>Calendar</MenuItem>
          </Menu>

          {!collapsed && (
            <div className="flex flex-row justify-between px-3 py-6">
              <p className="text-xs font-bold">MY PROJECTS</p>
              <img src="./assets/add-square.svg" alt="Add Icon" />
            </div>
          )}

          <Menu>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                className="w-100"
                icon={<GoDotFill color={item.color} />}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div className="inline w-[56px]">{item.text}</div>
                {hoveredItem === index && <TbDots size={20} className="inline ml-8" style={{ color: '#0D062D' }} />}
              </MenuItem>
            ))}
            {!collapsed && (
              <div className="p-2 lg:mt-5 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-200 s text-center   lg:flex lg:flex-col lg:justify-center lg:my-12">
                  <div className="-mt-14 mx-auto max-w-xs rounded-full bg-amber-100  content-center">
                    <img src="./assets/lamp-on.svg" alt="Lamp" className="h-6 m-6" />
                  </div>

                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-sm font-bold text-black mt-1">Thoughts Timer</p>
                    <p className="mt-6 text-xs leading-4 text-gray-500">
                      We don’t have any notice for you, till then you can share your thoughts with your peers.
                    </p>
                    <a
                      href="#"
                      className="my-5 block w-full rounded-md bg-white px-3 py-2 text-center text-sm font-semibold text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Write a message
                    </a>
                  </div>
                </div>
              </div>
            )}
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideBar;
