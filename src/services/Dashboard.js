import { db } from "@/Firebase/Config";
import {
  collection,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export const calulateTotalView = async (id) => {
  let count = 0;
  const q = query(collection(db, "Property"), where("userId", "==", id));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    count += doc.data().views;
  });
  return count;
};

export const calculateTotalReviewCount = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "Property"));
  querySnapshot.forEach((doc) => {
    temp.push(doc.data());
  });
  let tempReview = [];
  const querySnapshotReview = await getDocs(collection(db, "Reviews"));
  querySnapshotReview.forEach((doc) => {
    tempReview.push(doc.data());
  });

  const matchedReviews = [];

  temp.forEach((tempItem) => {
    const matchingReview = tempReview.find(
      (reviewItem) => reviewItem.userId === tempItem.userId
    );

    if (matchingReview) {
      matchedReviews.push(matchingReview);
    }
  });
  return matchedReviews.length;
};
export const getUserByIdAndAddFvrtInuser = async (id, propertyId) => {
  const q = query(collection(db, "users"), where("userId", "==", id));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (docs) => {
    const washingtonRef = doc(db, "users", docs.id);

    const userData = docs.data();
    if (userData.favrtProperty) {
      // 'favrtProperty' field exists, update it with propertyId
      const updatedFavrtProperty = [...userData.favrtProperty, propertyId];
      await updateDoc(washingtonRef, {
        favrtProperty: updatedFavrtProperty,
      });
    } else {
      // 'favrtProperty' field doesn't exist, create it with propertyId
      await setDoc(
        washingtonRef,
        {
          favrtProperty: [propertyId],
        },
        { merge: true }
      );
    }
  });
};
export const getUserByfavrtProperty = async (id) => {
  let filtertemp = [];
  const q = query(collection(db, "users"), where("userId", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if (doc.data().favrtProperty) {
      filtertemp.push(doc.data().favrtProperty);
    }
  });
  const resultArray = [];

  // Iterate over each array of property IDs
  for (const propertyIdsArray of filtertemp) {
    const propertyDetailsArray = [];

    // Iterate over each property ID and fetch corresponding documents
    for (const propertyId of propertyIdsArray) {
      const propertyQuery = await getDocs(collection(db, "Property"));

      propertyQuery.forEach((propertyDoc) => {
        if (propertyDoc.id == propertyId) {
          propertyDetailsArray.push({
            id: propertyDoc.id,
            ...propertyDoc.data(),
          });
        }
      });
    }

    resultArray.push(propertyDetailsArray);
  }

  return resultArray[0];
};
export const deleteFvrtIdInUsers = async (uid, fvrtID) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const currentFavrtProperty = docSnap.data().favrtProperty || [];
    const updatedFavrtProperty = currentFavrtProperty.filter(
      (id) => id !== fvrtID
    );

    await updateDoc(docRef, { favrtProperty: updatedFavrtProperty });
  } else {
    console.log("No such document!");
  }
};
export const calulateTotalFvrt = async (id) => {
  let length = 0;
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    length = docSnap.data()?.favrtProperty?.length;
  } else {
    console.log("No such document!");
  }
  return length;
};
