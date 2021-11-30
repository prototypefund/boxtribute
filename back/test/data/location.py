import pytest
from boxtribute_server.models.location import Location
from data.base import data as base_data
from data.box_state import default_box_state_data


def default_location_data():
    mock_location = {
        "id": 1,
        "box_state": default_box_state_data()["id"],
        "base": base_data()[0]["id"],
        "is_stockroom": 0,
        "deleted": None,
        "is_donated": 0,
        "is_lost": 0,
        "is_market": 0,
        "is_scrap": 0,
        "name": "Location",
        "seq": 1,
        "visible": 1,
    }

    return mock_location


@pytest.fixture()
def default_location():
    return default_location_data()


def another_location_data():
    data = default_location_data().copy()
    data["id"] = 2
    data["base"] = 3
    return data


@pytest.fixture()
def another_location():
    return another_location_data()


def create():
    Location.create(**default_location_data())
    Location.create(**another_location_data())
