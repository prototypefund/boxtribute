from utils import assert_successful_request


def test_organisation_query(read_only_client, default_bases, default_organisation):
    query = f"""query {{
                organisation(id: "{default_organisation['id']}") {{
                    id
                    name
                    bases {{ id }}
                }}
            }}"""
    queried_organisation = assert_successful_request(read_only_client, query)
    assert queried_organisation == {
        "id": str(default_organisation["id"]),
        "name": default_organisation["name"],
        "bases": [{"id": str(b["id"])} for b in list(default_bases.values())[:2]],
    }


def test_organisations_query(read_only_client, default_organisation):
    query = """query { organisations { name } }"""
    queried_organisation = assert_successful_request(read_only_client, query)[0]
    assert queried_organisation["name"] == default_organisation["name"]
