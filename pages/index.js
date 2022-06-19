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
import HabitButton from "../components/HabitButton";
import AccountMenu from "../components/AccountMenu";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { user, setUserData, userHabits, setUserHabits } = useAuth();

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
      (allDocs) => {
        let tempHabits = [];
        allDocs.docs.forEach((habit) => {
          tempHabits.push(habit.data());
        });
        console.log(tempHabits);
        tempHabits.sort((a, b) => new Date(b.date) - new Date(a.date));
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
                <AccountMenu />
              </div>
            </div>
            <div className="h-[calc(100vh-64px)] w-full overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {userHabits.map((habit, i) => {
                  return (
                    <HabitCard
                      key={i}
                      title={habit.title}
                      date={habit.date}
                      id={habit.id}
                    />
                  );
                })}
                <HabitButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
