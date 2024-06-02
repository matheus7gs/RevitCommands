import { TypeCommands } from "../types/type-commands"
import { CommandItem } from "./CommandItem"
import { CommandNotFound } from "./commandNotFound"

type FilteredCommandsType = {
  filteredCommands: TypeCommands[],
} 
 
export function FilteredCommandsList({ filteredCommands }: FilteredCommandsType) {
  return (
    <>
      {filteredCommands.length > 0 ? 
    
        <ul className="sm:mb-3 smh:h-[calc(100vh-11.5625rem)] smh:sm:h-full smh:sm:max-h-[calc(100vh-15rem)] scrollbar-thin overflow-y-scroll overflow-x-hidden scrollbar-thumb-gray-400 dark:scrollbar-thumb-zinc-700 scrollbar-thumb-rounded scrollbar-track-transparent">
          { 
            filteredCommands.map(command => {
              return (
                <CommandItem
                  key={command.shortcut + command.command}
                  shortcut={command.shortcut}
                  command={command.command}
                  description={command.description}
                  path={command.path}
                  categories={command.categories}
                />
              )
            })
          }
        </ul>
      : 
        <CommandNotFound />
      }
    </>
  )
}