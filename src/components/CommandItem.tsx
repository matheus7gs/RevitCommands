import React from 'react'
import * as Collapsible from '@radix-ui/react-collapsible';
import { TypeCommands } from '../types/type-commands';

export const CommandItem: React.FC<TypeCommands> = ({
   command,
   shortcut,
   description,
   path,
   categories
}) => { 
   return (
      <li className="1sm:px-8 px-4 transition-colors duration-300 ease hover:bg-slate-50 hover:bg-opacity-60 dark:hover:bg-zinc-800 dark:hover:bg-opacity-70">

         <Collapsible.Root className="py-3 border-b border-gray-300 dark:border-zinc-700 relative">

            <Collapsible.Trigger asChild >            
               <div className="flex flex-col tn:flex-row items-center justify-between  overflow-hidden no-underline">
                  
                  <div className="flex items-center justify-center min-w-10 min-h-10 max-w-16 p-2 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-lg">
                     <p>
                        {shortcut}
                     </p>
                  </div>
                  <div className="mt-2  text-center tn:text-left tn:mt-0 tn:ml-4 flex-1">
                     <div className="flex flex-col tn:flex-row justify-between items-center gap-1">
                        <p className="normal-case text-black dark:text-zinc-200">
                           {command}
                        </p>
                        <div className="flex py-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-zinc-700 scrollbar-thumb-rounded scrollbar-track-transparent ">
                           {categories?.map(category => {
                              // category &&
                              return (
                                 <span 
                                    key={category}
                                    className="px-2 py-1 ml-1 whitespace-nowrap text-xs bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-2xl"
                                    >
                                    {category}
                                 </span>
                              )})
                           }
                        </div>
                     </div>
                     <p className="font-normal text-sm text-ellipsis leading-4 mt-1 dark:text-zinc-400">
                        {description}
                     </p>
                  </div>
               </div>
            </Collapsible.Trigger>

            <Collapsible.Content className=" overflow-hidden [&[data-state='open']]:animate-slideDown [&[data-state='closed']]:animate-slideUp">

               <span className="text-xs text-zinc-500">
                  Local:
               </span>
               <p className="text-sm text-center tn:text-left tn:ml-14 leading-4">
                  {path}
               </p>
            </Collapsible.Content>
         </Collapsible.Root>
      </li>
   )
}
