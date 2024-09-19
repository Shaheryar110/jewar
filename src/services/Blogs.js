import { db } from "@/Firebase/Config";
import { addDoc, collection, getDocs } from "firebase/firestore";

export const AddBlog = async (data) => {
  await addDoc(collection(db, "Blogs"), data);
};

export const getAllBlogs = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "Blogs"));
  querySnapshot.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() });
  });
  return temp;
};
export const getBlogById = async (id) => {
  let temp = {};
  const querySnapshot = await getDocs(collection(db, "Blogs"));

  querySnapshot.forEach((doc) => {
    if (doc.id === id) {
      temp = { id: doc.id, ...doc.data() };
    }
  });
  return temp;
};
