import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  getFirestore,
  onSnapshot,
  doc,
  query,
  collection,
} from "firebase/firestore";
import { app } from "../config/firebase";
import Loader from "../components/Loader";
import HabitCard from "../components/HabitCard";
import { BiCog, BiPlus } from "react-icons/bi";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user, userData, setUserData, userHabits, setUserHabits } = useAuth();

  const db = getFirestore(app);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(doc(db, "Users", user.uid), (document) => {
      setUserData(document.data());
      // setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(db, "Users", user.uid, "Streaks"),
      // orderBy("createdAt")
      (allDocs) => {
        let tempHabits = [];
        allDocs.docs.forEach((habit) => {
          tempHabits.push(habit.data());
        });
        setUserHabits(tempHabits);
        setLoading(false);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden">
      {loading ? (
        <div className="grid h-full w-full place-items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center sm:p-6 md:py-16">
          <div className="h-full w-full max-w-4xl border-gray-200 sm:rounded-2xl sm:border-2">
            <div className="flex h-16 w-full items-center border-b-2 border-gray-200 px-3">
              <div className="ml-auto flex gap-3">
                <button className="grid h-10 w-10 place-items-center rounded-full text-2xl text-gray-600 transition-colors hover:bg-gray-100">
                  <BiCog />
                </button>
                <button className="grid h-10 w-10 place-items-center rounded-full border-2 border-gray-200 bg-gray-100 text-xl font-semibold text-gray-600">
                  {user.displayName[0]}
                </button>
              </div>
            </div>
            <div className="h-auto w-full p-6">
              <div className="flex gap-4">
                {userHabits.map((habit, i) => {
                  return <HabitCard key={i} />;
                })}
                <button className="grid h-36 w-48 place-items-center rounded-lg border-2 border-dashed border-gray-200 text-2xl text-gray-600 transition-all hover:border-solid hover:bg-gray-100">
                  <BiPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
