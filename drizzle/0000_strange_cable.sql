CREATE TABLE `otps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`otp` integer NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`vendor` text DEFAULT 'Swiggy' NOT NULL,
	`claimedBy` text
);
