import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../Firebase/Config";
import { updateProfile } from "firebase/auth";
export const getUserById = async (uid) => {
  if (uid) {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  }
};

export const updateUser = async (user) => {
  const userDocRef = doc(db, "users", user?.userId);
  updateProfile(auth.currentUser, {
    displayName: user?.displayName,
    photoURL: user?.photoURL,
  }).then((data) => console.log(data, "userUpdate"));
  const data = await setDoc(userDocRef, user);

  return data;
};

export const getAllUsers = async () => {
  let temp = [];
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, orderBy("order"), orderBy("timestamp"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    temp.push(doc.data());
  });
  console.log(temp, "temnp");
  return temp;
};

export const getselectedUser = async () => {
  const collectionRef = doc(db, "selectedUser", "Ikke1reOcKPucV1LC3yH");
  const snap = await getDoc(collectionRef);
  return snap.data();
};

export const getUsersOrderedByTimestamp = async () => {
  const q = query(collection(db, "users"), orderBy("latestUpdate", "desc"));
  const querySnapshot = await getDocs(q);
  const properties = querySnapshot.docs.map((doc) => doc.data());
  return properties;
};

export const getAllLeads = async (currentUsers) => {
  let temp = [];

  const querySnapshot = await getDocs(collection(db, "agentContactForm"));
  querySnapshot.forEach((doc) => {
    if (currentUsers.uid == doc.data().userId) {
      temp.push(doc.data());
    }
  });

  return temp;
};
