import Img from 'gatsby-image';
import { shallow } from 'enzyme';

import { Header } from '../index';
import { TO_ABOUT_ME, TO_ALL_POSTS, TO_INDEX, TO_SEARCH } from 'routes/path';

const authorInfo: AuthorInfo = {
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

const siteInfo: SiteInfo = {
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

const authorProfilePicture: FixedImage = {
  width: 100,
  height: 100,
  base64: 'base64-encoded-string',
  src: 'http://images.com/image',
  srcSet: 'some srcset values',
  srcSetWebp: 'src-set-webp',
  srcWebp: 'src-webp',
};

const props = {
  authorInfo,
  authorProfilePicture,
  siteInfo,
};

describe('<LayoutHeader />', function() {
  it('should render author name', function() {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.text()).toContain(authorInfo.name);
    expect(wrapper.text()).toContain(siteInfo.description);
  });

  it('should render navigation links', function() {
    const wrapper = shallow(<Header {...props} />);
    [{ to: TO_INDEX() }, { to: TO_ABOUT_ME() }, { to: TO_ALL_POSTS() }, { to: TO_SEARCH() }].forEach((linkProps) =>
      expect(wrapper.find(linkProps).length).toBeGreaterThanOrEqual(1)
    );
  });

  it('should render profile picture', function() {
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.find({ fixed: authorProfilePicture }).is(Img)).toBe(true);
  });
});
