import { useState, useEffect } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(
        document.documentElement.classList.contains("dark")
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`h-screen flow-root ${
        darkMode ? "bg-gray-900" : "bg-blue-100"
      }`}
    >
      <p
        className={`text-9xl p-5 m-3 ${
          darkMode ? "text-white" : "text-gray-700"
        }`}
      >
        STAYY : your vacay our priority
      </p>
    </div>
  );
}