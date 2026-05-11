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

      <div className="flex w-full overflow-hidden">
        <motion.div
          className="flex min-w-full shrink-0 items-center justify-around gap-12 px-6"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
        >
          {/* First set of brands */}
          {brands.map((brand, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 opacity-40 transition-all duration-300 hover:opacity-100 grayscale hover:grayscale-0"
            >
              <brand.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-lg font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless looping */}
          {brands.map((brand, i) => (
            <div
              key={`dup-${i}`}
              className="group flex items-center gap-3 opacity-40 transition-all duration-300 hover:opacity-100 grayscale hover:grayscale-0"
            >
              <brand.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-lg font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
