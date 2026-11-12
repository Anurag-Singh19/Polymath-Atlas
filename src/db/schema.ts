import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import type { SkillNode } from '../types/curriculum.ts';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  completedTopicIds: jsonb('completed_topic_ids')
    .$type<Record<string, boolean>>()
    .default({})
    .notNull(),
  masteredCardIds: jsonb('mastered_card_ids')
    .$type<Record<string, boolean>>()
    .default({})
    .notNull(),
  bookmarkedItems: jsonb('bookmarked_items')
    .$type<Record<string, boolean>>()
    .default({})
    .notNull(),
  customSkills: jsonb('custom_skills')
    .$type<SkillNode[]>()
    .default([])
    .notNull(),
  demoPolymathMode: boolean('demo_polymath_mode').default(false).notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  progress: one(userProgress, {
    fields: [users.id],
    references: [userProgress.userId],
  }),
}));

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  user: one(users, {
    fields: [userProgress.userId],
    references: [users.id],
  }),
}));
