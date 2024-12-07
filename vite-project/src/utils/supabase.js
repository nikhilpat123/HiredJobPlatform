
import { createClient } from '@supabase/supabase-js';  //we will also install npm @supabase/supabase-js   bcz this will allow us to make api calls from our backend by writing the logic

 export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;



const supabaseClient = async (supabaseAccessToken) => {             //supabaseAccessToken is a token that we will pass everytime to see weather user is authorized or not
    const supabase = createClient(supabaseUrl, supabaseKey, {       //createClient function me basically supabaseUrl, supabaseKey need indono ki hi thi but hum clerk use kr rhe hain so we have to follow the syntax and pass token as third cariable
      global: {
         headers: {
             Authorization: `Bearer ${supabaseAccessToken}` } },
    });
    // set Supabase JWT on the client object,
    // so it is sent up with all Supabase requests
    return supabase;
  };

export default supabaseClient;
    

//we r using clerk for our user authentication 
         