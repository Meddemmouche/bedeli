PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`u_id` integer NOT NULL,
	`title` text NOT NULL,
	`slug` text,
	`description` text NOT NULL,
	`condition` text NOT NULL,
	`category` text NOT NULL,
	`image` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`u_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "u_id", "title", "slug", "description", "condition", "category", "image", "created_at") SELECT "id", "u_id", "title", "slug", "description", "condition", "category", "image", "created_at" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);