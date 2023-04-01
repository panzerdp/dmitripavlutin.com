interface Profiles {
  stackoverflow: string;
  twitter: string;
  linkedin: string;
  github: string;
  facebook: string;
  [index: string]: string;
}

interface Nicknames {
  twitter: string;
}

interface AuthorInfo {
  name: string;
  description: string;
  email: string;
  jobTitle: string;
  profiles: Profiles;
  nicknames: Nicknames;
}

interface SiteInfo {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  url: string;
  repositoryUrl: string;
}

interface EmailSubscriptionService {
  endpoint: string;
}

interface CarbonAdsService {
  scriptSrc: string;
  isEnabled: boolean;
  isProductionMode: boolean;
}
