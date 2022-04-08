-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.7.3-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- myproject 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `myproject` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `myproject`;

-- 테이블 myproject.accounts_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `accounts_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `name` varchar(16) NOT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.accounts_user:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `accounts_user` DISABLE KEYS */;
INSERT INTO `accounts_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`, `name`, `profile_image`) VALUES
	(1, 'pbkdf2_sha256$320000$r00VagBgdP9bLZlRyXdXO5$sPrpKK94ycUPMTTW7EIzQbFSriWp+YxKIU+AvI9lFWc=', NULL, 1, 'admin', '', '', 'admin@admin.com', 1, 1, '2022-04-08 00:00:00.000000', 'admin', ''),
	(2, 'pbkdf2_sha256$320000$RV8tZQniUBCTtVdZTBLOX0$n0JewWE5jBor4FVX7xZcIiIiPUIQduk9psLmlueQ8MM=', NULL, 1, 'ssafy', '', '', 'ssafy@ssafy.com', 1, 1, '2022-04-08 00:02:00.000000', 'ssafy', '');
/*!40000 ALTER TABLE `accounts_user` ENABLE KEYS */;

-- 테이블 myproject.accounts_user_groups 구조 내보내기
CREATE TABLE IF NOT EXISTS `accounts_user_groups` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_groups_user_id_group_id_59c0b32f_uniq` (`user_id`,`group_id`),
  KEY `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` (`group_id`),
  CONSTRAINT `accounts_user_groups_group_id_bd11a704_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `accounts_user_groups_user_id_52b62117_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.accounts_user_groups:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `accounts_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_groups` ENABLE KEYS */;

-- 테이블 myproject.accounts_user_user_permissions 구조 내보내기
CREATE TABLE IF NOT EXISTS `accounts_user_user_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_user_user_permi_user_id_permission_id_2ab516c2_uniq` (`user_id`,`permission_id`),
  KEY `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` (`permission_id`),
  CONSTRAINT `accounts_user_user_p_permission_id_113bb443_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `accounts_user_user_p_user_id_e4f0a161_fk_accounts_` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.accounts_user_user_permissions:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `accounts_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_user_user_permissions` ENABLE KEYS */;

-- 테이블 myproject.auth_group 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.auth_group:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;

-- 테이블 myproject.auth_group_permissions 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth_group_permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.auth_group_permissions:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;

-- 테이블 myproject.auth_permission 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.auth_permission:~72 rows (대략적) 내보내기
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
	(1, 'Can add user', 1, 'add_user'),
	(2, 'Can change user', 1, 'change_user'),
	(3, 'Can delete user', 1, 'delete_user'),
	(4, 'Can view user', 1, 'view_user'),
	(5, 'Can add board', 2, 'add_board'),
	(6, 'Can change board', 2, 'change_board'),
	(7, 'Can delete board', 2, 'delete_board'),
	(8, 'Can view board', 2, 'view_board'),
	(9, 'Can add board file', 3, 'add_boardfile'),
	(10, 'Can change board file', 3, 'change_boardfile'),
	(11, 'Can delete board file', 3, 'delete_boardfile'),
	(12, 'Can view board file', 3, 'view_boardfile'),
	(13, 'Can add board comment', 4, 'add_boardcomment'),
	(14, 'Can change board comment', 4, 'change_boardcomment'),
	(15, 'Can delete board comment', 4, 'delete_boardcomment'),
	(16, 'Can view board comment', 4, 'view_boardcomment'),
	(17, 'Can add community', 5, 'add_community'),
	(18, 'Can change community', 5, 'change_community'),
	(19, 'Can delete community', 5, 'delete_community'),
	(20, 'Can view community', 5, 'view_community'),
	(21, 'Can add member', 6, 'add_member'),
	(22, 'Can change member', 6, 'change_member'),
	(23, 'Can delete member', 6, 'delete_member'),
	(24, 'Can view member', 6, 'view_member'),
	(25, 'Can add minute', 7, 'add_minute'),
	(26, 'Can change minute', 7, 'change_minute'),
	(27, 'Can delete minute', 7, 'delete_minute'),
	(28, 'Can view minute', 7, 'view_minute'),
	(29, 'Can add participant', 8, 'add_participant'),
	(30, 'Can change participant', 8, 'change_participant'),
	(31, 'Can delete participant', 8, 'delete_participant'),
	(32, 'Can view participant', 8, 'view_participant'),
	(33, 'Can add speech', 9, 'add_speech'),
	(34, 'Can change speech', 9, 'change_speech'),
	(35, 'Can delete speech', 9, 'delete_speech'),
	(36, 'Can view speech', 9, 'view_speech'),
	(37, 'Can add speech file', 10, 'add_speechfile'),
	(38, 'Can change speech file', 10, 'change_speechfile'),
	(39, 'Can delete speech file', 10, 'delete_speechfile'),
	(40, 'Can view speech file', 10, 'view_speechfile'),
	(41, 'Can add speech comment', 11, 'add_speechcomment'),
	(42, 'Can change speech comment', 11, 'change_speechcomment'),
	(43, 'Can delete speech comment', 11, 'delete_speechcomment'),
	(44, 'Can view speech comment', 11, 'view_speechcomment'),
	(45, 'Can add minute file', 12, 'add_minutefile'),
	(46, 'Can change minute file', 12, 'change_minutefile'),
	(47, 'Can delete minute file', 12, 'delete_minutefile'),
	(48, 'Can view minute file', 12, 'view_minutefile'),
	(49, 'Can add notification', 13, 'add_notification'),
	(50, 'Can change notification', 13, 'change_notification'),
	(51, 'Can delete notification', 13, 'delete_notification'),
	(52, 'Can view notification', 13, 'view_notification'),
	(53, 'Can add log entry', 14, 'add_logentry'),
	(54, 'Can change log entry', 14, 'change_logentry'),
	(55, 'Can delete log entry', 14, 'delete_logentry'),
	(56, 'Can view log entry', 14, 'view_logentry'),
	(57, 'Can add permission', 15, 'add_permission'),
	(58, 'Can change permission', 15, 'change_permission'),
	(59, 'Can delete permission', 15, 'delete_permission'),
	(60, 'Can view permission', 15, 'view_permission'),
	(61, 'Can add group', 16, 'add_group'),
	(62, 'Can change group', 16, 'change_group'),
	(63, 'Can delete group', 16, 'delete_group'),
	(64, 'Can view group', 16, 'view_group'),
	(65, 'Can add content type', 17, 'add_contenttype'),
	(66, 'Can change content type', 17, 'change_contenttype'),
	(67, 'Can delete content type', 17, 'delete_contenttype'),
	(68, 'Can view content type', 17, 'view_contenttype'),
	(69, 'Can add session', 18, 'add_session'),
	(70, 'Can change session', 18, 'change_session'),
	(71, 'Can delete session', 18, 'delete_session'),
	(72, 'Can view session', 18, 'view_session');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;

-- 테이블 myproject.boards_board 구조 내보내기
CREATE TABLE IF NOT EXISTS `boards_board` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `is_notice` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `community_id` bigint(20) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `boards_board_community_id_f6c1f026_fk_community_community_id` (`community_id`),
  KEY `boards_board_member_id_cc86ba0f_fk_community_member_id` (`member_id`),
  CONSTRAINT `boards_board_community_id_f6c1f026_fk_community_community_id` FOREIGN KEY (`community_id`) REFERENCES `community_community` (`id`),
  CONSTRAINT `boards_board_member_id_cc86ba0f_fk_community_member_id` FOREIGN KEY (`member_id`) REFERENCES `community_member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.boards_board:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `boards_board` DISABLE KEYS */;
INSERT INTO `boards_board` (`id`, `title`, `content`, `is_notice`, `created_at`, `updated_at`, `community_id`, `member_id`) VALUES
	(1, 'board1', 'board1', 1, '2022-04-08 00:08:00.000000', '2022-04-08 00:08:00.000000', 1, 1),
	(2, 'board2', 'board2', 0, '2022-04-08 00:12:00.000000', '2022-04-08 00:12:00.000000', 1, 1);
/*!40000 ALTER TABLE `boards_board` ENABLE KEYS */;

-- 테이블 myproject.boards_boardcomment 구조 내보내기
CREATE TABLE IF NOT EXISTS `boards_boardcomment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `board_id` bigint(20) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `boards_boardcomment_board_id_596458a0_fk_boards_board_id` (`board_id`),
  KEY `boards_boardcomment_member_id_1f3bfc12_fk_community_member_id` (`member_id`),
  CONSTRAINT `boards_boardcomment_board_id_596458a0_fk_boards_board_id` FOREIGN KEY (`board_id`) REFERENCES `boards_board` (`id`),
  CONSTRAINT `boards_boardcomment_member_id_1f3bfc12_fk_community_member_id` FOREIGN KEY (`member_id`) REFERENCES `community_member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.boards_boardcomment:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `boards_boardcomment` DISABLE KEYS */;
INSERT INTO `boards_boardcomment` (`id`, `content`, `created_at`, `updated_at`, `board_id`, `member_id`) VALUES
	(1, 'board comment1', '2022-04-08 00:10:00.000000', '2022-04-08 00:10:00.000000', 1, 1);
/*!40000 ALTER TABLE `boards_boardcomment` ENABLE KEYS */;

-- 테이블 myproject.boards_boardfile 구조 내보내기
CREATE TABLE IF NOT EXISTS `boards_boardfile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `reference_file` varchar(100) DEFAULT NULL,
  `board_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `boards_boardfile_board_id_f39e67c5_fk_boards_board_id` (`board_id`),
  CONSTRAINT `boards_boardfile_board_id_f39e67c5_fk_boards_board_id` FOREIGN KEY (`board_id`) REFERENCES `boards_board` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.boards_boardfile:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `boards_boardfile` DISABLE KEYS */;
/*!40000 ALTER TABLE `boards_boardfile` ENABLE KEYS */;

-- 테이블 myproject.community_community 구조 내보내기
CREATE TABLE IF NOT EXISTS `community_community` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `intro` varchar(100) NOT NULL,
  `private_code` varchar(10) NOT NULL,
  `is_private` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.community_community:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `community_community` DISABLE KEYS */;
INSERT INTO `community_community` (`id`, `name`, `intro`, `private_code`, `is_private`, `created_at`, `image`) VALUES
	(1, 'community1', 'community1', '3XV1AKI768', 0, '2022-04-08 00:04:00.000000', '');
/*!40000 ALTER TABLE `community_community` ENABLE KEYS */;

-- 테이블 myproject.community_member 구조 내보내기
CREATE TABLE IF NOT EXISTS `community_member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(16) NOT NULL,
  `bio` varchar(100) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `profile_image` varchar(100) DEFAULT NULL,
  `community_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `community_member_community_id_19371442_fk_community_community_id` (`community_id`),
  KEY `community_member_user_id_17ca1363_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `community_member_community_id_19371442_fk_community_community_id` FOREIGN KEY (`community_id`) REFERENCES `community_community` (`id`),
  CONSTRAINT `community_member_user_id_17ca1363_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.community_member:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `community_member` DISABLE KEYS */;
INSERT INTO `community_member` (`id`, `nickname`, `bio`, `is_admin`, `is_active`, `created_at`, `profile_image`, `community_id`, `user_id`) VALUES
	(1, 'admin', '', 1, 1, '2022-04-08 00:04:00.000000', '', 1, 1),
	(2, 'ssafy', '', 0, 1, '2022-04-08 00:06:00.000000', '', 1, 2);
/*!40000 ALTER TABLE `community_member` ENABLE KEYS */;

-- 테이블 myproject.django_admin_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.django_admin_log:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;

-- 테이블 myproject.django_content_type 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.django_content_type:~18 rows (대략적) 내보내기
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
	(1, 'accounts', 'user'),
	(14, 'admin', 'logentry'),
	(16, 'auth', 'group'),
	(15, 'auth', 'permission'),
	(2, 'boards', 'board'),
	(4, 'boards', 'boardcomment'),
	(3, 'boards', 'boardfile'),
	(5, 'community', 'community'),
	(6, 'community', 'member'),
	(17, 'contenttypes', 'contenttype'),
	(7, 'minutes', 'minute'),
	(12, 'minutes', 'minutefile'),
	(8, 'minutes', 'participant'),
	(9, 'minutes', 'speech'),
	(11, 'minutes', 'speechcomment'),
	(10, 'minutes', 'speechfile'),
	(13, 'notifications', 'notification'),
	(18, 'sessions', 'session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;

-- 테이블 myproject.django_migrations 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.django_migrations:~23 rows (대략적) 내보내기
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
	(1, 'contenttypes', '0001_initial', '2022-04-08 00:22:23.524204'),
	(2, 'contenttypes', '0002_remove_content_type_name', '2022-04-08 00:22:23.574187'),
	(3, 'auth', '0001_initial', '2022-04-08 00:22:23.757973'),
	(4, 'auth', '0002_alter_permission_name_max_length', '2022-04-08 00:22:23.796082'),
	(5, 'auth', '0003_alter_user_email_max_length', '2022-04-08 00:22:23.803063'),
	(6, 'auth', '0004_alter_user_username_opts', '2022-04-08 00:22:23.811129'),
	(7, 'auth', '0005_alter_user_last_login_null', '2022-04-08 00:22:23.818081'),
	(8, 'auth', '0006_require_contenttypes_0002', '2022-04-08 00:22:23.822068'),
	(9, 'auth', '0007_alter_validators_add_error_messages', '2022-04-08 00:22:23.829052'),
	(10, 'auth', '0008_alter_user_username_max_length', '2022-04-08 00:22:23.838031'),
	(11, 'auth', '0009_alter_user_last_name_max_length', '2022-04-08 00:22:23.845980'),
	(12, 'auth', '0010_alter_group_name_max_length', '2022-04-08 00:22:23.868920'),
	(13, 'auth', '0011_update_proxy_permissions', '2022-04-08 00:22:23.874903'),
	(14, 'auth', '0012_alter_user_first_name_max_length', '2022-04-08 00:22:23.880887'),
	(15, 'accounts', '0001_initial', '2022-04-08 00:22:24.111285'),
	(16, 'admin', '0001_initial', '2022-04-08 00:22:24.202730'),
	(17, 'admin', '0002_logentry_remove_auto_add', '2022-04-08 00:22:24.210693'),
	(18, 'admin', '0003_logentry_add_action_flag_choices', '2022-04-08 00:22:24.218653'),
	(19, 'community', '0001_initial', '2022-04-08 00:22:24.320183'),
	(20, 'boards', '0001_initial', '2022-04-08 00:22:24.542006'),
	(21, 'minutes', '0001_initial', '2022-04-08 00:22:24.985493'),
	(22, 'notifications', '0001_initial', '2022-04-08 00:22:25.083504'),
	(23, 'sessions', '0001_initial', '2022-04-08 00:22:25.120429');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;

-- 테이블 myproject.django_session 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.django_session:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;

-- 테이블 myproject.minutes_minute 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_minute` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `conclusion` longtext NOT NULL,
  `is_closed` tinyint(1) NOT NULL,
  `deadline` datetime(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `community_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minutes_minute_community_id_d27aecc6_fk_community_community_id` (`community_id`),
  CONSTRAINT `minutes_minute_community_id_d27aecc6_fk_community_community_id` FOREIGN KEY (`community_id`) REFERENCES `community_community` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.minutes_minute:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `minutes_minute` DISABLE KEYS */;
INSERT INTO `minutes_minute` (`id`, `title`, `content`, `conclusion`, `is_closed`, `deadline`, `created_at`, `updated_at`, `community_id`) VALUES
	(1, 'minute1', 'minute1', 'closed', 1, '2022-04-08 11:00:00.000000', '2022-04-08 00:14:00.000000', '2022-04-08 11:00:00.000000', 1),
	(2, 'minute2', 'minute2', '', 0, '2022-04-30 23:00:00.000000', '2022-04-08 00:16:00.000000', '2022-04-08 00:16:00.000000', 1);
/*!40000 ALTER TABLE `minutes_minute` ENABLE KEYS */;

-- 테이블 myproject.minutes_minutefile 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_minutefile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `reference_file` varchar(100) DEFAULT NULL,
  `minute_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minutes_minutefile_minute_id_0f5835ce_fk_minutes_minute_id` (`minute_id`),
  CONSTRAINT `minutes_minutefile_minute_id_0f5835ce_fk_minutes_minute_id` FOREIGN KEY (`minute_id`) REFERENCES `minutes_minute` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.minutes_minutefile:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `minutes_minutefile` DISABLE KEYS */;
/*!40000 ALTER TABLE `minutes_minutefile` ENABLE KEYS */;

-- 테이블 myproject.minutes_participant 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_participant` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `is_assignee` tinyint(1) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `minute_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minutes_participant_member_id_e70faed9_fk_community_member_id` (`member_id`),
  KEY `minutes_participant_minute_id_f070c492_fk_minutes_minute_id` (`minute_id`),
  CONSTRAINT `minutes_participant_member_id_e70faed9_fk_community_member_id` FOREIGN KEY (`member_id`) REFERENCES `community_member` (`id`),
  CONSTRAINT `minutes_participant_minute_id_f070c492_fk_minutes_minute_id` FOREIGN KEY (`minute_id`) REFERENCES `minutes_minute` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.minutes_participant:~4 rows (대략적) 내보내기
/*!40000 ALTER TABLE `minutes_participant` DISABLE KEYS */;
INSERT INTO `minutes_participant` (`id`, `is_assignee`, `member_id`, `minute_id`) VALUES
	(1, 1, 1, 1),
	(2, 0, 2, 1),
	(3, 1, 1, 2),
	(4, 0, 2, 2);
/*!40000 ALTER TABLE `minutes_participant` ENABLE KEYS */;

-- 테이블 myproject.minutes_speech 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_speech` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `voice_text` longtext NOT NULL,
  `summary` longtext NOT NULL,
  `cloud_keyword` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `record_file` varchar(100) DEFAULT NULL,
  `minute_id` bigint(20) NOT NULL,
  `participant_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `participant_id` (`participant_id`),
  KEY `minutes_speech_minute_id_4d6d509f_fk_minutes_minute_id` (`minute_id`),
  CONSTRAINT `minutes_speech_minute_id_4d6d509f_fk_minutes_minute_id` FOREIGN KEY (`minute_id`) REFERENCES `minutes_minute` (`id`),
  CONSTRAINT `minutes_speech_participant_id_18380e4f_fk_minutes_participant_id` FOREIGN KEY (`participant_id`) REFERENCES `minutes_participant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.minutes_speech:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `minutes_speech` DISABLE KEYS */;
/*!40000 ALTER TABLE `minutes_speech` ENABLE KEYS */;

-- 테이블 myproject.minutes_speechcomment 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_speechcomment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `member_id` bigint(20) DEFAULT NULL,
  `speech_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minutes_speechcomment_member_id_1323cb1e_fk_community_member_id` (`member_id`),
  KEY `minutes_speechcomment_speech_id_399b4aee_fk_minutes_speech_id` (`speech_id`),
  CONSTRAINT `minutes_speechcomment_member_id_1323cb1e_fk_community_member_id` FOREIGN KEY (`member_id`) REFERENCES `community_member` (`id`),
  CONSTRAINT `minutes_speechcomment_speech_id_399b4aee_fk_minutes_speech_id` FOREIGN KEY (`speech_id`) REFERENCES `minutes_speech` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.minutes_speechcomment:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `minutes_speechcomment` DISABLE KEYS */;
/*!40000 ALTER TABLE `minutes_speechcomment` ENABLE KEYS */;

-- 테이블 myproject.minutes_speechfile 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_speechfile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `reference_file` varchar(100) DEFAULT NULL,
  `speech_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minutes_speechfile_speech_id_35702050_fk_minutes_speech_id` (`speech_id`),
  CONSTRAINT `minutes_speechfile_speech_id_35702050_fk_minutes_speech_id` FOREIGN KEY (`speech_id`) REFERENCES `minutes_speech` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 myproject.minutes_speechfile:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `minutes_speechfile` DISABLE KEYS */;
/*!40000 ALTER TABLE `minutes_speechfile` ENABLE KEYS */;

-- 테이블 myproject.notifications_notification 구조 내보내기
CREATE TABLE IF NOT EXISTS `notifications_notification` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` longtext NOT NULL,
  `is_activate` tinyint(1) NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `minute_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifi_minute_id_de6a78c2_fk_minutes_m` (`minute_id`),
  KEY `notifications_notification_user_id_b5e8c0ff_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `notifications_notifi_minute_id_de6a78c2_fk_minutes_m` FOREIGN KEY (`minute_id`) REFERENCES `minutes_minute` (`id`),
  CONSTRAINT `notifications_notification_user_id_b5e8c0ff_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
<<<<<<< HEAD
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
=======
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
>>>>>>> 1caaecdb6f71ebb40a4d09980f4b4372a80beae2

-- 테이블 데이터 myproject.notifications_notification:~8 rows (대략적) 내보내기
/*!40000 ALTER TABLE `notifications_notification` DISABLE KEYS */;
INSERT INTO `notifications_notification` (`id`, `content`, `is_activate`, `is_read`, `minute_id`, `user_id`) VALUES
	(1, 'admin님께서 주최하신 minute1 회의가 정상적으로 등록되었습니다.', 1, 0, 1, 1),
<<<<<<< HEAD
	(2, 'minute1 회의의 스피치 등록 마감이 1시간 남았습니다.', 1, 0, 1, 1),
	(3, 'admin님께서 주최하신 minute1 회의가 정상적으로 등록되었습니다.', 1, 0, 1, 2),
	(4, 'minute1 회의의 스피치 등록 마감이 1시간 남았습니다.', 1, 0, 1, 2),
	(5, 'admin님께서 minute1 회의를 종료하였습니다.', 1, 0, 1, 1),
	(6, 'admin님께서 minute1 회의를 종료하였습니다.', 1, 0, 1, 2),
	(7, 'admin님께서 주최하신 minute2 회의가 정상적으로 등록되었습니다.', 1, 0, 2, 1),
	(8, 'minute2 회의의 스피치 등록 마감이 1시간 남았습니다.', 0, 0, 2, 1),
	(9, 'admin님께서 ssafy님을 minute2 회의의 참여자로 등록하였습니다.', 1, 0, 2, 2),
	(10, 'minute2 회의의 스피치 등록 마감이 1시간 남았습니다.', 0, 0, 2, 2);
=======
	(2, 'minute1 회의의 스피치 등록 마감이 1시간 남았습니다.', 0, 0, 1, 1),
	(3, 'admin님께서 minute1 회의를 종료하였습니다.', 1, 0, 1, 1),
	(4, 'admin님께서 minute1 회의를 종료하였습니다.', 1, 0, 1, 2),
	(5, 'admin님께서 주최하신 minute2 회의가 정상적으로 등록되었습니다.', 1, 0, 2, 1),
	(6, 'minute2 회의의 스피치 등록 마감이 1시간 남았습니다.', 0, 0, 2, 1),
	(7, 'admin님께서 ssafy님을 minute2 회의의 참여자로 등록하였습니다.', 1, 0, 2, 2),
	(8, 'minute2 회의의 스피치 등록 마감이 1시간 남았습니다.', 0, 0, 2, 2);
>>>>>>> 1caaecdb6f71ebb40a4d09980f4b4372a80beae2
/*!40000 ALTER TABLE `notifications_notification` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
