import { Metadata, ResolvingMetadata } from "next"
import { createClient } from "@/lib/supabase/server"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, cover_image')
    .eq('slug', slug)
    .single()

  if (!post) {
    return {
      title: "Blog Post Not Found | GraduatesCorner",
    }
  }

  return {
    title: `${post.title} | GraduatesCorner Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: post.cover_image ? [{ url: post.cover_image }] : [],
    },
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
