import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export function ThemeSelector() {

   const [userthemePreference, setUserThemePreference] = useState(localStorage.theme || "system")

   const htmlClassList = document.documentElement.classList

   if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
   } else {
      document.documentElement.classList.remove('dark')
   }

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
      <DropdownMenu.Root>
         <DropdownMenu.Trigger asChild>
            <button className="outline-none">
                  <img src="/assets/settings.svg" alt="Opções" className="min-w-6 hover:animate-wiggle" />
            </button>
         </DropdownMenu.Trigger>

         <DropdownMenu.Portal>
            <DropdownMenu.Content className="outline-none bg-white rounded-lg sm:-right-4 ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 px-2 text-gray-700 font-medium dark:bg-zinc-800 dark:ring-0 dark:highlight-white/5 dark:text-zinc-200"

            sideOffset={4}
            align="end"
            alignOffset={-8}
            >
               <DropdownMenu.Item 
                  className={(userthemePreference == "light" 
                     ? "text-sky-500 " 
                     : " "
                  ) 
                     + "flex outline-none items-center pl-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-600/30 cursor-pointer"
                  } 
                  onClick={() => { setTheme('light') }}
                  
               >
                  <span className="text-slate-400 dark:text-slate-500 w-6 h-6 mr-2 flex items-center justify-center">
                     {userthemePreference == "light" 
                        ? <img  src="/assets/sun-sky.svg" alt="Icone Sol" />
                        : <img  src="/assets/sun.svg" alt="Icone Sol" />
                     }
                  </span>
                  Claro
               </DropdownMenu.Item>

               <DropdownMenu.Separator className="h-[1px] my-1 bg-gray-300 dark:bg-zinc-700" />

               <DropdownMenu.Item 
                  className={(userthemePreference == "dark" 
                     ? "text-sky-500 " 
                     : " "
                  ) 
                     + "flex items-center pl-1 rounded outline-none hover:bg-slate-100 dark:hover:bg-zinc-600/30 cursor-pointer"
                  }
                  onClick={() => { setTheme('dark') }}
               >
                  <span className="text-slate-400 dark:text-slate-500 w-6 h-6 mr-2 flex items-center justify-center">
                     {userthemePreference == "dark" 
                        ? <img  src="/assets/moon-sky.svg" alt="Icone Lua" />
                        : <img  src="/assets/moon.svg" alt="Icone Lua" />
                     }                     
                  </span>
                  Escuro
               </DropdownMenu.Item>

               <DropdownMenu.Separator className="h-[1px] my-1 bg-gray-300 dark:bg-zinc-700" />

               <DropdownMenu.Item 
                  className={(userthemePreference == "system" 
                  ? "text-sky-500 " 
                  : " "
               ) 
                  + "flex items-center pl-1 rounded outline-none hover:bg-slate-100 dark:hover:bg-zinc-600/30 cursor-pointer"
               }                 
                  onClick={() => { setTheme("system") }} 
               >
                  <span className="text-slate-400 dark:text-slate-500 w-6 h-6 mr-2 flex items-center justify-center">
                     {userthemePreference == "system" 
                        ? <img  src="/assets/monitor-sky.svg" alt="Icone Monitor" />
                        : <img  src="/assets/monitor.svg" alt="Icone Monitor" />
                     }                
                  </span>
                  Sistema
               </DropdownMenu.Item>

               <DropdownMenu.Arrow className="fill-slate-900/20 dark:fill-zinc-800" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
      </DropdownMenu.Root>
   )
}