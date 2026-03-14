import { boolean, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 80 }).notNull(),
  phone: varchar('phone', { length: 30 }).notNull(),
  email: varchar('email', { length: 160 }),
  source: varchar('source', { length: 40 }).notNull().default('landing'),
  note: text('note'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const consultationRequests = pgTable('consultation_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  leadId: uuid('lead_id').references(() => leads.id),
  desiredDate: varchar('desired_date', { length: 60 }),
  productType: varchar('product_type', { length: 120 }).notNull(),
  budgetRange: varchar('budget_range', { length: 120 }),
  details: text('details'),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  category: varchar('category', { length: 80 }).notNull(),
  description: text('description'),
  active: boolean('active').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const experiments = pgTable('experiments', {
  id: uuid('id').defaultRandom().primaryKey(),
  key: varchar('key', { length: 100 }).notNull(),
  hypothesis: text('hypothesis').notNull(),
  status: varchar('status', { length: 20 }).notNull().default('draft'),
  owner: varchar('owner', { length: 80 }),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const pageEvents = pgTable('page_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  event: varchar('event', { length: 100 }).notNull(),
  path: varchar('path', { length: 255 }).notNull(),
  leadId: uuid('lead_id').references(() => leads.id),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
