import logging
from enum import StrEnum


LOG_FORMAT_DEBUG = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"

class LogLevel(StrEnum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"

def setup_logging(level: LogLevel = LogLevel.INFO) -> None:
    logging.basicConfig(level=level.value, format=LOG_FORMAT_DEBUG)
    logging.getLogger().setLevel(level.value)

