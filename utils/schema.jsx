import { relations } from "drizzle-orm";

const { pgTable, serial, varchar, text, integer } = require("drizzle-orm/pg-core");

export const userinfo = pgTable('userInfo', {
    id:serial('id').primaryKey(),
    logo:varchar('logo'),
    name:varchar('name').notNull(),
    email:varchar('email').notNull(),
    username:varchar('username').notNull(),
    bio:text('bio'),
    location:varchar('location'),
    link:varchar('link'),
    github:varchar('github'),
    linkedin:varchar('linkedin'),
    twitter:varchar('twitter'),
    theme:varchar('theme').default('light')
})


export const project = pgTable('projects', {
    id:serial('id').primaryKey(),
    name:varchar('name'),
    desc:text('desc'),
    url:varchar('url').notNull(),
    logo:varchar('logo'),
    banner:varchar('banner'),
    emailRef:varchar('emailRef'),
    category:varchar('category'),
    userRef:integer('userRef').references(() => userinfo?.id)

})


export const ProjectClicks = pgTable('projectClicks', {
    id: serial('id').primaryKey(),
    projectRef:integer('projectRef').references(() => project.id),
    month: varchar('month')
})


export const userProjectRelation = relations(userinfo,({many}) =>(
    {
        project:many(project)
    }
))

export const postRelation = relations(project,({one}) => (
    {
        user:one(userinfo,{fields: [project.userRef], references: [userinfo.id]})
    }
))