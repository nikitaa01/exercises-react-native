import { type Set } from "@/lib/db/scheme/set";
import { Nullable } from "@/types/utils";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

export default function useSetsRestTimer(lastSet: Nullable<Set>) {
  const [timer, setTimer] = useState<{ m: number; s: number } | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        setTimer(null);
      }
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    });
    return () => {
      subscription.remove();
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (!lastSet || timer) return;

    const minutesFromLastSet =
      (new Date().getTime() - lastSet.createdAt) / 60000;
    if (minutesFromLastSet >= 2) {
      return;
    }

    const timerRest = 2 - minutesFromLastSet;
    const m = Math.floor(timerRest);
    const s = Math.floor((timerRest - m) * 60);

    setTimer({ m, s });

    const id = setInterval(() => {
      setTimer((prev) => {
        if (!prev) return null;
        if (prev.s === 0) {
          if (prev.m === 0) {
            clearInterval(id);
            return null;
          }
          return { m: prev.m - 1, s: 59 };
        }
        return { m: prev.m, s: prev.s - 1 };
      });
    }, 1000);

    setIntervalId(id);
  }, [lastSet, timer]);

  return timer;
}
