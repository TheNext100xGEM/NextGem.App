import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import Cookies from "js-cookie";
import Web3Token from "web3-token";

interface AppContextProps {
  isInApp: boolean;
  setIsInApp: React.Dispatch<React.SetStateAction<boolean>>;
  isInChat: boolean;
  setIsInChat: React.Dispatch<React.SetStateAction<boolean>>;
  isPremium: boolean | null;
  setIsPremium: React.Dispatch<React.SetStateAction<boolean | null>>;
  web3Token: string | null;
  setWeb3Token: React.Dispatch<React.SetStateAction<string | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isInApp, setIsInApp] = useState(false);
  const [isInChat, setIsInChat] = useState(false);
  const [isPremium, setIsPremium] = useState<boolean | null>(null);
  const [web3Token, setWeb3Token] = useState<string | null>(null);
  const location = useLocation();
  const { account, provider } = useWeb3React();
  const hasCalledGetToken = useRef(false);

  useEffect(() => {
    const storedToken = Cookies.get("web3TokenAuth");
    if (storedToken) {
      setWeb3Token(storedToken);
    }
  }, []);

  useEffect(() => {
    if(Cookies.get("web3TokenAuth")){
    const getToken = async () => {
      if (provider && !hasCalledGetToken.current && account) {
        try {
          const signer = provider.getSigner();
          const token = await Web3Token.sign(async (msg: string) => {
            try {
              return await signer.signMessage(msg);
            } catch (err) {
              console.log(err);
            }
          }, {
            domain: "thenextgem.ai",
            expires_in: "1 day",
            nonce: 12345678,
            uri: "https://thenextgem.ai/",
            web3_token_version: 1,
            chain_id: 1,
            issued_at: new Date(),
            request_id: 12345,
            address: account
          });
          Cookies.set("web3TokenAuth", token, { expires: 1 });
          setWeb3Token(token);
        } catch (err) {
          console.log(err);
        }
        hasCalledGetToken.current = true;
      }
    };
    
    getToken().catch(console.error);
  }
  }, [provider, account]);

  useEffect(() => {
    if (provider) {
      const removeTokenAndDisconnect = async (accounts: string[]) => {
        if (accounts.length === 0) {
          setWeb3Token(null);
          Cookies.remove("web3TokenAuth");
          console.log("disconnected");
        }
      };
      provider.addListener("accountsChanged", removeTokenAndDisconnect);
      return () => {
        provider.removeListener("accountsChanged", removeTokenAndDisconnect);
      };
    }
  }, [provider]);

  useEffect(() => {
    const allowedPages = ["/portal", "/gems", "/gem-ai", "/premium", "/analyze"];
    const isInApp = allowedPages.some((page) => location.pathname.startsWith(page));
    setIsInApp(isInApp);
    setIsInChat(location.pathname.includes("/gem-ai"));
  }, [location.pathname]);

  return (
    <AppContext.Provider
      value={{
        isInApp,
        setIsInApp,
        isInChat,
        setIsInChat,
        web3Token,
        setWeb3Token,
        isPremium,
        setIsPremium
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};