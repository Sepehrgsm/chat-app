import React , {useState , createContext , useEffect} from 'react';
import { useHistory } from 'react-router';
import { auth } from '../firebase';


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    
      const [loadin, setLoading] = useState(true);
      const [user, setUser] = useState(false);
      const history = useHistory();
       
      useEffect(() => {
          auth.onAuthStateChanged(user => {
              setUser(user);
              console.log(user);
              setLoading(false);
              if(user)  history.push("/chats")
          })
      },[user , history])
    return (
      <AuthContext.Provider value={user}>
            {!loadin && children}
      </AuthContext.Provider>
    );
};

export default AuthContextProvider;