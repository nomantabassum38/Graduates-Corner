import { Metadata, ResolvingMetadata } from "next"
import { createClient } from "@/lib/supabase/server"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()

  const { data: program } = await supabase
    .from('trainee_programs')
    .select('title, description, company')
    .eq('id', id)
    .single()

  if (!program) {
    return {
      title: "Program Not Found | GraduatesCorner",
    }
  }

  return {
    title: `${program.title} at ${program.company} | GraduatesCorner`,
    description: program.description.substring(0, 160) + "...",
    openGraph: {
      title: `${program.title} - ${program.company}`,
      description: program.description.substring(0, 160) + "...",
      type: 'website',
    },
  }
}

export default function TraineeProgramLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
