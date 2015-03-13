[KML](http://code.google.com/apis/kml/) is a pretty large markup language and much of it does not apply to Visualize History.  So the vishis site will parse KML files, but will ignore things irrelevant to its display of history.

This page will get more concrete once I find some good examples of how people use KML and I implement those

# Kml -> [VisHis Objects](ObjectInterfaces.md) #
```
<kml xmlns="http://earth.google.com/kml/2.2">
  <Document>                                      Topic
    <name><![CDATA[US States]]></name>            Topic.title

    <Placemark id="pm251">                        Event
      <name><![CDATA[title]]></name>              Event.title
      <Snippet maxLines="0">empty</Snippet>       ---
      <description><![CDATA[HTML]]></description> Marker.blurb
      <TimeSpan>
        <begin>DATE</begin>                       Event.start
            <end>DATE</end>                       Event.end
      </TimeSpan>
      <MultiGeometry>
        <Point>
          <coordinates>                           Marker.LatLng
-156.326917860547,20.2401578536914                as long as Point is in the tag stack
          </coordinates>
        </Point>
        <MultiGeometry>
          <Polygon>                               Polygon
              <LinearRing>
                <coordinates>                     Polygon.coords
-159.335174733889,21.9483433404175                as long as LinearRing is in the tag stack
-159.327130348878,22.0446395507162 
-159.295025589769,22.1248124949548 
-159.335174733889,21.9483433404175 
                </coordinates>
              </LinearRing>
          </Polygon>
        </MultiGeometry>
      </MultiGeometry>
    </Placemark>
  </Document>
</kml>
```

# Jots #
For now, I will just write reminders of things that come up along the way.
  * Placemark.address => Event.location?
  * Placemark.TimePrimitive and not just .TimeSpan