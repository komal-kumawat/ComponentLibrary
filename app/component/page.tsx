import Main from '@/app/component/components/Main';
import Navbar from '@/app/component/components/Navbar';
import Sidebar from '@/app/component/components/Sidebar';
import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <div className="flex flex-1 mt-10">
        {/* Sidebar */}
        <aside className="hidden md:flex md:w-[30%] lg:w-[20%] h-[100vh] overflow-y-auto border-r border-gray-800">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="w-full md:w-[70%] lg:w-[80%] h-full overflow-y-auto p-4">
          <Main />
        </main>
      </div>
    </div>
  );
};

export default Page;
