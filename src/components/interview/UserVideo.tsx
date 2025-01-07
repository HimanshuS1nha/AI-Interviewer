import { Video } from "lucide-react";

const UserVideo = () => {
  return (
    <div className="flex flex-col items-center gap-y-6 w-[40%]">
      <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-xl">
        <div className="p-2 rounded-full bg-primary">
          <Video color="white" size={40} />
        </div>
      </div>
    </div>
  );
};

export default UserVideo;
