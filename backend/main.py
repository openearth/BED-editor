from typing import Optional
from enum import Enum
from fastapi import FastAPI
from pydantic import BaseModel, PositiveInt, confloat


class BBox(BaseModel):
    latitude_min: confloat(ge=-90, le=90)
    latitude_max: confloat(ge=-90, le=90)
    longitude_min: confloat(ge=-180, le=180)
    longitude_max: confloat(ge=-180, le=180)

    class Config:
        schema_extra = {
            "latitude_min": 62.0,
            "latitude_max": 62.2,
            "longitude_min": -7.5,
            "longitude_max": -7.0,
        }


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
                "bbox": BBox.Config.schema_extra,
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
