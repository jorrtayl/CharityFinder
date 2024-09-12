CREATE DATABASE `charity_finder_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `charities` (
  `charity_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `registration_number` varchar(50) DEFAULT NULL,
  `mission_statement` text,
  `category` varchar(100) DEFAULT NULL,
  `year_established` year DEFAULT NULL,
  `country_of_operation` varchar(100) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `contact_email` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`charity_id`),
  UNIQUE KEY `registration_number` (`registration_number`),
  KEY `idx_charity_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `financials` (
  `financial_id` int NOT NULL AUTO_INCREMENT,
  `charity_id` int DEFAULT NULL,
  `total_revenue` decimal(15,2) DEFAULT NULL,
  `total_expenses` decimal(15,2) DEFAULT NULL,
  `admin_costs` decimal(15,2) DEFAULT NULL,
  `fundraising_costs` decimal(15,2) DEFAULT NULL,
  `program_expenses` decimal(15,2) DEFAULT NULL,
  `program_expense_ratio` decimal(5,2) DEFAULT NULL,
  `fundraising_efficiency` decimal(5,2) DEFAULT NULL,
  `fiscal_year` year DEFAULT NULL,
  PRIMARY KEY (`financial_id`),
  KEY `charity_id` (`charity_id`),
  KEY `idx_financials_fiscal_year` (`fiscal_year`),
  CONSTRAINT `financials_ibfk_1` FOREIGN KEY (`charity_id`) REFERENCES `charities` (`charity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  KEY `idx_ratings_reviews_review_date` (`review_date`),
  CONSTRAINT `ratings_reviews_ibfk_1` FOREIGN KEY (`charity_id`) REFERENCES `charities` (`charity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `search_tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `charity_id` int DEFAULT NULL,
  `tag` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `charity_id` (`charity_id`),
  KEY `idx_search_tags_tag` (`tag`),
  CONSTRAINT `search_tags_ibfk_1` FOREIGN KEY (`charity_id`) REFERENCES `charities` (`charity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `tax_info` (
  `tax_id` int NOT NULL AUTO_INCREMENT,
  `charity_id` int DEFAULT NULL,
  `tax_exempt_status` tinyint(1) DEFAULT NULL,
  `nonprofit_classification` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`tax_id`),
  KEY `charity_id` (`charity_id`),
  CONSTRAINT `tax_info_ibfk_1` FOREIGN KEY (`charity_id`) REFERENCES `charities` (`charity_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

