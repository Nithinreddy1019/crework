import { PriorityTag } from "@/components/priority-tag"
import { taskType } from "@/store/use-tasks"
import { Clock3 } from "lucide-react"

interface TaskItemProps {
    task: taskType
}

export const TaskItem = ({
    task
}: TaskItemProps) => {

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };


    function getTimeDifference(date1: Date, date2: Date): string {
        // Calculate the difference in milliseconds
        const diffMs = Math.abs(date2.getTime() - date1.getTime());
        
        // Convert milliseconds to hours
        const diffHours = diffMs / (1000 * 60 * 60);
        
        if (diffHours < 24) {
            // If less than 24 hours, return in hours
            return `${Math.floor(diffHours)} hr ago`;
        } else {
            // If 24 hours or more, calculate days and remaining hours
            const days = Math.floor(diffHours / 24);
            const remainingHours = Math.floor(diffHours % 24);
            
            if (remainingHours === 0) {
                return `${days} day${days > 1 ? 's' : ''} ago`;
            } else {
                return `${days} day${days > 1 ? 's' : ''} & ${remainingHours} hour${remainingHours > 1 ? 's' : ''} ago`;
            }
        }
    }

    
    return (
        <div className="w-full p-4 bg-gray-100 rounded-[8px] border text-gray-600 space-y-3">
            <div className="space-y-1">
                <h1 className="text-[16px] font-medium">
                    {task.title}
                </h1>
                {task.description && (
                    <p className=" leading-tight text-sm">
                        {task.description}
                    </p>
                )}
            </div>

            <div className="">
                <PriorityTag 
                    priorityLabel={task.priority}
                />
            </div>

            <div className="flex items-center gap-x-2">
                <Clock3 strokeWidth={1.5}/>
                <p className="text-sm font-medium">{formatDate(task.deadline)}</p>
            </div>

            <p className="text-sm font-medium">{getTimeDifference(task.deadline, task.createdAt as Date)}</p>
        </div>
    )
}