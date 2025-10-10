"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/features/Slice/UserSlice";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [checkIn, setCheckIn] = useState(false);
  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("Fetching...");
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("Unable to fetch"));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            if (data && data.display_name) {
              setLocation(data.display_name);
            } else {
              setLocation(`Lat: ${latitude}, Lng: ${longitude}`);
            }
          } catch {
            setLocation("Unable to fetch exact location");
          }
        },
        async () => {
          try {
            const res = await fetch("https://ipapi.co/json/");
            const data = await res.json();
            setLocation(`${data.city}, ${data.region}, ${data.country_name}`);
          } catch {
            setLocation("Unable to fetch");
          }
        }
      );
    }
  }, []);

  const handleCheckIn = (val) => {
    setCheckIn(val);
  };

  const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  function formatTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM"; 

    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Leading zero remove kiya
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  }

  const handleLogin = async (e) => {
    e.preventDefault();

   


    if(!email || !password || !ip || !location || !checkIn){
      toast.error("Please fill in all fields");
      return;
    }


    const payload = {
      email,
      password,
      checkIn,
      ip,
      location,
      date: formatDate(),
      time: formatTime(),
    };

    try {
     const res = await axios.post("/api/signin-employee", payload, {
  headers: { "Content-Type": "application/json" },
});

const data = res.data; 


      if (data.success) {
        toast.success("Login data sent successfully!");

      if(data.IsCompanyAdmin){
        router.push('/get-secret-code');
      }

      else if(data.IsSalesEmployee){
        router.push(`/sales/${data?.Company?.companyslug}`);
      }

      else{
        router.push('/all/employee/dashboard');
      }

    dispatch(loginSuccess(data.User))


    }
    } catch (error) {
      console.log(error);
      console.log("API Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email & password</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="checkin">Check In</Label>
              <Switch
                id="checkin"
                checked={checkIn}
                onCheckedChange={handleCheckIn}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit">Login</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
