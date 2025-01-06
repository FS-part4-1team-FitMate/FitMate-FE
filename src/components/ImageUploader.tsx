import { ic_profile_default_sm } from "@/imageExports";
import React, { ChangeEvent, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn;
}

const ImageUploader: React.FC<Props> = ({ register }: Props) => {
  const [imageSrc, setImageSrc] = useState<string>(ic_profile_default_sm.src);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <img
        src={imageSrc}
        alt="Profile Preview"
        className="w-[150px] h-[150px] rounded-3xl border-2 border-gray-300 object-cover mb-[10px]"
      />
      <br />
      <input
        id="profileImage"
        className="p-0 m-0 text-sm rounded-none"
        type="file"
        accept="image/*"
        {...register}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUploader;
