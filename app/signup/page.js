'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, Palette } from 'lucide-react'

const themes = {
  quantum: {
    name: "Quantum Flux",
    background: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800",
    card: "bg-indigo-950/40 text-blue-100 border border-purple-500/50",
    button: "bg-purple-600 hover:bg-purple-700 text-white",
    input: "bg-indigo-900/30 border-purple-500/50 text-blue-100 placeholder-blue-300/50",
  },
  neuralNet: {
    name: "Neural Network",
    background: "bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-700",
    card: "bg-slate-900/60 text-slate-100 border border-slate-600/50",
    button: "bg-sky-600 hover:bg-sky-700 text-white",
    input: "bg-slate-800/40 border-slate-600/50 text-slate-100 placeholder-slate-400/70",
  },
  biotech: {
    name: "Biotech Fusion",
    background: "bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700",
    card: "bg-emerald-950/40 text-emerald-100 border border-teal-500/50",
    button: "bg-teal-600 hover:bg-teal-700 text-white",
    input: "bg-emerald-900/30 border-teal-500/50 text-emerald-100 placeholder-emerald-300/50",
  },
  cosmicAI: {
    name: "Cosmic AI",
    background: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    card: "bg-slate-950/60 text-purple-100 border border-purple-700/50",
    button: "bg-purple-700 hover:bg-purple-800 text-white",
    input: "bg-slate-900/40 border-purple-700/50 text-purple-100 placeholder-purple-300/50",
  },
  techMinimal: {
    name: "Tech Minimal",
    background: "bg-gradient-to-br from-zinc-100 via-stone-100 to-zinc-200",
    card: "bg-white/80 text-zinc-800 border border-zinc-300",
    button: "bg-zinc-800 hover:bg-zinc-900 text-white",
    input: "bg-zinc-100 border-zinc-300 text-zinc-800 placeholder-zinc-500",
  },
}

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  })
  const [error, setError] = useState('')
  const [currentTheme, setCurrentTheme] = useState('quantum')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Sign up failed')
      }
      
      router.push('/signin')
    } catch (err) {
      setError('Failed to create account')
    }
  }

  const theme = themes[currentTheme]

  return (
    <div className={`flex min-h-screen items-center justify-center ${theme.background} transition-colors duration-500`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`w-[400px] ${theme.card}`}>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-6 w-6" />
                <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
              </div>
              <Select value={currentTheme} onValueChange={setCurrentTheme}>
                <SelectTrigger className={`w-[130px] ${theme.input}`}>
                  <Palette className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(themes).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription>Create a new account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className={theme.input}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className={theme.input}
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  className={theme.input}
                />
              </div>
              <div className="space-y-2">
                <Select onValueChange={(value) => setFormData({...formData, role: value})}>
                  <SelectTrigger className={theme.input}>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className={`w-full ${theme.button}`}>Sign Up</Button>
            </form>
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <Link href="/signin" className="underline hover:text-opacity-80">
                Sign In
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}