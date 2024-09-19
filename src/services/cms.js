import { db } from "@/Firebase/Config";
import { addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const getCmsData = async (name) => {
  const docRef = doc(db, "Cms", name);

  try {
    const docs = await getDoc(docRef);
    const data = docs.data();
    return data;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};

export const updateData = async (form, docName) => {
  const docRef = doc(db, "Cms", docName);

  try {
    const docs = await updateDoc(docRef, form);

    return docs;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};

export const Add = async (form, ) => {
  const docRef = doc(db, "Cms", "CmsDataHome");

  try {
    const docs = await setDoc(docRef, form);

    return docs;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};
export const getCmsMainData = async (docName) => {
  const docRef = doc(db, "Cms", docName);

  try {
    const docs = await getDoc(docRef);
    const data = docs.data();
    return data;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};
export const getCmsDistricts = async () => {
  const docRef = doc(db, "Cms", "districtsData");
  try {
    const docs = await getDoc(docRef);
    const data = docs.data();
    return data;
  } catch (error) {
    console.log(error, "error");
    return error;
  }
};

// export const addAnimites = async () => {
//   const amenitiesData = [
//     { label: "Attic", defaultChecked: false },
//     { label: "Basketball court", defaultChecked: false },
//     { label: "Air Conditioning", defaultChecked: false },
//     { label: "Lawn", defaultChecked: false },
//     { label: "Swimming Pool", defaultChecked: false },
//     { label: "Barbeque", defaultChecked: false },
//     { label: "Microwave", defaultChecked: false },
//     { label: "TV Cable", defaultChecked: false },
//     { label: "Dryer", defaultChecked: false },
//     { label: "Outdoor Shower", defaultChecked: false },
//     { label: "Washer", defaultChecked: false },
//     { label: "Gym", defaultChecked: false },
//     { label: "Ocean view", defaultChecked: false },
//     { label: "Private space", defaultChecked: false },
//     { label: "Lake view", defaultChecked: false },
//     { label: "Wine cellar", defaultChecked: false },
//     { label: "Front yard", defaultChecked: false },
//     { label: "Refrigerator", defaultChecked: false },
//     { label: "WiFi", defaultChecked: false },
//     { label: "Laundry", defaultChecked: false },
//     { label: "Sauna", defaultChecked: false },
//   ];
//   await setDoc(doc(db, "Cms", "amenities"), {
//     amenitiesData: amenitiesData,
//   });
// };

export const getAnemeites = async () => {
  let temp = [];
  const docRef = doc(db, "Cms", "amenities");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    temp = docSnap.data().amenitiesData;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return temp;
};

export const updateAmenities = async (obj) => {
  const washingtonRef = doc(db, "Cms", "amenities");

  await updateDoc(washingtonRef, {
    amenitiesData: obj,
  });
};
