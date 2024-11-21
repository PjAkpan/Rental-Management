import {
    Environments,
    MECOM,
    OmitDevEnvironments,
  } from "../types";
  import { config } from "dotenv";
  import process from "process";
  
  config();
  
  const {
    env: {
      NODE_ENV,
      TOKEN_REFRESH_EXPIRATION,
      TOKEN_EXPIRATION_TIME,
      // APP
      DB_STAGING,
      DB_PROD,
      DB_DEV,
      BACKEND_LOCAL_PORT,
      PRODUCTION_EMAIL_FROM_ADDR,
      PRODUCTION_EMAIL_SERVER,
      PRODUCTION_EMAIL_USERNAME,
      PRODUCTION_EMAIL_PASSWORD,
      STAGING_EMAIL_FROM_ADDR,
      STAGING_EMAIL_SERVER,
      STAGING_EMAIL_USERNAME,
      STAGING_EMAIL_PASSWORD,
      APP_OWNER,
      APP_TYPE,
      PRODUCTION_PASSWORD_ENCRYPTION_SALT,
      PRODUCTION_LOGIN_TOKEN_SECRET,
      PRODUCTION_VERIFICATION_TOKEN_SECRET,
      PRODUCTION_ACCESS_TOKEN_SECRET,
      STAGING_LOGIN_TOKEN_SECRET,
      STAGING_PASSWORD_ENCRYPTION_SALT,
      STAGING_VERIFICATION_TOKEN_SECRET,
      STAGING_ACCESS_TOKEN_SECRET,
  
      //IP BYPASS
      API_ACCESS_KEY,
  
    },
  } = process as MECOM.EnvProcess;
  
  const environment = NODE_ENV;
  
  
  
  
  const databaseUrls: Record<OmitDevEnvironments, string> = {
    production: DB_PROD,
    staging: DB_STAGING,
  };
  
  const databasesUrls: Record<Environments, string> = {
    production: DB_PROD,
    staging: DB_STAGING,
    development: DB_DEV,
  };
  
  const frontendUrls: (port?: number) => Record<Environments, string> = (
    port = 8100
  ) => ({
    production: "https://www.mbokconnect.com",
    development: `http://localhost:${port}`,
    staging: "https://mecom-jpmy.vercel.app",
  });
  
  const backendUrls: (port?: number) => Record<Environments, string> = (
    port = 7000
  ) => ({
    production: "https://loudinsight.com/api/",
    development: `http://localhost:${port}/api/`,
    staging: "https://staging.loudinsight.com/api/",
  });
  
  const appUrls = {
    backendPort: BACKEND_LOCAL_PORT,
    frontendUrl: frontendUrls(Number.parseInt(BACKEND_LOCAL_PORT))[environment],
    backendUrl: backendUrls()[environment],
  };
  
  const mailerDetails: Record<
    OmitDevEnvironments,
    Record<"fromAddress" | "server" | "username" | "password", string>
  > = {
    production: {
      fromAddress: PRODUCTION_EMAIL_FROM_ADDR,
      server: PRODUCTION_EMAIL_SERVER,
      username: PRODUCTION_EMAIL_USERNAME,
      password: PRODUCTION_EMAIL_PASSWORD,
    },
    staging: {
      fromAddress: STAGING_EMAIL_FROM_ADDR,
      server: STAGING_EMAIL_SERVER,
      username: STAGING_EMAIL_USERNAME,
      password: STAGING_EMAIL_PASSWORD,
    },
  };
  
  const appDetails: Record<"appOwner" | "appType" | "ipBypass", string> = {
    appOwner: APP_OWNER,
    appType: APP_TYPE,
    ipBypass: API_ACCESS_KEY
  };
  
  const appSecrets: Record<
    OmitDevEnvironments,
    Record<
      | "loginTokenSecret"
      | "passwordEncryptionSalt"
      | "verificationTokenSecret"
      | "accessTokenSecret" | "refreshExpireTime" | "expireTime",
      string
    >
  > = {
    production: {
      accessTokenSecret: PRODUCTION_ACCESS_TOKEN_SECRET,
      loginTokenSecret: PRODUCTION_LOGIN_TOKEN_SECRET,
      passwordEncryptionSalt: PRODUCTION_PASSWORD_ENCRYPTION_SALT,
      verificationTokenSecret: PRODUCTION_VERIFICATION_TOKEN_SECRET,
      refreshExpireTime: TOKEN_REFRESH_EXPIRATION,
      expireTime: TOKEN_EXPIRATION_TIME,
    },
    staging: {
      accessTokenSecret: STAGING_ACCESS_TOKEN_SECRET,
      loginTokenSecret: STAGING_LOGIN_TOKEN_SECRET,
      passwordEncryptionSalt: STAGING_PASSWORD_ENCRYPTION_SALT,
      verificationTokenSecret: STAGING_VERIFICATION_TOKEN_SECRET,
      refreshExpireTime: TOKEN_REFRESH_EXPIRATION,
      expireTime: TOKEN_EXPIRATION_TIME,
    },
  };
  

  
  
  export const env = {
    databaseUrls,
    databasesUrls,
    appUrls,
    mailerDetails,
    environment,
    appDetails,
    appSecrets
  };
  
  
  