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

  const { data: thesis } = await supabase
    .from('theses')
    .select('title, description, organization, type')
    .eq('id', id)
    .single()

  if (!thesis) {
    return {
      title: "Thesis Not Found | GraduatesCorner",
    }
  }

  const thesisType = thesis.type === "phd" ? "PhD Position" : "Master's Thesis"

  return {
    title: `${thesis.title} - ${thesis.organization} | GraduatesCorner`,
    description: thesis.description.substring(0, 160) + "...",
    openGraph: {
      title: `${thesis.title} - ${thesis.organization}`,
      description: thesis.description.substring(0, 160) + "...",
      type: 'website',
    },
  }
}

export default function ThesisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
