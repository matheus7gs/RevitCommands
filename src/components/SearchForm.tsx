import { useState, } from "react";
import { Loading } from "./Loading";
import { ThemeSelector } from "./ThemeSelector";

type searchFormType = {
   totalCommands: number;
   totalFilteredCommands: number;
   childInputToParent(value: string): void;
   childSearchParamToParent([]): void;
   toggleIsLoaded(value: Boolean): void;
}

export function SearchForm({ 
   totalCommands, 
   childInputToParent, 
   childSearchParamToParent, 
   totalFilteredCommands,
   toggleIsLoaded
}: searchFormType) { 

   const [isLoading, setIsLoading] = useState(false)
   const [inputValue, setInputValue] = useState('')
   const [tabActive, settabActive] = useState('all')

   function handleChange(value: string) {
      setInputValue(value)
      if(value.trim().length > 0) {
         setIsLoading(true)
         toggleIsLoaded(false)
      }

      childInputToParent(value.trim())
      
      setTimeout(() => {
         setIsLoading(false)
         toggleIsLoaded(true)
      }, 500)
   }

   function classNames(...classes: string[]) {
      return classes.filter(Boolean).join(' ')
   }

   return (
      <div >
         <header className="mb-3 pt-9 px-4 sm:px-8 border-b-2 border-gray-300 dark:border-zinc-600">
            <div className="flex w-full items-center justify-between mb-3">
               <span className="flex items-center justify-center w-6 h-6">
                  {isLoading 
                     ? <Loading /> 
                     : <img src="/assets/search.svg" alt="Search Icon" />
                     
                  }
               </span>
               
               <input 
                  className="w-full mx-2 text-xl text-black dark:text-zinc-100 dark:bg-zinc-900 border-none font-medium placeholder:text-gray-300 dark:placeholder:text-zinc-700 placeholder:font-normal focus:placeholder:text-transparent focus:outline-none disabled:cursor-not-allowed disabled:placeholder:sr-only rounded" 
                  type="text" 
                  placeholder="Pesquisar..."
                  disabled={totalCommands == 0}
                  value={inputValue}
                  onChange={(e) => { handleChange(e.target.value) }}
               />

               <button onClick={() => {
                  setInputValue('')
                  handleChange('')
               }} 
                  className="text-black dark:text-zinc-400 underline underline-offset-2"
               >
                  Limpar
               </button>
            </div>
            <div>
               <p className="font-normal text-xs  text-gray-400 dark:text-zinc-400">
                  Filtrar por
               </p>
            </div>
            <div className="options relative flex gap-2 items-center justify-between">
               <ul className="flex overflow-x-auto overflow-y-hidden">
                  <li>
                     <h2>
                     <a
                        onClick={() => {
                           settabActive('all')
                           childSearchParamToParent(["command", "shortcut", "description", "categories"])
                        }}
                        className={classNames(
                           tabActive == 'all' ? 'font-medium text-black dark:text-zinc-200 border-current'
                              : ' font-normal  border-transparent hover:border-zinc-400 dark:hover:border-zinc-500'
                           )  + ' flex leading-6 pt-3 pb-2.5 px-2 border-b-2 z-50 -mb-px transition-all cursor-pointer'
                     }>
                        Todos
                        <span className="px-1 ml-2 min-w-2 text-center bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-lg">
                           {tabActive == 'all' 
                              ? (totalFilteredCommands || (
                                    (inputValue.trim().length == 0) ? totalCommands : 0
                                 )) 
                              : 0
                           }
                        </span>
                     </a>
                     </h2>
                  </li>
                  <li>
                     <h2>
                     <a 
                        onClick={() => {
                           settabActive('shortcut')
                           childSearchParamToParent(["shortcut"])
                        }} 
                        className={classNames(
                        tabActive == 'shortcut' ? 'font-medium text-black dark:text-zinc-200 border-current'
                        : ' font-normal  border-transparent hover:border-zinc-400 dark:hover:border-zinc-500'
                        )  + ' flex leading-6 pt-3 pb-2.5 px-2 border-b-2 -mb-px transition-all cursor-pointer'
                     }>
                        Atalho
                        <span className="px-1 ml-2 min-w-2 text-center bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-lg">
                           {tabActive == 'shortcut'  
                              ? (totalFilteredCommands || (
                                    (inputValue.trim().length == 0) ? totalCommands : 0
                                 )) 
                              : 0
                           }
                        </span>
                     </a>
                     </h2>
                  </li>
                  <li>
                     <h2>
                     <a 
                        onClick={() => {
                           settabActive('command')
                           childSearchParamToParent(["command"])
                        }} 
                        className={classNames(
                        tabActive == 'command' ? 'font-medium text-black dark:text-zinc-200 border-current'
                        : ' font-normal  border-transparent hover:border-zinc-400 dark:hover:border-zinc-500'
                        )  + ' flex leading-6 pt-3 pb-2.5 px-2 border-b-2 -mb-px transition-all cursor-pointer'
                     }>
                        Comando
                        <span className="px-1 ml-2 min-w-2 text-center bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-lg">
                           {tabActive == 'command' 
                              ? (totalFilteredCommands || (
                                    (inputValue.trim().length == 0) ? totalCommands : 0
                                 )) 
                              : 0
                           }
                        </span>
                     </a>
                     </h2>
                  </li>
               </ul>

               <ThemeSelector />
            </div>
         </header>
      </div>
   )
}