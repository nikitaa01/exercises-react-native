import type { Set } from "@/lib/db/scheme/set";
import { delay } from "@/lib/utils/delay";
import { Nullable } from "@/types/utils";
import { useEffect, useState } from "react";

export default function useSetsRestTimer(lastSet: Nullable<Set>) {
  const [timer, setTimer] = useState<{ m: number; s: number } | null>(null);

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
    const counterUpdater = async () => {
      for (let i = 0; i < m * 60 + s; i++) {
        await delay(1000);
        setTimer((prev) => {
          if (!prev) return null;
          if (prev.s === 0) {
            if (prev.m === 0) {
              return null;
            }
            return { m: prev.m - 1, s: 59 };
          }
          return { m: prev.m, s: prev.s - 1 };
        });
      }
      setTimer(null);
    };

    counterUpdater();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSet]);

  return timer;
}
