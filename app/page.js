'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, GraduationCap, Users, BookOpen, ClipboardCheck, FileSpreadsheet, Moon, Sun } from 'lucide-react'

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

export default function SchoolManagementSystem() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  const [courses, setCourses] = useState([])
  const [grades, setGrades] = useState({})
  const [newStudent, setNewStudent] = useState({ name: '', grade: '', studentId: '' })
  const [newTeacher, setNewTeacher] = useState({ name: '', subject: '' })
  const [newCourse, setNewCourse] = useState({ name: '', teacherId: '', schedule: '', students: [] })
  const [currentTheme, setCurrentTheme] = useState('quantum')

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const user = { name: 'John Doe', role: 'admin' }
  //     setUser(user)
  //   }
  //   checkAuth()
  // }, [])

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/user', {
          method: 'GET',
          credentials: 'include',
        })
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          router.push('/signin')
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        router.push('/signin')
      }
    }
    checkAuth()
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      setStudents([
        { id: 1, name: 'Alice Johnson', grade: '10th', studentId: 'S1001' },
        { id: 2, name: 'Bob Smith', grade: '11th', studentId: 'S1002' },
      ])
      setTeachers([
        { id: 1, name: 'Mr. Brown', subject: 'Mathematics' },
        { id: 2, name: 'Ms. Davis', subject: 'English' },
      ])
      setCourses([
        { id: 1, name: 'Advanced Math', teacherId: 1, schedule: 'Mon, Wed 10:00 AM', students: [1, 2] },
        { id: 2, name: 'Literature', teacherId: 2, schedule: 'Tue, Thu 2:00 PM', students: [1] },
      ])
      setGrades({
        1: { 1: [{ name: 'Quiz 1', score: 90, maxScore: 100 }], 2: [{ name: 'Essay 1', score: 85, maxScore: 100 }] },
        2: { 1: [{ name: 'Midterm', score: 88, maxScore: 100 }] },
      })
    }
    fetchData()
  }, [])

  const handleSignOut = () => {
    router.push('/signin')
  }

  const addStudent = () => {
    const newId = students.length + 1
    setStudents([...students, { id: newId, ...newStudent }])
    setNewStudent({ name: '', grade: '', studentId: '' })
  }

  const addTeacher = () => {
    const newId = teachers.length + 1
    setTeachers([...teachers, { id: newId, ...newTeacher }])
    setNewTeacher({ name: '', subject: '' })
  }

  const addCourse = () => {
    const newId = courses.length + 1
    setCourses([...courses, { id: newId, ...newCourse }])
    setNewCourse({ name: '', teacherId: '', schedule: '', students: [] })
  }

  const addOrUpdateGrade = (courseId, studentId, assignmentName, score, maxScore) => {
    setGrades(prevGrades => {
      const courseGrades = prevGrades[courseId] || {}
      const studentGrades = courseGrades[studentId] || []
      const updatedStudentGrades = [...studentGrades, { name: assignmentName, score, maxScore }]
      return {
        ...prevGrades,
        [courseId]: {
          ...courseGrades,
          [studentId]: updatedStudentGrades
        }
      }
    })
  }

  const theme = themes[currentTheme]
  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${theme.background}`}>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`${theme.card} shadow-lg`}
      >
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-10 w-10" />
              <h1 className="text-4xl font-bold">EduPulse</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span>Welcome, <span className="font-semibold">{user?.name}</span></span>
              <Button variant="outline" onClick={handleSignOut} className={`${theme.button} border-current`}>Sign Out</Button>
              <Select onValueChange={setCurrentTheme} value={currentTheme}>
                <SelectTrigger className={`w-[180px] ${theme.input}`}>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quantum">Quantum Flux</SelectItem>
                  <SelectItem value="neuralNet">Neural Network</SelectItem>
                  <SelectItem value="biotech">Biotech Fusion</SelectItem>
                  <SelectItem value="cosmicAI">Cosmic AI</SelectItem>
                  <SelectItem value="techMinimal">Tech Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto p-4 mt-8">
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className={`${theme.card} p-1 rounded-full shadow-lg`}>
            <TabsTrigger value="students" className={`rounded-full ${theme.button}`}>
              <Users className="h-5 w-5 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="teachers" className={`rounded-full ${theme.button}`}>
              <BookOpen className="h-5 w-5 mr-2" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="courses" className={`rounded-full ${theme.button}`}>
              <CalendarIcon className="h-5 w-5 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="grades" className={`rounded-full ${theme.button}`}>
              <FileSpreadsheet className="h-5 w-5 mr-2" />
              Grades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`${theme.card} shadow-xl border-none`}>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Student Management</CardTitle>
                  <CardDescription>Add and manage student records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex space-x-4">
                      <Input
                        placeholder="Name"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                        className={theme.input}
                      />
                      <Input
                        placeholder="Grade"
                        value={newStudent.grade}
                        onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                        className={theme.input}
                      />
                      <Input
                        placeholder="Student ID"
                        value={newStudent.studentId}
                        onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                        className={theme.input}
                      />
                      <Button onClick={addStudent} className={theme.button}>Add Student</Button>
                    </div>

                    <div className={`${theme.table} rounded-lg shadow-lg overflow-hidden`}>
                      <Table>
                        <TableHeader>
                          <TableRow className={theme.tableHeader}>
                            <TableHead>Name</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>Student ID</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {students.map((student, index) => (
                            <motion.tr
                              key={student.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={theme.tableRow}
                            >
                              <TableCell className="font-medium">{student.name}</TableCell>
                              <TableCell>{student.grade}</TableCell>
                              <TableCell>{student.studentId}</TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="teachers">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`${theme.card} shadow-xl border-none`}>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Teacher Management</CardTitle>
                  <CardDescription>Add and manage teacher records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex space-x-4">
                      <Input
                        placeholder="Name"
                        value={newTeacher.name}
                        onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                        className={theme.input}
                      />
                      <Input
                        placeholder="Subject"
                        value={newTeacher.subject}
                        onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                        className={theme.input}
                      />
                      <Button onClick={addTeacher} className={theme.button}>Add Teacher</Button>
                    </div>

                    <div className={`${theme.table} rounded-lg shadow-lg overflow-hidden`}>
                      <Table>
                        <TableHeader>
                          <TableRow className={theme.tableHeader}>
                            <TableHead>Name</TableHead>
                            <TableHead>Subject</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {teachers.map((teacher, index) => (
                            <motion.tr
                              key={teacher.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={theme.tableRow}
                            >
                              <TableCell className="font-medium">{teacher.name}</TableCell>
                              <TableCell>{teacher.subject}</TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="courses">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`${theme.card} shadow-xl border-none`}>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Course Management</CardTitle>
                  <CardDescription>Add and manage courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex space-x-4">
                      <Input
                        placeholder="Course Name"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                        className={theme.input}
                      />
                      <Select onValueChange={(value) => setNewCourse({...newCourse, teacherId: value})}>
                        <SelectTrigger className={theme.input}>
                          <SelectValue placeholder="Select Teacher" />
                        </SelectTrigger>
                        <SelectContent>
                          {teachers.map((teacher) => (
                            <SelectItem key={teacher.id} value={teacher.id.toString()}>{teacher.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Schedule"
                        value={newCourse.schedule}
                        onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                        className={theme.input}
                      />
                      <Button onClick={addCourse} className={theme.button}>Add Course</Button>
                    </div>

                    <div className={`${theme.table} rounded-lg shadow-lg overflow-hidden`}>
                      <Table>
                        <TableHeader>
                          <TableRow className={theme.tableHeader}>
                            <TableHead>Name</TableHead>
                            <TableHead>Teacher</TableHead>
                            <TableHead>Schedule</TableHead>
                            <TableHead>Students</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courses.map((course, index) => (
                            <motion.tr
                              key={course.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className={theme.tableRow}
                            >
                              <TableCell className="font-medium">{course.name}</TableCell>
                              <TableCell>{teachers.find(t => t.id === course.teacherId)?.name}</TableCell>
                              <TableCell>{course.schedule}</TableCell>
                              <TableCell>{course.students.length}</TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="grades">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`${theme.card} shadow-xl border-none`}>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold">Grade Management</CardTitle>
                  <CardDescription>Enter and view student grades</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="enter-grades" className="space-y-6">
                    <TabsList className={`${theme.card} p-1 rounded-full`}>
                      <TabsTrigger value="enter-grades" className={`rounded-full ${theme.button}`}>Enter Grades</TabsTrigger>
                      <TabsTrigger value="view-grades" className={`rounded-full ${theme.button}`}>View Grades</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="enter-grades">
                      <div className="space-y-6">
                        {courses.map(course => (
                          <Card key={course.id} className={`${theme.card} shadow-lg border-none`}>
                            <CardHeader>
                              <CardTitle className="text-2xl font-bold">{course.name}</CardTitle>
                              <CardDescription>
                                {teachers.find(t => t.id === course.teacherId)?.name} - {course.schedule}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                {course.students.map(studentId => {
                                  const student = students.find(s => s.id === studentId)
                                  return (
                                    <div key={studentId} className={`${theme.card} p-4 rounded-lg`}>
                                      <h4 className="font-medium mb-2">{student?.name}</h4>
                                      <div className="flex space-x-4">
                                        <Input
                                          placeholder="Assignment Name"
                                          className={theme.input}
                                          id={`assignment-${course.id}-${studentId}`}
                                        />
                                        <Input
                                          type="number"
                                          placeholder="Score"
                                          className={theme.input}
                                          id={`score-${course.id}-${studentId}`}
                                        />
                                        <Input
                                          type="number"
                                          placeholder="Max Score"
                                          className={theme.input}
                                          id={`maxscore-${course.id}-${studentId}`}
                                        />
                                        <Button onClick={() => {
                                          const assignmentName = document.getElementById(`assignment-${course.id}-${studentId}`).value
                                          const score = parseInt(document.getElementById(`score-${course.id}-${studentId}`).value)
                                          const maxScore = parseInt(document.getElementById(`maxscore-${course.id}-${studentId}`).value)
                                          if (assignmentName && !isNaN(score) && !isNaN(maxScore)) {
                                            addOrUpdateGrade(course.id, studentId, assignmentName, score, maxScore)
                                            document.getElementById(`assignment-${course.id}-${studentId}`).value = ''
                                            document.getElementById(`score-${course.id}-${studentId}`).value = ''
                                            document.getElementById(`maxscore-${course.id}-${studentId}`).value = ''
                                          }
                                        }} className={theme.button}>Add Grade</Button>
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="view-grades">
                      <div className="space-y-6">
                        {courses.map(course => (
                          <Card key={course.id} className={`${theme.card} shadow-lg border-none`}>
                            <CardHeader>
                              <CardTitle className="text-2xl font-bold">{course.name}</CardTitle>
                              <CardDescription>
                                {teachers.find(t => t.id === course.teacherId)?.name} - {course.schedule}
                              </CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className={`${theme.table} rounded-lg shadow-lg overflow-hidden`}>
                                <Table>
                                  <TableHeader>
                                    <TableRow className={theme.tableHeader}>
                                      <TableHead>Student</TableHead>
                                      <TableHead>Assignment</TableHead>
                                      <TableHead>Score</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {course.students.map(studentId => {
                                      const student = students.find(s => s.id === studentId)
                                      const studentGrades = grades[course.id]?.[studentId] || []
                                      return studentGrades.map((grade, index) => (
                                        <TableRow key={`${studentId}-${index}`} className={theme.tableRow}>
                                          <TableCell className="font-medium">{student?.name}</TableCell>
                                          <TableCell>{grade.name}</TableCell>
                                          <TableCell>{grade.score}/{grade.maxScore}</TableCell>
                                        </TableRow>
                                      ))
                                    })}
                                  </TableBody>
                                </Table>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}