import { useColumns } from "@/store/use-columns"
import { ColumnContainer } from "./column-container";


export const Kanban = () => {
    
    const columnsStoreAtom = useColumns();
    const columnsList = columnsStoreAtom.columnsList;
    
    return (
        <div className="h-full w-full flex gap-x-4 px-1">
            
            {columnsList.map((column) => (
                <ColumnContainer 
                    key={column.id}
                    column={column}
                />
            ))}

        </div>
    )
}