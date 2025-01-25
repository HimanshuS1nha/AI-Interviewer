"use client";

import { useState } from "react";
import Webcam from "react-webcam";
import { Mic } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useSpeechToText from "react-hook-speech-to-text";

import { Button } from "../ui/button";

const UserVideo = ({
  answer,
  setAnswer,
}: {
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();

  const {
    error,
    interimResult,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [isCameraPermissionGiven, setIsCameraPermissionGiven] = useState(false);

  const stopListening = () => {
    if (interimResult) {
      setAnswer(interimResult);
    }

    stopSpeechToText();
  };

  if (error) {
    toast.error(
      "Your browser does not support text to speech. Please use a different browser (Google Chrome recommended)"
    );
    router.back();
    return null;
  }
  return (
    <div className="flex flex-col-reverse lg:flex-col items-center gap-y-6 w-[98%] sm:w-[90%] lg:w-[40%]">
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

      <Button
        onClick={() => (isRecording ? stopListening() : startSpeechToText())}
        variant={isRecording ? "destructive" : "default"}
        disabled={isCameraPermissionGiven}
      >
        {isRecording ? (
          "Stop Recording"
        ) : (
          <>
            <Mic size={20} color="white" />
            <p>Record Answer</p>
          </>
        )}
      </Button>
      {!isRecording && answer.length !== 0 && (
        <Button
          variant={"destructive"}
          onClick={() => setAnswer("")}
          disabled={!isCameraPermissionGiven}
        >
          Remove answer
        </Button>
      )}
    </div>
  );
};

export default UserVideo;
