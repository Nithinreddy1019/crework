import { Button } from "@/components/ui/button"
import { BellDot, ChevronsRight, Loader } from "lucide-react"


export const Profile = () => {

    // WIP: Make it dynamic
    return (
        <div className=" flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
                <div className="h-8 w-8 rounded-md bg-gray-300 flex items-center justify-center">
                    <p>U</p>
                </div>

                <p className="font-semibold">Username</p>
            </div>

            <div className="flex items-center justify-between w-full">
                <div className="flex items-center px-1 gap-x-4">
                    <div role="button">
                        <BellDot className="h-5 w-5" absoluteStrokeWidth strokeWidth={1}/>
                    </div>
                    <div className="relative" role="button">
                        <Loader className="h-5 w-5" absoluteStrokeWidth strokeWidth={1}/>
                        <div className="h-2 w-2 rounded-full bg-yellow-500 absolute top-0 right-0"/>
                    </div>
                    <div role="button">
                        <ChevronsRight className="h-5 w-5" absoluteStrokeWidth strokeWidth={1}/>
                    </div>
                </div>

                <div>
                    <Button 
                        variant={"secondary"}
                        size={"sm"}
                        className="rounded-[5px]">
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}