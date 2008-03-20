from constants import *
from VishisData import *
from dateutil.parser import parse as parseDate
import datetime

baseUrl = 'http://valley.vcdh.virginia.edu/reference/timelines/'
citeUrl = baseUrl + 'timelines.html'

# recursively get all the text
def getPlainText(node):
    text = ''
    for child in node.childNodes:
        if child.nodeType == child.TEXT_NODE:
            text += child.toString()
        else:
            text += getPlainText(child)
    return text

def getHtml(node):
    html = ''
    for child in node.childNodes:
        html += child.toString()

    return html

locs = ['d','Augusta County, VA','Franklin County, PA','Virginia','Pennsylvania','United States']

ds = Dataset()
c = Citation()
c.setUrl(citeUrl)
ds.setCitation(c)

t = Topic()
t.addField('title', 'The Valley of the Shadow')
ds.addTopic(t)

for year in range(1859, 1868):
    year = 1859
    url = baseUrl + 'timeline%d.html'%year

    s = readUrl(url)
    doc = parseHtml(s)

    trs = doc.getElementsByTagName('tr')[1:]

    for tr in trs:

        tds = tr.getElementsByTagName('td')

        dateString = getPlainText(tds[0])
        space = dateString.rfind(' ')
        if space > -1:
            dateString = dateString[space:]
        start = parseDate(dateString)
        end   = start.combine(start, datetime.time(23,59,59))

        for col in range(1, 6):
            td = tds[col]

            if len(td.childNodes) > 0:
                location = locs[col]

                plainText = getPlainText(td)
                title = plainText[0:200]
                if len(plainText) > 200:
                    title += '...'

                html = getHtml(td)

                e = Event()
                e.addField('start', start)
                e.addField('end', end)
                e.addField('title', title)
                e.addField('location', location)
                e.setBlurbHtml(html)
                t.addEvent(e)
