from typing import List
from enum import Enum
from fastapi import FastAPI
from pydantic import (
    BaseModel,
    PositiveInt,
    confloat,
    conlist,
    Schema,
    Field
)

class SourceNameEnum(str, Enum):
    hydro_merit_1k = "hydro_merit_1k"
    hydro_merit = "hydro_merit"

class HydroMT(BaseModel):
    # Faroe Island
    bbox: conlist(float, min_items=4, max_items=4)
    strord: PositiveInt
    source_name: SourceNameEnum = SourceNameEnum.hydro_merit_1k

    class Config:
        schema_extra = {
            'example': {
                'bbox': [0, 0, 0, 0],
                'strord': 4,
                'source_name': 'hydro_merit_1k'
            }
        }


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/hydromt")
async def hydromt(input: HydroMT):
    return input
