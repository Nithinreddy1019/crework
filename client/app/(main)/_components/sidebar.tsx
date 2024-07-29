"use client"

import { Profile } from "./profile"
import { useState } from "react"
import { SidebarButton } from "./sidebar-button"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useSidebar } from "@/store/use-sidebar-hook"
import { cn } from "@/lib/utils"
import { sidebarButtonsList } from "@/lib/constants"



export const Sidebar = () => {

    const router = useRouter();
    const pathname = usePathname();

    const [active, setActive] = useState(true);

    const sidebarAtom = useSidebar();

    return (
        <div className={cn("hidden w-full sm:flex flex-col h-full items-center justify-between px-2 py-4 min-w-64", sidebarAtom.isExpanded ? "flex" : "")}>
            <div className="flex flex-col w-full">
                <Profile />
            </div>
            <div className="w-full py-4 flex-1">
                {/* //For Bottom element - Download */}
                {sidebarButtonsList.map((item) => (
                    <SidebarButton 
                        key={item.name}
                        icon={item.icon}
                        name={item.name}
                        isActive={pathname === `/${item.name.toLocaleLowerCase()}`}
                        onClick={() => {router.push(`/${item.name.toLocaleLowerCase()}`)}}
                    />
                ))}

                <Button
                    className="w-full flex items-center gap-x-2 py-2 rounded-[7px]" size="lg"
                >
                    <p className="text-[17px]">Create new task</p>
                    <div className="rounded-full">
                        <Plus className="h-4 w-4 bg-white text-primary rounded-full"/>
                    </div>
                </Button>
            </div>

            <div className="flex items-center gap-x-2 bg-gray-100 py-2 px-2 rounded-[5px] w-full" role="button">
                <div>
                    <Image 
                        src={"./download.svg"}
                        height={35}
                        width={35}
                        alt="Download"
                    />
                </div>
                <div className="font-light text-gray-600 leading-1">
                    <h3 className="text-lg font-medium">Download the app</h3>
                    <p className="text-xs">Get the full experience</p>
                </div>
            </div>
        </div>
    )
}