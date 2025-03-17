CREATE TABLE `users`(
    `user_id` INTEGER primary key auto_increment,
    `name` VARCHAR(255) not null,
    `cpf` VARCHAR(11) not null,
    `created_at` timestamp default current_timestamp
);

CREATE TABLE `questions`(
    `question_id` INTEGER primary key auto_increment,
    `question` VARCHAR(255) not null,
    `created_at` timestamp default current_timestamp
);

CREATE TABLE `answers`(
    `answer_id` INTEGER primary key auto_increment,
    `question_id` INTEGER not null,
    `answer` VARCHAR(255) not null,
    `is_correct` BOOLEAN not null default false,
    `created_at` timestamp default current_timestamp
);