import { createContext} from 'react';

export const AuthContext = createContext (
  {
    isLoggedIn : false, 
    role : "",
    login : ()=> {},
    logout : () => {}
  }
);

