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
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.auth_group 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.auth_permission 구조 내보내기
CREATE TABLE IF NOT EXISTS `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.boards_boardfile 구조 내보내기
CREATE TABLE IF NOT EXISTS `boards_boardfile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reference_file` varchar(100) DEFAULT NULL,
  `board_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `boards_boardfile_board_id_f39e67c5_fk_boards_board_id` (`board_id`),
  CONSTRAINT `boards_boardfile_board_id_f39e67c5_fk_boards_board_id` FOREIGN KEY (`board_id`) REFERENCES `boards_board` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.community_community 구조 내보내기
CREATE TABLE IF NOT EXISTS `community_community` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `intro` varchar(100) NOT NULL,
  `private_code` varchar(10) NOT NULL,
  `is_private` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.community_member 구조 내보내기
CREATE TABLE IF NOT EXISTS `community_member` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(16) NOT NULL,
  `bio` varchar(100) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `community_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `community_member_community_id_19371442_fk_community_community_id` (`community_id`),
  KEY `community_member_user_id_17ca1363_fk_accounts_user_id` (`user_id`),
  CONSTRAINT `community_member_community_id_19371442_fk_community_community_id` FOREIGN KEY (`community_id`) REFERENCES `community_community` (`id`),
  CONSTRAINT `community_member_user_id_17ca1363_fk_accounts_user_id` FOREIGN KEY (`user_id`) REFERENCES `accounts_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.django_content_type 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.django_migrations 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_migrations` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.django_session 구조 내보내기
CREATE TABLE IF NOT EXISTS `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.minutes_minutefile 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_minutefile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reference_file` varchar(100) DEFAULT NULL,
  `minute_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minutes_minutefile_minute_id_0f5835ce_fk_minutes_minute_id` (`minute_id`),
  CONSTRAINT `minutes_minutefile_minute_id_0f5835ce_fk_minutes_minute_id` FOREIGN KEY (`minute_id`) REFERENCES `minutes_minute` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.minutes_speech 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_speech` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
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

-- 내보낼 데이터가 선택되어 있지 않습니다.

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

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 myproject.minutes_speechfile 구조 내보내기
CREATE TABLE IF NOT EXISTS `minutes_speechfile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `reference_file` varchar(100) DEFAULT NULL,
  `speech_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `minutes_speechfile_speech_id_35702050_fk_minutes_speech_id` (`speech_id`),
  CONSTRAINT `minutes_speechfile_speech_id_35702050_fk_minutes_speech_id` FOREIGN KEY (`speech_id`) REFERENCES `minutes_speech` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
