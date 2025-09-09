import { createClient } from '@/utils/supabase/client'

export async function uploadProfileImage(file: File, userID: string){
    const supabase = createClient();
    try{
        const fileExtension = file.name.split(".").pop();
        const filePath = `${userID}.${fileExtension}`;
        const { data, error } = await supabase.storage
            .from('user_profile_images')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true, // overwrite if file with same name exists
            });
        if (error) throw error;

        // get public URL of uploaded image
        const {data: publicURL} = supabase.storage
            .from('user_profile_images')
            .getPublicUrl(filePath)

        return publicURL
    } catch(error:any){
        console.log('Error while updating user profile image:', error.message);
        return null
    }
}