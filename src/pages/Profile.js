import React, { useEffect, useState } from "react";
import "./Profile.css";
import Camera from "../svg/camera";
import { storage, db, auth } from "../firebase";
import Trash from "../svg/trash";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { getDoc, doc, updateDoc } from "firebase/firestore";
const Profile = () => {
  const [img, setImg] = useState("");
  const [user, setUser] = useState();
  useEffect(() => {
    getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${img.name}`
        );
        if (user.avatarPath) {
          await deleteObject(ref(storage, user.avatarPath));
        }
        try {
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (error) {
          console.log(error.message);
        }
      };
      uploadImg();
    }
  }, [img]);

  const deleteImage = async () => {
    try {
      const confirm = window.confirm("Delete Avatar?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return user ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img
            src={
              user.avatar ||
              "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg"
            }
            alt="avatar"
          />
          <div className="overlay">
            <label htmlFor="photo">
              <Camera />
            </label>
            {user.avatar ? <Trash deleteImage={deleteImage} /> : null}
            <input
              type="file"
              accept="image/"
              style={{ display: "none" }}
              id="photo"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
        </div>
        <div className="text-container">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <small>Joined on {user.createdAt.toDate().toDateString()}</small>
        </div>
      </div>
    </section>
  ) : null;
};

export default Profile;
