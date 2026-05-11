"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, BookOpen, GraduationCap, Briefcase, FileText, LayoutDashboard, Settings, User } from "lucide-react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"

export function GlobalSearchCommand() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 rounded-full bg-secondary/80 px-4 py-2 text-sm text-muted-foreground ring-1 ring-border/50 transition-colors hover:bg-secondary hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => runCommand(() => router.push("/master-thesis"))}>
              <BookOpen className="mr-2 h-4 w-4 text-primary" />
              <span>Master's Thesis</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/phd-positions"))}>
              <GraduationCap className="mr-2 h-4 w-4 text-primary" />
              <span>PhD Positions</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/trainee-programs"))}>
              <Briefcase className="mr-2 h-4 w-4 text-primary" />
              <span>Trainee Programs</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Account">
            <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
              <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/profile/edit"))}>
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Profile</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
