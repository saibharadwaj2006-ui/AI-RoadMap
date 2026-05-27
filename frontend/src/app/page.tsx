"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, FileText, CheckCircle, BarChart3, MessageSquare, Zap, Target, Trophy, Flame } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { day: 'Mon', score: 65 },
  { day: 'Tue', score: 68 },
  { day: 'Wed', score: 74 },
  { day: 'Thu', score: 79 },
  { day: 'Fri', score: 85 },
  { day: 'Sat', score: 87 },
  { day: 'Sun', score: 92 },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-200">
      {/* Background Animated Blobs - Light Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-300/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-300/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[30rem] h-[30rem] bg-indigo-300/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-slate-200 glass sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">AI Roadmap</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#dashboard" className="hover:text-blue-600 transition-colors">Dashboard</Link>
            <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Log in</Link>
            <Link href="/signup" className="text-sm font-medium bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-colors shadow-md">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-100 bg-blue-50/80 backdrop-blur-sm mb-8 shadow-sm"
            >
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Powered by Gemini AI</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight text-slate-900"
            >
              Your Career Path, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Perfectly Architected.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
            >
              Upload your resume, set your target role, and let our AI generate a personalized, step-by-step learning roadmap tailored to your exact skill gaps.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/signup" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/30 w-full sm:w-auto justify-center">
                Generate My Roadmap <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#dashboard" className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm w-full sm:w-auto justify-center">
                View Features
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 border-t border-slate-200 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Everything you need to land the job</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">A complete suite of AI tools designed to analyze your skills, guide your learning, and prepare you for interviews.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-3xl relative overflow-hidden group transition-shadow hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-200">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Smart Resume Parser</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Upload your PDF. We extract your skills, analyze ATS score, and identify exactly what you're missing.</p>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-3xl relative overflow-hidden group transition-shadow hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-purple-200">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Adaptive Roadmaps</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Get a weekly progression plan mapped to fill your skill gaps, complete with course recommendations.</p>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-3xl relative overflow-hidden group transition-shadow hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-indigo-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-200">
                  <MessageSquare className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">AI Mentor Chatbot</h3>
                <p className="text-slate-600 leading-relaxed text-sm">Stuck on a topic? Ask your personalized AI mentor. It knows your exact roadmap context.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section id="dashboard" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Track your progress</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">Watch your placement readiness score climb with a personalized interactive dashboard that tracks your skills, streaks, and projects.</p>
            </div>
            
            <div className="glass rounded-3xl p-4 md:p-8 relative border border-slate-200 shadow-2xl overflow-hidden max-w-5xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 blur-xl opacity-50 -z-10"></div>
              
              {/* Mock Dashboard UI */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                {/* Mock Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">A</div>
                    <span className="font-semibold text-slate-800">Welcome back, Alex</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full border border-blue-100">AI Engineer Path</span>
                  </div>
                </div>
                
                {/* Dashboard Grid */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50">
                  
                  {/* Streak Card */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
                    <div className="bg-orange-100 p-3 rounded-lg text-orange-600">
                      <Flame className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">Learning Streak</div>
                      <div className="text-2xl font-black text-slate-800">12 Days</div>
                    </div>
                  </div>
                  
                  {/* Skills Card */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
                    <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">Skills Mastered</div>
                      <div className="text-2xl font-black text-slate-800">8 / 24</div>
                    </div>
                  </div>
                  
                  {/* Projects Card */}
                  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
                    <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-500">Projects Built</div>
                      <div className="text-2xl font-black text-slate-800">3</div>
                    </div>
                  </div>
                  
                  {/* Big Chart Section */}
                  <div className="md:col-span-3 bg-white p-6 rounded-xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800 text-lg">Placement Readiness</h4>
                        <p className="text-sm text-slate-500">Your likelihood of passing an interview based on completed skills.</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-3xl font-black text-green-500">92%</span>
                        <div className="text-sm font-medium text-green-600 flex items-center gap-1 justify-start sm:justify-end">
                          +15% this week
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="#3b82f6" 
                            strokeWidth={4} 
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} 
                            activeDot={{ r: 8, stroke: '#dbeafe', strokeWidth: 4 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section id="how-it-works" className="py-24 px-6 border-t border-slate-200 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">How it works</h2>
                <p className="text-slate-600 mb-10 text-lg">A scientifically designed pipeline to take you from your current level to placement ready.</p>
                
                <div className="space-y-10">
                  {[
                    { step: "01", title: "Build your Profile", desc: "Upload your resume and set your target career goals and study hours." },
                    { step: "02", title: "Gap Analysis", desc: "Our engine compares your skills against real-world market demands." },
                    { step: "03", title: "Execute the Roadmap", desc: "Follow the generated curriculum, build recommended projects, and track progress." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 group">
                      <div className="text-3xl font-black text-blue-200 font-mono group-hover:text-blue-500 transition-colors">{item.step}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-slate-900">{item.title}</h4>
                        <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 w-full">
                <div className="glass rounded-3xl p-8 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-[2rem] blur-xl opacity-30"></div>
                  <div className="relative bg-white rounded-2xl p-8 border border-slate-100 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-500">Roadmap Node</div>
                          <div className="font-extrabold text-2xl text-slate-900">System Design</div>
                        </div>
                      </div>
                      <div className="text-sm font-bold px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full">In Progress</div>
                    </div>
                    <div className="space-y-5">
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 w-1/2 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-sm font-medium text-slate-600">
                        <span className="flex items-center gap-2">50% Completed</span>
                        <span className="flex items-center gap-2">Est. 2 weeks left</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-xl text-white">AI Roadmap</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 AI Career Roadmap Generator. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
