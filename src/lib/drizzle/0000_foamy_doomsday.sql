CREATE TABLE `exercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`img_url` text,
	`muscle_group` text NOT NULL,
	`routine_id` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routine`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `routine` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `set` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer,
	`workout_id` integer,
	`weight` integer NOT NULL,
	`reps` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE cascade ON DELETE cascade,
	FOREIGN KEY (`workout_id`) REFERENCES `workout`(`id`) ON UPDATE cascade ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `workout` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`routine_id` integer,
	`completed_at` integer,
	FOREIGN KEY (`routine_id`) REFERENCES `routine`(`id`) ON UPDATE cascade ON DELETE cascade
);
