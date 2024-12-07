import supabaseClient from "@/utils/supabase";

  
 // Fetch Jobs
 export async function getJobs(token, { location, company_id, searchQuery }) {        //location ,company_id , SearchQuery are the filters actually 
   const supabase = await supabaseClient(token);
   let query = supabase                                               //     // jobs table  ka sara data select kiya query variable me 
     .from("jobs")
     .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");
 
   if (location) {
     query = query.eq("location", location);
   }
 
   if (company_id) {
     query = query.eq("company_id", company_id);
   }
 
   if (searchQuery) {
     query = query.ilike("title", `%${searchQuery}%`);
   }
 
   const { data, error } = await query;
 
   if (error) {
     console.error("Error fetching Jobs:", error);
     return null;
   }
 
   return data;
 }
 
 // Read Saved Jobs
 export async function getSavedJobs(token) {
   const supabase = await supabaseClient(token);
   const { data, error } = await supabase
     .from("saved_jobs")
     .select("*, job: jobs(*, company: companies(name,logo_url))");
 
   if (error) {
     console.error("Error fetching Saved Jobs:", error);
     return null;
   }
 
   return data;
 }
 

// i want recruiter to see all the job applications which r applied 
 export async function getSingleJob(token, { job_id }) {
    const supabase = await supabaseClient(token);
    let query = supabase
      .from("jobs")
      .select(
        "*, company: companies(name,logo_url), applications: applications(*)"
      )
      .eq("id", job_id)
      .single();    //bcz we will be fetching a single job so this single is applied now we wil get response in form of an array 

  
    const { data, error } = await query;
  
    if (error) {
      console.error("Error fetching Job:", error);
      return null;
    }
  
    return data;
  }
  

  // api for updating the job hiring status only if the job is open  ( only if user is recruiter)
  export async function updateHiringStatus(token,{job_id},isOpen) {
    const supabase = await supabaseClient(token);
    const { data, error } = await supabase
    .from("jobs")
    .update({isOpen})
    .eq("id", job_id).
    select();
  
    if (error) {
      console.error("Error updating jobs :", error);
      return null;
    }
  
    return data;
  }

    // get my created jobs
export async function getMyJobs(token, { recruiter_id }) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .select("*, company: companies(name,logo_url)")
      .eq("recruiter_id", recruiter_id);
  
    if (error) {
      console.error("Error fetching Jobs:", error);
      return null;
    }
  
    return data;
  }
  


  ////logic for posting a new job as a recruiter
  export async function addNewJob(token, _, jobData) {
    const supabase = await supabaseClient(token);
  
    const { data, error } = await supabase
      .from("jobs")
      .insert([jobData])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error Creating Job");
    }
  
    return data;
  }

  ///logic to save a job post by a candidate

  export async function saveJob(token, { alreadySaved }, saveData) {
    const supabase = await supabaseClient(token);
  
    if (alreadySaved) {
      // If the job is already saved, remove it
      const { data, error: deleteError } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id);
  
      if (deleteError) {
        console.error("Error removing saved job:", deleteError);
        return data;
      }
  
      return data;
    } else {
      // If the job is not saved, add it to saved jobs
      const { data, error: insertError } = await supabase
        .from("saved_jobs")
        .insert([saveData])
        .select();
  
      if (insertError) {
        console.error("Error saving job:", insertError);
        return data;
      }
  
      return data;
    }
  }
  

  export async function deleteJob(token, { job_id }) {
    const supabase = await supabaseClient(token);
  
    const { data, error: deleteError } = await supabase
      .from("jobs")
      .delete()
      .eq("id", job_id)
      .select();
  
    if (deleteError) {
      console.error("Error deleting job:", deleteError);
      return data;
    }
  
    return data;
  }
  