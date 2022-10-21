export interface HealthModuleOptions {
  app: string;
  backendUrl: string;
  shouldCheckDatabase?: boolean;
  queueNames?: string[];
}
