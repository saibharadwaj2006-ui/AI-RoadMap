"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, UploadCloud, ChevronRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Onboarding() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
       router.push("/login");
       return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/roadmap/me`, {
       headers: { "Authorization": `Bearer ${token}` }
    }).then(res => {
       if (res.ok) router.push("/dashboard");
    }).catch(e => console.error(e));
  }, [router]);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    education: "",
    experience: "",
    targetCareer: "",
    studyTime: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const processResume = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/resume/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setParsedData(data.extracted_data);
      handleNext();
    } catch (err) {
      console.error(err);
      alert("Failed to process resume.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-200 bg-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl text-slate-900">AI Roadmap</span>
          </div>
          <div className="text-sm font-medium text-slate-500">Step {step} of 3</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-100">
            <motion.div 
              className="h-full bg-blue-600" 
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-8 md:p-12">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Build your Career Profile</h2>
                <p className="text-slate-500 mb-8">Tell us a bit about where you are and where you want to be.</p>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Career Role</label>
                    <input 
                      type="text" 
                      placeholder="e.g. AI Engineer, Full Stack Developer" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      value={formData.targetCareer}
                      onChange={(e) => setFormData({...formData, targetCareer: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Experience Level</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    >
                      <option value="">Select Level</option>
                      <option value="beginner">Beginner (0-1 years)</option>
                      <option value="intermediate">Intermediate (1-3 years)</option>
                      <option value="advanced">Advanced (3+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Available Study Time</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      value={formData.studyTime}
                      onChange={(e) => setFormData({...formData, studyTime: e.target.value})}
                    >
                      <option value="">Select Time</option>
                      <option value="1">1-2 hours / day</option>
                      <option value="3">3-4 hours / day</option>
                      <option value="5">5+ hours / day</option>
                    </select>
                  </div>
                </div>

                <div className="mt-10 flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!formData.targetCareer}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors"
                  >
                    Next Step <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Upload your Resume</h2>
                <p className="text-slate-500 mb-8">We'll use our AI to extract your current skills and find the gaps.</p>
                
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={handleFileUpload}
                  />
                  <UploadCloud className="w-12 h-12 text-blue-500 mb-4" />
                  <p className="text-slate-700 font-medium mb-1">
                    {file ? file.name : "Click or drag to upload PDF"}
                  </p>
                  <p className="text-slate-400 text-sm">PDF files up to 5MB</p>
                </div>

                <div className="mt-10 flex justify-between items-center">
                  <button onClick={handlePrev} className="text-slate-500 hover:text-slate-800 px-4 py-3 font-medium transition-colors">Back</button>
                  <button 
                    onClick={file ? processResume : handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors disabled:bg-blue-400"
                    disabled={isUploading}
                  >
                    {isUploading ? "Scanning Resume..." : file ? "Analyze with AI" : "Skip this step"}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Profile Analyzed!</h2>
                
                {parsedData && !parsedData.error ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <BrainCircuit className="w-5 h-5 text-blue-600"/> AI Extraction Results
                    </h3>
                    
                    <div className="mb-4">
                      <div className="text-sm text-slate-500 font-medium mb-2">Technical Skills Found</div>
                      <div className="flex flex-wrap gap-2">
                        {parsedData.technical_skills?.map((skill: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-blue-100 border border-blue-200 text-blue-800 rounded-full text-sm font-medium">{skill}</span>
                        )) || <span className="text-slate-400 text-sm">None found</span>}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-500 font-medium mb-2">Soft Skills Found</div>
                      <div className="flex flex-wrap gap-2">
                        {parsedData.soft_skills?.map((skill: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-purple-100 border border-purple-200 text-purple-800 rounded-full text-sm font-medium">{skill}</span>
                        )) || <span className="text-slate-400 text-sm">None found</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-left mb-8">
                     <p className="text-orange-800 text-sm font-medium mb-2">Note: {parsedData?.error || "We'll build your roadmap from scratch based on your target career."}</p>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Link 
                    href="/dashboard" 
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20 block text-center"
                    onClick={() => {
                      localStorage.setItem("roadmap_context", JSON.stringify({
                        target_career: formData.targetCareer,
                        experience_level: formData.experience,
                        study_time: formData.studyTime,
                        technical_skills: parsedData?.technical_skills || [],
                        soft_skills: parsedData?.soft_skills || []
                      }));
                    }}
                  >
                    Generate My Full Roadmap
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
