-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 03 fév. 2022 à 17:07
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `grouping`
--

-- --------------------------------------------------------

--
-- Structure de la table `assets`
--

DROP TABLE IF EXISTS `assets`;
CREATE TABLE IF NOT EXISTS `assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `mime_type` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `entity_flag_values`
--

DROP TABLE IF EXISTS `entity_flag_values`;
CREATE TABLE IF NOT EXISTS `entity_flag_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `individual_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `flag_value_id` int(11) NOT NULL,
  `flag_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `individual_flag_values_un` (`flag_id`,`individual_id`),
  KEY `individual_flag_FK` (`individual_id`),
  KEY `individual_flag_FK_2` (`flag_value_id`),
  KEY `entity_flag_values_FK` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `flags`
--

DROP TABLE IF EXISTS `flags`;
CREATE TABLE IF NOT EXISTS `flags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `flag_values`
--

DROP TABLE IF EXISTS `flag_values`;
CREATE TABLE IF NOT EXISTS `flag_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `flag_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `flag_values_FK` (`flag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `name_slug` varchar(100) DEFAULT NULL,
  `group_type_id` int(11) NOT NULL,
  `description` text,
  `asset_id` int(11) DEFAULT NULL,
  `default_node_value` int(11) DEFAULT NULL,
  `default_node_color` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `groups_un` (`name`),
  UNIQUE KEY `groups_un2` (`name_slug`),
  KEY `groups_FK` (`group_type_id`),
  KEY `groups_FK_1` (`asset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `group_types`
--

DROP TABLE IF EXISTS `group_types`;
CREATE TABLE IF NOT EXISTS `group_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `individuals`
--

DROP TABLE IF EXISTS `individuals`;
CREATE TABLE IF NOT EXISTS `individuals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `firstname_slug` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `lastname_slug` varchar(255) NOT NULL,
  `default_node_value` int(11) DEFAULT NULL,
  `default_node_color` varchar(25) DEFAULT NULL,
  `asset_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `individuals_un` (`firstname`,`lastname`),
  KEY `individuals_FK` (`asset_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 KEY_BLOCK_SIZE=8 ROW_FORMAT=COMPRESSED;

-- --------------------------------------------------------

--
-- Structure de la table `links`
--

DROP TABLE IF EXISTS `links`;
CREATE TABLE IF NOT EXISTS `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `individual_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  `individual2_id` int(11) DEFAULT NULL,
  `group2_id` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `links_un` (`individual_id`,`individual2_id`),
  UNIQUE KEY `links_un2` (`individual_id`,`group2_id`),
  UNIQUE KEY `links_un3` (`group_id`,`individual2_id`),
  UNIQUE KEY `links_un4` (`group_id`,`group2_id`),
  KEY `links_FK_1` (`individual2_id`),
  KEY `links_FK_3` (`group2_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'admin', '$argon2i$v=19$m=4096,t=3,p=1$jF+vHjbXRqwPneW4W8cdvA$Ss9pfj4iholucEnD4uyoy++h7WRfDd3RIyLvwjWJrMo');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `entity_flag_values`
--
ALTER TABLE `entity_flag_values`
  ADD CONSTRAINT `entity_flag_values_FK` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `individual_flag_FK` FOREIGN KEY (`individual_id`) REFERENCES `individuals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `individual_flag_FK_2` FOREIGN KEY (`flag_value_id`) REFERENCES `flag_values` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `individual_flag_values_FK` FOREIGN KEY (`flag_id`) REFERENCES `flags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `flag_values`
--
ALTER TABLE `flag_values`
  ADD CONSTRAINT `flag_values_FK` FOREIGN KEY (`flag_id`) REFERENCES `flags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_FK` FOREIGN KEY (`group_type_id`) REFERENCES `group_types` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `groups_FK_1` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `individuals`
--
ALTER TABLE `individuals`
  ADD CONSTRAINT `individuals_FK` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_FK` FOREIGN KEY (`individual_id`) REFERENCES `individuals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `links_FK_1` FOREIGN KEY (`individual2_id`) REFERENCES `individuals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `links_FK_2` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `links_FK_3` FOREIGN KEY (`group2_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
