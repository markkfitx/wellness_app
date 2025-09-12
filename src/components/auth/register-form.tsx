'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    dob: '',
    age: '',
    gender: '',
    fitness_goal: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { email, password, ...profile } = form

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error || !data.user) {
      setError(error?.message || 'Something went wrong.')
      setLoading(false)
      return
    }

    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: data.user.id,
        email,
        
        ...profile,
      },
    ])

    if (profileError) {
      setError(profileError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <h2 className="text-xl font-semibold">Create your account</h2>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input name="email" type="email" required onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" type="password" required onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input name="first_name" required onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input name="last_name" required onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input name="dob" type="date" required onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input name="age" type="number" required onChange={handleChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <select name="gender" className="border rounded px-2 py-1" required onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fitness_goal">Fitness Goal</Label>
              <Input name="fitness_goal" required onChange={handleChange} />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
