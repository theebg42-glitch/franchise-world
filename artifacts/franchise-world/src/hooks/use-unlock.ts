import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "fw_unlocked_brands";

function readStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set<string>(JSON.parse(raw)) : new Set<string>();
  } catch {
    return new Set<string>();
  }
}

function writeStorage(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {}
}

export function useUnlock() {
  const [unlockedBrands, setUnlockedBrands] = useState<Set<string>>(readStorage);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brandId = params.get("unlocked");
    if (brandId) {
      setUnlockedBrands((prev) => {
        const next = new Set(prev);
        next.add(brandId);
        writeStorage(next);
        return next;
      });
      const url = new URL(window.location.href);
      url.searchParams.delete("unlocked");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const unlockBrand = useCallback((brandId: string) => {
    setUnlockedBrands((prev) => {
      const next = new Set(prev);
      next.add(brandId);
      writeStorage(next);
      return next;
    });
  }, []);

  const isUnlocked = useCallback(
    (brandId: string) => unlockedBrands.has(brandId),
    [unlockedBrands]
  );

  return { isUnlocked, unlockBrand };
}
