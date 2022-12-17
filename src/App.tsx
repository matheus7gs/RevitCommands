import { useEffect, useState } from 'react'
import { SearchForm } from './components/SearchForm';
import { Command } from './components/Command'
import { PulseAnimation } from './components/PulseAnimation';
import api from '../services/api';


export type TypeCommands = {
  shortcut: string;
  command: string;
  description: string;
  category?: string;
}
 

export function App() {


  const [commands, setCommands] = useState<TypeCommands[]>([])
  const [categories, setCategories] = useState<[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchParam, setSearchParam] = useState(["command", "shortcut", "description", "category"])

  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }


  useEffect(() => {
    api.get('/categories').then(response => setCategories(response.data))
    api.get('/commands').then(response => {
      setCommands(response.data)
      setIsLoaded(true)
    })
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
    ? commands.filter((command: Record<string, TypeCommands | string>) =>
      { return searchParam.some((item) => {
          return (
            command[item].toString()?.toLowerCase().includes(searchValue.toLocaleLowerCase())
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

                <ul className="sm:mb-3 smh:h-[calc(100vh-12.125rem)] smh:sm:h-full smh:sm:max-h-[calc(100vh-16rem)] scrollbar-thin overflow-y-scroll  scrollbar-thumb-gray-400 dark:scrollbar-thumb-zinc-700 scrollbar-thumb-rounded scrollbar-track-transparent">
                  {
                    filteredCommands.map(command => {
                      return (
                        <Command
                          key={command.shortcut + command.category}
                          shortcut={command.shortcut}
                          command={command.command}
                          description={command.description}
                          category={command.category}
                        />
                      )
                    })
                  }
                </ul>
              : 
                <div className="mb-3 smh:h-[calc(100vh-12.125rem)] smh:sm:h-[calc(100vh-16rem)]  flex items-center text-center flex-col pt-10 pb-6 px-4 sm:px-8">
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
                        commands.filter(command => command.category?.includes(category)).map(command => {
                          return (      
                            <Command
                              key={command.shortcut + command.category}
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
      <footer className="bottom-0 w-full text-right px-4 sm:px-0 bg-white sm:bg-transparent dark:bg-zinc-900 sm:dark:bg-transparent py-2">
        <a className="dark:text-zinc-200 text-xs inline-flex items-center" target="_blank" href="https://matheus7gs.me">
          Developed By&nbsp;
          <span className=" text-base text-blue-600" >Matheus7gs</span>
        </a>
      </footer>
    </div>
  )
}

