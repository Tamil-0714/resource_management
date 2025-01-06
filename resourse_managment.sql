-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 06, 2025 at 12:55 PM
-- Server version: 8.0.39-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resource_mangement`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(16) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `pass`) VALUES
('admin', '$2a$12$GItZp0K210risZyDfRuYVO1DOxYRIhpRN6QM7RY29RA8qsd2xNyXu');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `faculty_id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pass` varchar(255) NOT NULL,
  `faculty_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`faculty_id`, `pass`, `faculty_name`) VALUES
('01ccs123', '$2b$10$FOthyGZTdlXbxz3tR69VjenUly5jFLjPx6cqYX0eYhfNYvsHLoyXS', 'Vijay'),
('01chs123', '$2b$10$WiU1ndJDQPnBELHA/2iXw.JUIhMYds1XdaUBXrXV5GNPVtEbKiPUG', 'Tharun'),
('01fma123', '$2b$10$2MVzli3U7uulT.RIkNS2pukbfxjpZdctE4vbT5nQcRIbuLUF.dP5C', 'Maya');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `resource_id` int NOT NULL,
  `resource_name` varchar(255) NOT NULL,
  `resource_type` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`resource_id`, `resource_name`, `resource_type`) VALUES
(1, 'ECC Lab', 'computer lab'),
(2, 'KP Joseph\'s Hall', 'hall');

-- --------------------------------------------------------

--
-- Table structure for table `resource_booking_request`
--

CREATE TABLE `resource_booking_request` (
  `booking_id` int NOT NULL,
  `resource_id` int NOT NULL,
  `student_id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `faculty_id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `request_date` date NOT NULL,
  `description` text NOT NULL,
  `status` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `resource_booking_request`
--

INSERT INTO `resource_booking_request` (`booking_id`, `resource_id`, `student_id`, `faculty_id`, `request_date`, `description`, `status`) VALUES
(3, 1, NULL, '01ccs123', '2025-01-07', 'for conduction a evet X its actualy a very secreat event so you should permit it otherwise I\'ll kill you ', 'pending'),
(5, 2, NULL, '01chs123', '2025-01-22', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when ', 'approved'),
(6, 1, NULL, '01fma123', '2025-02-01', 'Request for organizing a seminar on data science.', 'approved'),
(7, 2, NULL, '01ccs123', '2025-02-05', 'Request for conducting a workshop on AI and ML.', 'approved'),
(8, 1, NULL, '01chs123', '2025-02-10', 'Request for reserving the hall for a cultural event.', 'approved'),
(9, 2, '22ucs622', NULL, '2025-02-15', 'Request for conducting a group discussion session.', 'approved'),
(10, 1, '22ucs626', NULL, '2025-02-20', 'Request for holding an annual sports meeting.', 'approved'),
(11, 1, NULL, '01ccs123', '2025-01-21', 'for organising an event', 'pending'),
(12, 2, '22ucs626', NULL, '2025-03-01', 'for motivation student on workes day to not be a worker be a owner ', 'rejected'),
(13, 2, '22ucs626', NULL, '2025-01-02', 'for conduction event for celebreate new year', 'rejected'),
(14, 1, '22ucs622', NULL, '2025-02-05', 'onnume illa', 'approved'),
(15, 2, '22ucs622', NULL, '2025-03-06', 'ennamo pannuven unaku enna \n', 'pending'),
(16, 1, '22ucs627', NULL, '2025-02-14', 'athuku thanga accept pannunga', 'approved'),
(17, 2, '22ucs627', NULL, '2025-01-24', 'ithelam unaku theva illa da ', 'approved'),
(18, 2, '22ucs626', NULL, '2025-03-01', 'plz accept ', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pass` varchar(255) NOT NULL,
  `student_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `pass`, `student_name`) VALUES
('22ucs622', '$2b$10$h.2vBtSFGGsqcXPSxjBClunWZASYaE/gRQTj4rtsj5mQ0WCtJpige', 'Sakthi'),
('22ucs626', '$2b$10$v7BmpfdW0oJeUcF5jcXAKumgs2Qx/BwfKiw0T4sgIjfWBr.Bkcweq', 'Tamil'),
('22ucs627', '$2b$10$5b5GBiyLHm0u9pL2FfK40.tFBOMhRK8zHii8yvNVrFR.YXV5wxeIq', 'Ezhil');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`faculty_id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`resource_id`);

--
-- Indexes for table `resource_booking_request`
--
ALTER TABLE `resource_booking_request`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `faculty_id` (`faculty_id`),
  ADD KEY `resource_id` (`resource_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `resource_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `resource_booking_request`
--
ALTER TABLE `resource_booking_request`
  MODIFY `booking_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `resource_booking_request`
--
ALTER TABLE `resource_booking_request`
  ADD CONSTRAINT `resource_booking_request_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `resource_booking_request_ibfk_2` FOREIGN KEY (`resource_id`) REFERENCES `resources` (`resource_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  ADD CONSTRAINT `resource_booking_request_ibfk_3` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
