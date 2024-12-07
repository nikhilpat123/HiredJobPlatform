// import React, { useEffect } from 'react'
// import { Link,useSearchParams } from 'react-router-dom'
// import { Button } from './ui/button'
// import { SignInButton} from '@clerk/clerk-react'
// import { SignedIn } from '@clerk/clerk-react'
// import { SignedOut } from '@clerk/clerk-react'
// import { UserButton ,useUser} from '@clerk/clerk-react'
// import { SignIn } from '@clerk/clerk-react'
// import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
// import { useState } from 'react'

// const Header = () => {

//     const [showSignIn, setShowSignIn]=useState(false);
//     const [search , setSearch]=useSearchParams();

//     useEffect(()=>{
//         if(search.get("sign-in")){
//             setShowSignIn(true);
//         }
//     },[search])

//     const handleOverLayClick=(e)=>{
//         if(e.target=currentTarget){
//             setShowSignIn(false);
//             setSearch({});
//         }
//     }


//   return (
//     <>
//     <nav className='py-4 flex justify-between items-center'>
//         <Link>
//         <img src="/logo1png.png" className="h-20" />
//         </Link>
 
//         <div className="flex gap-8">

//        <SignedOut>
//        <Button variant="outline" onClick={(setShowSignIn(true))}>
//         Login</Button>
//       </SignedOut>
//       <SignedIn>       
//             {/* {user?.unsafeMetadata?.role === "recruiter" && ()} */}
//               <Link to="/post-job">
//                 <Button variant="destructive" className="rounded-full">   {/* i want to show post this job only when user is a recruiter so ive added a condition  */}
//                   <PenBox size={20} className="mr-2" />
//                   Post a Job
//                 </Button>
//               </Link>
           
//             <UserButton
//               appearance={{
//                 elements: {
//                   avatarBox: "w-10 h-10",
//                 },
//               }}
//             >
//               <UserButton.MenuItems>
//                 <UserButton.Link
//                   label="My Jobs"
//                   labelIcon={<BriefcaseBusiness size={15} />}
//                   href="/my-jobs"
//                 />
//                 <UserButton.Link
//                   label="Saved Jobs"
//                   labelIcon={<Heart size={15} />}
//                   href="/saved-jobs"
//                 />
//                 <UserButton.Action label="manageAccount" />
//               </UserButton.MenuItems>
//             </UserButton>
//           </SignedIn>
//         </div>
    
//     </nav>

//     {showSignIn &&  
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
//     onClick={handleOverLayClick}>               {/*i want ki jab mai signin wale card ke bahar click kru to  hum apne onboarding page pe waps chale jaye wo kaam mera hamd;eOverlayClick krega */}
//         <SignIn
//         signUpForcedRedirectUrl="/onboarding"    //this is very imp as the app will  redirect to any random url
//         FallBackRedirectUrl="/onboarding"
//         >
//         </SignIn>
//     </div>
//     }
//     </>
//   )
// }

// export default Header

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo1png.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (  //i want to show post a job button only when u r a recruiter so we will wrap thi button inside a condition`````           
              <Link to="/post-job">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
                <UserButton.Action label="manageAccount" />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;