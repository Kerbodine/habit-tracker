import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { app } from "../config/firebase";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const HabitContext = createContext();

export const useHabit = () => {
  return useContext(HabitContext);
};

export const HabitProvider = ({ children }) => {
  const db = getFirestore(app);
  const { user } = useAuth();

  const newHabit = async (habit) => {
    const id = uuidv4();
    try {
      await setDoc(doc(db, "Users", user.uid, "Streaks", id), {
        id: id,
        ...habit,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await deleteDoc(doc(db, "Users", user.uid, "Streaks", habitId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HabitContext.Provider value={{ newHabit, deleteHabit }}>
      {children}
    </HabitContext.Provider>
  );
};
