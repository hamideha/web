import { createCookieSessionStorage } from "@remix-run/node";

import { Theme, isTheme } from "./theme";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "dark_light_theme",
    secure: true,
    secrets: [process.env.SESSION_SECRET!],
    sameSite: "lax",
    path: "/",
    expires: new Date("2050-05-05"),
    httpOnly: true,
  },
});

const getThemeSession = async (request: Request) => {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : Theme.DARK;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
};

export { getThemeSession };
