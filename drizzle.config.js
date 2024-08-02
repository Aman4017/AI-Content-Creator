/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:vKNI14gbieun@ep-rough-mountain-a5z0bgmh.us-east-2.aws.neon.tech/AI-Content-Generator?sslmode=require',
    }
  };