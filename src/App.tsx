import { useEffect, useState } from 'react'
import { SearchForm } from './components/SearchForm';
import { Command } from './components/Command'
import { PulseAnimation } from './components/PulseAnimation';
import api from '../services/api';


export type TypeCommands = {
  command: string;
  shortcut: string;
  description: string;
  categories: string[];
}
 

export function App() {


  const [commands, setCommands] = useState<TypeCommands[]>([])
  const [categories, setCategories] = useState<[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchParam, setSearchParam] = useState(["command", "shortcut", "description", "categories"])

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }


  useEffect(() => {
    Promise.all([
      api.get('/categories').then(response => setCategories(response.data)),
      api.get('/commands').then(response => {
        setCommands(response.data)
        setIsLoaded(true)
      })
    ])
  }, []) 


  function childInputValue(value: string) {
    setSearchValue(value)
  }
  function childsearchParamValue(value: string[]) {
    setSearchParam(value)
  }
  function toggleIsLoaded(value: boolean) {
    setIsLoaded(value)
  }

  const filteredCommands = searchValue.length > 0 
  ? commands.filter((command: Record<string, TypeCommands | string | string[]>) =>
    { return searchParam.some((item) => {
        return ( 
          command[item].toString()?.toLowerCase().includes(searchValue.toLowerCase())
        ) 
      })
    }) 
  : []
  
  return (

    <div className="h-screen bg-gray-100 dark:bg-black flex flex-col w-full justify-between items-center p-0 sm:px-8 sm:pt-10 ">

      
      <main className=" bg-white dark:bg-zinc-900 text-gray-500 w-full max-w-xl rounded-none sm:rounded-3xl sm:shadow-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">

        <SearchForm 
          totalCommands={commands.length} 
          totalFilteredCommands={filteredCommands.length}
          childInputToParent={childInputValue}
          childSearchParamToParent={childsearchParamValue} 
          toggleIsLoaded={toggleIsLoaded}
        /> 
        

          { !isLoaded && 
              <PulseAnimation />
          }
          
          { isLoaded && searchValue.length > 0 ? (
            <>

              {filteredCommands.length > 0 ? 

                <ul className="sm:mb-3 smh:h-[calc(100vh-11.5625rem)] smh:sm:h-full smh:sm:max-h-[calc(100vh-15rem)] scrollbar-thin overflow-y-scroll overflow-x-hidden scrollbar-thumb-gray-400 dark:scrollbar-thumb-zinc-700 scrollbar-thumb-rounded scrollbar-track-transparent">
                  {
                    filteredCommands.map(command => {
                      return (
                        <Command
                          key={command.shortcut + command.command}
                          shortcut={command.shortcut}
                          command={command.command}
                          description={command.description}
                          categories={command.categories}
                        />
                      )
                    })
                  }
                </ul>
              : 
                <div className="mb-3 smh:h-[calc(100vh-11.5625rem)] smh:sm:h-[calc(100vh-15rem)]  flex items-center text-center flex-col pt-10 pb-6 px-4 sm:px-8">
                  <span>                 
                   <img className="max-h-32" src="/assets/notfound.svg" alt="Not Found" />
                  </span>
                  <h2 className="font-semibold text-gray-700 dark:text-zinc-300">
                    Nenhum resultado encontrado
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-gray-400 dark:text-zinc-600">
                    Nenhum comando encontrado com esse termo no momento, tentar procurar outra coisa.
                  </p>
                </div>
              }
            </>

          ) : ( isLoaded &&
            <div className="pb-5">
              {

                categories.map(category => {
                  return (
                    <ul key={category}>
                      <h3  className="sm:mx-8 mx-4 pb-2 pt-4 text-black dark:text-zinc-100 font-medium text-lg border-b border-gray-300 dark:border-zinc-700">
                          {category}
                      </h3>
                      {
                        commands.filter(command => command.categories?.includes(category)).map(command => {
                          return (      
                            <Command
                              key={command.shortcut}
                              shortcut={command.shortcut}
                              command={command.command}
                              description={command.description}
                            />                          
                          )
                        })
                      }
                    </ul>
                  )}) 
              }
            </div>
          )} 
      </main>
      <footer className="flex items-center justify-end bottom-0 w-full h-fit text-right px-4 py-2 sm:px-0 bg-white sm:bg-transparent dark:bg-zinc-900 sm:dark:bg-transparent">
        <a className="dark:text-zinc-200 text-[0.625rem] inline-flex items-center" target="_blank" href="https://matheus7gs.github.io/socialtree/">
          Developed By&nbsp;
          <span className=" text-xs text-blue-600 dark:text-blue-500" >Matheus7gs</span>
        </a>
      </footer>
    </div>
  )
}

