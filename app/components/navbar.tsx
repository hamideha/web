import { motion, AnimatePresence } from "framer-motion";
import { useTheme, Theme } from "~/utils/theme";

const LINKS = [{ href: "/blog", label: "Blog" }];

export default function Navbar() {
  return (
    <nav className="flex justify-between align-middle items-center my-5 py-5 h-20">
      <h1 className="font-gilmer font-bold text-xl sm:text-3xl text-flame">
        <a href="/">Abdulrahman Hamideh</a>
      </h1>
      <div className="flex flex-row">
        {LINKS.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            className="flex items-center font-medium text-base sm:text-lg px-8"
          >
            {label}
          </a>
        ))}
        <ThemeSwitcher />
      </div>
    </nav>
  );
}

function ThemeSwitcher() {
  const [theme, setTheme] = useTheme();
  const isDarkMode = theme === Theme.DARK;

  return (
    <motion.button
      onClick={() =>
        setTheme((previousTheme) =>
          previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        )
      }
      aria-label={isDarkMode ? "Switch to light" : "Switch to dark"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        width="30"
        height="30"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        strokeDasharray="0 1"
      >
        <AnimatePresence>
          {isDarkMode ? (
            <motion.g
              key="dark"
              animate={{
                rotate: -180,
                transition: { duration: 0.5 },
              }}
              fill="#F7FAFF"
            >
              <motion.circle cx="20" cy="20" r="9" />
              <motion.circle cx="20" cy="5" r="2.5" />
              <motion.circle cx="35" cy="20" r="2.5" />
              <motion.circle cx="5" cy="20" r="2.5" />
              <motion.circle cx="20" cy="35" r="2.5" />
              <motion.circle cx="30" cy="9" r="2.5" />
              <motion.circle cx="9" cy="9" r="2.5" />
              <motion.circle cx="9" cy="30" r="2.5" />
              <motion.circle cx="30" cy="30" r="2.5" />
            </motion.g>
          ) : (
            <motion.path
              key="light"
              animate={{
                rotate: 270,
                transition: { duration: 0.5 },
              }}
              fill="#0C1A29"
              d="m19.97938,34.80212c-7.9923,0 -14.49467,-6.62801 -14.49467,-14.7741c0,-5.64217 3.08143,-10.71173 8.04238,-13.22969c0.22341,-0.11285 0.4918,-0.06902 0.6674,0.10997c0.17579,0.17917 0.22115,0.45284 0.11156,0.67998c-0.90524,1.8746 -1.36394,3.89022 -1.36394,5.98898c0,7.49495 5.98199,13.59255 13.33433,13.59255c2.08227,0 4.07843,-0.4785 5.93578,-1.42042c0.22313,-0.11314 0.49161,-0.06931 0.66712,0.10968c0.17663,0.17946 0.22086,0.45313 0.111,0.67988c-2.45713,5.09657 -7.44325,8.26317 -13.01096,8.26317z"
            />
          )}
        </AnimatePresence>
      </motion.svg>
      <span className="ml-4 sr-only">
        switch to {isDarkMode ? Theme.LIGHT : Theme.DARK} mode
      </span>
    </motion.button>
  );
}
