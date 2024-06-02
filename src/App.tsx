import { SearchForm } from './components/SearchForm';
import { PulseAnimation } from './components/PulseAnimation';
import { Footer } from './components/Footer';
import { FilteredCommandsList } from './components/FilteredCommandsList';
import { CommandsList } from './components/CommandsList';
import { useFilter } from './contexts/FilterContext';
 
export function App() {
  const { 
    commands, 
    categories, 
    searchValue, 
    isLoaded,
    filteredCommands, 
  } = useFilter()

  return (

    <div className=" min-h-screen bg-gray-100 dark:bg-black flex flex-col w-full justify-between items-center 1sm:pt-10">

      <main className=" bg-white dark:bg-zinc-900 text-gray-500 w-full rounded-none 1sm:rounded-3xl sm:shadow-xl sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">

        <SearchForm /> 

        { !isLoaded && 
          <PulseAnimation />
        }
        
        { isLoaded && searchValue.length > 0 ? (
            <FilteredCommandsList filteredCommands={filteredCommands} />
          ) : ( isLoaded &&
            <CommandsList categories={categories} commands={commands} />
          )
        } 
      </main>

      <Footer />
    </div>
  )
}

