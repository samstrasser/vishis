from constants import *
from VishisData import *
from dateutil.parser import parse as parseDate
import datetime

citeUrl = 'http://www.historyplace.com/civilwar/index.html'
baseUrl = 'http://www.historyplace.com/civilwar/'

s = readUrl(citeUrl)

doc = parseHtml(s)

ps = doc.getElementsByTagName('p')

# the first 4 are garbage
ps = ps[4:130]

# recursively get all the text
def getPlainText(node):
    text = ''
    for child in node.childNodes:
        if child.nodeType == child.TEXT_NODE:
            text += child.toString()
        else:
            text += getPlainText(child)
    return text

ds = Dataset()
c = Citation()
c.setUrl(citeUrl)
ds.setCitation(c)

t = Topic()
t.addField('title', 'Major Events of the Civil War')
ds.addTopic(t)

for p in ps:
    # first: get the date
    fontNodes = p.getElementsByTagName('font')

    if len(fontNodes) < 1:
        ## it's a quote or a picture        ## todo
        continue

    f = fontNodes[0]

    if f.hasAttribute('size'):
        # it's a bold declaration        # todo
        continue

    dateString = getPlainText(f)
        
    # todo: convert the dateString to a date
    try:
        if dateString == 'In March':
            start = parseDate('03/01/1862')
            end = parseDate('03/31/1862')
        
        # sillly hack for parseDate
        if dateString.startswith('Sept'):
            dateString = 'Sep' + dateString[4:]
        start = parseDate(dateString)
        end = start
    except ValueError:
        # there are several possibilties here

        # March 8/9, 1862 or Aug 29/30, 1962
        slash = dateString.find('/')
        comma = dateString.find(',')
        dash  = dateString.find('-')
        space = dateString.find(' ')

        if slash != -1:
            startString = dateString[0:slash] + dateString[comma:]
            endString = dateString[0:space+1] + dateString[slash+1:]
        elif dash != -1:
            if comma == -1:
                # June 25-July 1
                startString = '06/25/1862'
                endString = '07/01/1862'
            else:
                # May 1-4, 1863
                startString = dateString[0:dash] + dateString[comma:]
                endString = dateString[0:space+1] + dateString[dash+1:]
        else:
            # doesn't happen
            pass

        
        start = parseDate(startString)
        end   = parseDate(endString)

    # put it at the end of the day for there to be some duration
    end   = end.combine(end, datetime.time(23,59,59))

    p.removeChild(f.parentNode)

    plainText = getPlainText(p)
    if plainText.startswith(' - '):
        plainText = plainText[3:]
    title = plainText[0:plainText.find('.')]

    e = Event()
    e.addField('start', start)
    e.addField('end', end)
    e.addField('title', 'TITLE')
    e.addField('location', 'LOCATION')
    e.setBlurbHtml(plainText)
    t.addEvent(e)

## The locations and titles could not be extracted programmatically
## so I will add them by hand:

def getAnEvent():
    for e in ds.topics[0].events:
        if e.fields['title'] == 'TITLE':
            return e
        if e.fields['location'] == 'LOCATION':
            return e
    return False

def setFields(e, t, l):
    e.addField('title', t)
    e.addField('location', l)

def do():
    e = getAnEvent()
    e.blurb
    setFields(e, 'Abraham Lincoln is elected president', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'South Carolina secedes from the Union', 'South Carolina')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Confederate States of America is formed', 'Richmond, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Abraham Lincoln is sworn in as President', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Civil War begins as Confederates fire on Fort Sumter', 'Charleston, South Carolina')
    e = getAnEvent()
    e.blurb
    setFields(e, 'President Lincoln calls for a special session of Congress', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Virginia secedes from the Union', 'Richmond, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'President Lincoln issues a Blockade against Southern ports', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Robert E. Lee resigns from the U.S. Army', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Congress calls for 500,000 soldiers', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The First Battle of Bull Run', 'Manassas, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'McClellan becomes leader of the Army of the Potomac', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Lincoln revokes a military proclamation of emancipation', 'Missouri')
    e = getAnEvent()
    e.blurb
    setFields(e, 'McClellan is appointed general-in-chief of all Union forces', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'England demands the release of Confederate officials', 'London, England')
    e = getAnEvent()
    e.blurb
    setFields(e, 'President Lincoln orders advancement of U.S. forces', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Battles of Fort Henry and Fort Donelson', 'Dover, Tennessee')
    e = getAnEvent()
    e.blurb
    setFields(e, "President Lincoln's son dies", 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Two Ironclad ships battle to a draw', 'Sewell\'s Point, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Army of the Potomac advances toward the Confederate capital, Richmond', 'Fredericksburg, VA')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Union is surprised and loses in The Battle of Shiloh', 'Shiloh, Tennessee')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Union takes the seaport at New Orleans', 'New Orleans, Louisiana')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Battle of Seven Pines', 'Seven Pines, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Robert E. Lee assumes command of the Army of Northern Virginia', 'Richmond, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Seven Days Battles result in heavy losses for both sides', 'Richmond, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'President Lincoln appoints Henry Halleck as general-in-chief', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Second Battle of Bull Run sees another Union loss', 'Manassas, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Lee invades the North, heading for Harper\'s Ferry', 'Harper\'s Ferry, West Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'THe bloodiest day in U.S. military history', 'Antietam, Maryland')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Lincoln issues a Preliminary Emancipation Proclamation', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'McClellan is replaced by General Burnside as Commander of the Army of the Potomac', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Battle of Fredericksburg, Virginia', 'Fredericksburg, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Lincoln issues the Emancipation Proclamation', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'General Hooker replaces General Burnside as Commander of the Army of the Potomac', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'General Grant takes control of the Army of the West', 'Vicksburg, Mississippi')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Congress enacts a draft for males aged 20 to 45', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Lee\'s army defeats the Union Army at the Battle of Chancellorsville', 'Chancellorsville, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Stonewall Jackson dies', 'Spotsylvania County, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'General Lee heads toward Gettysburg', 'Westminster, Maryland')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Gen. George G. Meade appointed as commander of the Army of the Potomac', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Battle of Gettysburg', 'Gettysburg, Pennsylvania')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Vicksburg surrenders to General Grant after a siege', 'Vicksburg, Mississippi')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Antidraft riots take over New York', 'New York City, New York')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Attack on Rebels at Fort Wagner', 'Fort Wagner, South Carolina')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Frederick Douglass pushes for equality for Black troops', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Raid on a town, killing 182 boys and men', 'Lawrence, Kansas')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Army of Tennessee defeats the Union Army at Chattanooga', 'Chattanooga, Tennessee')
    e = getAnEvent()
    e.blurb
    setFields(e, 'General Grant takes command of the western theater', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Gettysburg Address', 'Gettysburg, Pennsylvannia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Union forces defeat the Rebel siege at Chattanooga', 'Chattanooga, Tennessee')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Gen. Grant takes command of all of the armies of the United States', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Union begins a massive, coordinated campaign', 'Spotsylvania, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Union loses 7,000 casualties in a Rebel offensive', 'Mechanicsville, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Grant lays siege to General Lee', 'Petersburg, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Sherman and his forces battle the Confederates', 'Atlanta, Georgia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'George McClellan is nominated for President', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Sherman and his army capture Atlanta', 'Atlanta, Georgia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'A decisive victory for the Union in the Shenandoah Valley', 'Shenandoah Valley')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Abraham Lincoln is reelected as president', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Sherman\'s March to the Sea begins', 'Atlanta, Georgia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The Rebel Army is crushed in the Battle of Nashville', 'Nashville, Tennessee')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Sherman ends his "March to the Sea"', 'Savannah, Georgia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Congress ratifies the 13th Amendment, abolishing slavery', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'A peace conference between the fighting sides', 'Hampton, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'President Lincoln is inaugurated', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'The last offensive of Lee\'s army', 'Petersburg, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'General grant breaks through the Confederate lines', 'Petersburg, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'President Lincoln tours the Confederate White House', 'Richmond, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'General Lee surrenders to General Grant', 'Appomattox, Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Washington celebrations', 'Washington D.C.')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Lincoln assassinated at Ford\'s Theater', 'Fort Sumter, South Carolina')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Lincoln dies', 'Fort Sumter, South Carolina')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Confederates surrender to General Sherman', 'Durham, North Carolina')
    e = getAnEvent()
    e.blurb
    setFields(e, 'John Wilkes Booth is shot and killed', 'Virginia')
    e = getAnEvent()
    e.blurb
    setFields(e, 'Abraham Lincoln is laid to rest', 'Springfield, Illinois')

    try:
        e = getAnEvent()
        e.blurb
    except:
        pass

do()
ds.asSql()
