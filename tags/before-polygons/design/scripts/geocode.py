import urllib2

def q(uid, location):
    location = location.replace(' ', '+')
    url = 'http://maps.google.com/maps/geo?key=ABQIAAAAbNpbJQzOmQ3LpYb48UbbNxSZT5Tpn1taJFQH4Y5Wf2aA8FIGoRR00-ePrq_DDT5-FUNm7KoXKkB1lQ&output=csv&q=%s'%location
    f = urllib2.urlopen(url)

    line = f.readline()
    pieces = line.split(',')

    if pieces[0] == '602':
        # couldn't geocode the location
        return

    lat = pieces[2]
    lng = pieces[3]
    q = "update nodes set lat='%s', lng='%s' where uid='%s'"%(lat, lng, uid)
    return q

def do(rin):
    rows = rin.splitlines()
    for row in rows:
        cols = row.split('\t')
        uid = cols[0].rstrip()
        print q(uid, cols[1])

rin = '''2  	Colonial beach, Virginia
3 	Braintree, Massachusetts
4 	Charlottesville, VA
5 	Port Conway, Virginia
6 	Westmoreland County, Virginia
7 	Braintree, Massachusetts
8 	Waxhaw , North Carolina
9 	Kinderhook, New York
10 	Charles City County, Virginia
11 	Charles City County, Virginia
12 	Pineville, North Carolina
13 	Barboursville Orange County, Virginia
14 	Summerhill, New York
15 	Hillsborough, New Hampshire
16 	Mercersburg, Franklin County, Pennsylvania
17 	Hardin County, Kentucky
18 	Raleigh, North Carolina
19 	Point Pleasant, Clermont County, Ohio
20 	Delaware, Ohio
21 	Moreland Hills, Ohio
22 	Franklin County, Vermont
23 	Caldwell, New Jersey
24 	North Bend, Hamilton County, Ohio
25 	Caldwell, New Jersey
26 	Niles, Ohio
27 	New York City, New York
28 	Cincinnati, Ohio
29 	Staunton, Virginia
30 	Marion, Ohio
31 	Plymouth, Windsor County, Vermont
32 	West Branch, Iowa
33 	Hyde Park, New York
34 	Lamar, Missouri
35 	Denison, Texas
36 	Brookline, Massachusetts
37 	Stonewall, Texas
38 	Yorba Linda, California
39 	Omaha, Nebraska
40 	Plains, Georgia
41 	Tampico, Illinois
42 	Milton, Massachusetts
43 	Hope, Arkansas
44 	New Haven, Connecticut'''

    
