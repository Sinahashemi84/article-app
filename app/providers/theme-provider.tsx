"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "@/store/slices/themeSlice";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const cookieTheme = document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1] as "dark" | "light" | undefined;

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const theme = cookieTheme || (systemPrefersDark ? "dark" : "light");

    dispatch(setTheme(theme));
    // No need to toggle class here anymore!
  }, [dispatch]);

  return children;
}
