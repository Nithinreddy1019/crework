"use client"

import { useSidebar } from "@/store/use-sidebar-hook";
import { CircleHelp, Menu } from "lucide-react";
import { Barlow } from "next/font/google"
import Image from "next/image";

const barlow = Barlow({weight: ["600"], subsets: ["latin"]});

export const Header = () => {

    const sidebarAtom = useSidebar();

    return (
        <div className="flex items-center gap-x-2">
            <div className="sm:hidden" role="button" onClick={() => sidebarAtom.onToggle()}>
                <Menu />
            </div>
            <div className="w-full flex justify-between items-center py-2">
                <h1 className={`text-lg sm:text-4xl font-semibold leading-none md:leading-normal ${barlow.className}`}>
                    Good morning, Username!
                </h1>

                <div className="flex items-center sm:gap-x-2" role="button">
                    <p className="text-xs sm:text-sm truncate sm:text-nowrap">Help & feedback</p>
                    <Image 
                        src={"./question.svg"}
                        alt="svg"
                        height={18}
                        width={18}
                    />
                </div>
            </div>
        </div>
    )
}