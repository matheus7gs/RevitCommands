import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { TypeCommands } from "../types/type-commands"
import api from "../../services/api"

type FilterContextType = {
  commands: TypeCommands[],
  categories: string[],
  searchValue: string
  filterBy: string[]
  isLoaded: boolean,
  filteredCommands: TypeCommands[],
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  setFilterBy: React.Dispatch<React.SetStateAction<string[]>>,
  filterCommands: () => void,
}

const FilterContext = createContext({} as FilterContextType)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [commands, setCommands] = useState<TypeCommands[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [filterBy, setFilterBy] = useState<string[]>(["command", "shortcut", "description", "categories"])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [filteredCommands, setFilteredCommands] = useState<TypeCommands[]>([])

  useEffect(() => {

    Promise.all([
      api.get('/categories').then(response => setCategories(response.data)),
      api.get('/commands').then(response => {
        setCommands(response.data)
        setIsLoaded(true)
      })
    ]).catch((error) => {
      return new Error(error)
    });
  }, []) 

  function filterCommands() {
    if (searchValue.length > 0) {
      const filteredCommands = commands.filter((
        command: Record<string, 
        TypeCommands | string | string[]>
      ) => { 
        return filterBy.some((item) => {
          return ( 
            command[item].toString()?.toLowerCase().includes(searchValue.toLowerCase())
          ) 
        }
      )})

      setFilteredCommands(filteredCommands)
    } else {
      setFilteredCommands([])
    }
  }

  useEffect(() => {
    filterCommands()
  }, [filterBy, searchValue])

  return (
    <FilterContext.Provider value={{ 
      filterCommands, 
      filteredCommands, 
      commands,
      categories,
      isLoaded,
      searchValue,
      filterBy,
      setFilterBy,
      setSearchValue,
    }} >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)