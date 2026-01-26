CREATE TABLE `operations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`u1_id` integer NOT NULL,
	`u2_id` integer NOT NULL,
	`date` text NOT NULL,
	`p_id` integer NOT NULL,
	`time` text NOT NULL,
	FOREIGN KEY (`u1_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`u2_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`p_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`u_id` integer NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`condition` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`u_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`f_name` text NOT NULL,
	`l_name` text NOT NULL,
	`email` text,
	`age` integer NOT NULL,
	`password` text NOT NULL,
	`gender` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);