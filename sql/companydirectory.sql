-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.6-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for companydirectory
CREATE DATABASE IF NOT EXISTS `companydirectory` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `companydirectory`;

-- Dumping structure for table companydirectory.department
CREATE TABLE IF NOT EXISTS `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `abbreviation` varchar(50) DEFAULT NULL,
  `locationID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.department: ~12 rows (approximately)
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` (`id`, `name`, `locationID`) VALUES
	(1, 'Unspecified', 1),
	(2, 'Human Resources', 2),
	(3, 'Sales', 3),
	(4, 'Marketing', 3),
	(5, 'Legal', 2),
	(6, 'Services', 2),
	(7, 'Research & Development', 4),
	(8, 'Product Management', 4),
	(9, 'Training', 5),
	(10, 'Support', 5),
	(11, 'Engineering', 6),
	(12, 'Accounting', 6),
	(13, 'Business Development', 4);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;

-- Dumping structure for table companydirectory.location
CREATE TABLE IF NOT EXISTS `location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `abbreviation` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.location: ~4 rows (approximately)
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` (`id`, `name`) VALUES
	(1, 'Unspecified'),
	(2, 'London'),
	(3, 'New York'),
	(4, 'Paris'),
	(5, 'Munich'),
	(6, 'Rome');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;

-- Dumping structure for table companydirectory.personnel
CREATE TABLE IF NOT EXISTS `personnel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) DEFAULT NULL,
  `lastName` varchar(50) DEFAULT NULL,
  `jobTitle` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `departmentID` int(11) DEFAULT NULL,
  primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table companydirectory.personnel: ~100 rows (approximately)
/*!40000 ALTER TABLE `personnel` DISABLE KEYS */;
INSERT INTO `personnel` (`id`, `firstName`, `lastName`, `jobTitle`, `email`, `departmentID`) VALUES
	(1, 'Rosana', 'Heffron', 'HR Manager', 'rheffron0@ibm.com', 2),
	(2, 'Kris', 'Kovnot', 'Salesperson', 'kkovnot1@google.nl', 3),
	(3, 'Vera', 'Kisbee', 'Salesperson', 'vkisbee2@nih.gov', 3),
	(4, 'Aveline', 'Edgson', 'Contractor', 'aedgson3@wikispaces.com', 4),
	(5, 'Bertie', 'Wittke', 'Contracts', 'bwittke4@yahoo.com', 5),
	(6, 'Demetre', 'Cossam', 'Support', 'dcossam5@washington.edu', 6),
	(7, 'Annabela', 'McGavigan', 'Contracts', 'amcgavigan6@wp.com', 5),
	(8, 'Crichton', 'McAndrew', 'HR Manager', 'cmcandrew7@zdnet.com', 2),
	(9, 'Cordula', 'Plain', 'Support', 'cplain8@google.ca', 6),
	(10, 'Glen', 'McDougle', 'Researcher', 'gmcdougle9@meetup.com', 7),
	(11, 'Theo', 'Audas', 'Manager', 'taudasa@newsvine.com', 8),
	(12, 'Spense', 'Jolliss', 'Contractor', 'sjollissb@wufoo.com', 9),
	(13, 'Leopold', 'Carl', 'Contractor', 'lcarlc@paginegialle.it', 10),
	(14, 'Barr', 'MacAllan', 'Support', 'bmacalland@github.com', 6),
	(15, 'Suzie', 'Cromer', 'HR Manager', 'scromere@imageshack.us', 2),
	(16, 'Tracee', 'Gisbourn', 'Engineer', 'tgisbournf@bloglines.com', 11),
	(17, 'Taylor', 'St. Quintin', '', 'tstquinting@chronoengine.com', 11),
	(18, 'Lin', 'Klassmann', 'Engineer', 'lklassmannh@indiatimes.com', 11),
	(19, 'Lay', 'Fintoph', 'Accountant', 'lfintophi@goo.gl', 12),
	(20, 'Moishe', 'Flinn', 'Consultant', 'mflinnj@list-manage.com', 13),
	(21, 'Gay', 'Bickford', 'Researcher', 'gbickfordk@scientificamerican.com', 7),
	(22, 'Erik', 'Lindback', 'Contractor', 'elindbackl@virginia.edu', 9),
	(23, 'Tamarra', 'Ace', 'Contractor', 'tacem@vinaora.com', 10),
	(24, 'Barbara-anne', 'Rooksby', 'Engineer', 'brooksbyn@issuu.com', 11),
	(25, 'Lucien', 'Allsup', 'Contractor', 'lallsupo@goo.ne.jp', 10),
	(26, 'Jackelyn', 'Imlach', 'Accountant', 'jimlachp@google.it', 12),
	(27, 'Virge', 'Bootes', 'Salesperson', 'vbootesq@oracle.com', 3),
	(28, 'Rafferty', 'Matasov', 'Contracts', 'rmatasovr@4shared.com', 5),
	(29, 'Vanya', 'Goulder', 'Contractor', 'vgoulders@phoca.cz', 10),
	(30, 'Bonita', 'McGonagle', 'HR Manager', 'bmcgonaglet@microsoft.com', 2),
	(31, 'Allx', 'Whaley', '', 'awhaleyu@bbb.org', 2),
	(32, 'Mavis', 'Lernihan', 'Support', 'mlernihanv@netscape.com', 6),
	(33, 'Vern', 'Durling', 'HR Manager', 'vdurlingw@goo.gl', 2),
	(34, 'Myles', 'Minchi', 'Manager', 'mminchix@smugmug.com', 8),
	(35, 'Anitra', 'Coleridge', 'Researcher', 'acoleridgey@nbcnews.com', 7),
	(36, 'Ailis', 'Brewster', 'Manager', 'abrewsterz@businesswire.com', 8),
	(37, 'Rahal', 'Tute', 'Researcher', 'rtute10@pinterest.com', 7),
	(38, 'Warner', 'Blonden', 'Consultant', 'wblonden11@spiegel.de', 13),
	(39, 'Melvyn', 'Canner', 'Contracts', 'mcanner12@eepurl.com', 5),
	(40, 'Ryann', 'Giampietro', 'Contracts', 'rgiampietro13@theguardian.com', 5),
	(41, 'Harwell', 'Jefferys', 'Engineer', 'hjefferys14@jimdo.com', 11),
	(42, 'Lanette', 'Buss', 'Contracts', 'lbuss15@51.la', 5),
	(43, 'Lissie', 'Reddington', 'Contractor', 'lreddington16@w3.org', 10),
	(44, 'Dore', 'Braidford', 'Accountant', 'dbraidford17@google.com.br', 12),
	(45, 'Lizabeth', 'Di Franceshci', 'Contractor', 'ldifranceshci18@mediafire.com', 9),
	(46, 'Felic', 'Sharland', 'Consultant', 'fsharland19@myspace.com', 13),
	(47, 'Duff', 'Quail', 'Contractor', 'dquail1a@vimeo.com', 10),
	(48, 'Brendis', 'Shivell', 'HR Manager', 'bshivell1b@un.org', 2),
	(49, 'Nevile', 'Schimaschke', 'Engineer', 'nschimaschke1c@hexun.com', 11),
	(50, 'Jon', 'Calbaithe', 'Contracts', 'jcalbaithe1d@netvibes.com', 5),
	(51, 'Emmery', 'Darben', 'Engineer', 'edarben1e@mapquest.com', 11),
	(52, 'Staford', 'Whitesel', 'Researcher', 'swhitesel1f@nasa.gov', 7),
	(53, 'Benjamin', 'Hawkslee', 'Manager', 'bhawkslee1g@hubpages.com', 8),
	(54, 'Myrle', 'Speer', 'Contractor', 'mspeer1h@tripod.com', 4),
	(55, 'Matthus', 'Banfield', 'Contractor', 'mbanfield1i@angelfire.com', 4),
	(56, 'Annadiana', 'Drance', 'Contractor', 'adrance1j@omniture.com', 4),
	(57, 'Rinaldo', 'Fandrey', 'Salesperson', 'rfandrey1k@bbc.co.uk', 3),
	(58, 'Roanna', 'Standering', '', 'rstandering1l@cocolog-nifty.com', 4),
	(59, 'Lorrie', 'Fattorini', 'Contractor', 'lfattorini1m@geocities.jp', 10),
	(60, 'Talbot', 'Andrassy', 'Contracts', 'tandrassy1n@bigcartel.com', 5),
	(61, 'Cindi', 'O\'Mannion', 'Accountant', 'comannion1o@ameblo.jp', 12),
	(62, 'Pancho', 'Mullineux', 'HR Manager', 'pmullineux1p@webmd.com', 2),
	(63, 'Cynthy', 'Peyntue', 'Researcher', 'cpeyntue1q@amazon.co.jp', 7),
	(64, 'Kristine', 'Christal', 'Contractor', 'kchristal1r@behance.net', 9),
	(65, 'Dniren', 'Reboulet', 'Manager', 'dreboulet1s@360.cn', 8),
	(66, 'Aggy', 'Napier', 'Contractor', 'anapier1t@sciencedirect.com', 4),
	(67, 'Gayleen', 'Hessay', 'Contracts', 'ghessay1u@exblog.jp', 5),
	(68, 'Cull', 'Snoden', 'HR Manager', 'csnoden1v@so-net.ne.jp', 2),
	(69, 'Vlad', 'Crocombe', 'Manager', 'vcrocombe1w@mtv.com', 8),
	(70, 'Georgeanna', 'Joisce', 'Researcher', 'gjoisce1x@google.com.au', 7),
	(71, 'Ursola', 'Berthomieu', 'Contracts', 'uberthomieu1y@un.org', 5),
	(72, 'Mair', 'McKirdy', 'HR Manager', 'mmckirdy1z@ovh.net', 2),
	(73, 'Erma', 'Runnalls', 'Contractor', 'erunnalls20@spiegel.de', 9),
	(74, 'Heida', 'Gallone', 'Engineer', 'hgallone21@hostgator.com', 11),
	(75, 'Christina', 'Denge', 'Consultant', 'cdenge22@canalblog.com', 13),
	(76, 'Wilone', 'Fredi', 'Manager', 'wfredi23@gizmodo.com', 8),
	(77, 'Stormie', 'Bolderstone', 'Accountant', 'sbolderstone24@globo.com', 12),
	(78, 'Darryl', 'Pool', 'Accountant', 'dpool25@vistaprint.com', 12),
	(79, 'Nikolas', 'Mager', 'Support', 'nmager26@nifty.com', 6),
	(80, 'Brittney', 'Gaskal', 'Engineer', 'bgaskal27@weather.com', 11),
	(81, 'Field', 'Gresty', 'Contracts', 'fgresty28@networkadvertising.org', 5),
	(82, 'Martina', 'Tremoulet', 'Contractor', 'mtremoulet29@sciencedaily.com', 4),
	(83, 'Robena', 'Ivanyutin', 'Salesperson', 'rivanyutin2a@mozilla.org', 3),
	(84, 'Reagen', 'Corner', 'Accountant', 'rcorner2b@qq.com', 12),
	(85, 'Eveleen', 'Sulter', 'Researcher', 'esulter2c@nature.com', 7),
	(86, 'Christy', 'Dunbobbin', 'Contractor', 'cdunbobbin2d@feedburner.com', 9),
	(87, 'Winthrop', 'Lansley', 'Contractor', 'wlansley2e@alibaba.com', 9),
	(88, 'Lissa', 'Insley', 'Contractor', 'linsley2f@friendfeed.com', 4),
	(89, 'Shell', 'Risebarer', 'Engineer', 'srisebarer2g@patch.com', 11),
	(90, 'Cherianne', 'Liddyard', 'Salesperson', 'cliddyard2h@com.com', 3),
	(91, 'Brendan', 'Fooks', 'Salesperson', 'bfooks2i@utexas.edu', 3),
	(92, 'Edmund', 'Tace', 'Contractor', 'etace2j@hatena.ne.jp', 10),
	(93, 'Ki', 'Tomasini', 'Engineer', 'ktomasini2k@cnbc.com', 11),
	(94, 'Chadd', 'McGettrick', '', 'cmcgettrick2l@simplemachines.org', 11),
	(95, 'Dulcie', 'Baudi', 'Contractor', 'dbaudi2m@last.fm', 4),
	(96, 'Barnebas', 'Mowbray', 'HR Manager', 'bmowbray2n@cbslocal.com', 2),
	(97, 'Stefanie', 'Anker', 'Support', 'sanker2o@hud.gov', 6),
	(98, 'Cherye', 'de Cullip', 'Engineer', 'cdecullip2p@loc.gov', 11),
	(99, 'Sinclare', 'Deverall', 'Researcher', 'sdeverall2q@ow.ly', 7),
	(100, 'Shae', 'Johncey', 'Engineer', 'sjohncey2r@bluehost.com', 11);
/*!40000 ALTER TABLE `personnel` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
