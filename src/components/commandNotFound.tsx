
export function CommandNotFound() {
  return (
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
  )
}

