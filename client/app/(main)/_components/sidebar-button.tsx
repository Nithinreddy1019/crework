"use client"

import Image from "next/image"


interface SidebarButtonProps {
    isActive: boolean,
    name: string,
    icon: string
    onClick: () => void
}


export const SidebarButton = ({
    isActive,
    icon,
    name,
    onClick
}: SidebarButtonProps) => {
    return (
        <button
            className={`px-2 w-full py-1.5 flex items-center gap-x-4 text-gray-600 hover:bg-gray-100 transition-colors duration-200 rounded-[5px] mb-2 ${isActive && "bg-gray-100 border-2"}`}
            onClick={onClick}
        >
            <Image 
                src={icon}
                height={22}
                width={22}
                alt={name}
            />
            <p className="text-[17px]">{name}</p>
         </button>
    )
}