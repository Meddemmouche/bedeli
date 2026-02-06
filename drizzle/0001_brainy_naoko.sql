ALTER TABLE `products` ADD `slug` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `products_slug_unique` ON `products` (`slug`);