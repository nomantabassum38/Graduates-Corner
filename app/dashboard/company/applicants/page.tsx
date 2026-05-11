"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Users, Loader2, CheckCircle, XCircle, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApplicantsPage() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchApplicants = async () => {
      if (!user) return
      setLoading(true)

      const { data, error } = await supabase
        .from('applications')
        .select(`
          id,
          status,
          created_at,
          user_id,
          users:user_id (name, email),
          theses (id, title, posted_by_user_id, organization),
          trainee_programs (id, title, posted_by_user_id, company)
        `)
        .order('created_at', { ascending: false })

      if (data && !error) {
        // Filter applications that belong to this organization
        const myApplicants = data.filter((app: any) => {
          const isThesisMine = app.theses && (app.theses.posted_by_user_id === user.id || app.theses.organization === user.organization)
          const isProgramMine = app.trainee_programs && (app.trainee_programs.posted_by_user_id === user.id || app.trainee_programs.company === user.organization)
          return isThesisMine || isProgramMine
        })
        setApplications(myApplicants)
      }
      setLoading(false)
    }

    fetchApplicants()
  }, [user, supabase])

  const handleStatusChange = async (appId: string, newStatus: string) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app))
    await supabase.from('applications').update({ status: newStatus }).eq('id', appId)
    
    // Optional: Create notification for the student
    const app = applications.find(a => a.id === appId)
    if (app) {
      const title = app.theses ? app.theses.title : app.trainee_programs.title
      const org = app.theses ? app.theses.organization : app.trainee_programs.company
      await supabase.from('notifications').insert({
        user_id: app.user_id,
        title: `Application Status Updated`,
        message: `Your application for ${title} at ${org} is now ${newStatus}.`,
        link: '/dashboard/student/applied'
      })
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Applicants</h1>
          <p className="text-sm text-muted-foreground">Manage applications for your posted opportunities</p>
        </div>
        <Badge variant="outline" className="h-7 gap-1.5 px-3 font-medium">
          <Users className="h-3.5 w-3.5 text-primary" />
          {applications.length} Applicants
        </Badge>
      </div>

      {loading ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : applications.length > 0 ? (
        <div className="flex flex-col gap-4">
          {applications.map((app) => {
            const postTitle = app.theses ? app.theses.title : app.trainee_programs?.title
            const postType = app.theses ? "Thesis" : "Trainee Program"
            
            return (
              <Card key={app.id}>
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{app.users?.name || 'Anonymous User'}</h3>
                      <Badge variant="secondary" className="text-[10px]">{postType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{app.users?.email}</p>
                    <p className="text-sm font-medium">Applied for: <span className="text-primary">{postTitle}</span></p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Applied on {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Select value={app.status || 'pending'} onValueChange={(val) => handleStatusChange(app.id, val)}>
                      <SelectTrigger className="w-[140px] h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <span className="flex items-center gap-2 text-muted-foreground"><Clock className="w-3.5 h-3.5" /> Pending</span>
                        </SelectItem>
                        <SelectItem value="reviewing">
                          <span className="flex items-center gap-2 text-blue-500"><Users className="w-3.5 h-3.5" /> Reviewing</span>
                        </SelectItem>
                        <SelectItem value="accepted">
                          <span className="flex items-center gap-2 text-emerald-500"><CheckCircle className="w-3.5 h-3.5" /> Accepted</span>
                        </SelectItem>
                        <SelectItem value="rejected">
                          <span className="flex items-center gap-2 text-destructive"><XCircle className="w-3.5 h-3.5" /> Rejected</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="border-dashed py-12">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/5">
              <Users className="h-10 w-10 text-primary/20" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No applicants yet</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              When students apply to your positions, they will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
