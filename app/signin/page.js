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
  neon: {
    name: "Neon Nights",
    background: "bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900",
    card: "bg-black/50 text-neon-green border border-neon-pink",
    button: "bg-neon-blue hover:bg-neon-purple text-white",
    input: "bg-black/30 border-neon-pink text-neon-green placeholder-neon-green/50",
  },
  pastel: {
    name: "Pastel Dreams",
    background: "bg-gradient-to-br from-pastel-blue via-pastel-pink to-pastel-yellow",
    card: "bg-white/70 text-pastel-dark border border-pastel-purple",
    button: "bg-pastel-purple hover:bg-pastel-dark text-white",
    input: "bg-white/50 border-pastel-purple text-pastel-dark placeholder-pastel-dark/50",
  },
  dark: {
    name: "Midnight Mode",
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700",
    card: "bg-gray-800/80 text-gray-100 border border-gray-600",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
    input: "bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400",
  },
  nature: {
    name: "Forest Whisper",
    background: "bg-gradient-to-br from-green-800 via-emerald-700 to-teal-600",
    card: "bg-green-900/40 text-emerald-100 border border-emerald-400",
    button: "bg-emerald-500 hover:bg-emerald-600 text-white",
    input: "bg-green-800/30 border-emerald-400 text-emerald-100 placeholder-emerald-200/50",
  },
  sunset: {
    name: "Sunset Serenity",
    background: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
    card: "bg-orange-900/40 text-yellow-100 border border-yellow-400",
    button: "bg-yellow-500 hover:bg-yellow-600 text-orange-900",
    input: "bg-orange-800/30 border-yellow-400 text-yellow-100 placeholder-yellow-200/50",
  },
  ocean: {
    name: "Deep Ocean",
    background: "bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700",
    card: "bg-blue-900/40 text-cyan-100 border border-cyan-400",
    button: "bg-cyan-500 hover:bg-cyan-600 text-white",
    input: "bg-blue-800/30 border-cyan-400 text-cyan-100 placeholder-cyan-200/50",
  },
}

export default function SignIn() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [currentTheme, setCurrentTheme] = useState('neon')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Sign in failed')
      }
      
      router.push('/')
    } catch (err) {
      setError('Invalid email or password')
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
                <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
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
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className={`w-full ${theme.button}`}>Sign In</Button>
            </form>
            <p className="mt-4 text-center text-sm">
              Dont have an account?{' '}
              <Link href="/signup" className="underline hover:text-opacity-80">
                Sign Up
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}