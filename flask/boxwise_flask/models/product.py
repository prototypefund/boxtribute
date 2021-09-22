from boxwise_flask.db import db
from boxwise_flask.models.base import Base
from boxwise_flask.models.product_category import ProductCategory
from boxwise_flask.models.product_gender import ProductGender
from boxwise_flask.models.size_range import SizeRange
from boxwise_flask.models.user import User
from peewee import SQL, CharField, DateTimeField, ForeignKeyField, IntegerField


class Product(db.Model):
    base = ForeignKeyField(
        column_name="camp_id",
        field="id",
        model=Base,
        null=True,
        on_update="CASCADE",
        constraints=[SQL("UNSIGNED")],
    )
    category = ForeignKeyField(
        column_name="category_id",
        field="id",
        model=ProductCategory,
        null=True,
        constraints=[SQL("UNSIGNED")],
    )
    comments = CharField(null=True)
    created_on = DateTimeField(column_name="created", null=True)
    created_by = ForeignKeyField(
        column_name="created_by",
        field="id",
        model=User,
        null=True,
        on_delete="SET NULL",
        on_update="CASCADE",
        constraints=[SQL("UNSIGNED")],
    )
    deleted = DateTimeField(null=True, default=None)
    gender = ForeignKeyField(
        column_name="gender_id",
        field="id",
        model=ProductGender,
        on_update="CASCADE",
    )
    last_modified_on = DateTimeField(column_name="modified", null=True)
    last_modified_by = ForeignKeyField(
        column_name="modified_by",
        field="id",
        model=User,
        null=True,
        on_delete="SET NULL",
        on_update="CASCADE",
        constraints=[SQL("UNSIGNED")],
    )
    name = CharField()
    size_range = ForeignKeyField(
        column_name="sizegroup_id",
        field="id",
        model=SizeRange,
        null=True,
        on_update="CASCADE",
        constraints=[SQL("UNSIGNED")],
    )
    in_shop = IntegerField(
        column_name="stockincontainer", constraints=[SQL("DEFAULT 0")]
    )
    price = IntegerField(column_name="value", constraints=[SQL("DEFAULT 0")])

    class Meta:
        table_name = "products"

    @staticmethod
    def get_product(product_id):
        return Product.get(Product.id == product_id)
