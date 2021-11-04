import React, {useState , useEffect,useContext} from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { auth } from '../firebase';
import styles from './Chats.module.css'
import { useHistory } from 'react-router';
import { ChatEngine} from 'react-chat-engine';
import { AuthContext } from "../context/AuthContextProvider"

const Chats = () => {

   const [loading , setLoading] = useState(true);
   const user = useContext(AuthContext);    
   const history = useHistory();



   useEffect (() => {
      if(!user){
          history.push("/");
          return;
      }

      axios.get("https://api.chatengine.io/users/me" , {
          headers:{
              "project-id" : "f9d8d824-9797-4220-b457-96fcbc6a4078" ,
              "user-name" : user.email ,
              "user-secret" : user.uid
          }
      })
      .then(() => {
          setLoading(false) 
      })

      .catch(() => {
          let formData = new FormData();
          formData.append("email" , user.email);
          formData.append("username" , user.email);
          formData.append("secret" , user.uid);
          getFile(user.photoURL)
           .then(avatar => {
               formData.append("avatar" , avatar , avatar.name)
               axios.post("https://api.chatengine.io/users/" , formData , {
                   headers : {
                       "private-key": "67d255d2-3332-4b5d-bd18-d83ac110c176"
                   }
               })
               .then(() => setLoading(false))
           })
      })
   } , [user , history])

   const getFile = async (url) => {
       const response = await fetch(url);
       const data = await response.blob();
       return new File([data] , 'userPhoto.jpg' , {type:"image/jpeg"}) 
   }



   const logouthandler = async () => {
       await auth.signOut();
       history.push("/")
   }

   if (!user || loading) return "Loading..."

    return (
        <div className={styles.container}>
            <Navbar logouthandler={logouthandler} />

            <ChatEngine
            height="calc(100vh - 50px)"
            projectID="f9d8d824-9797-4220-b457-96fcbc6a4078"
            userName={user.email}
            userSecret={user.uid}

            />
        </div>
    );
};

export default Chats;