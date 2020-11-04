import { shallow } from 'enzyme';

import AboutTemplate from '../index';
import AboutMetaTags from 'components/Pages/About/Meta/Tags';
import Layout from 'components/Layout/Fetch';

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  email: 'mail@mail.com',
  nicknames: {
    twitter: 'panzerdp',
  },
  jobTitle: 'Software developer',
  profiles: {
    facebook: 'https://www.facebook.com/dmitri.pavlutin',
    github: 'https://github.com/panzerdp',
    linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
    stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
    twitter: 'https://twitter.com/panzerdp',
  },
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
};

const siteInfo = {
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const props = {
  html: '<div>Some content</div>',
  authorInfo,
  authorProfilePictureSrc: '/picture.jpg',
  siteInfo,
};

describe('<AboutTemplate />', function() {
  it('should render meta information', function() {
    const wrapper = shallow(<AboutTemplate {...props} />);
    expect(wrapper.find(Layout).contains(<AboutMetaTags authorInfo={authorInfo} />)).toBe(true);
  });

  it('should render posts list', () => {
    const wrapper = shallow(<AboutTemplate {...props} />);
    expect(wrapper.find(Layout).contains(<div dangerouslySetInnerHTML={{ __html: props.html }} />)).toBe(true);
  });
});
