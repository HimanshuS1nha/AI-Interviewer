"use client";

import { useState } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";

const UserVideo = () => {
  const router = useRouter();

  const [isCameraPermissionGiven, setIsCameraPermissionGiven] = useState(false);
  return (
    <div className="flex flex-col items-center gap-y-6 w-[40%]">
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-xl">
        <Webcam
          onUserMedia={() => setIsCameraPermissionGiven(true)}
          onUserMediaError={() => {
            setIsCameraPermissionGiven(false);
            toast.error("Camera permission is required.");
            router.back();
          }}
          mirrored
        />
      </div>

      <Button>
        <Mic size={20} color="white" />
        <p>Record Answer</p>
      </Button>
    </div>
  );
};

export default UserVideo;
