import { storage } from "@/Firebase/Config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
export const imageUpload = async (PropertyCover) => {
  try {
    let url = "";

    try {
      console.log(PropertyCover, " func");
      const imageName = PropertyCover.name;
      const folderName = "property/";
      const imageRef = ref(storage, folderName + imageName);
      const uploadBytesRes = await uploadBytes(imageRef, PropertyCover);
      url = await getDownloadURL(uploadBytesRes.ref);
      return url;
    } catch (error) {
      console.error("Image upload error:", error);
    }
  } catch (error) {
    console.error("Image upload error:", error);
  }
};
export const imageUploadBlog = async (blogCover) => {
  try {
    let url = "";

    try {
      const imageName = blogCover.name;
      const folderName = "blogs/";
      const imageRef = ref(storage, folderName + imageName);
      const uploadBytesRes = await uploadBytes(imageRef, blogCover);
      url = await getDownloadURL(uploadBytesRes.ref);
      return url;
    } catch (error) {
      console.error("Image upload error:", error);
    }
  } catch (error) {
    console.error("Image upload error:", error);
  }
};
