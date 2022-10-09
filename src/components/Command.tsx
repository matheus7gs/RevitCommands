import React from 'react'

type dataType = {
   shortcut: string;
   command: string;
   description: string;
   category?: string;
}

export const Command: React.FC<dataType> = ({
   shortcut,
   command,
   description,
   category
}) => {
   return (
      <li className="sm:px-8 px-4  transition-colors duration-300 ease hover:bg-slate-50 hover:bg-opacity-60 dark:hover:bg-zinc-800 dark:hover:bg-opacity-70">
         <div className="py-3 flex flex-col tn:flex-row items-center justify-between  border-b border-gray-300 dark:border-zinc-700  no-underline">
         
            <div className="py-2 px-3 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-lg">
               <p>
                  {shortcut}
               </p>
            </div>
            <div className="mt-2 text-center tn:text-left tn:mt-0 tn:ml-4 flex-1">
               <div className="flex flex-col tn:flex-row justify-between items-center gap-1">
                  <p className="font-medium text-black dark:text-zinc-200">{command}</p>
                  {category &&
                     <span className="px-2 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400 rounded-2xl">
                        {category}
                     </span>
                  }
               </div>
               <p className="font-normal text-sm leading-4 mt-1 dark:text-zinc-400">{description}</p>
            </div>
         </div>
      </li>
   )
}