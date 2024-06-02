import { useEffect, useState, } from "react";
import { Loading } from "./Loading";
import { ThemeSelector } from "./ThemeSelector";
import { useFilter } from "../contexts/FilterContext";

export function SearchForm() {
   const { 
      commands, 
      filteredCommands, 
      searchValue, 
      setSearchValue, 
      setFilterBy 
   } = useFilter()

   const [isLoading, setIsLoading] = useState(false)
   const [tabActive, settabActive] = useState('all')

   const [sticky, setSticky] = useState(false);

   const filterTabItems = [
      {
         "title": "Todos",
         "tab": "all",
         "filterBy": ["command", "shortcut", "description", "categories"],
      },
      {
         "title": "Atalho",
         "tab": "shortcut",
         "filterBy": ["shortcut"],
      },
      {
         "title": "Comando",
         "tab": "command",
         "filterBy": ["command"],
      },
   ]

   function handleChange(value: string) {
      setSearchValue(value)

      if(value.trim().length > 0) {
         setIsLoading(true)
      }

      setTimeout(() => {
         setIsLoading(false)
      }, 300)
   }

   function classNames(...classes: string[]) {
      return classes.filter(Boolean).join(' ')
   }
   useEffect(() => {
      document.addEventListener('scroll', () => {

         const scrollTop = window.scrollY

         if (scrollTop > 68) {
            setSticky(true)
         } else {
            setSticky(false)
         }
      })
   }, [])

   return (
      <div 
         // className={classNames(
         //    sticky ?   
         //    'fixed top-0 left-0 flex justify-center m-0 sm:px-8' : ' '
         
         // ) + " w-full "}
         
      >
         <header 
            className={classNames(
                  sticky && (window.screen.height > 480) ?   
                  ' fixed top-0 z-10 w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl pt-2 bg-white dark:bg-zinc-900 text-gray-500 ' : ' pt-9 '
               
               ) + "w-full mb-3 px-4 1sm:px-8 border-b-2 border-gray-300 dark:border-zinc-600 "
            }
         >
            <form action="" className="flex items-center justify-between mb-3">
               <span className="flex items-center justify-center w-6 h-6">
                  {isLoading 
                     ? <Loading /> 
                     : <img src="/assets/search.svg" alt="Search Icon" /> 
                  }
               </span>
               
               <input 
                  className="w-full mx-2 text-xl text-black dark:text-zinc-100 dark:bg-zinc-900 border-none font-medium placeholder:text-gray-300 dark:placeholder:text-zinc-700 placeholder:font-normal focus:placeholder:text-transparent focus:outline-none disabled:cursor-not-allowed disabled:placeholder:sr-only rounded" 
                  name="filter"
                  type="text" 
                  placeholder="Pesquisar..."
                  disabled={commands.length == 0}
                  value={searchValue}
                  onChange={(e) => { handleChange(e.target.value) }}
               />

               <button type="reset" onClick={() => {
                  setSearchValue('')
               }} 
                  className="text-black dark:text-zinc-400 underline underline-offset-2"
               >
                  Limpar
               </button>
            </form>

            <div>
               <p className="font-normal text-xs  text-gray-400 dark:text-zinc-400">
                  Filtrar por
               </p>
            </div>

            <div className="options relative flex gap-2 items-center justify-between">
               <ul className="flex overflow-x-auto overflow-y-hidden">
                  {filterTabItems.map(item => ( 
                     <li key={item.tab}>
                        <h2>
                           <a
                              onClick={() => {
                                 settabActive(item.tab)
                                 setFilterBy(item.filterBy)
                              }}
                              className={classNames(
                                 tabActive == item.tab ? 'font-medium text-black dark:text-zinc-200 border-current'
                                    : ' font-normal  border-transparent hover:border-zinc-400 dark:hover:border-zinc-500'
                                 )  + ' flex leading-6 pt-3 pb-2.5 px-2 border-b-2 z-50 -mb-px transition-all cursor-pointer'
                           }>
                              {item.title}
                              <span className="px-1 ml-2 min-w-6 text-center bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-lg">
                                 {tabActive == item.tab
                                    ? (filteredCommands.length || (
                                          (searchValue.trim().length == 0) ? commands.length : 0
                                       )) 
                                    : 0
                                 }
                              </span>
                           </a>
                        </h2>
                     </li>
                  ))}
               </ul>
               <ThemeSelector />
            </div>
         </header>
      </div>
   )
}