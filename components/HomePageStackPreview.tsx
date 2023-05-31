export const HomePageStackPreview = ({stack} : {stack : any}) => {
  return (
    <div className="h-[200px]  md:h-[250px]  relative cursor-pointer  hover:scale-110 duration-500 aspect-[3/2]">
      <div className="absolute w-full h-full border translate-x-4 translate-y-4  rounded-lg border-4"></div>
      <div
        className="z-[5] absolute w-full h-full border translate-x-2 translate-y-2  rounded-lg  border-4 bg-primary-foreground "></div>
      <div className="z-[10] absolute p-4 flex items-center justify-center w-full rounded-lg h-full bg-primary-foreground
     border-4">
        <h1 className="capitalize text-3xl font-bold tracking-wide ">{stack.title}</h1>
      </div>
    </div>
  )
}
