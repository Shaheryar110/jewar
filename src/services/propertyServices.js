import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../Firebase/Config";
import { query, where } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
export const addPropertyService = async (data) => {
  let user = auth?.currentUser?.uid;

  await addDoc(collection(db, "Property"), {
    userId: user,
    propertyFeilds: data,
  });
  const getUser = doc(db, "users", user);
  const snap = await getDoc(getUser);
  const data2 = snap.data();
  await updateDoc(doc(db, "users", user), {
    ...data2,
    latestUpdate: serverTimestamp(),
  });
};

export const getAllProperty = async (isFilter) => {
  //
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "Property"));
  querySnapshot.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() });
  });
  return isFilter
    ? temp.filter((data) => data.propertyFeilds.status === "Published")
    : temp;
};
export const getAllPropertyByUserId = async (uid, isFilter) => {
  let temp = [];
  if (uid) {
    const q = query(collection(db, "Property"), where("userId", "==", uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });
    console.log(temp, "temp");
    return isFilter
      ? temp.filter((data) => data.propertyFeilds.status === "Published")
      : temp;
  } else {
    return "Please Login First";
  }
};
export const getAllPropertyByUserIdInParameter = async (id, isFilter) => {
  let temp = [];
  if (id) {
    const q = query(collection(db, "Property"), where("userId", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp.push({ id: doc.id, ...doc.data() });
    });

    return isFilter
      ? temp.filter((data) => data.propertyFeilds.status === "Published")
      : temp;
  }
};
export const getDocByField = async (id) => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "Property"));

  querySnapshot.forEach((doc) => {
    if (doc.id === id) {
      temp.push({ id: doc.id, ...doc.data() });
    }
  });
  // return temp.filter((data) => data.propertyFeilds.status === "Published");
  return temp;
};
export const propertyByCities = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "Property"));
  querySnapshot.forEach((doc) => {
    temp.push(doc.data());
  });
  let objectsWithCity = temp
    .filter((data) => data.propertyFeilds.status === "Published")
    .filter((obj) => obj.propertyFeilds.hasOwnProperty("District"));

  let citiesArray = objectsWithCity.map(
    (obj) => obj.propertyFeilds?.District?.value
  );
  let cityCounts = new Map();

  citiesArray.forEach((city) => {
    cityCounts.set(city, (cityCounts.get(city) || 0) + 1);
  });

  let resultArray = Array.from(cityCounts, ([District, count]) => ({
    District,
    count,
  }));
  console.log(resultArray, "resultArray");
  return resultArray;
};

export const propertyCategoryCount = async () => {
  let Houses = [];
  let Apartment = [];
  let Office = [];
  let Villa = [];
  let Bungalow = [];
  const querySnapshot = await getDocs(collection(db, "Property"));
  querySnapshot.forEach((doc) => {
    if (
      doc.data().propertyFeilds.category[0].value === "Houses" &&
      doc.data().propertyFeilds.status === "Published"
    ) {
      Houses.push({ id: doc.id, ...doc.data() });
    }
    if (
      doc.data().propertyFeilds.category[0].value === "Apartments" &&
      doc.data().propertyFeilds.status === "Published"
    ) {
      Apartment.push({ id: doc.id, ...doc.data() });
    }
    if (
      doc.data().propertyFeilds.category[0].value === "Office" &&
      doc.data().propertyFeilds.status === "Published"
    ) {
      Office.push({ id: doc.id, ...doc.data() });
    }
    if (
      doc.data().propertyFeilds.category[0].value === "Villa" &&
      doc.data().propertyFeilds.status === "Published"
    ) {
      Villa.push({ id: doc.id, ...doc.data() });
    }
    if (
      doc.data().propertyFeilds.category[0].value === "Bungalow" &&
      doc.data().propertyFeilds.status === "Published"
    ) {
      Bungalow.push({ id: doc.id, ...doc.data() });
    }
  });
  let temp = {
    houses: {
      data: Houses,
      count: Houses.length,
    },
    apartment: {
      data: Apartment,
      count: Apartment.length,
    },
    office: {
      data: Office,
      count: Office.length,
    },
    Villa: {
      data: Villa,
      count: Villa.length,
    },
    Bungalow: {
      data: Bungalow,
      count: Bungalow.length,
    },
  };

  return temp;
};

export const updatePropertyById = async (id, data) => {
  let user = auth?.currentUser?.uid;
  const getUser = doc(db, "users", user);
  const snap = await getDoc(getUser);
  const data2 = snap.data();

  await updateDoc(doc(db, "users", user), {
    ...data2,
    latestUpdate: serverTimestamp(),
  });
  const washingtonRef = doc(db, "Property", id);
  await updateDoc(washingtonRef, data);
};

export const getPropertyByUidAndPid = async (uid, pid) => {
  const document = doc(db, "Property", pid);
  const data = await getDoc(document);

  if (data?.data()?.userId === uid) return data.data();
  else return false;
};

export const countOfEveryThing = async () => {
  let temp = [];
  let propertyLength = 0;
  let PublishPropertyLength = 0;
  let PendingPropertyLength = 0;
  let RejectedPropertyLength = 0;
  let featuredPropertyLength = 0;
  let PopularPropertyLength = 0;
  let totalViews = 0;
  const querySnapshot = await getDocs(collection(db, "Property"));
  querySnapshot.forEach((doc) => {
    temp.push({ id: doc.id, ...doc.data() });
    if (doc.data()?.propertyFeilds?.status === "Published") {
      PublishPropertyLength += 1;
    }
    if (doc.data()?.propertyFeilds?.status === "Pending") {
      PendingPropertyLength += 1;
    }
    if (doc.data()?.propertyFeilds?.status === "Rejected") {
      RejectedPropertyLength += 1;
    }
    if (doc.data()?.propertyFeilds?.isFeatured === "Yes") {
      featuredPropertyLength += 1;
    }
    if (doc.data()?.propertyFeilds?.isPopular === "Yes") {
      PopularPropertyLength += 1;
    }
    totalViews += Number(doc.data().views || 0);
  });
  propertyLength = temp.length;
  let response = {
    propertyLength: propertyLength,
    PublishPropertyLength: PublishPropertyLength,
    PendingPropertyLength: PendingPropertyLength,
    RejectedPropertyLength: RejectedPropertyLength,
    featuredPropertyLength: featuredPropertyLength,
    PopularPropertyLength: PopularPropertyLength,
    totalViews: totalViews,
  };
  return response;
};
