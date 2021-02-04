-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317project
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` longtext NOT NULL,
  `fk_authorid` int DEFAULT NULL,
  `fk_postid` int DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_tousertable_idx` (`fk_authorid`),
  KEY `key_toposttbale_idx` (`fk_postid`),
  CONSTRAINT `key_toposttbale` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`),
  CONSTRAINT `key_tousertable` FOREIGN KEY (`fk_authorid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'this is a test comment from curl',26,82,'2020-12-22 03:55:35'),(2,'this is a test comment from curl',26,82,'2020-12-22 03:57:39'),(3,'this is a test comment from curl',26,82,'2020-12-22 04:00:50'),(4,'Life',26,82,'2020-12-22 16:00:33'),(5,'WOW IT WORKS',26,82,'2020-12-22 16:00:45'),(6,'I AM THE LEGEND KILLER',26,82,'2020-12-22 16:01:12'),(7,'JOHN CENA YOU\'RE NEXT',26,82,'2020-12-22 16:15:00'),(8,'JOHN CENA YOU\'RE NEXT',26,82,'2020-12-22 16:15:48'),(9,'HE IS FUNNY MAN',26,83,'2020-12-22 16:16:58'),(10,'test',26,82,'2020-12-22 16:20:35'),(11,'test',26,82,'2020-12-22 16:20:38'),(12,'test',26,82,'2020-12-22 16:20:40'),(13,'Supa COOL!',27,79,'2020-12-22 19:13:43'),(14,'so deep..\n',27,84,'2020-12-22 19:14:34'),(15,'waow',18,84,'2020-12-22 22:07:18');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (54,'My Computer','It is awesome!','public\\images\\upload\\7e37ff862182df65fa85bf4eabd1fa3fca65f789191f.jpeg','public/images/upload/thumbnail-7e37ff862182df65fa85bf4eabd1fa3fca65f789191f.jpeg',0,'2020-12-18 12:36:43',18),(55,'Charcoal Drawing','Something something','public\\images\\upload\\42908991a85aed9cd7461ef08a40fb6c0bf917e83087.jpeg','public/images/upload/thumbnail-42908991a85aed9cd7461ef08a40fb6c0bf917e83087.jpeg',0,'2020-12-18 12:37:31',18),(56,'FBI Seized Img','Lol','public\\images\\upload\\b010e85e1b6b3f563343db27694b40498ff4b69f93aa.jpeg','public/images/upload/thumbnail-b010e85e1b6b3f563343db27694b40498ff4b69f93aa.jpeg',0,'2020-12-18 12:37:52',18),(57,'My Pixel Art','Beautiful','public\\images\\upload\\f79a82ca57176238a10626e971a0552b264515f0aaeb.png','public/images/upload/thumbnail-f79a82ca57176238a10626e971a0552b264515f0aaeb.png',0,'2020-12-18 12:38:26',18),(58,'MSI Installer','Interesting Art','public\\images\\upload\\828b5495865cfbaeb2a2efea53d116edaefafd94b574.png','public/images/upload/thumbnail-828b5495865cfbaeb2a2efea53d116edaefafd94b574.png',0,'2020-12-18 12:39:22',18),(59,'Runescape','Hahaha','public\\images\\upload\\4d03a2a6ad33e68be89a93cb9d5de7f185017b528fa5.png','public/images/upload/thumbnail-4d03a2a6ad33e68be89a93cb9d5de7f185017b528fa5.png',0,'2020-12-18 13:32:18',18),(60,'90s','lol','public\\images\\upload\\6d3557a5f979f52be7c2981f0f030e7abb740cb053a6.jpeg','public/images/upload/thumbnail-6d3557a5f979f52be7c2981f0f030e7abb740cb053a6.jpeg',0,'2020-12-18 14:06:58',18),(61,'United States Space Force','USA USA USA ','public\\images\\upload\\37459a22efee975ef17c78c8f18b3979cccd6ae72f0c.jpeg','public/images/upload/thumbnail-37459a22efee975ef17c78c8f18b3979cccd6ae72f0c.jpeg',0,'2020-12-21 23:17:03',18),(62,'test','testing','public\\images\\upload\\f8e56d6cd265af96fe98700f21324e9d34c552d24772.png','public/images/upload/thumbnail-f8e56d6cd265af96fe98700f21324e9d34c552d24772.png',0,'2020-12-21 23:17:53',18),(64,'Cloud','From Final Fantasy 7','public\\images\\upload\\514a6f31eccaa51ef9440126a2a6cf4e04634a757eff.jpeg','public/images/upload/thumbnail-514a6f31eccaa51ef9440126a2a6cf4e04634a757eff.jpeg',0,'2020-12-21 23:21:30',26),(65,'Family Guy Living Room','Featured in the picture: John Cena','public\\images\\upload\\7b1d5153dfe977b017884766e58ad947dc4e4a8a7d24.jpeg','public/images/upload/thumbnail-7b1d5153dfe977b017884766e58ad947dc4e4a8a7d24.jpeg',0,'2020-12-21 23:24:17',26),(66,'Family Guy Living Room','Featured in the picture: John Cena','public\\images\\upload\\8408bd1e811ee627884fca0db0c4f98114e0124c3fd0.jpeg','public/images/upload/thumbnail-8408bd1e811ee627884fca0db0c4f98114e0124c3fd0.jpeg',0,'2020-12-21 23:24:45',26),(67,'The Good Old Days','Old People Doing Things','public\\images\\upload\\2c54647608a14dc51bd7318b7f8d1bc8d05f428854ec.jpeg','public/images/upload/thumbnail-2c54647608a14dc51bd7318b7f8d1bc8d05f428854ec.jpeg',0,'2020-12-21 23:26:04',26),(68,'IT\'S VADER TIME','Big Van Vader should have been WWF Champion','public\\images\\upload\\d9d779cd66cc38d9da1956002800a251e20437e68946.jpeg','public/images/upload/thumbnail-d9d779cd66cc38d9da1956002800a251e20437e68946.jpeg',0,'2020-12-21 23:28:12',26),(69,'San Francisco, CA','The view of the skyline','public\\images\\upload\\21662db58f6b1452a1c1a0d1df78cc706c89994e72f8.jpeg','public/images/upload/thumbnail-21662db58f6b1452a1c1a0d1df78cc706c89994e72f8.jpeg',0,'2020-12-21 23:31:06',26),(70,'Programming Ideas','Yay','public\\images\\upload\\017dea5640c3d0c460cbaa2ae69a737a228507d2318f.png','public/images/upload/thumbnail-017dea5640c3d0c460cbaa2ae69a737a228507d2318f.png',0,'2020-12-21 23:49:06',26),(71,'Carl Brutananadilewski','ne of the four protagonists in Aqua Teen Hunger Force, according to the aqua teen hunger force wiki','public\\images\\upload\\53750e59be9ba99ae461a12ffcc1c57737e687cc1cf4.png','public/images/upload/thumbnail-53750e59be9ba99ae461a12ffcc1c57737e687cc1cf4.png',0,'2020-12-21 23:52:34',26),(72,'Yup!','Stallman takes a picture','public\\images\\upload\\358201a32424809f89f0daa34a9a6e7dbc2844cd5b29.jpeg','public/images/upload/thumbnail-358201a32424809f89f0daa34a9a6e7dbc2844cd5b29.jpeg',0,'2020-12-22 00:02:05',25),(73,'You Good Bro?','Yeah','public\\images\\upload\\d1f31a64da3783b4c344c2ef58949fc411e20e619249.jpeg','public/images/upload/thumbnail-d1f31a64da3783b4c344c2ef58949fc411e20e619249.jpeg',0,'2020-12-22 00:05:31',25),(74,'O Chart','How fast do certain algorithms grow?','public\\images\\upload\\3b7b8247635ba4990ab39b3b25ee68dac1e9378eee9f.png','public/images/upload/thumbnail-3b7b8247635ba4990ab39b3b25ee68dac1e9378eee9f.png',0,'2020-12-22 00:07:19',25),(75,'AI Generated Image','What is going on here.','public\\images\\upload\\0788ba4cf938afaf28f68c220319f73bcac7741c2a4c.jpeg','public/images/upload/thumbnail-0788ba4cf938afaf28f68c220319f73bcac7741c2a4c.jpeg',0,'2020-12-22 00:08:20',25),(76,'Pixel Art October Challenge','Just Do It','public\\images\\upload\\06e5a8139b50f81699799c4d83664f552af02be41d08.png','public/images/upload/thumbnail-06e5a8139b50f81699799c4d83664f552af02be41d08.png',0,'2020-12-22 00:09:19',25),(77,'Marlboro French Fries','Art Juxtoposition','public\\images\\upload\\c11829052c5b4cd8e870872e06884b6f4654b554c79f.jpeg','public/images/upload/thumbnail-c11829052c5b4cd8e870872e06884b6f4654b554c79f.jpeg',0,'2020-12-22 00:11:41',18),(78,'WWE Day of Reckoning 2','This Game... Is AWESOME','public\\images\\upload\\e538b5b0fbb5d98e033efc603c35928c2f36fa8013d4.png','public/images/upload/thumbnail-e538b5b0fbb5d98e033efc603c35928c2f36fa8013d4.png',0,'2020-12-22 00:19:47',18),(79,'eBay','Super Cool Online Auctions','public\\images\\upload\\613a5743a8fe630b43b7167a56dd0f176968982ecf0e.png','public/images/upload/thumbnail-613a5743a8fe630b43b7167a56dd0f176968982ecf0e.png',0,'2020-12-22 00:22:49',18),(80,'Dr. Robotnik','...','public\\images\\upload\\d07f0c30ae8a9b36f79904e918687a40de224c20be1f.jpeg','public/images/upload/thumbnail-d07f0c30ae8a9b36f79904e918687a40de224c20be1f.jpeg',0,'2020-12-22 00:53:28',18),(81,'Squidward inside ','','public\\images\\upload\\c539159b9741098bcee04440317cb69ca49231d7d3de.png','public/images/upload/thumbnail-c539159b9741098bcee04440317cb69ca49231d7d3de.png',0,'2020-12-22 01:14:00',18),(82,'Nexus','A professional wrestling stable in WWE that competed on the Raw brand from June 7, 2010 to August 22, 2011','public\\images\\upload\\39ea137b465129509a6f760a19bb1ee77e4811e91e07.jpeg','public/images/upload/thumbnail-39ea137b465129509a6f760a19bb1ee77e4811e91e07.jpeg',0,'2020-12-22 01:17:19',18),(83,'Dr. Zoidberg','Examining a patient','public\\images\\upload\\ec74eda8d0d16c440aa75cbb1bd783d22bafd0a61cfc.jpeg','public/images/upload/thumbnail-ec74eda8d0d16c440aa75cbb1bd783d22bafd0a61cfc.jpeg',0,'2020-12-22 11:06:05',26),(84,'spaghetti','astronaut into a black hole','public\\images\\upload\\e430dd35c57dd0cb197d2bd27d10105536564a129775.jpeg','public/images/upload/thumbnail-e430dd35c57dd0cb197d2bd27d10105536564a129775.jpeg',0,'2020-12-22 19:14:20',27),(85,'Super Awesome PC','Built by Patrick Celedio','public\\images\\upload\\4a7ccd760669368b084db39684a0369945df914111e3.jpeg','public/images/upload/thumbnail-4a7ccd760669368b084db39684a0369945df914111e3.jpeg',0,'2020-12-22 22:09:04',18);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'r0wdy','r0wdy@mail.com','1234',0,0,'2020-12-04 01:32:35'),(18,'isweartogod','dahidas@mail.com','$2b$15$tAZOZb6OEe/REDgf5vCjz.9Dr/W9D7Qfg0frswmruwlBrvKhIhrzW',0,0,'2020-12-15 23:43:48'),(19,'fsd','dsf','$2b$15$0WU0f1SsBow7GI87iHo3HOqlOmQ2E7rYcmZMsPHKDnTE1yTBEqd7e',0,0,'2020-12-17 21:28:05'),(20,'blahblah244','blah@mail.com','$2b$15$m6Gi2veh9MJDkubCVIT0OufpINfxjIxOg32/hrcwotpd8ece3aG8i',0,0,'2020-12-18 15:46:27'),(21,'refactortest244','refactor2@mail.com','$2b$15$sGDx1U1n.A.mhbJAVa2eSOY2eaxHbylQT4k7j76CnutP9zhMZfX8S',0,0,'2020-12-18 16:46:57'),(22,'happydude2342','happy@mail.com','$2b$15$I2sNw4QbCw0Y5ivi1.tQguxl6ZnxxDavI5XF6LJR45NHAhrclVW62',0,0,'2020-12-18 18:05:05'),(23,'newuser7643','newuser@mail.com','$2b$15$aBIMHR1GYaChqNRprxEATOItnqmCszw0sWfZKRhdGCliaXCeAOOuW',0,0,'2020-12-18 18:14:00'),(24,'testing1220','1220@mail.com','$2b$15$L.t9tIYH5ncEHvfjnRv49umqXIK8dR6jiqR0zcq8gBs0m62zjEDfG',0,0,'2020-12-20 15:37:23'),(25,'Bray Wyatt','thefiend@wwe.com','$2b$15$2M60Dxmv617G8fBqRntgpOfUwTrpEAXzNSuSGrSRXssub5SVlH49C',0,0,'2020-12-20 18:41:28'),(26,'randyOrton123','rko@wwe.com','$2b$15$wYgK1.ybv5a8kSn/b.Fx8ux0vHPRDHLEIQIDMDOVoYz4tVzqjeEHO',0,0,'2020-12-20 19:18:09'),(27,'Mr.Kennedy','kennedywwe@mail.com','$2b$15$ZSYFJE/LhKjJ9em2zXyMf.A1Wa99LfcH5WKRxxB/b0v34RtlDqtge',0,0,'2020-12-22 18:59:01'),(28,'isweartogod2','mail@mail.com','$2b$15$nIRPiZHQ9rwysPYi4/vJQe7uHq4TAmozPXuQ5SHGA08S8YOh8/diS',0,0,'2020-12-22 20:34:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-22 23:18:14
