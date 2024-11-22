export namespace MECOM {
    export type HttpMethods = "get" | "post" | "put" | "delete";
  
    export type Timestamps = {
      createdAt: string;
      updatedAt: string;
    };
  
    export type ErrorResponse = {
      message?: string;
      response?: {
        data: {
          message: string;
        };
      };
       
      status?: any;
       
      HttpError?: any;
    };
  
    export type EnvProcess = {
      env: Record<string, string> & {
        NODE_ENV: Environments;
      };
    } & typeof process;
  }
  
  export type Environments = "production" | "staging" | "development";
  
  export type OmitDevEnvironments = Exclude<Environments, "development">;
  
  export type EnvironmentAppStates = "test" | "live";
  
  export type UserRoles = "admin" | "superadmin" | "user" | "moderator";
  