interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: ['End Customer'],
  tenantRoles: ['Travel Planner', 'Customer Service Representative', 'Business Owner'],
  tenantName: 'Organization',
  applicationName: 'Trip Management Application',
  addOns: ['chat', 'notifications', 'file'],
};
