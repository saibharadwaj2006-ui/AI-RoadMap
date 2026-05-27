from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import PyPDF2
from database import get_db
import google.generativeai as genai
import os
import json

router = APIRouter(prefix="/resume", tags=["resume"])

genai.configure(api_key=os.getenv("GEMINI_API_KEY", "DUMMY_KEY"))

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    try:
        reader = PyPDF2.PdfReader(file.file)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to parse PDF")

    if len(text.strip()) == 0:
        raise HTTPException(status_code=400, detail="PDF contains no extractable text")

    # Use Gemini to extract skills
    prompt = f"""
    You are an expert resume parser. Extract the technical skills, soft skills, and years of experience from the following resume text.
    Return the response strictly as a JSON object with keys: "technical_skills" (list), "soft_skills" (list), "experience_level" (string).
    
    Resume Text:
    {text}
    """
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        result_text = response.text.strip()
        
        # Strip potential markdown blocks
        if result_text.startswith("```json"):
            result_text = result_text.lstrip("```json").rstrip("```").strip()
        elif result_text.startswith("```"):
            result_text = result_text.lstrip("```").rstrip("```").strip()
            
        extracted_data = json.loads(result_text)
    except Exception as e:
        # Fallback if Gemini fails or API key is not set
        extracted_data = {"error": f"Failed to extract skills using AI. {str(e)}"}

    return {
        "filename": file.filename,
        "extracted_data": extracted_data,
        "raw_text_length": len(text)
    }
