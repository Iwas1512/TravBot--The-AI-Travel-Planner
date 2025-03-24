
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { chatSession } from '@/service/AIModal';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router';




function CreateTrip() {
  const [place, setplace] = useState();
  const [formData, SetFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate();
  const handleInputChange = (name, value) => {


    SetFormData({
      ...formData,
      [name]: value
    })

  }
  useEffect(() => {
    console.log(formData);


  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }


    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays) {
      toast("I need more details :( Make sure to fill all details")
      return;
    }
    
    // If i want to limit to max 5 days, add a separate check see comment below 
    if (formData?.noOfDays > 5) {
      toast("Please select 5 or fewer days for your trip")
      return;
    }


    //original below if above doesent work
    /*if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("I need more details :( Make sure to fill all details")

      return;
    }*/
   //this was my safe point if above did not work

      
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));

    const docId = Date.now().toString()
    // Add a new document in collection "cities"
    await setDoc(doc(db, "Travel-Planner", docId), {

      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail:user?.email,
      id: docId

    });
    setLoading(false);
    navigate('/view-trip/'+docId)
    


  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: `Applioation/json`
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preference :3 </h2>
      <p className='mt-3 text-gray-500 text-xl'>Provide some basic info, and our trip planner will do the job for you</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{ place, onChange: (v) => { setplace(v); handleInputChange('location', v) } }} />
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>
          How many days are you planning for your trip?</h2>
        <Input placeholder={'Ex.3'} type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}

        />


      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'> What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer  
            rounded-lg hover:shadow-lg
            ${formData?.budget == item.title && 'shadow-lg border-black'}
            
            `}>

              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg' >{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>


            </div>
          ))}
        </div>

      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'> Who do you plan to travel with?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveler', item.people)}

              className={`p-4 border cursor-pointer rounded-lg 
          hover:shadow-lg
          ${formData?.traveler == item.people && 'shadow-lg border-black'}

          
          `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg' >{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>


            </div>
          ))}
        </div>

      </div>
      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}

          onClick={OnGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'

          }

        </Button>

      </div>


      <Dialog open={openDialog}>

        <DialogContent>
          <DialogHeader>

            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication</p>

              <Button

                onClick={login}

                className='w-full mt-5 flex gap-4 items-center' >


                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>






    </div>
  )
}

export default CreateTrip