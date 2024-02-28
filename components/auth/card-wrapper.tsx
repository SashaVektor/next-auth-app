"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { BackButton } from "./back-button"
import { Header } from "./header"
import { Social } from "./socail"

interface CardWrapperProps {
    children: React.ReactNode
    header: string
    backButtonLabel: string
    backButtonHref: string
    showSocial?: boolean
}

export const CardWrapper = ({
    backButtonHref, backButtonLabel,
    children, header, showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <Header label={header} />
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial ? (
                <CardFooter>
                    <Social />
                </CardFooter>
            ) : null}
            <CardFooter>
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}