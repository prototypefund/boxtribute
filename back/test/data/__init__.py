import importlib
import os
import pathlib

from boxtribute_server.db import db

from .base import default_base, default_bases
from .beneficiary import default_beneficiary
from .box import another_box, box_without_qr_code, default_box, default_boxes
from .box_state import default_box_state
from .history import default_history
from .location import another_location, default_location
from .log import default_log
from .organisation import another_organisation, default_organisation
from .product import default_product
from .product_category import default_product_category
from .product_gender import default_product_gender
from .qr_code import default_qr_code, qr_code_without_box
from .shipment import canceled_shipment, default_shipment
from .size_range import default_size_range
from .transaction import default_transaction
from .transfer_agreement import (
    default_transfer_agreement,
    expired_transfer_agreement,
    reviewed_transfer_agreement,
    transfer_agreements,
    unidirectional_transfer_agreement,
)
from .user import default_user, default_users

__all__ = [
    "another_box",
    "another_location",
    "another_organisation",
    "box_without_qr_code",
    "canceled_shipment",
    "default_beneficiary",
    "default_base",
    "default_bases",
    "default_box",
    "default_boxes",
    "default_box_state",
    "default_history",
    "default_location",
    "default_log",
    "default_organisation",
    "default_product",
    "default_product_category",
    "default_product_gender",
    "default_qr_code",
    "default_shipment",
    "default_size_range",
    "default_transaction",
    "default_transfer_agreement",
    "default_user",
    "default_users",
    "expired_transfer_agreement",
    "qr_code_without_box",
    "reviewed_transfer_agreement",
    "transfer_agreements",
    "unidirectional_transfer_agreement",
]

MODULE_DIRECTORY = pathlib.Path(__file__).resolve().parent
# List of models that others depend on
_NAMES = [
    # Models that don't have any dependencies
    "box_state",
    "product_category",
    "product_gender",
    "size_range",
    "language",
    "qr_code",
    # Models that have dependencies, and are dependency of others
    "user",
    "organisation",
    "base",
    "location",
    "product",
    "size",
    "box",
    "beneficiary",
    "transfer_agreement",
    "shipment",
]


def setup_models():
    """Import all submodules of the `data` module and execute their `create()` functions
    to create test data.
    """
    # List all files (exclude directories)
    file_names = [
        f for f in os.listdir(MODULE_DIRECTORY) if os.path.isfile(MODULE_DIRECTORY / f)
    ]
    file_names.remove("__init__.py")
    module_names = [f.replace(".py", "") for f in file_names]

    # Populate models such that independent ones are set up first; then the ones with
    # FKs referring to the independent ones
    for module_name in _NAMES:
        module_names.remove(module_name)
        module = importlib.import_module(f"data.{module_name}")
        module.create()

    # Set up remaining models; order is now irrelevant
    for module_name in module_names:
        module = importlib.import_module(f"data.{module_name}")
        module.create()


# List of all Models in the database, cf. https://stackoverflow.com/a/43820902/3865876
MODELS = db.Model.__subclasses__()
