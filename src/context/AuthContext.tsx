import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInAnonymously, User } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext<{ user: User | null; loading: boolean }>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        const { user } = await signInAnonymously(auth);
        await setDoc(doc(db, "users", user.uid), {
          email: "",
          role: "member",
          profileData: {},
        });
        setUser(user);
      } else {
        setUser(firebaseUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
