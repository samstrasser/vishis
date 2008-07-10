from constants import *
from VishisData import *
from dateutil.parser import parse as parseDate
import datetime
import demjson

baseUrl = 'http://simile.mit.edu/exhibit/examples/presidents/'
citeUrl = baseUrl + 'presidents.html'
url = baseUrl + 'presidents.js'

ds = Dataset()
c = Citation()
c.setUrl(citeUrl)
ds.setCitation(c)

t = Topic()
t.addField('title', 'U.S. Presidents')
ds.addTopic(t)


s = readUrl(url)
obj = demjson.decode(s)

latlngs = {}
presidents = {}
presidencies = {}

pyId = 0
items = obj['items']
for item in items:
    if not item.has_key('type'):
        # this is a latlng item
        pass # for now
    elif item['type'] == 'President':
        ency = item['presidency']
        if type(ency) != type([]):
            ency = [ency]

        for p in ency:
            presidents[p] = pyId
        
    elif item['type'] == 'Presidency':
        presidencies[item['index']] = pyId
    else:
        raise TypeError()

    pyId += 1

def createField(fieldName, fieldValue, doc):
    div = doc.createElement('div')
    div.setAttribute('class','field')

    span = div.createElement('span')
    span.setAttribute('class', 'field-name')
    span.setAttribute('style', 'font-weight:bold;')
    spanText = span.createTextNode(fieldName)

    span.appendChild(spanText)
    div.appendChild(span)

    text = div.createTextNode(fieldValue)
    div.appendChild(text)

    return div

months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
def formatDate(d):
    global months
    return months[d.month] + ' ' + str(d.day) + ', ' + str(d.year)

def getHtml(node):
    html = ''
    for child in node.childNodes:
        html += child.toString()

    return html

for k in presidencies.keys():
    ency = items[presidencies[k]]
    ent = items[presidents[ency['index']]]

    start = parseDate(ency['inDate'])
    start = start.combine(start, datetime.time(12,00,00))
    end   = parseDate(ency['outDate'])
    end   = end.combine(end, datetime.time(11,59,59))

    doc = libxml2dom.parseString('<html></html>', html=1)

    par = doc.createElement('div')

    img = doc.createElement('img')
    img.setAttribute('src', ent['imageURL'])
    img.setAttribute('alt', ' ')
    img.setAttribute('style', 'float:right;')
    a = doc.createElement('a')
    a.appendChild(img)
    par.appendChild(img)

    val = formatDate(start) + ' - ' + formatDate(end)
    par.appendChild(createField('In office: ',val,doc))

    served = len(ent['term'])
    val = str(served) + ' term'
    if served > 1:
        val += 's'
    if ent['dieInOffice'] == 'yes':
        val += ' (died in office)'
    par.appendChild(createField(' served: ',val,doc))

    par.appendChild(createField('Party: ',ent['party'], doc))

    val = ', '.join(ent['religion'])
    par.appendChild(createField('Religion: ', val, doc))

    val = formatDate(parseDate(ent['birth'])) + ' in ' + ent['birthPlace']
    par.appendChild(createField('Born: ',val,doc))

    if ent.has_key('death'):
        val = formatDate(parseDate(ent['death'])) + ' in ' + ent['deathPlace']
        par.appendChild(createField('Died: ',val,doc))

    e = Event()
    e.addField('start', start)
    e.addField('end', end)
    e.addField('title', ent['label'])
    e.addField('location', ent['birthPlace'])
    e.setBlurbHtml(getHtml(par))
    t.addEvent(e)
