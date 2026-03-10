const ENV = {
    PORT: Number(process.env.PORT || 4000),
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    
};

export default ENV;
