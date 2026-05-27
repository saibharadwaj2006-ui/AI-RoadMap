from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import get_db
import google.generativeai as genai
import json
from models import User, Roadmap
from auth import get_current_user

router = APIRouter(prefix="/roadmap", tags=["roadmap"])

class RoadmapRequest(BaseModel):
    target_career: str
    experience_level: str
    study_time: str
    technical_skills: list[str] = []
    soft_skills: list[str] = []

@router.post("/generate")
async def generate_roadmap(request: RoadmapRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    prompt = f"""
    You are an expert AI Career Coach. Generate a comprehensive career roadmap and skill gap analysis.
    
    USER PROFILE:
    - Target Career: {request.target_career}
    - Current Experience: {request.experience_level}
    - Available Study Time: {request.study_time} hours/day
    - Existing Technical Skills: {', '.join(request.technical_skills) if request.technical_skills else 'None'}
    - Existing Soft Skills: {', '.join(request.soft_skills) if request.soft_skills else 'None'}

    Perform a deep skill gap analysis and generate a personalized weekly roadmap.
    Return the response STRICTLY as a JSON object with the following structure:
    {{
        "skill_gap_analysis": {{
            "missing_skills": ["skill1", "skill2"],
            "priority_skills_to_learn_first": ["skill1", "skill2"]
        }},
        "placement_readiness_score": 45, // an integer from 0 to 100 based on their current skills vs target career
        "weekly_plan": [
            {{
                "week": 1,
                "focus": "Focus Area",
                "topics": ["topic1", "topic2"],
                "project_idea": "Small project idea to apply this week's skills"
            }}
        ],
        "roadmap_flowchart": ["Starting Point", "Python Basics", "SQL Mastery", "Data Viz", "Target Career"] // 5-8 chronological milestones in order
    }}
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        result_text = response.text.strip()
        
        if result_text.startswith("```json"):
            result_text = result_text.lstrip("```json").rstrip("```").strip()
        elif result_text.startswith("```"):
            result_text = result_text.lstrip("```").rstrip("```").strip()
            
        roadmap_data = json.loads(result_text)
        
        # Save or update roadmap in DB
        db_roadmap = db.query(Roadmap).filter(Roadmap.user_id == current_user.id).first()
        if db_roadmap:
            db_roadmap.data = roadmap_data
        else:
            db_roadmap = Roadmap(user_id=current_user.id, data=roadmap_data)
            db.add(db_roadmap)
        db.commit()
        
        return roadmap_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate roadmap: {str(e)}")

@router.get("/me")
async def get_my_roadmap(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_roadmap = db.query(Roadmap).filter(Roadmap.user_id == current_user.id).first()
    if not db_roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return db_roadmap.data

@router.put("/me")
async def update_my_roadmap(updated_data: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_roadmap = db.query(Roadmap).filter(Roadmap.user_id == current_user.id).first()
    if not db_roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    
    # Update the JSON data
    db_roadmap.data = updated_data
    db.commit()
    return {"status": "success"}
