import React, {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
interface userProps {
  token: any;
  accessLogin: (userToken: string) => Promise<void>;
}
const AuthContext = React.createContext<userProps>(null!);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [token, setToken] = React.useState<any>(null);

  async function checkUser() {
    let _token: any = await EncryptedStorage.getItem('@token');
    if (_token) {
      setToken(_token);
    } else {
      setToken(false);
    }
  }

  useEffect(() => {
    checkUser();
  });

  const accessLogin = async (userToken: string) => {
    await EncryptedStorage.setItem('@token', userToken);
    setToken(userToken);
  };

  const value = {
    token,
    accessLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
