import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { auth, app } from "../config/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const HabitContext = createContext();

export const useHabit = () => {
  return useContext(HabitContext);
};

export const HabitProvider = ({ children }) => {
  const db = getFirestore(app);
  const { user } = useAuth();

  const newHabit = async (habit) => {
    try {
      await setDoc(doc(db, "Users", user.uid, "Streaks", uuidv4()), habit);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HabitContext.Provider value={{ newHabit }}>
      {children}
    </HabitContext.Provider>
  );
};
