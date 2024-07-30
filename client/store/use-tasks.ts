import { create } from "zustand";
import { columnType } from "./use-columns";

export type taskType = {
    id: string,
    title: string,
    description?: string,
    status: columnType["identifier"],
    priority: "Low" | "Medium" | "Urgent",
    deadline: Date,
    createdAt?: Date
};


export interface NewTask {
    id: string | null;
    title: string | null;
    description: string | null;
    status: 'TODO' | 'IN_PROGRESS' | 'UNDER_REVIEW' | 'FINISHED' | null;
    priority: 'Low' | 'Medium' | 'Urgent' | null;
    deadline: Date | null;
    createdAt: Date | null;
}


type tasksListAtom = {
    tasksLists: taskType[],
    newTaskCreated: NewTask,
    addTitle: (title: string) => void,
    addDescription: (description: string) => void,
    addStatus: (status: columnType["identifier"]) => void,
    addPriority: (priority: taskType["priority"]) => void,
    addDeadline: (deadline: Date) => void,
    addNewtask: (task: NewTask) => void,
};


export const useTasks = create<tasksListAtom>((set, get) => ({
    tasksLists: [{
        id: "asdasd",
        title: "dummty",
        description: "somehting silly is being writtenn by me.Why? I have no godadamn idea.",
        status: "TODO",
        priority: "Low",
        deadline: new Date(),
        createdAt: new Date("2024-7-30")
    }],
    newTaskCreated: {
        id: null,
        title: null,
        description: null,
        status: "TODO",
        priority: null,
        deadline: null,
        createdAt: null
    },
    addTitle: (title: string) => set(state => ({
        newTaskCreated: {
            ...state.newTaskCreated,
            title: title
        }
    })),
    addDescription: (description: string) => set(state => ({
        newTaskCreated: {
            ...state.newTaskCreated,
            description: description
        }
    })),
    addStatus: (status: columnType["identifier"]) => set(state => ({
        newTaskCreated: {
            ...state.newTaskCreated,
            status: status
        }
    })),
    addPriority: (priority: taskType["priority"]) => set(state => ({
        newTaskCreated: {
            ...state.newTaskCreated,
            priority: priority
        }
    })),
    addDeadline: (deadline: Date) => set(state => ({
        newTaskCreated: {
            ...state.newTaskCreated,
            deadline: deadline
        }
    })),
    addNewtask: (task: NewTask) => set(state => ({
        tasksLists: {
            ...state.tasksLists,
            task
        }
    }))
}))