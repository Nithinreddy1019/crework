import { create } from "zustand";



export type columnType = {
    id: string,
    name: string,
    identifier: "TODO" | "IN_PROGRESS" | "UNDER_REVIEW" | "FINISHED"
}

type columnsStoreAtom = {
    columnsList: columnType[],
}


export const useColumns = create<columnsStoreAtom>((set, get) => ({
    columnsList: [
        {
            id: "1",
            name: "To do",
            identifier: "TODO"
        }, 
        {
            id: "2",
            name: "In progress",
            identifier: "IN_PROGRESS"
        },
        {
            id: "3",
            name: "Under review",
            identifier: "UNDER_REVIEW"
        },
        {
            id: "4",
            name: "Finished",
            identifier: "FINISHED"
        }
    ],
}))