import type { MetaFunction, LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import clsx from "clsx";

import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from "~/utils/theme";
import { getThemeSession } from "~/utils/theme.server";

import Navbar from "~/components/navbar";

import tailwind from "~/styles/tailwind.css";
import styles from "~/styles/app.css";

export const meta: MetaFunction = () => {
  return {
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    title: "Abdulrahman Hamideh",
    description: "Abdulrahman Hamideh's Website",
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      as: "font",
      href: "/fonts/GilmerBold.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/GilmerRegular.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/GilmerMedium.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    { rel: "stylesheet", href: tailwind },
    { rel: "stylesheet", href: styles },
  ];
};

export const loader = async (args: LoaderArgs) => {
  const themeSession = await getThemeSession(args.request);
  const data = {
    theme: themeSession.getTheme(),
  };

  return data;
};

function App() {
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <Meta />
        <Links />
        <link
          rel="icon"
          type="image/x-icon"
          href={
            theme === Theme.DARK
              ? "favicons-dark/favicon.ico"
              : "favicons-light/favicon.ico"
          }
        />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
      </head>
      <body className="bg-alice dark:bg-oxford text-gray-700 dark:text-alice transition duration-75 scroll-smooth font-gilmer max-w-5xl px-5 mx-auto">
        <Navbar />
        <div className="relative ">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
