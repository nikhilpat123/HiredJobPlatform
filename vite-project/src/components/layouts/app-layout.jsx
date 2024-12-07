import Header from '../header';
import React from 'react'
import { Outlet } from 'react-router'
const AppLayout = () => {
  return (
    //     humare layout ke background me ek grid thi but wese koi css na tailwind me exist krti hai na hi shadcn me to uske liye we will be writing custom queries jo ki hum  app.css me likhenge 
      /*//outlet we get from react router dom yaha pe sare routes rendervhote ahin aur iske pass pass koi bhi code likho wo as alayout ayega screen pe */
    <div>       
        <div className='grid-background'></div>
        <main className="min-h-screen container">
          <Header/>
        <Outlet/> 
        </main>
    <div className="p-10 text-center bg-gray-800 mt-10">made with love by nikhil</div>
    </div>
  );
};

export default AppLayout;