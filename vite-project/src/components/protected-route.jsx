import { useUser } from '@clerk/clerk-react';
import { useLocation } from "react-router";
import { Navigate } from "react-router";
  
// if the user is not logged in we dont want user to get on any othrt route we want him to go on onborading pafge ya fo=ir signip page wo koi ai=ur route na acces kr paye we we have to protect our routes
//to achieve we get bunch on hookks from clert auth

 
const ProtectedRoute = ({children}) => {

    const{isSignedIn ,user, isLoaded}=useUser();
    const {pathname}=useLocation();

    if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
        return <Navigate to="/?sign-in=true" />;
      }
    
      if (
        user !== undefined &&
        !user?.unsafeMetadata?.role &&
        pathname !== "/onboarding"
      )
        return <Navigate to="/onboarding" />;
    
      return children;


  // but ek kaam baki hai jo onBoarding status pe depnd krega ki user kisi route pe jayega agar wo ek recruiter haki ya jon seeker hai
  //if user has not onboraded sucessfully anad trying to go to any other route then we have to send him back to boraded back


}

export default ProtectedRoute