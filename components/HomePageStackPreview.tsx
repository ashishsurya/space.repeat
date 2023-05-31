import {Models} from "appwrite";
import {useRecoilState} from "recoil";
import {StackViewDialog} from "@/components/dialogs/StackViewDialog";

export const HomePageStackPreview = ({stack}: { stack: Models.Document }) => {


  return (
    <StackViewDialog>
      <div tabIndex={0}
           className="relative  aspect-[3/2]  w-[300px] cursor-pointer  duration-500 hover:scale-110 group focus:scale-110  md:w-[250px] ">
        <div
          className="absolute h-full w-full translate-x-4 translate-y-4 rounded-lg border-2 border-black dark:border-white group-focus:border-green-400"></div>
        <div
          className="absolute z-[5] h-full w-full translate-x-2 translate-y-2 rounded-lg  border-2 border-black bg-primary-foreground group-focus:border-green-400 dark:border-white "></div>
        <div className="absolute z-[10] flex h-full w-full items-center justify-center rounded-lg border-2 border-black bg-primary-foreground p-4 group-focus:border-green-400
     dark:border-white">
          <h1 className="text-3xl font-bold capitalize tracking-wide ">{stack.title}</h1>
        </div>
      </div>
    </StackViewDialog>
  )
}