// This code is based on https://www.mattstobbs.com/remix-dark-mode/

import { createContext, useContext, useState, useEffect, useRef } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useFetcher } from "@remix-run/react";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prefersLightMQ = "(prefers-color-scheme: light)";
const getPreferredTheme = () =>
  window.matchMedia(prefersLightMQ).matches ? Theme.LIGHT : Theme.DARK;

const ThemeProvider = ({
  children,
  specifiedTheme,
}: {
  children: ReactNode;
  specifiedTheme: Theme | null;
}) => {
  const [theme, setTheme] = useState<Theme | null>(() => {
    if (specifiedTheme) {
      if (themes.includes(specifiedTheme)) {
        return specifiedTheme;
      } else {
        return null;
      }
    }

    if (typeof window !== "object") {
      return null;
    }

    return getPreferredTheme();
  });

  const persistTheme = useFetcher();

  const persistThemeRef = useRef(persistTheme);
  useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  const mountRun = useRef(false);

  useEffect(() => {
    if (!mountRun.current) {
      mountRun.current = true;
      return;
    }
    if (!theme) {
      return;
    }

    persistThemeRef.current.submit(
      { theme },
      { action: "action/set-theme", method: "post" }
    );
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(prefersLightMQ);
    const handleChange = () => {
      setTheme(mediaQuery.matches ? Theme.LIGHT : Theme.DARK);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const clientThemeCode = `
;(() => {
  // ...

  const meta = document.querySelector('meta[name=color-scheme]');
  if (meta) {
    if (theme === 'dark') {
      meta.content = 'dark light';
    } else if (theme === 'light') {
      meta.content = 'light dark';
    }
  } else {
    console.warn(
      "You shouldn't be seeing this! Oops.",
    );
  }
})();
`;

const NonFlashOfWrongThemeEls = ({ ssrTheme }: { ssrTheme: boolean }) => {
  const [theme] = useTheme();
  return ssrTheme ? null : (
    <>
      <meta
        name="color-scheme"
        content={theme === "light" ? "light dark" : "dark light"}
      />
      <script dangerouslySetInnerHTML={{ __html: clientThemeCode }} />
    </>
  );
};

const themes: Array<Theme> = Object.values(Theme);

function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

export { isTheme, NonFlashOfWrongThemeEls, Theme, ThemeProvider, useTheme };
