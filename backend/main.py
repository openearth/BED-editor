from typing import List, Optional
from enum import Enum
from fastapi import FastAPI
from pydantic import BaseModel, PositiveInt, confloat, conlist, Schema, Field


class BBox(BaseModel):
    latitude: conlist(float, min_items=2, max_items=2)
    longitude: conlist(float, min_items=2, max_items=2)


class SourceNameEnum(str, Enum):
    hydro_merit_1k = "hydro_merit_1k"
    hydro_merit = "hydro_merit"


class HydroMT(BaseModel):
    # Faroe Island
    bbox: BBox
    strord: Optional[PositiveInt]
    source_name: SourceNameEnum = SourceNameEnum.hydro_merit_1k

    class Config:
        schema_extra = {
            "example": {
                "bbox": {
                    "latitude": [62.0, 62.2],
                    "longitude": [-7.5, -7.0]
                },
                "strord": 4,
                "source_name": "hydro_merit_1k",
            }
        }


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/hydromt")
async def hydromt(input: HydroMT):
    return input
