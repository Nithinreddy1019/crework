import { cn } from "@/lib/utils"
import { taskType } from "@/store/use-tasks"


interface PriorityTagProps {
    priorityLabel: taskType["priority"]
}

export const PriorityTag = ({
    priorityLabel
}: PriorityTagProps) => {
    return(
        <div
            className={cn("bg-gray-300 w-fit py-1.5 px-3 text-white rounded-sm text-xs", 
                priorityLabel === "Low" && "bg-green-500",
                priorityLabel === "Medium" && "bg-yellow-500",
                priorityLabel === "Urgent" && "bg-red-500"
            )}
        >
            {priorityLabel}
        </div>
    )
}