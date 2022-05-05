import db, { auth, provider, storage } from "../firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { SET_USER, SET_ARTICLES, SET_LOADING_STATUS } from "./actionType";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const setLoadingStatus = (payload) => ({
  type: SET_LOADING_STATUS,
  status: payload,
});

export const setArticles = (payload) => ({
  type: SET_ARTICLES,
  articles: payload,
});

export const signIn = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        dispatch(setUser(result.user));
      })
      .catch((err) => alert(err.message));
  };
};

export const getUserAuth = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  };
};

export const postArticleAPI = (payload) => {
  return (dispatch) => {
    dispatch(setLoadingStatus(true));
    if (payload.image !== "") {
      const imageRef = ref(storage, `images/${payload.image.name}`);
      const upload = uploadBytesResumable(imageRef, payload.image);

      upload.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progress ${progress}%`);
        },
        (error) => console.log(error.code),
        async () => {
          const downloadURL = await getDownloadURL(upload.snapshot.ref);
          addDoc(collection(db, "articles"), {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            comment: 0,
            description: payload.description,
          })
            .then((res) => console.log(res))
            .catch((err) => console.log(<err className="message"></err>));
          dispatch(setLoadingStatus(false));
        }
      );
    } else if (payload.video != "") {
      addDoc(collection(db, "articles"), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: payload.image,
        comment: 0,
        description: payload.description,
      });
      dispatch(setLoadingStatus(false));
    }
  };
};

export const getArticleApi = () => {
  return (dispatch) => {
    const q = query(collection(db, "articles"), orderBy("actor.date", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => doc.data());
      dispatch(setArticles(articles));
    });
    // dispatch(setArticles())
  };
};
