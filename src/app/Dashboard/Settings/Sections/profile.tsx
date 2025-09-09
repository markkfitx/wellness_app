"use client"
import Link from "next/link"
import BioMarkdown from "@/components/ui/bioMarkdown"
import { useRef, ChangeEvent, useState, useTransition} from "react";
import { convertBlobToFile } from "@/utils/blob";
import { uploadProfileImage } from "@/utils/avatarUpdate";

export default function Profile(){
    const [imageUrl , setImageUrl] = useState<string>("")
    const profileImageRef = useRef<HTMLInputElement>(null);

    const [isPending, startTransition] = useTransition()
    const uploadImageToProfile = async () => {
        startTransition(async () => {
            const imageFile = await convertBlobToFile(imageUrl);
            // Upload image to storage bucket
            const {imageUrl, error} = await uploadProfileImage({
                file: imageFile,
                bucket: 'user_profile_images'
            });
            if(error) {
                console.log(error)
                return
            }

            imageUrl.push(imageUrl)
            setImageUrl("")
        })
    }
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newImageUrl = URL.createObjectURL(e.target.files[0]);
            setImageUrl(newImageUrl);
            uploadImageToProfile()
        }
    }
    return (
        <form className="mt-5 px3">
            <div className="grid grid-cols-12 gap-6">
                {/* Section Title */}
                <div className="md:col-span-4 col-span-12">
                    <h1 className="text-md font-bold">Profile</h1>
                    <p className="text-xs text-gray-700">Update your photo and personal details here.</p>
                </div>
                <div className="md:col-span-8 col-span-12"></div>
                <div className="col-span-12"><hr/></div>
                {/* Email */}
                <div className="md:col-span-4 col-span-12 flex items-center">
                    <label className="text-sm font-semibold">Email Address</label>
                </div>
                <div className="md:col-span-8 col-span-12">
                    <input
                    type="email"
                    name="userEmail"
                    placeholder="Email..."
                    className="flex h-9 w-full max-w-md rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                </div>
                <div className="col-span-12"><hr/></div>
                {/* Profile Image */}
                <div className="md:col-span-4 col-span-12 flex flex-col">
                    <label className="text-sm font-semibold">Profile Image</label>
                    <p className="text-xs text-gray-700">This will be displayed on your profile</p>
                </div>
                <div className="md:col-span-8 col-span-12 flex items-center justify-start gap-4">
                    <div className="flex items-center gap-6">
                    <img
                        src={imageUrl}
                        alt="Profile"
                        className="h-[4rem] w-[4rem] rounded-full border"
                    />
                    </div>
                    <div className="flex gap-3 text-xs">
                        <input type="file" hidden ref={profileImageRef} onChange={handleImageChange}/>
                        <Link href="" onClick={() => profileImageRef.current?.click()}>Update</Link>
                        <Link href="">Remove</Link>
                    </div>
                </div>
                <div className="col-span-12"><hr/></div>
                <div className="md:col-span-4 col-span-12">
                    <label htmlFor="" className="text-sm font-semibold">Bio</label>
                    <p className="text-xs text-gray-700">Write a short introduction about yourself</p>
                </div>
                <div className="md:col-span-8 col-span-12"><BioMarkdown /></div>
                <div className="col-span-12"><hr/></div>
            </div>
        </form>
    )
}