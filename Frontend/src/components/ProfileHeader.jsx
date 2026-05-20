/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon, Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const mouseClickSound = new Audio("../../public/sounds/mouse-click.mp3")

const ProfileHeader = () => {
  const { logout, authUser, updateProfile,isUpdating } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if(!file.type.startsWith("image/")) {
      toast.error("Please Select an Image File")
      return;
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () =>{
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({profilePic:base64Image})
    }
  };

  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar online">
            <button
              className="size-14 rounded-full overflow-hidden relative group"
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={
                  selectedImg ||
                  authUser.profilePic ||
                  "../../public/avatar.png"
                }
                className="size-full object-cover"
                alt="User Img"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* USERNAME AND ONLINE TEXT */}

          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.fullName}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* Buttons */}

        <div className="flex gap-4 items-center">
          {/* LOGOUT BTN */}

          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND TOGGLE BTN */}

          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio Play Failed", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}  
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
