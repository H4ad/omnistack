export type SetupConfig = {
  nodeEnv: string;
  apiBasePath?: string;
  enableLogging?: boolean;
  rateLimit: {
    windowMs: number;
    maxRequestsPerIp: number;
  }
  sentry?: {
    dns?: string;
  };
  swagger: {
    enabled: boolean;
    title?: string;
    description?: string;
    version?: string;
    tag?: string;
  }
}
