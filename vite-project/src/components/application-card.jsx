//this is basically the application which recruiter will see to ki apply hui hai ....... jo candidate dekhega kya job apply ki hai usne is different that we will design later

import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { updateApplicationStatus } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const ApplicationCard = ({ application, isCandidate = false }) => {  //appliction ko as application we will accept and isCandidate is false bcz agar  agar true hoga to resume download nhi kr payengeya issue ayega to we keep it flase by default
    const handleDownload = () => {
      const link = document.createElement("a");       //we created a new <a> tag link  
      link.href = application?.resume;
      link.target = "_blank";                        //target blank se that resume will open on another page
      link.click();                                  //so that we can simulate a click
    };


    const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
        updateApplicationStatus,
        {
          job_id: application.job_id,
        }
      );
    
      const handleStatusChange = (status) => {
        fnHiringStatus(status).then(() => fnHiringStatus());
      };

    return (
    <Card>
    {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
    <CardHeader>
      <CardTitle className="flex justify-between font-bold">
        {isCandidate                                               // if the user is candidate we will show me hobe tiyle at the company and if recruiter we will show him name of applicant
          ? `${application?.job?.title} at ${application?.job?.company?.name}`
          : application?.name}
        <Download
          size={18}
          className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
          onClick={handleDownload}
        />
      </CardTitle>
    </CardHeader>

    {/**now below thi downlaid icon i want to display more details of candidate */}
 
    <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness size={15} /> {application?.experience} years of
            experience
          </div>
          <div className="flex gap-2 items-center">
            <School size={15} />
            {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes size={15} /> Skills: {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>

      <CardFooter className="flex justify-between"> 
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status: {application.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>

  )
}

export default ApplicationCard