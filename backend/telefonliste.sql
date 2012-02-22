-- phpMyAdmin SQL Dump
-- version 2.11.8.1deb5+lenny9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 22. Februar 2012 um 11:28
-- Server Version: 5.0.51
-- PHP-Version: 5.2.6-1+lenny13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `intern`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `telefonliste`
--

CREATE TABLE IF NOT EXISTS `telefonliste` (
  `ID` int(11) NOT NULL auto_increment,
  `vorname` varchar(30) NOT NULL,
  `nachname` varchar(40) NOT NULL,
  `initialien` varchar(5) NOT NULL,
  `durchwahl` varchar(3) NOT NULL,
  `mail` varchar(60) default NULL,
  `abteilung` varchar(50) NOT NULL,
  `nummer` varchar(255) default NULL,
  `handy` varchar(255) default NULL,
  `skype` varchar(30) default NULL,
  PRIMARY KEY  (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=126 ;
