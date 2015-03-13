# SQL #
**nodes**
```
nid
title
location
start, end
color
```

**node\_markers**
```
nid
lat,lng
```

**node\_polygons
```
nid
pid
```**

**polygons\_coords**
```
pid
lat,lng
```

**node\_blurbs**
```
nid
blurbHtml
```

**node\_relations**
```
fromNid
toNid
```

**node\_citations**
```
nid
url
```

# JSON #
```
Topic topic:{
 (data fields),
 Array Event events: {
  0: {
    (data fields),
    Marker marker: {
        (data fields)
    },
    Array Polygon polygons: {
        0: {(data fields)},
		1: {(data fields)}
	},
  }
  1: {...}
 }
}
```