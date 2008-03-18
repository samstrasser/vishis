import urllib
# Get a file-like object for the Python Web site's home page.
f = urllib.urlopen("http://www.python.org")
# Read from the object, storing the page's contents in 's'.
s = f.read()
f.close()

import libxml2dom


doc = libxml2dom.parseString(s, html=1)
