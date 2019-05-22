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
  speciality: string;
  profiles: Profiles;
  nicknames: Nicknames;
}

interface SiteInfo {
  title: string;
  description: string;
  url: string;
  repositoryUrl: string;
}
