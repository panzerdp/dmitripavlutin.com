import { shallow } from 'enzyme';

import AboutMetaStructuredData from '../index';

const siteInfo = {
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorInfo = {
  name: 'Dmitri Pavlutin',
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
  email: 'mail@mail.com',
  jobTitle: 'Software developer',
  profiles: {
    stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
    twitter: 'https://twitter.com/panzerdp',
    linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
    github: 'https://github.com/panzerdp',
    facebook: 'https://www.facebook.com/dmitri.pavlutin',
  },
  nicknames: {
    twitter: 'panzerdp',
  },
};

const authorProfilePictureSrc = '/profile.png';

const props = {
  siteInfo,
  authorInfo,
  authorProfilePictureSrc,
};

describe('<AboutMetaStructuredData />', function() {
  it('should render structured data', function() {
    const wrapper = shallow(<AboutMetaStructuredData {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
