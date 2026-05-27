"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, BookOpen, AlertCircle, CheckCircle, Clock, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Chatbot from "@/components/Chatbot";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [error, setError] = useState("");

  const fetchRoadmap = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      // First try to fetch existing roadmap from DB
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/roadmap/me`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        if (!data.completed_topics) data.completed_topics = [];
        setRoadmap(data);
        return;
      }

      // If it doesn't exist, we must generate it from context
      if (res.status === 404) {
        const storedContext = localStorage.getItem("roadmap_context");
        if (!storedContext) {
           setError("No profile context found. Please go back and complete the onboarding flow.");
           return;
        }
        
        const contextData = JSON.parse(storedContext);
        const generateRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/roadmap/generate`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(contextData)
        });
        
        if (!generateRes.ok) throw new Error("Failed to generate roadmap.");
        
        const data = await generateRes.json();
        if (!data.completed_topics) data.completed_topics = [];
        setRoadmap(data);
      } else {
        throw new Error("Failed to fetch roadmap.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const toggleTopic = async (topicId: string) => {
    if (!roadmap) return;

    const currentCompleted = roadmap.completed_topics || [];
    let newCompleted;
    
    if (currentCompleted.includes(topicId)) {
      newCompleted = currentCompleted.filter((id: string) => id !== topicId);
    } else {
      newCompleted = [...currentCompleted, topicId];
    }

    // Recalculate score slightly (add 1% for each completed task for demo purposes)
    const baseScore = roadmap.placement_readiness_score || 45;
    const dynamicScore = Math.min(100, baseScore + (newCompleted.length * 2));

    const updatedRoadmap = {
      ...roadmap,
      completed_topics: newCompleted,
      dynamic_score: dynamicScore
    };

    setRoadmap(updatedRoadmap);

    // Save to DB
    const token = localStorage.getItem("token");
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/roadmap/me`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedRoadmap)
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
            <BrainCircuit className="w-16 h-16 text-blue-600 mb-6" />
         </motion.div>
         <h2 className="text-2xl font-bold text-slate-800">Generating Your AI Roadmap...</h2>
         <p className="text-slate-500 mt-2">Our AI is analyzing your skills and building a personalized curriculum.</p>
      </div>
    );
  }

  if (error) {
    return (
       <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
         <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200 max-w-md text-center shadow-lg">
           <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500"/>
           <h3 className="font-bold text-lg mb-2">Error Generating Roadmap</h3>
           <p className="mb-4">{error}</p>
           <Link href="/onboarding" className="bg-red-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-700">Back to Onboarding</Link>
         </div>
       </div>
    );
  }

  const completedCount = roadmap.completed_topics?.length || 0;
  const currentScore = roadmap.dynamic_score || roadmap.placement_readiness_score;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <header className="px-6 py-4 border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:bg-slate-100 p-2 rounded-lg transition-colors group">
               <ArrowLeft className="w-5 h-5 text-slate-500 group-hover:text-slate-800" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-md">
                 <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-slate-900">AI Roadmap</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium text-sm flex items-center gap-2 mr-4">
                <Home className="w-4 h-4" /> Home
             </Link>
             <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm border border-blue-100 flex items-center gap-2">
                Placement Readiness: 
                <span className="text-lg text-blue-800">{currentScore}%</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Left Sidebar: Skill Gaps */}
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                 <AlertCircle className="w-5 h-5 text-orange-500"/>
                 Skill Gap Analysis
              </h3>
              
              <div className="mb-6">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Priority Skills to Learn</h4>
                 <div className="flex flex-wrap gap-2">
                    {roadmap?.skill_gap_analysis?.priority_skills_to_learn_first?.map((skill: string, i: number) => (
                       <span key={i} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200 shadow-sm">
                          {skill}
                       </span>
                    ))}
                 </div>
              </div>

              <div className="mb-8">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Other Missing Skills</h4>
                 <div className="flex flex-wrap gap-2">
                    {roadmap?.skill_gap_analysis?.missing_skills?.map((skill: string, i: number) => (
                       <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-200 shadow-sm">
                          {skill}
                       </span>
                    ))}
                 </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                 <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                    <CheckCircle className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Topics Mastered</div>
                    <div className="text-2xl font-black text-emerald-900">{completedCount}</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Content: Weekly Plan */}
        <div className="lg:col-span-2">
           <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600"/>
              Your Interactive Curriculum
           </h2>
           
           <div className="space-y-6">
              {roadmap?.weekly_plan?.map((week: any, index: number) => (
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                 >
                    <div className="flex items-start justify-between mb-6">
                       <div>
                          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full uppercase tracking-wider mb-3">
                             Week {week.week}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900">{week.focus}</h3>
                       </div>
                       <BookOpen className="w-8 h-8 text-slate-300" />
                    </div>
                    
                    <div className="mb-6">
                       <h4 className="text-sm font-bold text-slate-500 mb-3">Key Topics to Master:</h4>
                       <ul className="grid grid-cols-1 gap-3">
                          {week.topics?.map((topic: string, i: number) => {
                             const topicId = `W${week.week}-${i}`;
                             const isCompleted = roadmap.completed_topics?.includes(topicId);
                             return (
                               <li key={i} className="flex items-start gap-3">
                                  <button 
                                     onClick={() => toggleTopic(topicId)}
                                     className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300 hover:border-blue-400 text-transparent'}`}
                                  >
                                     <CheckCircle className="w-4 h-4" />
                                  </button>
                                  <span className={`font-medium transition-all ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                     {topic}
                                  </span>
                               </li>
                             )
                          })}
                       </ul>
                    </div>

                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-5 border border-blue-100/50">
                       <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                          Weekly Project Idea
                       </h4>
                       <p className="text-slate-700 text-sm leading-relaxed">{week.project_idea}</p>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Visual Roadmap Tree Section */}
        <div className="lg:col-span-3 mt-12 mb-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 inline-flex items-center gap-3">
                 <BrainCircuit className="w-8 h-8 text-blue-600"/>
                 Visual Roadmap Tree
              </h2>
              <p className="text-slate-500 mt-2">Your sequential path from starting point to professional.</p>
           </div>
           
           <div className="relative py-4 max-w-4xl mx-auto">
              {/* Winding line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-1.5 bg-blue-100 -translate-x-1/2 z-0 hidden md:block rounded-full"></div>
              
              <div className="space-y-16">
                 {roadmap?.roadmap_flowchart?.map((step: string, index: number) => {
                    const isEven = index % 2 === 0;
                    return (
                       <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          key={index} 
                          className={`flex items-center justify-center md:justify-${isEven ? 'start' : 'end'} relative z-10 w-full group`}
                       >
                          {/* Center Dot */}
                          <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500 border-4 border-white rounded-full hidden md:block shadow-md group-hover:scale-125 group-hover:bg-blue-600 transition-all duration-300"></div>

                          {/* Node Card */}
                          <div className={`w-full md:w-5/12 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} justify-center`}>
                             <div className="bg-white border-2 border-slate-100 hover:border-blue-400 rounded-2xl px-6 py-5 shadow-xl shadow-slate-200/50 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300 w-full max-w-sm relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-blue-500"></div>
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl shrink-0 border border-blue-100">
                                   {index === 0 ? "🏁" : index === roadmap.roadmap_flowchart.length - 1 ? "🏆" : index}
                                </div>
                                <span className="font-bold text-slate-800 text-lg leading-tight">{step}</span>
                             </div>
                          </div>
                       </motion.div>
                    )
                 })}
              </div>
           </div>
        </div>
      </main>
      
      {/* Floating AI Mentor Chatbot Widget */}
      <Chatbot />
    </div>
  );
}
