-- phpMyAdmin SQL Dump
-- version 2.11.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 20, 2008 at 01:07 PM
-- Server version: 5.0.45
-- PHP Version: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `visualiz_vishis`
--

-- --------------------------------------------------------

--
-- Table structure for table `citations`
--

CREATE TABLE `citations` (
  `cid` int(11) NOT NULL auto_increment,
  `url` varchar(254) NOT NULL,
  UNIQUE KEY `nid` (`cid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `citations`
--

INSERT INTO `citations` VALUES(1, 'http://www.historyplace.com/civilwar/index.html');
INSERT INTO `citations` VALUES(2, 'http://www.historyplace.com/civilwar/index.html');

-- --------------------------------------------------------

--
-- Table structure for table `nodes`
--

CREATE TABLE `nodes` (
  `nid` int(11) NOT NULL auto_increment,
  `title` varchar(254) NOT NULL,
  `location` varchar(254) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `color` char(6) NOT NULL,
  PRIMARY KEY  (`nid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=78 ;

--
-- Dumping data for table `nodes`
--

INSERT INTO `nodes` VALUES(2, 'Major Events of the Civil War', '', '0000-00-00 00:00:00', '0000-00-00 00:00:00', '');
INSERT INTO `nodes` VALUES(3, 'Abraham Lincoln is elected president', 'Washington D.C.', '1860-11-06 00:00:00', '1860-11-06 23:59:59', '');
INSERT INTO `nodes` VALUES(4, 'South Carolina secedes from the Union', 'South Carolina', '1860-12-20 00:00:00', '1860-12-20 23:59:59', '');
INSERT INTO `nodes` VALUES(5, 'The Confederate States of America is formed', 'Richmond, Virginia', '1861-02-09 00:00:00', '1861-02-09 23:59:59', '');
INSERT INTO `nodes` VALUES(6, 'Abraham Lincoln is sworn in as President', 'Washington D.C.', '1861-03-04 00:00:00', '1861-03-04 23:59:59', '');
INSERT INTO `nodes` VALUES(7, 'The Civil War begins as Confederates fire on Fort Sumter', 'Charleston, South Carolina', '1861-04-12 00:00:00', '1861-04-12 23:59:59', '');
INSERT INTO `nodes` VALUES(8, 'President Lincoln calls for a special session of Congress', 'Washington D.C.', '1861-04-15 00:00:00', '1861-04-15 23:59:59', '');
INSERT INTO `nodes` VALUES(9, 'Virginia secedes from the Union', 'Richmond, Virginia', '1861-04-17 00:00:00', '1861-04-17 23:59:59', '');
INSERT INTO `nodes` VALUES(10, 'President Lincoln issues a Blockade against Southern ports', 'Washington D.C.', '1861-04-19 00:00:00', '1861-04-19 23:59:59', '');
INSERT INTO `nodes` VALUES(11, 'Robert E. Lee resigns from the U.S. Army', 'Washington D.C.', '1861-04-20 00:00:00', '1861-04-20 23:59:59', '');
INSERT INTO `nodes` VALUES(12, 'Congress calls for 500,000 soldiers', 'Washington D.C.', '1861-07-04 00:00:00', '1861-07-04 23:59:59', '');
INSERT INTO `nodes` VALUES(13, 'The First Battle of Bull Run', 'Manassas, Virginia', '1861-07-21 00:00:00', '1861-07-21 23:59:59', '');
INSERT INTO `nodes` VALUES(14, 'McClellan becomes leader of the Army of the Potomac', 'Washington D.C.', '1861-07-27 00:00:00', '1861-07-27 23:59:59', '');
INSERT INTO `nodes` VALUES(15, 'Lincoln revokes a military proclamation of emancipation', 'Missouri', '1861-09-11 00:00:00', '1861-09-11 23:59:59', '');
INSERT INTO `nodes` VALUES(16, 'McClellan is appointed general-in-chief of all Union forces', 'Washington D.C.', '1861-11-01 00:00:00', '1861-11-01 23:59:59', '');
INSERT INTO `nodes` VALUES(17, 'England demands the release of Confederate officials', 'London, England', '1861-11-08 00:00:00', '1861-11-08 23:59:59', '');
INSERT INTO `nodes` VALUES(18, 'President Lincoln orders advancement of U.S. forces', 'Washington D.C.', '1862-01-31 00:00:00', '1862-01-31 23:59:59', '');
INSERT INTO `nodes` VALUES(19, 'Battles of Fort Henry and Fort Donelson', 'Dover, Tennessee', '1862-02-06 00:00:00', '1862-02-06 23:59:59', '');
INSERT INTO `nodes` VALUES(20, 'President Lincoln''s son dies', 'Washington D.C.', '1862-02-20 00:00:00', '1862-02-20 23:59:59', '');
INSERT INTO `nodes` VALUES(21, 'Two Ironclad ships battle to a draw', 'Sewell''s Point, Virginia', '1862-03-08 00:00:00', '1862-03-09 23:59:59', '');
INSERT INTO `nodes` VALUES(22, 'The Army of the Potomac advances toward the Confederate capital, Richmond', 'Fredericksburg, VA', '1862-03-08 00:00:00', '1862-03-09 23:59:59', '');
INSERT INTO `nodes` VALUES(23, 'The Union is surprised and loses in The Battle of Shiloh', 'Shiloh, Tennessee', '1862-04-06 00:00:00', '1862-04-07 23:59:59', '');
INSERT INTO `nodes` VALUES(24, 'The Union takes the seaport at New Orleans', 'New Orleans, Louisiana', '1862-04-24 00:00:00', '1862-04-24 23:59:59', '');
INSERT INTO `nodes` VALUES(25, 'The Battle of Seven Pines', 'Seven Pines, Virginia', '1862-05-31 00:00:00', '1862-05-31 23:59:59', '');
INSERT INTO `nodes` VALUES(26, 'Robert E. Lee assumes command of the Army of Northern Virginia', 'Richmond, Virginia', '1862-06-01 00:00:00', '1862-06-01 23:59:59', '');
INSERT INTO `nodes` VALUES(27, 'The Seven Days Battles result in heavy losses for both sides', 'Richmond, Virginia', '1862-06-25 00:00:00', '1862-07-01 23:59:59', '');
INSERT INTO `nodes` VALUES(28, 'President Lincoln appoints Henry Halleck as general-in-chief', 'Washington D.C.', '1862-07-11 00:00:00', '1862-07-11 23:59:59', '');
INSERT INTO `nodes` VALUES(29, 'The Second Battle of Bull Run sees another Union loss', 'Manassas, Virginia', '1862-08-29 00:00:00', '1862-08-30 23:59:59', '');
INSERT INTO `nodes` VALUES(30, 'Lee invades the North, heading for Harper''s Ferry', 'Harper''s Ferry, West Virginia', '1862-09-04 00:00:00', '1862-09-09 23:59:59', '');
INSERT INTO `nodes` VALUES(31, 'THe bloodiest day in U.S. military history', 'Antietam, Maryland', '1862-09-17 00:00:00', '1862-09-17 23:59:59', '');
INSERT INTO `nodes` VALUES(32, 'Lincoln issues a Preliminary Emancipation Proclamation', 'Washington D.C.', '1862-09-22 00:00:00', '1862-09-22 23:59:59', '');
INSERT INTO `nodes` VALUES(33, 'McClellan is replaced by General Burnside as Commander of the Army of the Potomac', 'Washington D.C.', '1862-11-07 00:00:00', '1862-11-07 23:59:59', '');
INSERT INTO `nodes` VALUES(34, 'Battle of Fredericksburg, Virginia', 'Fredericksburg, Virginia', '1862-12-13 00:00:00', '1862-12-13 23:59:59', '');
INSERT INTO `nodes` VALUES(35, 'Lincoln issues the Emancipation Proclamation', 'Washington D.C.', '1863-01-01 00:00:00', '1863-01-01 23:59:59', '');
INSERT INTO `nodes` VALUES(36, 'General Hooker replaces General Burnside as Commander of the Army of the Potomac', 'Washington D.C.', '1863-01-25 00:00:00', '1863-01-25 23:59:59', '');
INSERT INTO `nodes` VALUES(37, 'General Grant takes control of the Army of the West', 'Vicksburg, Mississippi', '1863-01-29 00:00:00', '1863-01-29 23:59:59', '');
INSERT INTO `nodes` VALUES(38, 'Congress enacts a draft for males aged 20 to 45', 'Washington D.C.', '1863-03-03 00:00:00', '1863-03-03 23:59:59', '');
INSERT INTO `nodes` VALUES(39, 'Lee''s army defeats the Union Army at the Battle of Chancellorsville', 'Chancellorsville, Virginia', '1863-05-01 00:00:00', '1863-05-04 23:59:59', '');
INSERT INTO `nodes` VALUES(40, 'Stonewall Jackson dies', 'Spotsylvania County, Virginia', '1863-05-10 00:00:00', '1863-05-10 23:59:59', '');
INSERT INTO `nodes` VALUES(41, 'General Lee heads toward Gettysburg', 'Westminster, Maryland', '1863-06-03 00:00:00', '1863-06-03 23:59:59', '');
INSERT INTO `nodes` VALUES(42, 'Gen. George G. Meade appointed as commander of the Army of the Potomac', 'Washington D.C.', '1863-06-28 00:00:00', '1863-06-28 23:59:59', '');
INSERT INTO `nodes` VALUES(43, 'The Battle of Gettysburg', 'Gettysburg, Pennsylvania', '1863-07-01 00:00:00', '1863-07-03 23:59:59', '');
INSERT INTO `nodes` VALUES(44, 'Vicksburg surrenders to General Grant after a siege', 'Vicksburg, Mississippi', '1863-07-04 00:00:00', '1863-07-04 23:59:59', '');
INSERT INTO `nodes` VALUES(45, 'Antidraft riots take over New York', 'New York City, New York', '1863-07-13 00:00:00', '1863-07-16 23:59:59', '');
INSERT INTO `nodes` VALUES(46, 'Attack on Rebels at Fort Wagner', 'Fort Wagner, South Carolina', '1863-07-18 00:00:00', '1863-07-18 23:59:59', '');
INSERT INTO `nodes` VALUES(47, 'Frederick Douglass pushes for equality for Black troops', 'Washington D.C.', '1863-08-10 00:00:00', '1863-08-10 23:59:59', '');
INSERT INTO `nodes` VALUES(48, 'Raid on a town, killing 182 boys and men', 'Lawrence, Kansas', '1863-08-21 00:00:00', '1863-08-21 23:59:59', '');
INSERT INTO `nodes` VALUES(49, 'The Army of Tennessee defeats the Union Army at Chattanooga', 'Chattanooga, Tennessee', '1863-09-19 00:00:00', '1863-09-20 23:59:59', '');
INSERT INTO `nodes` VALUES(50, 'General Grant takes command of the western theater', 'Washington D.C.', '1863-10-16 00:00:00', '1863-10-16 23:59:59', '');
INSERT INTO `nodes` VALUES(51, 'The Gettysburg Address', 'Gettysburg, Pennsylvannia', '1863-11-19 00:00:00', '1863-11-19 23:59:59', '');
INSERT INTO `nodes` VALUES(52, 'Union forces defeat the Rebel siege at Chattanooga', 'Chattanooga, Tennessee', '1863-11-23 00:00:00', '1863-11-25 23:59:59', '');
INSERT INTO `nodes` VALUES(53, 'Gen. Grant takes command of all of the armies of the United States', 'Washington D.C.', '1864-03-09 00:00:00', '1864-03-09 23:59:59', '');
INSERT INTO `nodes` VALUES(54, 'Union begins a massive, coordinated campaign', 'Spotsylvania, Virginia', '1864-05-04 00:00:00', '1864-05-04 23:59:59', '');
INSERT INTO `nodes` VALUES(55, 'The Union loses 7,000 casualties in a Rebel offensive', 'Mechanicsville, Virginia', '1864-06-03 00:00:00', '1864-06-03 23:59:59', '');
INSERT INTO `nodes` VALUES(56, 'Grant lays siege to General Lee', 'Petersburg, Virginia', '1864-06-15 00:00:00', '1864-06-15 23:59:59', '');
INSERT INTO `nodes` VALUES(57, 'Sherman and his forces battle the Confederates', 'Atlanta, Georgia', '1864-07-20 00:00:00', '1864-07-20 23:59:59', '');
INSERT INTO `nodes` VALUES(58, 'George McClellan is nominated for President', 'Washington D.C.', '1864-08-29 00:00:00', '1864-08-29 23:59:59', '');
INSERT INTO `nodes` VALUES(59, 'Sherman and his army capture Atlanta', 'Atlanta, Georgia', '1864-09-02 00:00:00', '1864-09-02 23:59:59', '');
INSERT INTO `nodes` VALUES(60, 'A decisive victory for the Union in the Shenandoah Valley', 'Shenandoah Valley', '1864-10-19 00:00:00', '1864-10-19 23:59:59', '');
INSERT INTO `nodes` VALUES(61, 'Abraham Lincoln is reelected as president', 'Washington D.C.', '1864-11-08 00:00:00', '1864-11-08 23:59:59', '');
INSERT INTO `nodes` VALUES(62, 'Sherman''s March to the Sea begins', 'Atlanta, Georgia', '1864-11-15 00:00:00', '1864-11-15 23:59:59', '');
INSERT INTO `nodes` VALUES(63, 'The Rebel Army is crushed in the Battle of Nashville', 'Nashville, Tennessee', '1864-12-15 00:00:00', '1864-12-16 23:59:59', '');
INSERT INTO `nodes` VALUES(64, 'Sherman ends his "March to the Sea"', 'Savannah, Georgia', '1864-12-21 00:00:00', '1864-12-21 23:59:59', '');
INSERT INTO `nodes` VALUES(65, 'Congress ratifies the 13th Amendment, abolishing slavery', 'Washington D.C.', '1865-01-31 00:00:00', '1865-01-31 23:59:59', '');
INSERT INTO `nodes` VALUES(66, 'A peace conference between the fighting sides', 'Hampton, Virginia', '1865-02-03 00:00:00', '1865-02-03 23:59:59', '');
INSERT INTO `nodes` VALUES(67, 'President Lincoln is inaugurated', 'Washington D.C.', '1865-03-04 00:00:00', '1865-03-04 23:59:59', '');
INSERT INTO `nodes` VALUES(68, 'The last offensive of Lee''s army', 'Petersburg, Virginia', '1865-03-25 00:00:00', '1865-03-25 23:59:59', '');
INSERT INTO `nodes` VALUES(69, 'General grant breaks through the Confederate lines', 'Petersburg, Virginia', '1865-04-02 00:00:00', '1865-04-02 23:59:59', '');
INSERT INTO `nodes` VALUES(70, 'President Lincoln tours the Confederate White House', 'Richmond, Virginia', '1865-04-04 00:00:00', '1865-04-04 23:59:59', '');
INSERT INTO `nodes` VALUES(71, 'General Lee surrenders to General Grant', 'Appomattox, Virginia', '1865-04-09 00:00:00', '1865-04-09 23:59:59', '');
INSERT INTO `nodes` VALUES(72, 'Washington celebrations', 'Washington D.C.', '1865-04-10 00:00:00', '1865-04-10 23:59:59', '');
INSERT INTO `nodes` VALUES(73, 'Lincoln assassinated at Ford''s Theater', 'Fort Sumter, South Carolina', '1865-04-14 00:00:00', '1865-04-14 23:59:59', '');
INSERT INTO `nodes` VALUES(74, 'Lincoln dies', 'Fort Sumter, South Carolina', '1865-04-15 00:00:00', '1865-04-15 23:59:59', '');
INSERT INTO `nodes` VALUES(75, 'Confederates surrender to General Sherman', 'Durham, North Carolina', '1865-04-18 00:00:00', '1865-04-18 23:59:59', '');
INSERT INTO `nodes` VALUES(76, 'John Wilkes Booth is shot and killed', 'Virginia', '1865-04-26 00:00:00', '1865-04-26 23:59:59', '');
INSERT INTO `nodes` VALUES(77, 'Abraham Lincoln is laid to rest', 'Springfield, Illinois', '1865-05-04 00:00:00', '1865-05-04 23:59:59', '');

-- --------------------------------------------------------

--
-- Table structure for table `node_blurbs`
--

CREATE TABLE `node_blurbs` (
  `nid` int(11) NOT NULL,
  `blurb_html` mediumtext NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_blurbs`
--

INSERT INTO `node_blurbs` VALUES(3, 'Abraham Lincoln, who had declared "Government cannot \r\n  endure permanently half slave, half free..." is elected president, the \r\n  first Republican, receiving 180 of 303 possible electoral votes and 40 percent \r\n  of the popular vote. ');
INSERT INTO `node_blurbs` VALUES(4, 'South Carolina secedes\r\nfrom the Union. Followed within two months by Mississippi, Florida, Alabama,\r\nGeorgia, Louisiana and Texas. ');
INSERT INTO `node_blurbs` VALUES(5, 'The Confederate States of America is formed with Jefferson\r\nDavis, a West Point graduate and former U.S. Army officer, as president.\r\n');
INSERT INTO `node_blurbs` VALUES(6, 'Abraham Lincoln\r\nis sworn in as 16th President of the United States of America.\r\n');
INSERT INTO `node_blurbs` VALUES(7, 'At 4:30 a.m. Confederates\r\nunder Gen. Pierre Beauregard\r\nopen fire with 50 cannons upon Fort Sumter in Charleston, South Carolina.\r\nThe Civil War begins. ');
INSERT INTO `node_blurbs` VALUES(8, 'President Lincoln\r\nissues a Proclamation calling for 75,000 militiamen, and summoning a special\r\nsession of Congress for July 4. ');
INSERT INTO `node_blurbs` VALUES(9, 'Virginia secedes\r\nfrom the Union, followed within five weeks by Arkansas, Tennessee, and\r\nNorth Carolina, thus forming an eleven state Confederacy with a population\r\nof 9 million, including nearly 4 million slaves. The Union will soon have\r\n21 states and a population of over 20 million.');
INSERT INTO `node_blurbs` VALUES(10, 'President Lincoln\r\nissues a Proclamation of Blockade against Southern ports. For the duration\r\nof the war the blockade limits the ability of the rural South to stay well\r\nsupplied in its war against the industrialized North. ');
INSERT INTO `node_blurbs` VALUES(11, 'Robert E. Lee resigns\r\nhis commission in the United States Army. "I cannot raise\r\nmy hand against my birthplace, my home, my children." Lee then goes\r\nto Richmond, Virginia, is offered command of the military and naval forces\r\nof Virginia, and accepts. ');
INSERT INTO `node_blurbs` VALUES(12, 'Lincoln, in a speech\r\nto Congress, states the war is..."a People''s contest...a struggle\r\nfor maintaining in the world, that form, and substance of government, whose\r\nleading object is, to elevate the condition of men..." The Congress\r\nauthorizes a call for 500,000 men. ');
INSERT INTO `node_blurbs` VALUES(13, 'The Union Army under\r\nGen. Irvin McDowell suffers\r\na defeat at Bull Run\r\n25 miles southwest of Washington. Confederate Gen. Thomas\r\nJ. Jackson earns the nickname "Stonewall," as his brigade\r\nresists Union attacks. Union troops fall back to Washington. President\r\nLincoln realizes the war will be long. "It''s damned bad," he\r\ncomments. ');
INSERT INTO `node_blurbs` VALUES(14, 'President Lincoln appoints George B. McClellan as\r\nCommander of the Department of the Potomac, replacing McDowell. ');
INSERT INTO `node_blurbs` VALUES(15, 'President Lincoln\r\nrevokes Gen. John C. Fr&eacute;mont''s unauthorized military proclamation\r\nof emancipation in Missouri. Later, the president relieves Gen. Fr&eacute;mont\r\nof his command and replaces him with Gen. David Hunter. ');
INSERT INTO `node_blurbs` VALUES(16, 'President Lincoln\r\nappoints McClellan as general-in-chief of all Union forces after the resignation\r\nof the aged Winfield Scott.\r\nLincoln tells McClellan, "...the supreme command of the Army will\r\nentail a vast labor upon you." McClellan responds, "I can do\r\nit all." ');
INSERT INTO `node_blurbs` VALUES(17, 'The beginning of an\r\ninternational diplomatic crisis for President Lincoln as two Confederate\r\nofficials sailing toward England are seized by the U.S. Navy. England,\r\nthe leading world power, demands their release, threatening war. Lincoln\r\neventually gives in and orders their release in December. "One war\r\nat a time," Lincoln remarks. ');
INSERT INTO `node_blurbs` VALUES(18, 'President Lincoln\r\nissues General War Order No. 1 calling for all United States naval and\r\nland forces to begin a general advance by Feb 22, George Washington''s birthday.\r\n');
INSERT INTO `node_blurbs` VALUES(19, 'Feb\r\n6, 1862 - Victory for Gen. Ulysses S. Grant in Tennessee,\r\ncapturing Fort Henry, and ten days later Fort Donelson. Grant earns the\r\nnickname "Unconditional Surrender" Grant. ');
INSERT INTO `node_blurbs` VALUES(20, 'President Lincoln is struck \r\n  with grief as his beloved eleven-year-old son, Willie, dies from fever, probably \r\n  caused by polluted drinking water in the White House. ');
INSERT INTO `node_blurbs` VALUES(21, 'The Confederate\r\nIronclad ''Merrimac'' sinks two wooden Union ships then battles the Union\r\nIronclad ''Monitor'' to a draw. Naval warfare is thus changed forever, making\r\nwooden ships obsolete. Engraving of\r\nthe Battle ');
INSERT INTO `node_blurbs` VALUES(22, '-\r\nThe Peninsular Campaign begins as McClellan''s Army of the Potomac advances\r\nfrom Washington down the Potomac River and the Chesapeake Bay to the peninsular\r\nsouth of the Confederate Capital of Richmond, Virginia then begins an advance\r\ntoward Richmond. ');
INSERT INTO `node_blurbs` VALUES(23, 'Confederate surprise\r\nattack on Gen. Ulysses S. Grant''s unprepared troops at Shiloh on the Tennessee\r\nRiver results in a bitter struggle with 13,000 Union killed and wounded\r\nand 10,000 Confederates, more men than in all previous American wars combined.\r\nThe president is then pressured to relieve Grant but resists. "I can''t\r\nspare this man; he fights," Lincoln says. ');
INSERT INTO `node_blurbs` VALUES(24, '17 Union ships\r\nunder the command of Flag Officer David\r\nFarragut move up the Mississippi River then take New Orleans, the\r\nSouth''s greatest seaport. Later in the war, sailing through a Rebel mine\r\nfield Farragut utters the famous phrase "Damn the torpedoes, full\r\nspeed ahead!" ');
INSERT INTO `node_blurbs` VALUES(25, 'The Battle of Seven\r\nPines as Gen. Joseph E. Johnston''s\r\nArmy attacks McClellan''s troops in front of Richmond and nearly defeats\r\nthem. But Johnston is badly wounded. ');
INSERT INTO `node_blurbs` VALUES(26, 'Gen. Robert E. Lee assumes command, replacing the\r\nwounded Johnston. Lee then renames his force the Army of Northern Virginia.\r\nMcClellan is not impressed, saying Lee is "likely to be timid and\r\nirresolute in action." ');
INSERT INTO `node_blurbs` VALUES(27, 'The Seven Days\r\nBattles as Lee attacks McClellan near Richmond, resulting in very heavy\r\nlosses for both armies. McClellan then begins a withdrawal back toward\r\nWashington. ');
INSERT INTO `node_blurbs` VALUES(28, 'After four months\r\nas his own general-in-chief, President Lincoln hands over the task to Gen.\r\nHenry W. (Old Brains) Halleck.\r\n');
INSERT INTO `node_blurbs` VALUES(29, '75,000 Federals\r\nunder Gen. John Pope are\r\ndefeated by 55,000 Confederates under Gen. Stonewall Jackson and Gen. James\r\nLongstreet at the second battle of Bull\r\nRun in northern Virginia. Once again the Union Army retreats to\r\nWashington. The president then relieves Pope. ');
INSERT INTO `node_blurbs` VALUES(30, 'Lee invades the\r\nNorth with 50,000 Confederates and heads for Harpers\r\nFerry, located 50 miles northwest of Washington. ');
INSERT INTO `node_blurbs` VALUES(31, 'The bloodiest day\r\nin U.S. military history as Gen. Robert E. Lee and the Confederate Armies\r\nare stopped at Antietam\r\nin Maryland by McClellan and numerically superior Union forces. By nightfall\r\n26,000 men are dead, wounded, or missing. Lee then withdraws to Virginia.\r\n');
INSERT INTO `node_blurbs` VALUES(32, 'Preliminary Emancipation\r\nProclamation freeing slaves issued by President Lincoln. ');
INSERT INTO `node_blurbs` VALUES(33, 'The president replaces\r\nMcClellan with Gen. Ambrose\r\nE. Burnside as the new Commander of the Army of the Potomac. Lincoln\r\nhad grown impatient with McClellan''s slowness to follow up on the success\r\nat Antietam, even telling him, "If you don''t want to use the army,\r\nI should like to borrow it for a while." ');
INSERT INTO `node_blurbs` VALUES(34, 'Army of the Potomac\r\nunder Gen. Burnside suffers a costly defeat at Fredericksburg\r\nin Virginia with a loss of 12,653 men after 14 frontal assaults on well\r\nentrenched Rebels on Marye''s Heights. "We might as well have tried\r\nto take hell," a Union soldier remarks. Confederate losses are 5,309.\r\n');
INSERT INTO `node_blurbs` VALUES(35, 'President Lincoln\r\nissues the final Emancipation Proclamation freeing all slaves in territories\r\nheld by Confederates and emphasizes the enlisting of black soldiers in\r\nthe Union Army. The war to preserve the Union now becomes a revolutionary\r\nstruggle for the abolition of slavery. ');
INSERT INTO `node_blurbs` VALUES(36, 'The president appoints\r\nGen. Joseph (Fighting Joe)\r\nHooker as Commander of the Army of the Potomac, replacing Burnside.\r\n');
INSERT INTO `node_blurbs` VALUES(37, 'Gen. Grant is placed\r\nin command of the Army of the West, with orders to capture Vicksburg. ');
INSERT INTO `node_blurbs` VALUES(38, 'The U.S. Congress\r\nenacts a draft, affecting male citizens aged 20 to 45, but also exempts\r\nthose who pay $300 or provide a substitute. "The blood of a poor man\r\nis as precious as that of the wealthy," poor Northerners complain.\r\n');
INSERT INTO `node_blurbs` VALUES(39, 'The Union Army under\r\nGen. Hooker is decisively defeated by Lee''s much smaller forces at the\r\nBattle of Chancellorsville in Virginia as a result of Lee''s brilliant and\r\ndaring tactics. Confederate Gen. Stonewall Jackson is mortally wounded\r\nby his own soldiers. Hooker retreats. Union losses are 17,000 killed, wounded\r\nand missing out of 130,000. The Confederates, 13, 000 out of 60,000. ');
INSERT INTO `node_blurbs` VALUES(40, 'The South suffers\r\na huge blow as Stonewall Jackson dies from his wounds, his last words,\r\n"Let us cross over the river and rest under the shade of the trees."\r\n');
INSERT INTO `node_blurbs` VALUES(41, 'Gen. Lee with 75,000\r\nConfederates launches his second invasion of the North, heading into Pennsylvania\r\nin a campaign that will soon lead to Gettysburg. ');
INSERT INTO `node_blurbs` VALUES(42, 'President Lincoln\r\nappoints Gen. George G. Meade\r\nas commander of the Army of the Potomac, replacing Hooker. Meade\r\nis the 5th man to command the Army in less than a year. ');
INSERT INTO `node_blurbs` VALUES(43, 'The tide of war\r\nturns against the South as the Confederates are defeated at the Battle\r\nof Gettysburg in Pennsylvania. ');
INSERT INTO `node_blurbs` VALUES(44, 'Vicksburg,\r\nthe last Confederate stronghold on the Mississippi River, surrenders to\r\nGen. Grant and the Army of the West after a six week siege. With the Union\r\nnow in control of the Mississippi, the Confederacy is effectively split\r\nin two, cut off from its western allies. ');
INSERT INTO `node_blurbs` VALUES(45, 'July 13-16, 1863 - Antidraft\r\nriots in New York City include arson and the murder of blacks by poor immigrant\r\nwhites. At least 120 persons, including children, are killed and $2 million\r\nin damage caused, until Union soldiers returning from Gettysburg restore\r\norder. ');
INSERT INTO `node_blurbs` VALUES(46, '- ''Negro troops'' of the\r\n54th Massachusetts Infantry Regiment under Col. Robert G. Shaw assault\r\nfortified Rebels at Fort Wagner, South Carolina. Col. Shaw and half of\r\nthe 600 men in the regiment are killed. ');
INSERT INTO `node_blurbs` VALUES(47, 'The president meets\r\nwith abolitionist Frederick\r\nDouglass who pushes for full equality for Union ''Negro troops.''\r\n');
INSERT INTO `node_blurbs` VALUES(48, 'At Lawrence, Kansas,\r\npro-Confederate William C. Quantrill and 450 proslavery followers raid\r\nthe town and butcher 182 boys and men. ');
INSERT INTO `node_blurbs` VALUES(49, 'A decisive Confederate\r\nvictory by Gen. Braxton Bragg''s Army of Tennessee at Chickamauga\r\nleaves Gen. William S. Rosecrans''\r\nUnion Army of the Cumberland trapped in Chattanooga, Tennessee under Confederate\r\nsiege. ');
INSERT INTO `node_blurbs` VALUES(50, 'The president appoints\r\nGen. Grant to command all operations in the western theater. ');
INSERT INTO `node_blurbs` VALUES(51, 'President Lincoln\r\ndelivers a two minute Gettysburg Address at a ceremony dedicating the Battlefield\r\nas a National Cemetery. ');
INSERT INTO `node_blurbs` VALUES(52, 'The Rebel siege\r\nof Chattanooga ends as Union forces under Grant defeat the siege army of\r\nGen. Braxton Bragg. During the battle, one of the most dramatic moments\r\nof the war occurs. Yelling "Chickamauga! Chickamauga!" Union\r\ntroops avenge their previous defeat at Chickamauga by storming up the face\r\nof Missionary Ridge without orders and sweep the Rebels from what had been\r\nthough to be an impregnable position. "My God, come and see ''em run!"\r\na Union soldier cries. ');
INSERT INTO `node_blurbs` VALUES(53, 'President Lincoln\r\nappoints Gen. Grant to command all of the armies of the United States.\r\nGen. William T. Sherman\r\nsucceeds Grant as commander in the west. ');
INSERT INTO `node_blurbs` VALUES(54, 'The beginning of a\r\nmassive, coordinated campaign involving all the Union Armies. In Virginia,\r\nGrant with an Army of 120,000 begins advancing toward Richmond to engage\r\nLee''s Army of Northern Virginia, now numbering 64,000, beginning a war\r\nof attrition that will include major battles at the Wilderness (May 5-6),\r\nSpotsylvania (May 8-12), and Cold Harbor (June 1-3). ');
INSERT INTO `node_blurbs` VALUES(55, 'A costly mistake\r\nby Grant results in\r\n7,000 Union casualties in twenty minutes during an offensive against fortified\r\nRebels at Cold Harbor in Virginia.\r\n');
INSERT INTO `node_blurbs` VALUES(56, 'Union forces miss\r\nan opportunity to capture Petersburg and cut off the Confederate rail lines.\r\nAs a result, a nine month siege of Petersburg begins with Grant''s forces\r\nsurrounding Lee. ');
INSERT INTO `node_blurbs` VALUES(57, 'At Atlanta, Sherman''s\r\nforces battle the Rebels now under the command of Gen. John\r\nB. Hood, who replaced Johnston. ');
INSERT INTO `node_blurbs` VALUES(58, 'Democrats nominate\r\nGeorge B. McClellan for president to run against Republican incumbent Abraham\r\nLincoln. ');
INSERT INTO `node_blurbs` VALUES(59, 'Atlanta\r\nis captured by Sherman''s\r\nArmy. "Atlanta is ours, and fairly won," Sherman telegraphs Lincoln.\r\nThe victory greatly helps President Lincoln''s bid for re-election. ');
INSERT INTO `node_blurbs` VALUES(60, 'A decisive Union\r\nvictory by Cavalry Gen. Philip\r\nH. Sheridan in the Shenandoah Valley over Jubal Early''s troops.\r\n');
INSERT INTO `node_blurbs` VALUES(61, 'Abraham Lincoln is\r\nre-elected president, defeating Democrat George B. McClellan. Lincoln carries\r\nall but three states with 55 percent of the popular vote and 212 of 233\r\nelectoral votes. "I earnestly believe that the consequences of this\r\nday''s work will be to the lasting advantage, if not the very salvation,\r\nof the country," Lincoln tells supporters. ');
INSERT INTO `node_blurbs` VALUES(62, 'After destroying\r\nAtlanta''s warehouses and railroad\r\nfacilities, Sherman, with 62,000 men begins a March to the Sea. President\r\nLincoln on advice from Grant approved the idea. "I can make Georgia\r\nhowl!" Sherman boasts. ');
INSERT INTO `node_blurbs` VALUES(63, 'Hood''s Rebel Army\r\nof 23,000 is crushed at Nashville\r\nby 55,000 Federals including Negro troops under Gen. George\r\nH. Thomas. The Confederate Army of Tennessee ceases as an effective\r\nfighting force. ');
INSERT INTO `node_blurbs` VALUES(64, 'Sherman reaches Savannah\r\nin Georgia leaving behind a 300 mile long path of destruction 60 miles\r\nwide all the way from Atlanta. Sherman then telegraphs Lincoln, offering\r\nhim Savannah as a Christmas present. ');
INSERT INTO `node_blurbs` VALUES(65, '\r\n- The U.S. Congress approves the Thirteenth Amendment to the United States\r\nConstitution, to abolish slavery. The amendment is then submitted to the\r\nstates for ratification. ');
INSERT INTO `node_blurbs` VALUES(66, 'A peace conference\r\noccurs as President Lincoln meets with Confederate Vice President\r\nAlexander Stephens at Hampton\r\nRoads in Virginia, but the meeting ends in failure - the war will continue.\r\n');
INSERT INTO `node_blurbs` VALUES(67, 'Inauguration ceremonies\r\nfor President Lincoln in Washington. "With malice toward none; with\r\ncharity for all...let us strive on to finish the work we are in...to do\r\nall which may achieve and cherish a just, and a lasting peace, among ourselves,\r\nand with all nations," Lincoln says. ');
INSERT INTO `node_blurbs` VALUES(68, 'The last offensive\r\nfor Lee''s Army of Northern Virginia begins with an attack on the center\r\nof Grant''s forces at Petersburg. Four hours later the attack is broken.\r\n');
INSERT INTO `node_blurbs` VALUES(69, 'Grant''s forces begin a \r\n  general advance and break through Lee''s lines at Petersburg. Confederate Gen. \r\n  Ambrose P. Hill is killed. Lee evacuates \r\n  Petersburg. The Confederate Capital, Richmond, \r\n  is evacuated. Fires and looting break out. The next day, Union troops enter \r\n  and raise the Stars and Stripes. ');
INSERT INTO `node_blurbs` VALUES(70, 'President Lincoln\r\ntours Richmond where he enters\r\nthe Confederate White House.\r\nWith "a serious, dreamy expression," he sits at the desk of Jefferson\r\nDavis for a few moments. ');
INSERT INTO `node_blurbs` VALUES(71, 'Gen. Robert E. Lee\r\nsurrenders his Confederate Army to Gen. Ulysses S. Grant\r\nat the village of Appomattox Court House in Virginia. Grant allows Rebel\r\nofficers to keep their sidearms and permits soldiers to keep horses and\r\nmules. ');
INSERT INTO `node_blurbs` VALUES(72, 'Celebrations break\r\nout in Washington. ');
INSERT INTO `node_blurbs` VALUES(73, 'The Stars and Stripes\r\nis ceremoniously raised over Fort Sumter. That night, Lincoln and his wife\r\nMary see the play "Our American Cousin" at Ford''s Theater. At\r\n10:13 p.m., during the third act of the play, John Wilkes Booth shoots\r\nthe president in the head. Doctors attend to the president in the theater\r\nthen move him to a house across the street. He never regains consciousness.\r\n');
INSERT INTO `node_blurbs` VALUES(74, 'President Abraham\r\nLincoln dies at 7:22 in the morning. Vice President Andrew\r\nJohnson assumes the presidency. ');
INSERT INTO `node_blurbs` VALUES(75, 'Confederate Gen.\r\nJoseph E. Johnston surrenders to Sherman near Durham in North Carolina.\r\n');
INSERT INTO `node_blurbs` VALUES(76, 'John Wilkes Booth\r\nis shot and killed in a tobacco barn in Virginia. ');
INSERT INTO `node_blurbs` VALUES(77, 'Abraham Lincoln is\r\nlaid to rest in Oak Ridge Cemetery, outside Springfield, Illinois. ');

-- --------------------------------------------------------

--
-- Table structure for table `node_citations`
--

CREATE TABLE `node_citations` (
  `nid` int(11) NOT NULL,
  `cid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_citations`
--

INSERT INTO `node_citations` VALUES(1, 1);
INSERT INTO `node_citations` VALUES(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `node_markers`
--

CREATE TABLE `node_markers` (
  `nid` int(11) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_markers`
--


-- --------------------------------------------------------

--
-- Table structure for table `node_polygons`
--

CREATE TABLE `node_polygons` (
  `pid` int(11) NOT NULL auto_increment,
  `nid` int(11) NOT NULL,
  UNIQUE KEY `pid` (`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `node_polygons`
--


-- --------------------------------------------------------

--
-- Table structure for table `node_polygons_coords`
--

CREATE TABLE `node_polygons_coords` (
  `pid` int(11) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_polygons_coords`
--


-- --------------------------------------------------------

--
-- Table structure for table `node_relations`
--

CREATE TABLE `node_relations` (
  `fromNid` int(11) NOT NULL,
  `toNid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_relations`
--

INSERT INTO `node_relations` VALUES(2, 3);
INSERT INTO `node_relations` VALUES(2, 4);
INSERT INTO `node_relations` VALUES(2, 5);
INSERT INTO `node_relations` VALUES(2, 6);
INSERT INTO `node_relations` VALUES(2, 7);
INSERT INTO `node_relations` VALUES(2, 8);
INSERT INTO `node_relations` VALUES(2, 9);
INSERT INTO `node_relations` VALUES(2, 10);
INSERT INTO `node_relations` VALUES(2, 11);
INSERT INTO `node_relations` VALUES(2, 12);
INSERT INTO `node_relations` VALUES(2, 13);
INSERT INTO `node_relations` VALUES(2, 14);
INSERT INTO `node_relations` VALUES(2, 15);
INSERT INTO `node_relations` VALUES(2, 16);
INSERT INTO `node_relations` VALUES(2, 17);
INSERT INTO `node_relations` VALUES(2, 18);
INSERT INTO `node_relations` VALUES(2, 19);
INSERT INTO `node_relations` VALUES(2, 20);
INSERT INTO `node_relations` VALUES(2, 21);
INSERT INTO `node_relations` VALUES(2, 22);
INSERT INTO `node_relations` VALUES(2, 23);
INSERT INTO `node_relations` VALUES(2, 24);
INSERT INTO `node_relations` VALUES(2, 25);
INSERT INTO `node_relations` VALUES(2, 26);
INSERT INTO `node_relations` VALUES(2, 27);
INSERT INTO `node_relations` VALUES(2, 28);
INSERT INTO `node_relations` VALUES(2, 29);
INSERT INTO `node_relations` VALUES(2, 30);
INSERT INTO `node_relations` VALUES(2, 31);
INSERT INTO `node_relations` VALUES(2, 32);
INSERT INTO `node_relations` VALUES(2, 33);
INSERT INTO `node_relations` VALUES(2, 34);
INSERT INTO `node_relations` VALUES(2, 35);
INSERT INTO `node_relations` VALUES(2, 36);
INSERT INTO `node_relations` VALUES(2, 37);
INSERT INTO `node_relations` VALUES(2, 38);
INSERT INTO `node_relations` VALUES(2, 39);
INSERT INTO `node_relations` VALUES(2, 40);
INSERT INTO `node_relations` VALUES(2, 41);
INSERT INTO `node_relations` VALUES(2, 42);
INSERT INTO `node_relations` VALUES(2, 43);
INSERT INTO `node_relations` VALUES(2, 44);
INSERT INTO `node_relations` VALUES(2, 45);
INSERT INTO `node_relations` VALUES(2, 46);
INSERT INTO `node_relations` VALUES(2, 47);
INSERT INTO `node_relations` VALUES(2, 48);
INSERT INTO `node_relations` VALUES(2, 49);
INSERT INTO `node_relations` VALUES(2, 50);
INSERT INTO `node_relations` VALUES(2, 51);
INSERT INTO `node_relations` VALUES(2, 52);
INSERT INTO `node_relations` VALUES(2, 53);
INSERT INTO `node_relations` VALUES(2, 54);
INSERT INTO `node_relations` VALUES(2, 55);
INSERT INTO `node_relations` VALUES(2, 56);
INSERT INTO `node_relations` VALUES(2, 57);
INSERT INTO `node_relations` VALUES(2, 58);
INSERT INTO `node_relations` VALUES(2, 59);
INSERT INTO `node_relations` VALUES(2, 60);
INSERT INTO `node_relations` VALUES(2, 61);
INSERT INTO `node_relations` VALUES(2, 62);
INSERT INTO `node_relations` VALUES(2, 63);
INSERT INTO `node_relations` VALUES(2, 64);
INSERT INTO `node_relations` VALUES(2, 65);
INSERT INTO `node_relations` VALUES(2, 66);
INSERT INTO `node_relations` VALUES(2, 67);
INSERT INTO `node_relations` VALUES(2, 68);
INSERT INTO `node_relations` VALUES(2, 69);
INSERT INTO `node_relations` VALUES(2, 70);
INSERT INTO `node_relations` VALUES(2, 71);
INSERT INTO `node_relations` VALUES(2, 72);
INSERT INTO `node_relations` VALUES(2, 73);
INSERT INTO `node_relations` VALUES(2, 74);
INSERT INTO `node_relations` VALUES(2, 75);
INSERT INTO `node_relations` VALUES(2, 76);
INSERT INTO `node_relations` VALUES(2, 77);
