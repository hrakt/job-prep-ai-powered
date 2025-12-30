"use client"

import { ThemeToggle } from "@/components/ThemeToggle"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { SignOutButton, useClerk } from "@clerk/nextjs"
import { BrainCircuit, LogOut, User } from "lucide-react"
import { UserAvatar } from "@/components/UserAvatar"

export function Navbar({ user }: { user: { name: string, imageUrl: string } }) {
    const { openUserProfile } = useClerk()
    return (
        <nav className="h-header border-b">
            <div className="container flex h-full items-center justify-between">
                {/* Left side - Logo and App Name */}
                <Link href="/app" className="flex items-center gap-2">
                    <BrainCircuit className="size-8 text-primary" />
                    <span className="text-xl font-semibold">Landr</span>
                </Link>

                {/* Right side - Theme Toggle and User Menu */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <UserAvatar user={user} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem
                                onClick={() => openUserProfile()}
                                className="cursor-pointer"
                            >
                                <User className="mr-2" />
                                Profile
                            </DropdownMenuItem>
                            <SignOutButton>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                >
                                    <LogOut className="mr-2" />Logout
                                </DropdownMenuItem>
                            </SignOutButton>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    )
}