from fastapi import FastAPI
from logger import setup_logging, LogLevel
from fastapi.middleware.cors import CORSMiddleware
import logging


app = FastAPI()
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    setup_logging(LogLevel.DEBUG)
    logger.info("Logging is set up.")

@app.get("/")
async def read_root():
    logger.debug("Root endpoint hit")
    return { 
        "server": "running"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "uptime": "24 hours",
        "version": "1.0.0",
    }
