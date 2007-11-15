#!/usr/bin/env python

# import cgi
# import cgitb; cgitb.enable()  # for troubleshooting

print "Content-type: text/json"

print """
{
    "firstName": "John",
    "lastName": "Smith",
    "address": {
        "streetAddress": "21 2nd Street",
        "city": "New York",
        "state": "NY",
        "postalCode": 10021
    },
    "phoneNumbers": [
        "212 732-1234",
        "646 123-4567"
    ]
}
"""
