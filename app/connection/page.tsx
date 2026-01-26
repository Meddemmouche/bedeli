"use client"; // This must be a Client Component to use form actions with buttons

import { redirect } from "next/navigation";

// Define the server action (must be outside component or in a separate file)
async function handel(formData: FormData) {

  const key = formData.get("key");
  if (key === "create") {
    redirect("/connection/sign-in");
  } else if (key === "log") {
    redirect("/connection/log-in");
  } else {
    redirect("/connection/log-in");
  }
}

export default function Connect() {
  return (
    <form 
      className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8 py-6 backdrop-blur-sm shadow-lg shadow-black/20 space-y-4" 
      action={handel}
    >
      <button 
        name="key" 
        value="create"
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
        type="submit"
      >
        Sign up
      </button>
      <button 
        name="key" 
        value="log"
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
        type="submit"
      >
        Log in
      </button>
    </form>
  );
}