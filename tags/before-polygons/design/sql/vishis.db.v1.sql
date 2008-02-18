-- phpMyAdmin SQL Dump
-- version 2.11.0
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 03, 2008 at 11:10 PM
-- Server version: 5.0.45
-- PHP Version: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `visualiz_vishis`
--

-- --------------------------------------------------------

--
-- Table structure for table `nodes`
--

CREATE TABLE `nodes` (
  `uid` int(11) NOT NULL auto_increment,
  `title` varchar(50) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `blurb` mediumtext NOT NULL,
  `description` tinyint(4) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `lat` char(10) NOT NULL,
  `longitude` char(10) NOT NULL,
  PRIMARY KEY  (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `nodes`
--

INSERT INTO `nodes` VALUES(1, 'Battles of the American Civil War', 0, 'The Battles of the American Civil War can be organized in a variety of, including chronologically, alphabetically by nation and by country and by race and by those blacks, by winner, by casualty statistics, etc. Of the estimated 10,000 occasions in which hostilities occurred, this list (and related articles) includes the 391 battles considered by the United States National Park Service to be the most significant.The American Civil war started in 1861 and ended in 1865.', 0, '1861-04-12 00:00:00', '1865-05-12 00:00:00', '32.793053', '-79.941294');
INSERT INTO `nodes` VALUES(7, 'Battle of Chancellorsville', 0, 'The Battle of Chancellorsville was a major battle of the American Civil War, fought near the village of Spotsylvania Courthouse, Virginia, from April 30 to May 6, 1863. Called Gen. Robert E. Lee''s "perfect battle"[2] because of his risky but successful division of his army in the presence of a much larger enemy force, the battle pitted Union Army Maj. Gen. Joseph Hooker''s Army of the Potomac against an army half its size, Lee''s Confederate Army of Northern Virginia. Lee''s audacity and Hooker''s timid performance in combat combined to result in a significant Union defeat. The Confederate victory was tempered by the mortal wounding of Lt. Gen. Thomas J. "Stonewall" Jackson to friendly fire, a loss that Lee likened to "losing my right arm."\r\n', 0, '1863-05-01 00:00:00', '1863-05-04 00:00:00', '38.308289', '-77.634224');
INSERT INTO `nodes` VALUES(5, 'Battle of Gettysburg', 0, 'The Battle of Gettysburg (July 1 – July 3, 1863), fought in, and around the town of Gettysburg, Pennsylvania, as part of the Gettysburg Campaign, was the battle with the largest number of casualties in the American Civil War and is frequently cited as the war''s turning point. Union Maj. Gen. George Gordon Meade''s Army of the Potomac defeated attacks by Confederate General Robert E. Lee''s Army of Northern Virginia, ending Lee''s invasion of the North.\r\n', 0, '1863-07-01 00:00:00', '1863-07-03 00:00:00', '39.830906', '-77.233328');
INSERT INTO `nodes` VALUES(6, 'Battle of Chickamauga', 0, 'The Battle of Chickamauga, fought September 18 to September 20, 1863, marked the end of a Union offensive in south-central Tennessee and northwestern Georgia called the Chickamauga Campaign. The battle was the most significant Union defeat in the Western Theater of the American Civil War.\r\n', 0, '1863-09-19 00:00:00', '1863-09-20 00:00:00', '34.872313', '-85.291561');
INSERT INTO `nodes` VALUES(8, 'Battle of Spotsylvania Court House', 0, 'The Battle of Spotsylvania Court House, sometimes simply referred to as the Battle of Spotsylvania, was the second battle in Lieut. Gen. Ulysses S. Grant''s 1864 Overland Campaign of the American Civil War. It was fought in the Rapidan-Rappahannock river area of central Virginia, a region where more than 100,000 men on both sides fell between 1862 and 1864.\r\n', 0, '1864-05-16 00:00:00', '1864-05-19 00:00:00', '38.201099', '-77.589508');
INSERT INTO `nodes` VALUES(9, 'Battle of Antietam', 0, 'The Battle of Antietam (also known as the Battle of Sharpsburg, particularly in the South), fought on September 17, 1862, near Sharpsburg, Maryland, and Antietam Creek, as part of the Maryland Campaign, was the first major battle in the American Civil War to take place on Northern soil. It was the bloodiest single-day battle in American history, with almost 23,000 casualties.\r\n', 0, '1862-09-17 00:00:00', '1862-09-17 00:00:00', '39.416504', '-77.74201');
INSERT INTO `nodes` VALUES(10, 'Battle of the Wilderness', 0, 'The Battle of the Wilderness, fought from May 5 to May 7, 1864, was the first battle of Lt. Gen. Ulysses S. Grant''s 1864 Virginia Overland Campaign against General Robert E. Lee and the Confederate Army of Northern Virginia. Both armies suffered heavy casualties, a harbinger of a bloody war of attrition against Lee''s army and, eventually, the Confederate capital, Richmond, Virginia. The battle was tactically inconclusive, as Grant disengaged and continued his offensive.\r\n', 0, '1864-05-05 00:00:00', '1864-05-07 00:00:00', '38.201099', '-77.589508');
INSERT INTO `nodes` VALUES(11, 'Second Battle of Manassas', 0, 'The Second Battle of Bull Run, or the Battle of Second Manassas, was fought between August 28 and August 30, 1862,[1] as part of the American Civil War. It was the culmination of an offensive campaign waged by Confederate General Robert E. Lee''s Army of Northern Virginia against Union Maj. Gen. John Pope''s Army of Virginia, and a battle of much larger scale and numbers than the First Battle of Bull Run (First Manassas), fought in 1861 on the same ground.\r\n', 0, '1862-08-29 00:00:00', '1862-08-30 00:00:00', '38.750911', '-77.479997');
INSERT INTO `nodes` VALUES(12, 'Battle of Stones River', 0, 'The Battle of Stones River or Second Battle of Murfreesboro (in the South, simply the Battle of Murfreesboro), was fought from December 31, 1862, to January 2, 1863, in Middle Tennessee, as the culmination of the Stones River Campaign in the Western Theater of the American Civil War. Of the major battles of the Civil War, Stones River had the highest percentage of casualties on both sides. Although the battle itself was tactically indecisive, the Union Army''s repulse of two Confederate attacks was a much-needed boost to Union morale after the defeat at the Battle of Fredericksburg, and it dashed Confederate aspirations for control of Middle Tennessee.\r\n', 0, '1862-12-31 00:00:00', '1862-12-31 00:00:00', '35.970833', '-86.393059');
INSERT INTO `nodes` VALUES(13, 'Battle of Shiloh', 0, 'The Battle of Shiloh, also known as the Battle of Pittsburg Landing, was a major battle in the Western Theater of the American Civil War, fought on April 6 and April 7, 1862, in southwestern Tennessee. Confederate forces under Generals Albert Sidney Johnston and P.G.T. Beauregard launched a surprise attack against the Union Army of Maj. Gen. Ulysses S. Grant and came very close to defeating his army.\r\n', 0, '1862-04-06 00:00:00', '1862-04-07 00:00:00', '35.835155', '-88.206459');
INSERT INTO `nodes` VALUES(14, 'Battle of Fort Donelson', 0, 'The Battle of Fort Donelson was fought from February 12 to February 16, 1862, in the Western Theater of the American Civil War. The capture of the fort by Union forces opened the Cumberland River as an avenue of invasion of the South and elevated Brig. Gen. Ulysses S. Grant from an obscure and largely unproven leader to the rank of major general and earned him the nickname "Unconditional Surrender" Grant.\r\n', 0, '1862-02-13 00:00:00', '1862-02-16 00:00:00', '36.489961', '-87.838953');
INSERT INTO `nodes` VALUES(15, 'Battle of Fort Sumter', 0, 'The Battle of Fort Sumter (April 12 – April 13, 1861), was a relatively minor military engagement at Fort Sumter in Charleston Harbor, South Carolina, that began the American Civil War.  Lincoln''s victory in the presidential election of 1860 triggered South Carolina''s declaration of secession from the Union. By February 1861, six more Southern states made similar declarations. On February 7, the seven states adopted a provisional constitution for the Confederate States of America and established their temporary capital at Montgomery, Alabama. A pre-war February peace conference of 1861 met in Washington in a failed attempt at resolving the crisis. The remaining eight slave states rejected pleas to join the Confederacy. Confederate forces seized all but three Federal forts within their boundaries (they did not take Fort Sumter); President Buchanan protested but made no military response aside from a failed attempt to resupply Fort Sumter via the ship Star of the West (the ship was fired upon by Citadel cadet, George Haynsworth under orders as a warning), and no serious military preparations.[1] However, governors in Massachusetts, New York, and Pennsylvania quietly began buying weapons and training militia units.\r\n', 0, '1861-04-12 00:00:00', '1861-04-13 00:00:00', '32.793053', '-79.941294');
INSERT INTO `nodes` VALUES(16, 'Yale University is founded as Yale Charter', 0, 'Yale is founded in nearby Saybrook as the Collegiate School to educate students for “Publick employment both in Church & Civil State.” In the over 300 years since its founding, Yale has worked to educate those who would become leaders and contributors to every sector of society. Yale graduates include five Presidents of the United States (including four of the last six), forty-five Cabinet members, over 500 members of Congress, and too many other senior officials, judges, diplomats, and military officers to name. Yale Charter.', 0, '1701-00-00 00:00:00', '1701-00-00 00:00:00', '41.297230', '-72.378181');
INSERT INTO `nodes` VALUES(17, 'Yale Moves to New Haven', 0, 'The Collegiate School trustees vote to move to more hospitable New Haven. Citizens of other communities vied to host the ?edgling school, but friends in New Haven outbid them, fulfilling the dream of one of New Haven’s founders, the Reverend John Davenport, to establish a college there. New Haven and the college have grown together over the centuries, and Yale University is now the city’s largest employer, taxpayer, and catalyst for economic development. New Haven Harbor in 1786.', 0, '1716-00-00 00:00:00', '1716-00-00 00:00:00', '41.310741', '-72.930106');
INSERT INTO `nodes` VALUES(18, 'The Collegiate School is renamed Yale', 0, 'The Collegiate School is renamed Yale College in recognition of Elihu Yale’s donation of books and goods. Over the years, his gift has been supplemented by tens of thousands of others. During the “…and for Yale” Campaign (1992–97), nearly three-quarters of Yale’s living alumni made financial contributions to their alma mater. “Gov. Elihu Yale,” 1717, by Enoch Zeeman.', 0, '1718-00-00 00:00:00', '1718-00-00 00:00:00', '41.312403', '-72.923963');
INSERT INTO `nodes` VALUES(19, 'Yale Gives its First Scholarship', 0, 'The Reverend George Berkeley establishes the Berkeley Scholarships for graduate study, the first such scholarships in America. Today, over 62 percent of Yale College students receive financial aid in the form of scholarships, loans, and work-study positions. Yale College admits all students, including international students, without regard to their family’s financial circumstances, and the University is committed to funding the full demonstrated need of all students. “Dr. George Berkeley Bishop of Cloyne,” ca. 1756, by John Brooks after T. S. Lathem.', 0, '1732-00-00 00:00:00', '1732-00-00 00:00:00', '41.310741', '-72.930106');
INSERT INTO `nodes` VALUES(21, 'The First College Church Founded', 0, 'First church within a college in America is founded at Yale. During Yale’s first two centuries, Yale graduates influenced the spread of Christianity by serving as missionaries throughout the world. The religious and spiritual communities represented among Yale student organizations and activities reflect the robust and diverse nature of religious life at Yale today. Minutes of the Yale Corporation, establishing church at Yale.', 0, '1757-00-00 00:00:00', '1757-00-00 00:00:00', '41.307536', '-72.926259');
INSERT INTO `nodes` VALUES(23, 'British Troops Invade New Haven', 0, 'British troops invade New Haven in response to active support at Yale for the Revolution. The student militia rallies to help defend the city. Edmund Fanning, secretary to the British general and Yale graduate (B.A. 1757), persuades the British to leave New Haven without burning the city. Sketch by Yale President Ezra Stiles of the invasion of New Haven.', 0, '1779-00-00 00:00:00', '1779-00-00 00:00:00', '41.300169', '-72.904952');
INSERT INTO `nodes` VALUES(24, 'The First Science Course is taught', 0, 'Considered the father of modern scientific education in America, Benjamin Silliman, Sr. (B.A. 1796, faculty 1799–1853), teaches the first modern science course (chemistry) in the United States. Silliman was a founder in 1818 of the American Journal of Science, one of the old- est scientific journals in the world. Today, Yale students and faculty conduct cutting-edge research in more than forty science and engineering disciplines, with access to specialized equipment in 1,200 on-campus laboratories.', 0, '1802-00-00 00:00:00', '1802-00-00 00:00:00', '41.31723', '-72.924049');
INSERT INTO `nodes` VALUES(25, 'Graduate Schools Open', 0, 'School of Medicine is founded as the “Medical Institution of Yale College.” The Yale System of Medical Education, which is based on the concept that medical students require guidance and stimulation rather than compulsion or competition, was introduced in 1931 and remains distinctive among medical schools. This belief in the maturity and responsibility of students is emphasized through a flexible program, elimination of grades, and the encouragement of independent study and research. Second (York Street) home of the School of Medicine; the original home was on Prospect Street.\r\n\r\nDivinity School is founded as the “Theological Department.” Religious studies were central to a Yale education from the beginning. In 1746, the first professorship of divinity was created, and the education of all Yale undergraduates continued to be shaped throughout the nineteenth century by such earlier practices as daily chapel services. In the mid-1900s, Yale hosted the committee that created the Revised Standard Version of the Bible. Sterling Divinity Quadrangle, third home of the Divinity School; the original home was the northernmost building of the Brick Row.\r\n\r\nLaw School is founded. Consistently ranked as the preeminent law school in the country, it trains outstanding practitioners, jurists, judges, and government officials. The Yale Law School has fostered major movements in American law, including the law and economics movement, the law of outer space, and international human rights. Law School Library in the early 1930s; the School was housed first in several offices in New Haven and then in Hendrie Hall before moving to the Sterling Law Building in 1931.', 0, '1813-00-00 00:00:00', '1824-00-00 00:00:00', '41.312057', '-72.92818');
INSERT INTO `nodes` VALUES(26, 'Walter Camp Invents Modern Football', 0, 'While an undergraduate, Walter Camp (B.A. 1880) develops the modern game of football from the rough game of rugby. Camp, now known as the father of American football, introduced the down, the eleven-man team, and the 100-yard field marked off in a gridiron. Amos Alonzo Stagg (B.A. 1888), who is also honored as the developer of modern rules of basketball and was the longest working football coach in American history (1892–1946), introduced the tackling dummy, the huddle, the reverse play, man in motion, knit pants, numbering players, and the awarding of letters. Walter Camp in the middle.', 0, '1880-00-00 00:00:00', '1880-00-00 00:00:00', '41.313636', '-72.958393');
INSERT INTO `nodes` VALUES(28, 'Women Admitted into Yale College', 0, 'Yale College admits women for the first time. Women have attended other schools at Yale since 1869, when the first women enrolled in the School of the Fine Arts. Alumna Maya Lin’s The Women’s Table (1993), located in front of Sterling Memorial Library, commemorates the women of Yale. Women arriving on Old Campus in 1969.', 0, '1969-00-00 00:00:00', '1969-00-00 00:00:00', '41.310824', '-72.928362');
INSERT INTO `nodes` VALUES(29, 'History of Yale University', 0, 'Yale University is a private university in New Haven, Connecticut. Founded in 1701 as the Collegiate School, Yale is the third-oldest institution of higher education in the United States and is a member of the Ivy League. Particularly well-known are its undergraduate school, Yale College, and the Yale Law School, each of which has produced a number of U.S. presidents and foreign heads of state. In 1861, the Graduate School of Arts and Sciences became the first U.S. school to award the Ph.D. degree. Also notable is the Yale School of Drama which has produced many prominent Hollywood and Broadway actors, as well as the art, divinity, forestry and environment, music, medical, management and architecture schools, each of which is often cited as among the finest in its field.', 0, '1701-00-00 00:00:00', '2007-11-11 00:00:00', '41.313225', '-72.925422');

-- --------------------------------------------------------

--
-- Table structure for table `node_relation`
--

CREATE TABLE `node_relation` (
  `from_uid` int(11) NOT NULL,
  `to_uid` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  KEY `from_uid` (`from_uid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_relation`
--

INSERT INTO `node_relation` VALUES(1, 5, 0);
INSERT INTO `node_relation` VALUES(1, 6, 0);
INSERT INTO `node_relation` VALUES(1, 7, 0);
INSERT INTO `node_relation` VALUES(1, 8, 0);
INSERT INTO `node_relation` VALUES(1, 9, 0);
INSERT INTO `node_relation` VALUES(1, 10, 0);
INSERT INTO `node_relation` VALUES(1, 11, 0);
INSERT INTO `node_relation` VALUES(1, 12, 0);
INSERT INTO `node_relation` VALUES(1, 13, 0);
INSERT INTO `node_relation` VALUES(1, 14, 0);
INSERT INTO `node_relation` VALUES(1, 15, 0);
INSERT INTO `node_relation` VALUES(29, 16, 0);
INSERT INTO `node_relation` VALUES(29, 17, 0);
INSERT INTO `node_relation` VALUES(29, 18, 0);
INSERT INTO `node_relation` VALUES(29, 19, 0);
INSERT INTO `node_relation` VALUES(29, 21, 0);
INSERT INTO `node_relation` VALUES(29, 23, 0);
INSERT INTO `node_relation` VALUES(29, 24, 0);
INSERT INTO `node_relation` VALUES(29, 25, 0);
INSERT INTO `node_relation` VALUES(29, 26, 0);
INSERT INTO `node_relation` VALUES(29, 28, 0);
