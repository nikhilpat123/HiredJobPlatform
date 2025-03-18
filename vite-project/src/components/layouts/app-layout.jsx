import Header from "../header";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="grid-background w-full"></div>
      <main className="container mx-auto px-4">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-gray-800 mt-10 w-full">
        made with love by nikhil
      </div>
    </div>
  );
};

export default AppLayout;
