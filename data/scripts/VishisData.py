import MySQLdb
import datetime

class Node:
    def getField(self, key):
        try:
            return self.fields[key]
        except AttributeError:
            return ''
        except KeyError:
            return ''
    
    def addField(self, key, val):
        try:
            tmp = self.fields
        except AttributeError:
            self.fields = {}

        self.fields[key] = val

    def getInsertQuery(self, table, d):
        qkeys = []
        keys = d.keys()
        for k in keys:
            qkeys.append('`' + k + '`')
        fields = ','.join(qkeys)

        vals = []
        for k in keys:
            if d[k] == None:
                vals.append('NULL')
            elif d[k].__class__ == datetime.datetime:
                # it's a date
                vals.append("'" + d[k].isoformat() + "'")
            elif d[k].startswith('@'):# it's a variable
                vals.append(d[k])
            else:
                vals.append("'" + MySQLdb.escape_string(d[k]) + "'")
        vals = ','.join(vals)

        return 'insert into `%s` (%s) values (%s);\n'%(table, fields, vals)

    def getLastIdQuery(self, var):
        return 'set @%s = last_insert_id();\n'%var

class Dataset(Node):
    def __init__(self):
        self.topics = []
        self.cite = Citation()
    
    def addTopic(self, t):
        self.topics.append(t)

    def setCitation(self, c):
        self.cite = c

    def asSql(self):
        print self.toSql()
        
    def toSql(self):
        sql = ''

        sql += self.getInsertQuery('citations', {'cid':None, 'url':self.cite.getUrl()})
        sql += self.getLastIdQuery('cid')
                                           
        for t in self.topics:
            sql += t.toSql() + '\n\n'
        return sql

class Topic(Node):
    def __init__(self):
        self.events = []
    
    def addEvent(self, e):
        self.events.append(e)

    def toSql(self):
        d = {'title':self.getField('title')}
        sql = self.getInsertQuery('nodes', d)
        sql += self.getLastIdQuery('tid')

        # set the citation for this topic
        d = {'nid':'@tid', 'cid':'@cid'}
        sql += self.getInsertQuery('node_citations', d)

        for e in self.events:
            sql += e.toSql()

        return sql
    
class Event(Node):
    def __init__(self):
        self.dbFields = ['start', 'end', 'location', 'title']
        self.polygons = []
        self.marker = None
        self.blurb = None

    def addPolygon(self, p):
        self.polygons.append(p)
        p.setParent(self)

    def getPolygons(self):
        return self.polygons

    def setMarker(self, m):
        self.marker = m

    def setBlurbHtml(self, html):
        self.blurb = html

    def toSql(self):
        d = {}
        for field in self.dbFields:
            d[field] = self.getField(field)
            
        sql = self.getInsertQuery('nodes', d)
        sql += self.getLastIdQuery('eid')

        if self.blurb:
            sql += self.getInsertQuery('node_blurbs', {'nid':'@eid','blurb_html': self.blurb})

        if self.marker:
            sql += self.marker.toSql()

        for p in self.polygons:
            sql += p.toSql()

        d = {'fromNid':'@tid', 'toNid':'@eid'}
        sql += self.getInsertQuery('node_relations', d)
        return sql

class Marker(Node):
    def toSql(self):
        lat = self.getField('lat')
        lng = self.getField('lng')
        
        d = {'nid': '@eid', 'lat':lat, 'lng':lng}
        sql = self.getInsertQuery('node_markers', d)

        return sql
    
class Polygon(Node):
    def __init__(self):
        self.coords = []

    def setParent(self, p):
        self.parent = p
    
    def addCoord(self, c):
        self.coords.append(c)

    def getCoords(self):
        return self.coords

    def toSql(self):
        # insert the polygon as an entity
        sql = self.getInsertQuery('node_polygons', {'nid':'@eid', 'pid':None})
        sql += self.getLastIdQuery('pid')

        # insert all the coordinates for the polygon
        for coord in self.coords:
            lat, lng = coord
            d = {'pid':'@pid', 'lat':lat, 'lng':lng}
            sql += self.getInsertQuery('node_polygons_coords', d)

        return sql


class Citation:
    def __init__(self):
        self.url = 'http://www.visualizehistory.com/data'

    def setUrl(self, url):
        self.url = url
        
    def getUrl(self):
        return self.url
                                   
if __name__ == '__main__':
    ds = Dataset()

    c = Citation()
    c.setUrl('http://not.a.real.site.com')
    ds.setCitation(c)

    t = Topic()
    t.addField('title', "Topic's Title")
    ds.addTopic(t)
    
    e1 = Event()
    e1.addField('title', 'Event One')
    e1.addField('location', 'Location of Event One')
    e1.setBlurbHtml('<h1>Event ONE!!!</h1>')
    t.addEvent(e1)

    m1 = Marker()
    m1.addField('lat', '1.23456789')
    m1.addField('lng', '1.23456789')
    e1.setMarker(m1)

    e2 = Event()
    e2.addField('title', 'Event Two')
    e2.addField('location', 'Location of Event Two')
    e2.setBlurbHtml('<h2><i>event two</i></h2>')
    t.addEvent(e2)
    
            
            
