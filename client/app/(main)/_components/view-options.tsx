import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, EllipsisVertical, Plus, Search } from "lucide-react"
import Image from "next/image"
import { NewTaskSheet } from "./new-task-sheet"



export const ViewOptions = () => {
    return (
        <div className="flex items-center justify-between gap-x-2 ">
            <div className="flex items-center gap-x-2 bg-white rounded-[5px] border">
                <input 
                    placeholder="Search"
                    className="p-2 rounded-sm focus:outline-none"
                />
                <button className="hover:bg-gray-100 py-2 pl-2">
                    <Search 
                        strokeWidth={1}
                        className="mr-2 h-6 w-6"
                    />
                </button>
            </div>

            <div className="hidden xl:flex items-center gap-x-4">
                <Button
                    size={"lg"}
                    className="rounded-[5px] text-gray-500 font-normal px-2"
                    variant={"secondary"}
                >
                    <p className="text-[16px]">Calendar view</p>
                    <Calendar className="h-6 w-6 ml-2" strokeWidth={1}/>
                </Button>
                <Button
                    size={"lg"}
                    className="rounded-[5px] text-gray-500 font-normal px-2"
                    variant={"secondary"}
                >
                    <p className="text-[16px]">Automation</p>
                    <Image 
                        src={"./automation.svg"}
                        alt="automation"
                        width={24}
                        height={24}
                        className="ml-2"
                    />
                </Button>
                <Button
                    size={"lg"}
                    className="rounded-[5px] text-gray-500 font-normal px-2"
                    variant={"secondary"}
                >
                    <p className="text-[16px]">Filter</p>
                    <Image 
                        src={"./filter.svg"}
                        alt="filter"
                        width={24}
                        height={24}
                        className="ml-2"
                    />
                </Button>
                <Button
                    size={"lg"}
                    className="rounded-[5px] text-gray-500 font-normal px-2"
                    variant={"secondary"}
                >
                    <p className="text-[16px]">Share</p>
                    <Image 
                        src={"./share.svg"}
                        alt="share"
                        width={24}
                        height={24}
                        className="ml-2"
                    />
                </Button>

                <NewTaskSheet>
                    <Button
                        size={"lg"}
                        className="px-2 rounded-[5px] text-[16px]"
                    >
                        <p>Create new</p>
                        <Plus className="h-4 w-4 ml-2 bg-white rounded-full text-primary" />
                    </Button>
                </NewTaskSheet>
            </div>


            <div className="xl:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="rounded-[5px] w-48 text-gray-600">
                        <DropdownMenuItem className="h-10">
                            <Button 
                                className="rounded-[5px] w-full justify-start"
                                variant={"ghost"}
                            >
                                <Calendar strokeWidth={1} className="mr-2 "/>
                                <p>Calendar view</p>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-10">
                            <Button 
                                className="rounded-[5px] w-full justify-start"
                                variant={"ghost"}
                            >
                                <Image 
                                    src={"./automation.svg"}
                                    alt="automation"
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                />
                                <p>Automation</p>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-10">
                            <Button 
                                className="rounded-[5px] w-full justify-start"
                                variant={"ghost"}
                            >
                                <Image 
                                    src={"./filter.svg"}
                                    alt="filter"
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                />
                                <p>Filter</p>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="h-10">
                            <Button 
                                className="rounded-[5px] w-full justify-start"
                                variant={"ghost"}
                            >
                                <Image 
                                    src={"./share.svg"}
                                    alt="share"
                                    width={24}
                                    height={24}
                                    className="mr-2"
                                />
                                <p>Share</p>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                            <NewTaskSheet>
                                <Button
                                    size={"lg"}
                                    className="px-2 rounded-[5px] text-[16px] w-full"
                                >
                                    <p>Create new</p>
                                    <Plus className="h-4 w-4 ml-2 bg-white rounded-full text-primary" />
                                </Button>
                            </NewTaskSheet>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}