"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { columnType } from "@/store/use-columns"
import { taskType, useTasks } from "@/store/use-tasks"
import { CalendarIcon, Loader, Pencil, Plus } from "lucide-react"
import Image from "next/image"
import { Textarea } from "@/components/ui/textarea"


interface NewTaskSheetProps {
    children: React.ReactNode
}

export const NewTaskSheet = ({
    children
}: NewTaskSheetProps) => {

    const tasksListAtom = useTasks();
    const newTask = tasksListAtom.newTaskCreated;
    const setStatus = tasksListAtom.addStatus;
    const setPriority = tasksListAtom.addPriority;
    const setTitle = tasksListAtom.addTitle;
    const setDescription = tasksListAtom.addDescription;
    const setDeadline = tasksListAtom.addDeadline;

    console.log(newTask)

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="w-full md:min-w-[500px] lg:min-w-[670px]">
                <SheetHeader className="hidden">
                    <SheetTitle>Create task</SheetTitle>
                    <SheetDescription>Create a new task</SheetDescription>
                </SheetHeader>
                <div className="absolute top-0 py-2 px-2 right-0 lg:w-[625px] flex items-center justify-between">
                    <button>
                        <Image 
                            src={"./expand.svg"}
                            width={24}
                            height={24}
                            alt="expand"
                        />
                    </button>

                    <div className="flex items-center gap-x-2">
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
                        <Button
                            size={"lg"}
                            className="rounded-[5px] text-gray-500 font-normal px-2"
                            variant={"secondary"}
                        >
                            <p className="text-[16px]">Favorite</p>
                            <Image 
                                src={"./star.svg"}
                                alt="favourite"
                                width={24}
                                height={24}
                                className="ml-2"
                            />
                        </Button>
                    </div>
                </div>

                {/* All task form items */}
                <div className="w-full absolute top-12 left-0 pl-2 text-gray-600 space-y-2">
                    <Input 
                        className="focus:ring-0 focus:outline-0 outline-none ring-0 border-0 shadow-none focus:border-none focus-visible:ring-0 h-24 text-4xl font-semibold"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    <div className="space-y-6">
                        <div className="flex items-center pl-2">
                            <label className="flex items-center gap-x-6  md:w-36">
                                <Loader strokeWidth={1.5}/>
                                <p className="text-[16px]">Status</p>
                            </label>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"ghost"}>
                                        {newTask.status === "TODO" && "To do"}
                                        {newTask.status === "IN_PROGRESS" && "In progress"}
                                        {newTask.status === "UNDER_REVIEW" && "Under review"}
                                        {newTask.status === "FINISHED" && "Finished"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuRadioGroup value={newTask.status as string} onValueChange={(value) => setStatus(value as columnType["identifier"])}>
                                        <DropdownMenuRadioItem className="px-6" value="TODO">To do</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem className="px-6" value="IN_PROGRESS">In progress</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem className="px-6" value="UNDER_REVIEW">Under review</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem className="px-6" value="FINISHED">Finished</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center pl-2">
                            <label className="flex items-center gap-x-6 md:w-36">
                                <Image 
                                    src={"./priority.svg"}
                                    alt="priority"
                                    width={24}
                                    height={24}
                                    className="ml-"
                                />
                                <p className="text-[16px]">Priority</p>
                            </label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={"ghost"}>
                                        {newTask.priority === null ? "Not selected" : newTask.priority}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuRadioGroup value={newTask.priority as string} onValueChange={(value) => setPriority(value as taskType["priority"])}>
                                        <DropdownMenuRadioItem className="px-8" value="Low">Low</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem className="px-8" value="Medium">Medium</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem className="px-8" value="Urgent">Urgent</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="flex items-center pl-2">
                            <label className="flex items-center gap-x-6 md:w-36">
                                <CalendarIcon strokeWidth={1.5}/>
                                <p className="text-[16px]">Deadline</p>
                            </label>

                            <Popover>
                                <PopoverTrigger className="px-4 text-sm font-medium">
                                    {newTask.deadline === null ? "Not selected" : newTask.deadline.toDateString()}
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar 
                                        mode="single"
                                        disabled={(date) => date < new Date()}
                                        onSelect={(date: Date | undefined) => setDeadline(date as Date)}
                                    />
                                </PopoverContent>
                            </Popover>
                            
                        </div>

                        <div className="flex items-start pl-2">
                            <label className="flex items-center gap-x-6 md:w-36 pt-2">
                                <Pencil strokeWidth={1.5}/>
                                <p className="text-[16px]">Description</p>
                            </label>

                            <div className="pr-2 pl-4 w-full">
                                <Textarea
                                    className="focus:ring-0 focus:outline-0 outline-none ring-0 border-0 shadow-none focus:border-none focus-visible:ring-0 h-6"
                                    placeholder="Not selected"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div role="button" className="flex items-center gap-x-2 pt-4 pl-2 text-black">
                        <Plus className="h-6 w-6 mr-2"/>
                        <p>Add custom property</p>
                    </div>

                    <div className="py-4 pr-2">
                        <Separator />
                    </div>

                    <div className="pl-2 text-gray-600">
                        <p>Start writing, or drag your own files here.</p>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}