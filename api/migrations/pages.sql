CREATE TABLE pages
(
    id               INT auto_increment NOT NULL,
    `path`           varchar(255)       NOT NULL,
    template         varchar(100)       NOT NULL,
    title            varchar(255)       NULL,
    meta_title       varchar(255)       NULL,
    meta_description TEXT               NULL,
    CONSTRAINT pages_pk PRIMARY KEY (id)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_general_ci;
=====
CREATE TABLE blocks
(
    `id`        int(11) NOT NULL AUTO_INCREMENT,
    `title`     varchar(255) DEFAULT NULL,
    `subtitle`  varchar(255) DEFAULT NULL,
    `text`      text,
    `link_href` varchar(255) DEFAULT NULL,
    `link_text` varchar(100) DEFAULT NULL,
    `page_id`   int(11)      DEFAULT NULL,
    `block_id`  int(11)      DEFAULT NULL,
    `asset_id`  int(11)      DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `blocks_FK` (`page_id`),
    KEY `blocks_FK_1` (`block_id`),
    KEY `blocks_FK_2` (`asset_id`),
    CONSTRAINT `blocks_FK` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `blocks_FK_1` FOREIGN KEY (`block_id`) REFERENCES `blocks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `blocks_FK_2` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;
=====
ALTER TABLE individuals
    ADD description TEXT NULL;
=====
ALTER TABLE individuals
    CHANGE description description TEXT NULL AFTER lastname_slug;
=====
CREATE TABLE maps
(
    id          INT auto_increment NOT NULL,
    name        varchar(255)       NOT NULL,
    description TEXT               NULL,
    CONSTRAINT map_pk PRIMARY KEY (id)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = utf8mb4
    COLLATE = utf8mb4_general_ci;
=====
CREATE TABLE map_entries
(
    `id`            int(11) NOT NULL AUTO_INCREMENT,
    `map_id`        int(11) NOT NULL,
    `individual_id` int(11)     DEFAULT NULL,
    `group_id`      int(11)     DEFAULT NULL,
    `node_value`    int(11)     DEFAULT NULL,
    `node_color`    varchar(25) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `map_entries_un` (`map_id`, `individual_id`),
    UNIQUE KEY `map_entries_un2` (`map_id`, `group_id`),
    KEY `map_entries_FK_1` (`group_id`),
    KEY `map_entries_FK_2` (`individual_id`),
    CONSTRAINT `map_entries_FK` FOREIGN KEY (`map_id`) REFERENCES `maps` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `map_entries_FK_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `map_entries_FK_2` FOREIGN KEY (`individual_id`) REFERENCES `individuals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
