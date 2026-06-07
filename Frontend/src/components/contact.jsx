import { useState, useEffect } from "react";

export default function Contact() {
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
      className={`flex flex-col items-center justify-center h-screen px-8 text-center ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-100 text-gray-800"
      }`}
    >
      <h1 className="text-5xl font-bold mb-6">
        Contact STAYY
      </h1>

      <p className="max-w-2xl text-lg leading-relaxed">
        Have questions, feedback, or need help planning your next trip?
        We're here to help.
      </p>

      <div
        className={`mt-8 p-6 rounded-xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-3">
          Get in Touch
        </h2>

        <a
          href="mailto:email@stayy.bajpai.dev"
          className="text-blue-500 hover:underline text-lg"
        >
          email@stayy.bajpai.dev
        </a>

        <p className="mt-4 text-sm opacity-80">
          We usually respond within 24 hours.
        </p>
      </div>
    </div>
  );
}