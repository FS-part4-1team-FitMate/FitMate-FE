import { ic_profile_default_sm } from "@/imageExports";
import React, { ChangeEvent, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { profile_menu } from "@/types/constants";

interface Props {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  defImage?: string;
  width?: number;
  height?: number;
  className?: string;
}

const ImageUploader: React.FC<Props> = ({
  id,
  label,
  register,
  defImage = ic_profile_default_sm.src,
  width = 150,
  height = 150,
  className,
}: Props) => {
  const [imageSrc, setImageSrc] = useState<string>(defImage);

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
    <div className={profile_menu}>
      <label htmlFor={id} className="text-lg font-semibold">
        {label}
      </label>
      <div>
        <img
          src={imageSrc}
          alt="Profile Preview"
          width={width}
          height={height}
          className={`${className ? className + " " : ""}rounded-full border-2 border-gray-300 object-cover mb-[10px]`}
        />
        <br />
        <input
          id={id}
          className="p-0 m-0 text-sm rounded-none"
          type="file"
          accept=".webp, .jpg, .jpeg, .png, image/webp, image/jpg, image/jpeg, image/png"
          {...register}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
