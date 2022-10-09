import { useState } from "react"

type ThemeModalType = {
   closeModal(): void;
}

export function ThemeModal({
   closeModal,
}: ThemeModalType ) {

   const [userthemePreference, setUserThemePreference] = useState(localStorage.theme || "system")

   const htmlClassList = document.documentElement.classList

   function setTheme(theme: string) {
      if(theme == "dark") {
         htmlClassList.add(theme)
         setUserThemePreference(theme)
         localStorage.theme = (theme)
      }else if(theme == "light") {
         htmlClassList.remove("dark")
         setUserThemePreference(theme)
         localStorage.theme = (theme)
      }else {
         (window.matchMedia("(prefers-color-scheme: dark)").matches ? htmlClassList.add("dark") : htmlClassList.remove("dark"))
         setUserThemePreference("system")
         localStorage.removeItem("theme")
      }
   }

   return (
      <ul className="absolute z-50 top-full right-0 sm:-right-4 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1  text-gray-700 font-medium dark:bg-zinc-800 dark:ring-0 dark:highlight-white/5 dark:text-zinc-200 mt-1">
                  <li 
                     className={(userthemePreference == "light" 
                        ? "text-sky-500 " 
                        : " ") 
                        + " py-1 px-2 flex items-center hover:bg-slate-50 dark:hover:bg-zinc-600/30 cursor-pointer"} 
                     onClick={() => {
                        setTheme('light')
                        closeModal()
                     }}
                  >
                     <span className="text-slate-400 dark:text-slate-500 w-6 h-6 mr-2 flex items-center justify-center">
                     {userthemePreference == "light" 
                        ? <img  src="/assets/sun-sky.svg" alt="Icone Sol" />
                        : <img  src="/assets/sun.svg" alt="Icone Sol" />
                     }
                        </span>
                     Claro
                  </li>

                  <li 
                     className={(userthemePreference == "dark" 
                        ? "text-sky-500 " 
                        : " ") 
                        + "py-1 px-2 flex items-center hover:bg-slate-50 dark:hover:bg-zinc-600/30 cursor-pointer"}
                     onClick={() => {
                        setTheme('dark')
                        closeModal()
                     }}
                  >
                     <span className="text-slate-400 dark:text-slate-500 w-6 h-6 mr-2 flex items-center justify-center">

                     {userthemePreference == "dark" 
                        ? <img  src="/assets/moon-sky.svg" alt="Icone Lua" />
                        : <img  src="/assets/moon.svg" alt="Icone Lua" />
                     }
                        
                     </span>
                     Escuro
                  </li>

                  <li 
                     className={(userthemePreference == "system" 
                     ? "text-sky-500 " 
                     : " ") 
                     + "py-1 px-2 flex items-center hover:bg-slate-50 dark:hover:bg-zinc-600/30 cursor-pointer"}
                     
                     onClick={() => {
                        setTheme("system")
                        closeModal()
                     }} 
                     >
                     <span className="text-slate-400 dark:text-slate-500 w-6 h-6 mr-2 flex items-center justify-center">

                        {userthemePreference == "system" 
                           ? <img  src="/assets/monitor-sky.svg" alt="Icone Monitor" />
                           : <img  src="/assets/monitor.svg" alt="Icone Monitor" />
                        }
                  
                     </span>
                     Sistema
                  </li>
               </ul>
   )
}