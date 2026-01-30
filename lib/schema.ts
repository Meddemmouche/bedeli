import { create } from "domain";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  f_name: text("f_name").notNull(),
  l_name: text("l_name").notNull(),
  email: text("email").unique(),
  age: integer("age").notNull(),
  password: text("password").notNull(),
  gender: text("gender").notNull(),
});

export const products = sqliteTable("products", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    u_id: integer("u_id").references(() => users.id).notNull(),
    title: text("title").notNull(),
    slug: text('slug').unique(),
    description: text("description").notNull(),
    condition: text("condition").notNull(),
    category: text("category").notNull(),
    imageUrl: text("image").notNull(),
    createdAt: text("created_at").notNull(),
});

export const operations = sqliteTable("operations", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    u1_id: integer("u1_id").references(() => users.id).notNull(),
    u2_id: integer("u2_id").references(() => users.id).notNull(),
    date: text("date").notNull(),
    p_id: integer("p_id").references(() => products.id).notNull(),
    time: text("time").notNull(),
});

export const proposals = sqliteTable('proposals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  
  // Who initiated the proposal
  fromUserId: integer('from_user_id').references(() => users.id).notNull(),
  toUserId: integer('to_user_id').references(() => users.id).notNull(),
  
  // What items are being exchanged
  fromProductId: integer('from_product_id').references(() => products.id).notNull(),
  toProductId: integer('to_product_id').references(() => products.id).notNull(),
  
  // Optional: User can offer multiple items or add message
  message: text('message'),
  
  // Status: pending, accepted, rejected, completed, cancelled
  status: text('status').notNull().default('pending'),
  
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Messages within a proposal (negotiation)
export const proposalMessages = sqliteTable('proposal_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  proposalId: integer('proposal_id').references(() => proposals.id).notNull(),
  senderId: integer('sender_id').references(() => users.id).notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(),
});