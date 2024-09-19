import { AuthContext } from "@/Context/AuthContext";
import { auth, db } from "@/Firebase/Config";
import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext } from "react";

export const SendReview = async (data) => {
  await addDoc(collection(db, "Reviews"), data);
};
export const SendReviewBlog = async (data) => {
  const doc = await addDoc(collection(db, "BlogReviews"), data);
  return doc.id;
};
export const getAllReviews = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "Reviews"));
  querySnapshot.forEach((doc) => {
    temp.push({ ...doc.data(), id: doc.id });
  });
  return temp;
};
export const getReviewsByuserId = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
export const getReviewsByPropertyId = async (propId) => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "Reviews"));
  querySnapshot.forEach((doc) => {
    if (doc.data().propertyId == propId) {
      temp.push({ ...doc.data(), id: doc.id });
    }
  });
  return temp;
};
export const getReviewsByBlogId = async (propId) => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "BlogReviews"));
  querySnapshot.forEach((doc) => {
    if (doc.data().blogId == propId) {
      temp.push(doc.data());
    }
  });
  return temp;
};
export const getReviewOfUserByPropertyId = async (currentUser) => {
  let temp = [];
  console.log(currentUser, "currentUser");
  const q = query(
    collection(db, "Property"),
    where("userId", "==", currentUser?.uid)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp.push(doc.id);
  });

  let finalData = await GetReviewsByMultiplePoertyId(temp);
  return finalData;
};

export const GetReviewsByMultiplePoertyId = async (propId) => {
  let final = [];
  const review = await getAllReviews();
  for (let i = 0; i < review.length; i++) {
    for (let j = 0; j < propId.length; j++) {
      if (review[i].propertyId == propId[j]) {
        let temp = {
          ...review[i],
          data: review[i].review,
          reviewDate: review[i].reviewDate,
          userId: review[i].userId,
          docId: review[i].id,
        };
        final.push(temp);
      }
    }
  }
  return final;
};

export const agentReview = async (obj) => {
  const docRef = await addDoc(collection(db, "agentReview"), obj);
  console.log("Document written with ID: ", docRef.id);
};

export const agentContactForm = async (obj) => {
  const docRef = await addDoc(collection(db, "agentContactForm"), obj);
};
export const propertyContactForm = async (obj) => {
  await addDoc(collection(db, "propertyContactForm"), obj);
};

export const updateReviewWithHelpful = async (uid, reviewUserId, type) => {
  let currentReview;
  let docId;
  const q = doc(db, "Reviews", reviewUserId);
  const docSnap = await getDoc(q);
  if (docSnap.exists()) {
    docId = docSnap.id;
    currentReview = docSnap.data();
  } else {
    return;
  }

  const Ref = doc(db, "Reviews", docId);

  let newData;

  if (type === "helpful") {
    if (
      currentReview?.helpfulUsers?.length > 0 &&
      currentReview?.helpfulUsers.includes(uid)
    ) {
      newData = {
        helpful: increment(-1),
        helpfulUsers: currentReview.helpfulUsers.filter((id) => id !== uid),
      };
    } else if (
      currentReview?.notHelpfulUsers?.length > 0 &&
      currentReview?.notHelpfulUsers?.includes(uid)
    ) {
      newData = {
        helpful: increment(1),
        helpfulUsers: [...(currentReview.helpfulUsers || []), uid],
        notHelpfulUsers: currentReview.notHelpfulUsers.filter(
          (id) => id !== uid
        ),
        notHelpful: increment(-1),
      };
    } else {
      newData = {
        helpful: increment(1),
        helpfulUsers: [...(currentReview.helpfulUsers || []), uid],
      };
    }
  } else if (type === "notHelpful") {
    if (
      currentReview?.notHelpfulUsers?.length > 0 &&
      currentReview?.notHelpfulUsers?.includes(uid)
    ) {
      newData = {
        notHelpfulUsers: currentReview.notHelpfulUsers.filter(
          (id) => id !== uid
        ),
        notHelpful: increment(-1),
      };
    } else if (
      currentReview?.helpfulUsers?.length > 0 &&
      currentReview?.helpfulUsers.includes(uid)
    ) {
      newData = {
        helpfulUsers: currentReview.helpfulUsers.filter((id) => id !== uid),
        notHelpful: increment(1),
        helpful: increment(-1),
        notHelpfulUsers: [...(currentReview.notHelpfulUsers || []), uid],
      };
    } else {
      newData = {
        notHelpful: increment(1),
        notHelpfulUsers: [...(currentReview.notHelpfulUsers || []), uid],
      };
    }
  }
  console.log(newData, "newData");
  console.log(uid, "uid");
  const resp = await updateDoc(Ref, newData);
  return resp;
};
