-- BeatyCare SQL Dump
-- version BETA
-- Host: localhost

-- user table schema --
CREATE TABLE `user` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `createdDate` datetime DEFAULT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'Admin',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1

-- access_token table schema --
CREATE TABLE `access_token` (
  `access_token_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `access_token` text,
  PRIMARY KEY (`access_token_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1


