import urllib

def readUrl(url):
    f = urllib.urlopen(url)
    s = f.read()
    f.close()
    return s


import libxml2dom

def parseHtml(s):
    return libxml2dom.parseString(s, html=1)
