import pytest
from boxwise_flask.models.box import Box
from playhouse.shortcuts import model_to_dict


@pytest.mark.usefixtures("default_box")
@pytest.mark.usefixtures("default_product")
@pytest.mark.usefixtures("default_product_gender")
@pytest.mark.usefixtures("default_product_category")
@pytest.mark.usefixtures("default_qr_code")
@pytest.mark.usefixtures("default_user")
def test_box_model(
    default_box,
    default_product,
    default_product_gender,
    default_product_category,
    default_qr_code,
    default_user,
):

    queried_box = Box.get(
        Box.box_label_identifier == default_box["box_label_identifier"]
    )
    queried_box_dict = model_to_dict(queried_box)

    assert queried_box_dict["id"] == default_box["id"]
    assert (
        queried_box_dict["box_label_identifier"] == default_box["box_label_identifier"]
    )
    assert queried_box_dict["box_state"]["id"] == default_box["box_state"]
    assert queried_box_dict["comment"] == default_box["comment"]
    assert queried_box_dict["created_on"] == default_box["created_on"]
    assert queried_box_dict["created_by"]["id"] == default_user["id"]
    assert queried_box_dict["deleted"] == default_box["deleted"]
    assert queried_box_dict["items"] == default_box["items"]
    assert queried_box_dict["location"]["id"] == default_box["location"]
    assert queried_box_dict["product"]["id"] == default_product["id"]
    assert queried_box_dict["product"]["gender"] == default_product_gender
    assert queried_box_dict["product"]["category"] == default_product_category
    assert queried_box_dict["qr_code"]["id"] == default_qr_code["id"]
