import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "sonner";

const upload = async (file) => {
    const date = new Date()
  const storage = getStorage();
  const storageRef = ref(storage, `images/${date + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
              // Handle unsuccessful uploads
              reject("Something went wrong!" + error.code )
              
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
            });
          }
        );
    })
};

export default upload;