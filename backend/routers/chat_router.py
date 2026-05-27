from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import google.generativeai as genai

router = APIRouter(prefix="/chat", tags=["chat"])

class ChatMessage(BaseModel):
    role: str # "user" or "model"
    text: str

class ChatRequest(BaseModel):
    message: str
    history: list[ChatMessage]
    roadmap_context: dict

@router.post("/")
async def chat_with_mentor(request: ChatRequest):
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        context_str = f"""
        You are a supportive, expert AI Career Mentor. 
        The user is currently pursuing a career as a {request.roadmap_context.get('target_career', 'Professional')}.
        Their experience level is {request.roadmap_context.get('experience_level', 'unknown')}.
        They have the following skills: {', '.join(request.roadmap_context.get('technical_skills', []))}.
        Answer their questions strictly related to their career, learning path, or technical concepts. Keep answers concise, encouraging, and highly practical.
        """
        
        formatted_history = []
        for msg in request.history:
            formatted_history.append({"role": msg.role, "parts": [msg.text]})
            
        chat_session = model.start_chat(history=formatted_history)
        
        if len(request.history) == 0:
            full_message = context_str + "\n\nUser Question:\n" + request.message
        else:
            full_message = request.message
            
        response = chat_session.send_message(full_message)
        
        return {"response": response.text}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")
