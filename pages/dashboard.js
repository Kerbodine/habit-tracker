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
          <div className="h-full w-full max-w-4xl rounded-2xl border-2 border-gray-200 p-4">
            <div className="flex gap-4">
              {userHabits.map((habit, i) => {
                return <HabitCard key={i} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
