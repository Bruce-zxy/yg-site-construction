-- phpMyAdmin SQL Dump
-- version 4.5.3.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2017-12-18 18:47:05
-- 服务器版本： 5.7.10-log
-- PHP Version: 5.6.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `test`;

-- --------------------------------------------------------

--
-- 表的结构 `files_system`
--

CREATE TABLE `files_system` (
  `ID` int(20) NOT NULL,
  `TYPE` varchar(20) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL,
  `PARENT_FOLDER` int(20) NOT NULL,
  `PUBLISH_URI` text,
  `CLASSIFY` varchar(100) NOT NULL,
  `CREATE_TIME` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `files_system`
--

INSERT INTO `files_system` (`ID`, `TYPE`, `NAME`, `PARENT_FOLDER`, `PUBLISH_URI`, `CLASSIFY`, `CREATE_TIME`) VALUES
(1, 'folder', '第一层文件夹', 0, NULL, 'color-5,icon-user', '1512093738243'),
(4, 'folder', '这是一个测试文件夹', 1, NULL, 'color-4,icon-envelope', '1512095324957'),
(6, 'folder', '测试文件夹', 0, NULL, 'color-3,icon-facetime-video', '1512099044779'),
(10, 'folder', '未命名文件夹', 6, NULL, 'color-2,icon-book', '1512105380527'),
(12, 'folder', '未命名文件夹', 1, NULL, 'color-4,icon-envelope', '1512113989614'),
(14, 'folder', '未命名文件夹', 6, NULL, 'color-5,icon-envelope', '1512114640291');

-- --------------------------------------------------------

--
-- 表的结构 `sites_construction`
--

CREATE TABLE `sites_construction` (
  `ID` int(10) NOT NULL,
  `NAME` varchar(20) NOT NULL,
  `KEY_NAME` varchar(32) NOT NULL,
  `CONTENT` text NOT NULL,
  `CONTENT_ORIGIN` text NOT NULL,
  `CLASSIFY` varchar(20) NOT NULL,
  `CREATE_TIME` varchar(13) NOT NULL,
  `PARENT_FOLDER` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `sites_construction`
--

INSERT INTO `sites_construction` (`ID`, `NAME`, `KEY_NAME`, `CONTENT`, `CONTENT_ORIGIN`, `CLASSIFY`, `CREATE_TIME`, `PARENT_FOLDER`) VALUES
(10, 'name01', '2ab7c4eac803b4dc2360e996ff403b85', 'PGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCTxkaXYgY2xhc3M9InJvdy1mbHVpZCI+CgkJPGRpdiBjbGFzcz0ic3BhbjEyIj4KCQk8L2Rpdj4KCTwvZGl2Pgo8L2Rpdj4=', '', 'color-5,icon-user', '1511781571436', 0),
(12, 'mod01', '89f2030a80fd6643c8e72e8b77141fde', 'PGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCTxkaXYgY2xhc3M9InJvdy1mbHVpZCI+CgkJPGRpdiBjbGFzcz0ic3BhbjIiPgoJCTwvZGl2PgoJCTxkaXYgY2xhc3M9InNwYW42Ij4KCQkJPHRhYmxlIGNsYXNzPSJ0YWJsZSI+CgkJCQk8dGhlYWQ+CgkJCQkJPHRyPgoJCQkJCQk8dGg+CgkJCQkJCQnnvJblj7cKCQkJCQkJPC90aD4KCQkJCQkJPHRoPgoJCQkJCQkJ5Lqn5ZOBCgkJCQkJCTwvdGg+CgkJCQkJCTx0aD4KCQkJCQkJCeS6pOS7mOaXtumXtAoJCQkJCQk8L3RoPgoJCQkJCQk8dGg+CgkJCQkJCQnnirbmgIEKCQkJCQkJPC90aD4KCQkJCQk8L3RyPgoJCQkJPC90aGVhZD4KCQkJCTx0Ym9keT4KCQkJCQk8dHI+CgkJCQkJCTx0ZD4KCQkJCQkJCTEKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAxLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJRGVmYXVsdAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJzdWNjZXNzIj4KCQkJCQkJPHRkPgoJCQkJCQkJMQoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDEvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlBcHByb3ZlZAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJlcnJvciI+CgkJCQkJCTx0ZD4KCQkJCQkJCTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAyLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJRGVjbGluZWQKCQkJCQkJPC90ZD4KCQkJCQk8L3RyPgoJCQkJCTx0ciBjbGFzcz0id2FybmluZyI+CgkJCQkJCTx0ZD4KCQkJCQkJCTMKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAzLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJUGVuZGluZwoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJpbmZvIj4KCQkJCQkJPHRkPgoJCQkJCQkJNAoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDQvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlDYWxsIGluIHRvIGNvbmZpcm0KCQkJCQkJPC90ZD4KCQkJCQk8L3RyPgoJCQkJPC90Ym9keT4KCQkJPC90YWJsZT4KCQk8L2Rpdj4KCQk8ZGl2IGNsYXNzPSJzcGFuNCI+CgkJPC9kaXY+Cgk8L2Rpdj4KCTxkaXYgY2xhc3M9InJvdy1mbHVpZCI+CgkJPGRpdiBjbGFzcz0ic3BhbjEyIj4KCQkJPHRhYmxlIGNsYXNzPSJ0YWJsZSB0YWJsZS1ib3JkZXJlZCI+CgkJCQk8dGhlYWQ+CgkJCQkJPHRyPgoJCQkJCQk8dGg+CgkJCQkJCQnnvJblj7cKCQkJCQkJPC90aD4KCQkJCQkJPHRoPgoJCQkJCQkJ5Lqn5ZOBCgkJCQkJCTwvdGg+CgkJCQkJCTx0aD4KCQkJCQkJCeS6pOS7mOaXtumXtAoJCQkJCQk8L3RoPgoJCQkJCQk8dGg+CgkJCQkJCQnnirbmgIEKCQkJCQkJPC90aD4KCQkJCQk8L3RyPgoJCQkJPC90aGVhZD4KCQkJCTx0Ym9keT4KCQkJCQk8dHI+CgkJCQkJCTx0ZD4KCQkJCQkJCTEKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAxLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJRGVmYXVsdAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJzdWNjZXNzIj4KCQkJCQkJPHRkPgoJCQkJCQkJMQoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDEvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlBcHByb3ZlZAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJlcnJvciI+CgkJCQkJCTx0ZD4KCQkJCQkJCTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAyLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJRGVjbGluZWQKCQkJCQkJPC90ZD4KCQkJCQk8L3RyPgoJCQkJCTx0ciBjbGFzcz0id2FybmluZyI+CgkJCQkJCTx0ZD4KCQkJCQkJCTMKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAzLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJUGVuZGluZwoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJpbmZvIj4KCQkJCQkJPHRkPgoJCQkJCQkJNAoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDQvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlDYWxsIGluIHRvIGNvbmZpcm0KCQkJCQkJPC90ZD4KCQkJCQk8L3RyPgoJCQkJPC90Ym9keT4KCQkJPC90YWJsZT4KCQk8L2Rpdj4KCTwvZGl2Pgo8L2Rpdj4=', '', 'color-4,icon-user', '1511732571436', 0),
(13, 'test01', '0e698a8ffc1a0af622c7b4db3cb750cc', 'PGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCTxkaXYgY2xhc3M9InJvdy1mbHVpZCI+CgkJPGRpdiBjbGFzcz0ic3BhbjYiPgoJCQk8aDM+CgkJCQloMy4g6L+Z5piv5LiA5aWX5Y+v6KeG5YyW5biD5bGA57O757ufLgoJCQk8L2gzPgoJCTwvZGl2PgoJCTxkaXYgY2xhc3M9InNwYW42Ij4KCQkJPHA+CgkJCQk8ZW0+R2l0PC9lbT7mmK/kuIDkuKrliIbluIPlvI/nmoTniYjmnKzmjqfliLbns7vnu5/vvIzmnIDliJ3nlLE8c3Ryb25nPkxpbnVzIFRvcnZhbGRzPC9zdHJvbmc+57yW5YaZ77yM55So5L2cTGludXjlhoXmoLjku6PnoIHnmoTnrqHnkIbjgILlnKjmjqjlh7rlkI7vvIxHaXTlnKjlhbblroPpobnnm67kuK3kuZ/lj5blvpfkuoblvojlpKfmiJDlip/vvIzlsKTlhbbmmK/lnKhSdWJ556S+5Yy65Lit44CCCgkJCTwvcD4KCQkJPGJsb2NrcXVvdGU+CgkJCQk8cD4KCQkJCQlnaXRodWLmmK/kuIDkuKrlhajnkIPljJbnmoTlvIDmupDnpL7ljLouCgkJCQk8L3A+IDxzbWFsbD7lhbPplK7or40gPGNpdGU+5byA5rqQPC9jaXRlPjwvc21hbGw+CgkJCTwvYmxvY2txdW90ZT4KCQk8L2Rpdj4KCTwvZGl2PgoJPGRpdiBjbGFzcz0icm93LWZsdWlkIj4KCQk8ZGl2IGNsYXNzPSJzcGFuMTIiPgoJCQk8dGFibGUgY2xhc3M9InRhYmxlIHRhYmxlLWJvcmRlcmVkIj4KCQkJCTx0aGVhZD4KCQkJCQk8dHI+CgkJCQkJCTx0aD4KCQkJCQkJCee8luWPtwoJCQkJCQk8L3RoPgoJCQkJCQk8dGg+CgkJCQkJCQnkuqflk4EKCQkJCQkJPC90aD4KCQkJCQkJPHRoPgoJCQkJCQkJ5Lqk5LuY5pe26Ze0CgkJCQkJCTwvdGg+CgkJCQkJCTx0aD4KCQkJCQkJCeeKtuaAgQoJCQkJCQk8L3RoPgoJCQkJCTwvdHI+CgkJCQk8L3RoZWFkPgoJCQkJPHRib2R5PgoJCQkJCTx0cj4KCQkJCQkJPHRkPgoJCQkJCQkJMQoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDEvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlEZWZhdWx0CgkJCQkJCTwvdGQ+CgkJCQkJPC90cj4KCQkJCQk8dHIgY2xhc3M9InN1Y2Nlc3MiPgoJCQkJCQk8dGQ+CgkJCQkJCQkxCgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCVRCIC0gTW9udGhseQoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQkwMS8wNC8yMDEyCgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCUFwcHJvdmVkCgkJCQkJCTwvdGQ+CgkJCQkJPC90cj4KCQkJCQk8dHIgY2xhc3M9ImVycm9yIj4KCQkJCQkJPHRkPgoJCQkJCQkJMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDIvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlEZWNsaW5lZAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJ3YXJuaW5nIj4KCQkJCQkJPHRkPgoJCQkJCQkJMwoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDMvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlQZW5kaW5nCgkJCQkJCTwvdGQ+CgkJCQkJPC90cj4KCQkJCQk8dHIgY2xhc3M9ImluZm8iPgoJCQkJCQk8dGQ+CgkJCQkJCQk0CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCVRCIC0gTW9udGhseQoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQkwNC8wNC8yMDEyCgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCUNhbGwgaW4gdG8gY29uZmlybQoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQk8L3Rib2R5PgoJCQk8L3RhYmxlPgoJCTwvZGl2PgoJPC9kaXY+CjwvZGl2Pg==', '', 'color-3,icon-user', '1514739571436', 1),
(23, 'hjhj', '453046a5e7e9cae0ab1cd1a82789548d', 'PGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCTxkaXYgY2xhc3M9InJvdy1mbHVpZCI+CgkJPGRpdiBjbGFzcz0ic3BhbjEyIj4KCQkJPHRhYmxlIGNsYXNzPSJ0YWJsZSI+CgkJCQk8dGhlYWQ+CgkJCQkJPHRyPgoJCQkJCQk8dGg+CgkJCQkJCQnnvJblj7cKCQkJCQkJPC90aD4KCQkJCQkJPHRoPgoJCQkJCQkJ5Lqn5ZOBCgkJCQkJCTwvdGg+CgkJCQkJCTx0aD4KCQkJCQkJCeS6pOS7mOaXtumXtAoJCQkJCQk8L3RoPgoJCQkJCQk8dGg+CgkJCQkJCQnnirbmgIEKCQkJCQkJPC90aD4KCQkJCQk8L3RyPgoJCQkJPC90aGVhZD4KCQkJCTx0Ym9keT4KCQkJCQk8dHI+CgkJCQkJCTx0ZD4KCQkJCQkJCTEKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAxLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJRGVmYXVsdAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJzdWNjZXNzIj4KCQkJCQkJPHRkPgoJCQkJCQkJMQoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDEvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlBcHByb3ZlZAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJlcnJvciI+CgkJCQkJCTx0ZD4KCQkJCQkJCTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAyLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJRGVjbGluZWQKCQkJCQkJPC90ZD4KCQkJCQk8L3RyPgoJCQkJCTx0ciBjbGFzcz0id2FybmluZyI+CgkJCQkJCTx0ZD4KCQkJCQkJCTMKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAzLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJUGVuZGluZwoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJpbmZvIj4KCQkJCQkJPHRkPgoJCQkJCQkJNAoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDQvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlDYWxsIGluIHRvIGNvbmZpcm0KCQkJCQkJPC90ZD4KCQkJCQk8L3RyPgoJCQkJPC90Ym9keT4KCQkJPC90YWJsZT4KCQkJPHRhYmxlIGNsYXNzPSJ0YWJsZSI+CgkJCQk8dGhlYWQ+CgkJCQkJPHRyPgoJCQkJCQk8dGg+CgkJCQkJCQnnvJblj7cKCQkJCQkJPC90aD4KCQkJCQkJPHRoPgoJCQkJCQkJ5Lqn5ZOBCgkJCQkJCTwvdGg+CgkJCQkJCTx0aD4KCQkJCQkJCeS6pOS7mOaXtumXtAoJCQkJCQk8L3RoPgoJCQkJCQk8dGg+CgkJCQkJCQnnirbmgIEKCQkJCQkJPC90aD4KCQkJCQk8L3RyPgoJCQkJPC90aGVhZD4KCQkJCTx0Ym9keT4KCQkJCQk8dHI+CgkJCQkJCTx0ZD4KCQkJCQkJCTEKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAxLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJRGVmYXVsdAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJzdWNjZXNzIj4KCQkJCQkJPHRkPgoJCQkJCQkJMQoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDEvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlBcHByb3ZlZAoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJlcnJvciI+CgkJCQkJCTx0ZD4KCQkJCQkJCTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAyLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJRGVjbGluZWQKCQkJCQkJPC90ZD4KCQkJCQk8L3RyPgoJCQkJCTx0ciBjbGFzcz0id2FybmluZyI+CgkJCQkJCTx0ZD4KCQkJCQkJCTMKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJVEIgLSBNb250aGx5CgkJCQkJCTwvdGQ+CgkJCQkJCTx0ZD4KCQkJCQkJCTAzLzA0LzIwMTIKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJUGVuZGluZwoJCQkJCQk8L3RkPgoJCQkJCTwvdHI+CgkJCQkJPHRyIGNsYXNzPSJpbmZvIj4KCQkJCQkJPHRkPgoJCQkJCQkJNAoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlUQiAtIE1vbnRobHkKCQkJCQkJPC90ZD4KCQkJCQkJPHRkPgoJCQkJCQkJMDQvMDQvMjAxMgoJCQkJCQk8L3RkPgoJCQkJCQk8dGQ+CgkJCQkJCQlDYWxsIGluIHRvIGNvbmZpcm0KCQkJCQkJPC90ZD4KCQkJCQk8L3RyPgoJCQkJPC90Ym9keT4KCQkJPC90YWJsZT4KCQkJPGRpdiBjbGFzcz0icm93LWZsdWlkIj4KCQkJCTxkaXYgY2xhc3M9InNwYW40Ij4KCQkJCTwvZGl2PgoJCQkJPGRpdiBjbGFzcz0ic3BhbjQiPgoJCQkJPC9kaXY+CgkJCQk8ZGl2IGNsYXNzPSJzcGFuNCI+CgkJCQk8L2Rpdj4KCQkJPC9kaXY+CgkJCTxkaXYgY2xhc3M9Imhlcm8tdW5pdCI+CgkJCQk8cD4KCQkJCQnkuIDnp43po47vvIzlj6rmtYHmtarlnKjkuIDluqflsbHosLfvvJsKCQkJCTwvcD4KCQkJCTxwPgoJCQkJCeS4gOmBk+WgpO+8jOWPquaKpOS9j+S4gOa5vuaYn+ays+OAggoJCQkJPC9wPgoJCQkJPHA+CgkJCQkJ5q+P5qyh5Luw5pyb5pif56m677yM5oiR5oC75piv6Zet5LiK55y877yMCgkJCQk8L3A+CgkJCQk8cD4KCQkJCQnlm6DkuLrmnIDnvo7nmoTkuIDpopfkuI3lnKjlpKnkuIrjgIIKCQkJCTwvcD4KCQkJPC9kaXY+CgkJPC9kaXY+Cgk8L2Rpdj4KPC9kaXY+', '', 'color-3,icon-user', '1511784571636', 0),
(24, 'zxy', '2762be8fee1bf6f319878fecb4363f7f', 'PGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCTxkaXYgY2xhc3M9InJvdy1mbHVpZCI+CgkJPGRpdiBjbGFzcz0ic3BhbjEyIj4KCQkJPGRpdiBjbGFzcz0iaGVyby11bml0Ij4KCQkJCTxwPgoJCQkJCeS4gOenjemjju+8jOWPqua1gea1quWcqOS4gOW6p+Wxseiwt++8mwoJCQkJPC9wPgoJCQkJPHA+CgkJCQkJ5LiA6YGT5aCk77yM5Y+q5oqk5L2P5LiA5rm+5pif5rKz44CCCgkJCQk8L3A+CgkJCQk8cD4KCQkJCQnmr4/mrKHku7DmnJvmmJ/nqbrvvIzmiJHmgLvmmK/pl63kuIrnnLzvvIwKCQkJCTwvcD4KCQkJCTxwPgoJCQkJCeWboOS4uuacgOe+jueahOS4gOmil+S4jeWcqOWkqeS4iuOAggoJCQkJPC9wPgoJCQk8L2Rpdj4KCQk8L2Rpdj4KCTwvZGl2Pgo8L2Rpdj4=', '', 'color-1,icon-user', '1511747571536', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `files_system`
--
ALTER TABLE `files_system`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `sites_construction`
--
ALTER TABLE `sites_construction`
  ADD PRIMARY KEY (`ID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `files_system`
--
ALTER TABLE `files_system`
  MODIFY `ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- 使用表AUTO_INCREMENT `sites_construction`
--
ALTER TABLE `sites_construction`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
