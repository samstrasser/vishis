-- phpMyAdmin SQL Dump
-- version 2.11.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 19, 2008 at 12:09 AM
-- Server version: 5.0.45
-- PHP Version: 5.2.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `visualiz_vishis`
--

-- --------------------------------------------------------

--
-- Table structure for table `blurb_tags`
--

CREATE TABLE `blurb_tags` (
  `number` tinyint(4) NOT NULL,
  `tag` varchar(10) NOT NULL,
  PRIMARY KEY  (`number`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blurb_tags`
--


-- --------------------------------------------------------

--
-- Table structure for table `blurb_types`
--

CREATE TABLE `blurb_types` (
  `number` int(11) NOT NULL auto_increment,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY  (`number`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `blurb_types`
--


-- --------------------------------------------------------

--
-- Table structure for table `nodes`
--

CREATE TABLE `nodes` (
  `uid` int(11) NOT NULL auto_increment,
  `title` varchar(254) NOT NULL,
  `location` varchar(254) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `type` tinyint(4) NOT NULL,
  `color` char(6) NOT NULL,
  PRIMARY KEY  (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=46 ;

--
-- Dumping data for table `nodes`
--

INSERT INTO `nodes` VALUES(44, 'George W. Bush', 'New Haven, Connecticut', 41.310741, -72.930107, '2001-01-01 00:00:00', '2008-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(2, 'George Washington', 'Colonial beach, Virginia', 38.255005, -76.974998, '1789-01-01 00:00:00', '1797-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(3, 'John Adams', 'Braintree, Massachusetts', 42.207119, -71.004204, '1797-01-01 00:00:00', '1801-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(4, 'Thomas Jefferson', 'Charlottesville, VA ', 38.037766, -78.489258, '1801-01-01 00:00:00', '1809-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(5, 'James Madison', 'Port Conway, Virginia', 38.179169, -77.185364, '1809-01-01 00:00:00', '1817-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(6, 'James Monroe', 'Westmoreland County, Virginia', 38.121677, -76.790237, '1817-01-01 00:00:00', '1825-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(7, 'John Quincy Adams', 'Braintree, Massachusetts', 42.207119, -71.004204, '1825-01-01 00:00:00', '1829-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(8, 'Andrew Jackson', 'Waxhaw , North Carolina', 34.924732, -80.743629, '1829-01-01 00:00:00', '1837-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(9, 'Martin Van Buren', 'Kinderhook, New York', 42.393311, -73.701836, '1837-01-01 00:00:00', '1841-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(10, 'William Henry Harrison', 'Charles City County, Virginia', 37.356789, -77.071571, '1841-01-01 00:00:00', '1841-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(11, 'John Tyler', 'Charles City County, Virginia', 37.356789, -77.071571, '1841-01-01 00:00:00', '1845-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(12, 'James K. Polk', 'Pineville, North Carolina', 35.085209, -80.886757, '1845-01-01 00:00:00', '1849-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(13, 'Zachary Taylor', 'Barboursville Orange County, Virginia', 0.000000, 0.000000, '1849-01-01 00:00:00', '1850-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(14, 'Millard Fillmore', 'Summerhill, New York', 42.659718, -76.317085, '1850-01-01 00:00:00', '1853-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(15, 'Franklin Pierce', 'Hillsborough, New Hampshire', 43.114796, -71.894905, '1853-01-01 00:00:00', '1857-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(16, 'James Buchanan', 'Mercersburg, Franklin County, Pennsylvania', 39.833530, -77.904015, '1857-01-01 00:00:00', '1861-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(17, 'Abraham Lincoln', 'Hardin County, Kentucky', 37.723473, -85.976852, '1861-01-01 00:00:00', '1865-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(18, 'Andrew Johnson', 'Raleigh, North Carolina', 35.779747, -78.643417, '1865-01-01 00:00:00', '1869-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(19, 'Ulysses S. Grant', 'Point Pleasant, Clermont County, Ohio', 38.894020, -84.233170, '1869-01-01 00:00:00', '1877-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(20, 'Rutherford Birchard Hayes', 'Delaware, Ohio', 40.290703, -83.079567, '1877-01-01 00:00:00', '1881-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(21, 'James A. Garfield', 'Moreland Hills, Ohio', 41.446899, -81.425163, '1881-01-01 00:00:00', '1881-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(22, 'Chester Alan Arthur', 'Franklin County, Vermont', 44.824890, -72.896416, '1881-01-01 00:00:00', '1885-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(23, 'Grover Cleveland', 'Caldwell, New Jersey', 40.840141, -74.276451, '1885-01-01 00:00:00', '1889-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(24, 'Benjamin Harrison', 'North Bend, Hamilton County, Ohio', 39.149208, -84.742447, '1889-01-01 00:00:00', '1893-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(25, 'Grover Cleveland', 'Caldwell, New Jersey', 40.840141, -74.276451, '1893-01-01 00:00:00', '1897-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(26, 'William McKinley', 'Niles, Ohio', 41.188255, -80.754593, '1897-01-01 00:00:00', '1901-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(27, 'Theodore Roosevelt', 'New York City, New York', 40.757931, -73.985504, '1901-01-01 00:00:00', '1909-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(28, 'William H. Taft', 'Cincinnati, Ohio', 39.099232, -84.517487, '1909-01-01 00:00:00', '1913-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(29, 'Woodrow Wilson', 'Staunton, Virginia', 38.157150, -79.062790, '1913-01-01 00:00:00', '1921-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(30, 'Warren G. Harding', 'Marion, Ohio', 40.584698, -83.128555, '1921-01-01 00:00:00', '1923-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(31, 'Calvin Coolidge', 'Plymouth, Windsor County, Vermont', 43.537006, -72.718575, '1923-01-01 00:00:00', '1929-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(32, 'Herbert Hoover', 'West Branch, Iowa', 41.671227, -91.345428, '1929-01-01 00:00:00', '1933-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(33, 'Franklin D. Roosevelt', 'Hyde Park, New York', 41.785091, -73.933434, '1933-01-01 00:00:00', '1945-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(34, 'Harry S. Truman', 'Lamar, Missouri', 37.493114, -94.272705, '1945-01-01 00:00:00', '1953-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(35, 'Dwight D. Eisenhower', 'Denison, Texas', 33.760422, -96.563637, '1953-01-01 00:00:00', '1961-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(36, 'John F. Kennedy', 'Brookline, Massachusetts', 42.326469, -71.142570, '1961-01-01 00:00:00', '1963-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(37, 'Lyndon B. Johnson', 'Stonewall, Texas', 30.235853, -98.664711, '1963-01-01 00:00:00', '1969-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(38, 'Richard M. Nixon', 'Yorba Linda, California', 33.890995, -117.776802, '1969-01-01 00:00:00', '1974-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(39, 'Gerald R. Ford', 'Omaha, Nebraska', 41.259750, -95.942337, '1974-01-01 00:00:00', '1977-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(40, 'Jimmy Carter', 'Plains, Georgia', 32.033981, -84.392677, '1977-01-01 00:00:00', '1981-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(41, 'Ronald Reagan', 'Tampico, Illinois', 41.627655, -89.785957, '1981-01-01 00:00:00', '1989-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(42, 'George Bush', 'Milton, Massachusetts', 42.236290, -71.090248, '1989-01-01 00:00:00', '1993-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(43, 'Bill Clinton', 'Hope, Arkansas', 33.667599, -93.589226, '1993-01-01 00:00:00', '2001-01-01 00:00:00', 0, '000000');
INSERT INTO `nodes` VALUES(45, 'American Presidents', '', 0.000000, 0.000000, '1789-01-01 00:00:00', '2007-12-31 00:00:00', 3, '000000');

-- --------------------------------------------------------

--
-- Table structure for table `node_blurb_pieces`
--

CREATE TABLE `node_blurb_pieces` (
  `uid` int(11) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `value` varchar(254) NOT NULL,
  `order` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_blurb_pieces`
--


-- --------------------------------------------------------

--
-- Table structure for table `node_regions`
--

CREATE TABLE `node_regions` (
  `uid` int(11) NOT NULL,
  `lat` float(10,6) NOT NULL,
  `lng` float(10,6) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_regions`
--


-- --------------------------------------------------------

--
-- Table structure for table `node_relations`
--

CREATE TABLE `node_relations` (
  `from_uid` int(11) NOT NULL,
  `to_uid` int(11) NOT NULL,
  `namespace_num` tinyint(4) NOT NULL,
  `type_num` tinyint(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `node_relations`
--

INSERT INTO `node_relations` VALUES(45, 2, 1, 1);
INSERT INTO `node_relations` VALUES(45, 3, 1, 1);
INSERT INTO `node_relations` VALUES(45, 4, 1, 1);
INSERT INTO `node_relations` VALUES(45, 5, 1, 1);
INSERT INTO `node_relations` VALUES(45, 6, 1, 1);
INSERT INTO `node_relations` VALUES(45, 7, 1, 1);
INSERT INTO `node_relations` VALUES(45, 8, 1, 1);
INSERT INTO `node_relations` VALUES(45, 9, 1, 1);
INSERT INTO `node_relations` VALUES(45, 10, 1, 1);
INSERT INTO `node_relations` VALUES(45, 11, 1, 1);
INSERT INTO `node_relations` VALUES(45, 12, 1, 1);
INSERT INTO `node_relations` VALUES(45, 13, 1, 1);
INSERT INTO `node_relations` VALUES(45, 14, 1, 1);
INSERT INTO `node_relations` VALUES(45, 15, 1, 1);
INSERT INTO `node_relations` VALUES(45, 16, 1, 1);
INSERT INTO `node_relations` VALUES(45, 17, 1, 1);
INSERT INTO `node_relations` VALUES(45, 18, 1, 1);
INSERT INTO `node_relations` VALUES(45, 19, 1, 1);
INSERT INTO `node_relations` VALUES(45, 20, 1, 1);
INSERT INTO `node_relations` VALUES(45, 21, 1, 1);
INSERT INTO `node_relations` VALUES(45, 22, 1, 1);
INSERT INTO `node_relations` VALUES(45, 23, 1, 1);
INSERT INTO `node_relations` VALUES(45, 24, 1, 1);
INSERT INTO `node_relations` VALUES(45, 25, 1, 1);
INSERT INTO `node_relations` VALUES(45, 26, 1, 1);
INSERT INTO `node_relations` VALUES(45, 27, 1, 1);
INSERT INTO `node_relations` VALUES(45, 28, 1, 1);
INSERT INTO `node_relations` VALUES(45, 29, 1, 1);
INSERT INTO `node_relations` VALUES(45, 30, 1, 1);
INSERT INTO `node_relations` VALUES(45, 31, 1, 1);
INSERT INTO `node_relations` VALUES(45, 32, 1, 1);
INSERT INTO `node_relations` VALUES(45, 33, 1, 1);
INSERT INTO `node_relations` VALUES(45, 34, 1, 1);
INSERT INTO `node_relations` VALUES(45, 35, 1, 1);
INSERT INTO `node_relations` VALUES(45, 36, 1, 1);
INSERT INTO `node_relations` VALUES(45, 37, 1, 1);
INSERT INTO `node_relations` VALUES(45, 38, 1, 1);
INSERT INTO `node_relations` VALUES(45, 39, 1, 1);
INSERT INTO `node_relations` VALUES(45, 40, 1, 1);
INSERT INTO `node_relations` VALUES(45, 41, 1, 1);
INSERT INTO `node_relations` VALUES(45, 42, 1, 1);
INSERT INTO `node_relations` VALUES(45, 43, 1, 1);
INSERT INTO `node_relations` VALUES(45, 44, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `node_types`
--

CREATE TABLE `node_types` (
  `number` tinyint(4) NOT NULL auto_increment,
  `name` varchar(16) NOT NULL,
  PRIMARY KEY  (`number`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `node_types`
--

INSERT INTO `node_types` VALUES(1, 'Node');
INSERT INTO `node_types` VALUES(2, 'Region');
INSERT INTO `node_types` VALUES(3, 'Topic');

-- --------------------------------------------------------

--
-- Table structure for table `relation_namespaces`
--

CREATE TABLE `relation_namespaces` (
  `number` tinyint(4) NOT NULL auto_increment,
  `name` varchar(16) NOT NULL,
  `description` mediumtext NOT NULL,
  PRIMARY KEY  (`number`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `relation_namespaces`
--

INSERT INTO `relation_namespaces` VALUES(1, 'base', 'The base set');
INSERT INTO `relation_namespaces` VALUES(2, 'family', 'For family trees etc.');

-- --------------------------------------------------------

--
-- Table structure for table `relation_types`
--

CREATE TABLE `relation_types` (
  `type` tinyint(4) NOT NULL auto_increment,
  `namespace` tinyint(4) NOT NULL,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY  (`type`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `relation_types`
--

INSERT INTO `relation_types` VALUES(1, 1, 'Generally related');
