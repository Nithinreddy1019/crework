import { Button } from "@/components/ui/button"
import { columnType } from "@/store/use-columns"
import { useTasks } from "@/store/use-tasks"
import { Plus } from "lucide-react"
import Image from "next/image"
import { TaskItem } from "./task-item"



interface ColumnContainerProps {
    column: columnType
}


export const ColumnContainer = ({
    column
}: ColumnContainerProps) => {

    const tasksListAtom = useTasks();
    const alltasks = tasksListAtom.tasksLists
    const tasks = alltasks.filter((task) => (task.status === column.identifier));
    
    return (
        <div className="min-w-72 flex flex-col items-center gap-y-2">
            <div className="flex items-center justify-between w-full text-gray-500">
                <p className="text-lg">{column.name}</p>
                <button>
                    <Image 
                        src={"./filtertasks.svg"}
                        alt="filter tasks"
                        width={24}
                        height={24}
                    />
                </button>
            </div>

            <div className="flex-1 w-full flex flex-col items-center gap-y-2">

                <div className="w-full">
                    {tasks.map((task) => (
                        <TaskItem 
                            key={task.id}
                            task={task}
                        />
                    ))}
                </div>

                <Button
                    className="w-full flex items-center justify-between bg-gradient-to-t from-gray-900 hover:from-black hover:to-gray-700 to-gray-700 px-3 rounded-[8px]"
                    size={"lg"}
                >
                    <p className="text-[18px] font-light">Add new</p>
                    <Plus  className="h-5 w-5"/>
                </Button>
            </div>
        </div>
    )
}