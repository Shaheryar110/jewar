import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FacebookAuthProvider, getRedirectResult } from "firebase/auth";

import { auth, db } from "./Config";

export const signUp = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setDoc(doc(db, "users", userCredential?.user?.uid), {
        email: email?.trim(),
        accessToken: userCredential.accessToken || "",
        phoneNumber: userCredential.phoneNumber || "",
        photoURL: userCredential.photoURL || "",
        displayName: userCredential.displayName || "",
      });
      setDoc(doc(db, "userChats", userCredential?.user?.uid), {});
      return userCredential.user;
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const signIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      console.log(error.message);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const SignInGoogle = async () => {
  const provider = new GoogleAuthProvider();
  console.log(auth, "auth");
  console.log(provider, "provider");
  // provider.setCustomParameters({ prompt: 'select_account' });
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);

      console.log(result.user, "outside");
      if (result.user) {
        console.log(result.user, "under if");
        //  addDoc(collection(db, "users"), {
        //   accessToken: result.user.accessToken || "",
        //   photoURL: result.user.photoURL || "",
        //   displayName: result.user.displayName || "",
        //   signInMethod: credential.signInMethod || "",
        //   email: result.user.email,
        //   uid: result.uid,
        // }).then((data)=>console.log);
        // setDoc(doc(db, "users", result.user.uid), {
        //   accessToken: result.user.accessToken || "",
        //   photoURL: result.user.photoURL || "",
        //   displayName: result.user.displayName || "",
        //   signInMethod: credential.signInMethod || "",
        //   email: result.user.email,
        //   uid: result.uid,
        // })
      }
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(credential, "cred");
    });
};
export const facebokSignIn = () => {
  const provider = new FacebookAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      addDoc(collection(db, "users"), {
        email: email?.trim(),
        accessToken: credential.accessToken || "",
        phoneNumber: credential.phoneNumber || "",
        photoURL: credential.photoURL || "",
        displayName: credential.displayName || "",
        signInMethod: credential.signInMethod,
      });
      console.log(credential, "credential");
      const accessToken = credential.accessToken;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
    });
};
export const SignInApple = () => {
  const AppleProvider = new OAuthProvider("apple.com");
  signInWithPopup(auth, AppleProvider)
    .then((result) => {
      const user = result.user;

      const credential = OAuthProvider.credentialFromResult(result);
      console.log(credential, "success");
      addDoc(collection(db, "users"), {
        email: email?.trim(),
        accessToken: credential.accessToken || "",
        phoneNumber: credential.phoneNumber || "",
        photoURL: credential.photoURL || "",
        displayName: credential.displayName || "",
        signInMethod: credential.signInMethod,
      });
      return credential;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = OAuthProvider.credentialFromError(error);
    });
};
export const logIn = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      let temp = {
        photo: user.photoURL,
        name: user.displayName,
      };
      return temp;
    } else {
      console.log("error occur");
    }
  });
};
