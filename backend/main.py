from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import auth_router, resume_router, roadmap_router, chat_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Career Roadmap Generator API")

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(resume_router.router)
app.include_router(roadmap_router.router)
app.include_router(chat_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Career Roadmap Generator API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
