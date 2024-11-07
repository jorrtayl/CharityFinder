CREATE DATABASE  IF NOT EXISTS `charity_finder_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `charity_finder_db`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: charity_finder_db
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `charities`
--

DROP TABLE IF EXISTS `charities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charities` (
  `charity_id` int NOT NULL AUTO_INCREMENT,
  `ein` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ntee_code` varchar(10) DEFAULT NULL,
  `subsection_code` varchar(10) DEFAULT NULL,
  `mission_statement` text,
  `year_established` year DEFAULT NULL,
  `country_of_operation` varchar(100) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`charity_id`),
  UNIQUE KEY `ein` (`ein`),
  KEY `idx_charity_ntee_code` (`ntee_code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charities`
--

LOCK TABLES `charities` WRITE;
/*!40000 ALTER TABLE `charities` DISABLE KEYS */;
INSERT INTO `charities` VALUES (1,'363673599','Feeding America','K310','3',NULL,NULL,'USA','https://www.feedingamerica.org/',NULL,NULL,'/images/logos/feeding_america.png'),(2,'131788491','American Cancer Society Inc','G300','3','The mission of the American Cancer Society is to improve the lives of people with cancer and their families through advocacy, research, and patient support, to ensure everyone has an opportunity to prevent, detect, treat, and survive cancer.',NULL,'USA','https://www.cancer.org/',NULL,NULL,'/images/logos/american_cancer_society.png');
/*!40000 ALTER TABLE `charities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financials`
--

DROP TABLE IF EXISTS `financials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financials` (
  `financial_id` int NOT NULL AUTO_INCREMENT,
  `charity_id` int DEFAULT NULL,
  `ein` varchar(10) DEFAULT NULL,
  `total_revenue` decimal(15,2) DEFAULT NULL,
  `total_expenses` decimal(15,2) DEFAULT NULL,
  `net_assets` decimal(15,2) DEFAULT NULL,
  `exec_compensation` decimal(15,2) DEFAULT NULL,
  `fiscal_year` year DEFAULT NULL,
  PRIMARY KEY (`financial_id`),
  KEY `charity_id` (`charity_id`),
  KEY `idx_financials_fiscal_year` (`fiscal_year`),
  CONSTRAINT `financials_ibfk_1` FOREIGN KEY (`charity_id`) REFERENCES `charities` (`charity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financials`
--

LOCK TABLES `financials` WRITE;
/*!40000 ALTER TABLE `financials` DISABLE KEYS */;
/*!40000 ALTER TABLE `financials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings_reviews`
--

DROP TABLE IF EXISTS `ratings_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `charity_id` int DEFAULT NULL,
  `transparency_rating` decimal(3,2) DEFAULT NULL,
  `impact_rating` decimal(3,2) DEFAULT NULL,
  `user_review` text,
  `user_rating` decimal(3,2) DEFAULT NULL,
  `review_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `charity_id` (`charity_id`),
  KEY `idx_ratings_reviews_recharitiesview_date` (`review_date`),
  CONSTRAINT `ratings_reviews_ibfk_1` FOREIGN KEY (`charity_id`) REFERENCES `charities` (`charity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings_reviews`
--

LOCK TABLES `ratings_reviews` WRITE;
/*!40000 ALTER TABLE `ratings_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `ratings_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_tags`
--

DROP TABLE IF EXISTS `search_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `charity_id` int DEFAULT NULL,
  `tag` varchar(100) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `charity_id` (`charity_id`),
  KEY `idx_search_tags_tag` (`tag`),
  CONSTRAINT `search_tags_ibfk_1` FOREIGN KEY (`charity_id`) REFERENCES `charities` (`charity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_tags`
--

LOCK TABLES `search_tags` WRITE;
/*!40000 ALTER TABLE `search_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `search_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tax_info`
--

DROP TABLE IF EXISTS `tax_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tax_info` (
  `tax_id` int NOT NULL AUTO_INCREMENT,
  `charity_id` int DEFAULT NULL,
  `ein` varchar(10) DEFAULT NULL,
  `deductibility_status` tinyint(1) DEFAULT NULL,
  `subsection_code` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`tax_id`),
  KEY `charity_id` (`charity_id`),
  CONSTRAINT `tax_info_ibfk_1` FOREIGN KEY (`charity_id`) REFERENCES `charities` (`charity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tax_info`
--

LOCK TABLES `tax_info` WRITE;
/*!40000 ALTER TABLE `tax_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tax_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'charity_finder_db'
--

--
-- Dumping routines for database 'charity_finder_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-03 14:46:45
