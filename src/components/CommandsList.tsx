import { TypeCommands } from "../types/type-commands"
import { CommandItem } from "./CommandItem"

type FilteredCommandsType = {
  commands: TypeCommands[],
  categories: string[],
}

export function CommandsList({ commands, categories }: FilteredCommandsType) {
  return (
    <div className="pb-5">
      {
        categories.map(category => { 
          return (
            <div key={category}>
              <h3  className="1sm:mx-8 mx-4 pb-2 pt-4 text-black dark:text-zinc-100 font-medium text-lg border-b border-gray-300 dark:border-zinc-700">
                  {category}
              </h3>
              <ul>
                {
                  commands.filter(command => command.categories?.includes(category)).map(command => {
                    return (      
                      <CommandItem
                        key={command.shortcut + command.command}
                        shortcut={command.shortcut}
                        command={command.command}
                        path={command.path}
                        description={command.description}
                      />                          
                    )
                  })
                }
              </ul>
            </div>
          )
        }) 
      }
    </div>
  )
}