"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from "next/link"


interface AuthFormWrapperProps {
    headerLabel: string,
    subHeaderLabel: string,
    backButtonLabel: string,
    backButtonLinkLabel: string,
    backButtonHref: string,
    children: React.ReactNode
}

export const AuthFormWrapper = ({
    headerLabel,
    subHeaderLabel,
    backButtonLabel,
    backButtonLinkLabel,
    backButtonHref,
    children
}: AuthFormWrapperProps) => {
    return (
        <Card className="py-4 min-w-[350px] flex flex-col items-center space-y-4 border-none bg-white/75">
            <CardHeader>
                <div className="flex flex-col items-center gap-y-2">
                    <h1 className="text-2xl md:text-4xl font-semibold">{headerLabel}</h1>
                    <p className="">{subHeaderLabel}</p>
                </div>
            </CardHeader>
            <CardContent className="w-full">
                {children}
            </CardContent>
            <CardFooter>
                <div className="flex items-center gap-x-1.5 text-sm">
                    <p>{backButtonLabel}</p>
                    <Link 
                        href={backButtonHref}
                        className="text-primary"
                    >
                        {backButtonLinkLabel}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}