"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Building2, GraduationCap, Code2, Cpu, Globe, Database, Briefcase, Atom } from "lucide-react"

// Real-world placeholder brand data
const brands = [
  { name: "KTH Royal Institute", icon: GraduationCap },
  { name: "Ericsson", icon: Cpu },
  { name: "Spotify", icon: Globe },
  { name: "Volvo Group", icon: Building2 },
  { name: "Klarna", icon: Code2 },
  { name: "Lund University", icon: GraduationCap },
  { name: "IKEA", icon: Briefcase },
  { name: "Northvolt", icon: Atom },
  { name: "CERN", icon: Database },
  { name: "Chalmers", icon: GraduationCap },
]

export function TrustedMarquee() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-24 w-full bg-background" />

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-y border-border/40 bg-background/50 py-10 backdrop-blur-md">
      <div className="absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      <p className="mb-8 text-center text-sm font-semibold tracking-widest text-muted-foreground uppercase">
        Trusted by 120+ Universities & Companies Worldwide
      </p>

      <div className="group pause-on-hover flex w-full overflow-hidden">
        {/* First Marquee Track */}
        <div className="animate-marquee flex min-w-max shrink-0 items-center gap-16 pr-16">
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-center gap-3 opacity-40 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            >
              <brand.icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="text-lg font-bold text-muted-foreground transition-colors group-hover:text-foreground">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
        {/* Duplicate Marquee Track for Seamless Loop */}
        <div className="animate-marquee flex min-w-max shrink-0 items-center gap-16 pr-16" aria-hidden="true">
          {brands.map((brand, i) => (
            <div
              key={`dup-${i}`}
              className="flex cursor-pointer items-center gap-3 opacity-40 grayscale transition-all duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0 hover:drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]"
            >
              <brand.icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
              <span className="text-lg font-bold text-muted-foreground transition-colors group-hover:text-foreground">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
