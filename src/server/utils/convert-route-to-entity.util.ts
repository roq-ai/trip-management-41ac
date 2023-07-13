const mapping: Record<string, string> = {
  bookings: 'booking',
  organizations: 'organization',
  'travel-plans': 'travel_plan',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
