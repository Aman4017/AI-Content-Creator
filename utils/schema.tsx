// import { serial } from "drizzle-orm/mysql-core";
import { pgTable, varchar, serial, text } from "drizzle-orm/pg-core";

export const AIOutput = pgTable('aiOutout', {
    id:serial('id').primaryKey(),
    formData:varchar('formData').notNull(),
    aiResponse:text('aiResponse'),
    templateSlug:varchar('templateSlug').notNull(),
    createdBy:varchar('email'),
    createdAt:varchar('createdAt')
})