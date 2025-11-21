

export default function Hero() {
  return(
    <div className="flex flex-col justify-center items-center">
      <img src="images/wordol_logo.png" className="h-20 w-20 mb-4"/>
      <h1 className="text-5xl md:text-6xl font-martires-black mb-4">
        Wordol
      </h1>
      <p className="font-martires-semibold text-3xl lg:text-4xl text-center max-w-80 lg:max-w-96 mb-8">
        YOU HAVE 6 TRIES TO GUESS A FIVE-LETTER BISAYA WORD.
      </p>
    </div>
  )
}