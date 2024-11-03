-- Second version of charity_finder_db tables and possible indexes.

CREATE DATABASE `charity_finder_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- Table to store basic charity information pulled from ProPublica API
CREATE TABLE charities (
    charity_id INT AUTO_INCREMENT PRIMARY KEY,
    ein VARCHAR(10) UNIQUE NOT NULL,        -- EIN from ProPublica API
    name VARCHAR(255) NOT NULL,             -- Charity name from ProPublica API
    ntee_code VARCHAR(10),                  -- NTEE code from ProPublica API
    subsection_code VARCHAR(10),            -- IRS subsection code (e.g., 501(c)(3)) from ProPublica API
    mission_statement TEXT,                 -- Mission statement can be added manually
    year_established YEAR,                  -- This may be available from ProPublica API or can be added manually
    country_of_operation VARCHAR(100),      -- Typically available through ProPublica for U.S. charities
    website VARCHAR(255),                   -- Can be added manually
    contact_email VARCHAR(255),             -- Can be added manually
    contact_phone VARCHAR(20)               -- Can be added manually
);

-- Table to store financial information from ProPublica API
CREATE TABLE financials (
    financial_id INT AUTO_INCREMENT PRIMARY KEY,
    charity_id INT,
    ein VARCHAR(10),                        -- EIN reference for better querying
    total_revenue DECIMAL(15, 2),           -- Total revenue from ProPublica API
    total_expenses DECIMAL(15, 2),          -- Total expenses from ProPublica API
    net_assets DECIMAL(15, 2),              -- Net assets from ProPublica API
    exec_compensation DECIMAL(15, 2),       -- Executive compensation (if available) from ProPublica API
    fiscal_year YEAR,                       -- Data year (fiscal year) from ProPublica API
    FOREIGN KEY (charity_id) REFERENCES charities(charity_id) ON DELETE CASCADE
);

-- Table for additional ratings/reviews
CREATE TABLE ratings_reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    charity_id INT,
    transparency_rating DECIMAL(3, 2),      -- Transparency ratings can be manually added or from external services
    impact_rating DECIMAL(3, 2),            -- Impact ratings can be manually added
    user_review TEXT,                       -- User-submitted review
    user_rating DECIMAL(3, 2),              -- User-submitted rating (scale of 1-5)
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (charity_id) REFERENCES charities(charity_id) ON DELETE CASCADE
);

-- Table to store tax-related information from ProPublica API
CREATE TABLE tax_info (
    tax_id INT AUTO_INCREMENT PRIMARY KEY,
    charity_id INT,
    ein VARCHAR(10),                        -- EIN reference for easier querying
    deductibility_status BOOLEAN,           -- Whether donations are tax-deductible from ProPublica API
    subsection_code VARCHAR(10),            -- Subsection code (e.g., 501(c)(3)) from ProPublica API
    FOREIGN KEY (charity_id) REFERENCES charities(charity_id) ON DELETE CASCADE
);

-- Table for searchable tags
CREATE TABLE search_tags (
    tag_id INT AUTO_INCREMENT PRIMARY KEY,
    charity_id INT,
    tag VARCHAR(100),                       -- Tags like "education", "health", etc. can be added manually
    FOREIGN KEY (charity_id) REFERENCES charities(charity_id) ON DELETE CASCADE
);

-- Indexes for searchable columns
CREATE INDEX idx_charity_ntee_code ON charities (ntee_code);
CREATE INDEX idx_financials_fiscal_year ON financials (fiscal_year);
CREATE INDEX idx_ratings_reviews_recharitiesview_date ON ratings_reviews (review_date);
CREATE INDEX idx_search_tags_tag ON search_tags (tag);
