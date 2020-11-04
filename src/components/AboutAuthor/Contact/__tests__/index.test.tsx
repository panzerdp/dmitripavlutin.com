import { shallow } from 'enzyme';

import AboutAuthorContact from '../index';

const authorInfo: AuthorInfo = {
  name: 'Dmitri Pavlutin',
  email: 'mail@mail.com',
  jobTitle: 'Software Developer',
  nicknames: {
    twitter: 'panzerdp',
  },
  profiles: {
    facebook: 'https://www.facebook.com/dmitri.pavlutin',
    github: 'https://github.com/panzerdp',
    linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
    stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
    twitter: 'https://twitter.com/panzerdp',
  },
  description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
};

describe('<PostAboutAuthorContact />', function() {
  it('should render send email anchor', function() {
    const wrapper = shallow(<AboutAuthorContact authorInfo={authorInfo} />);
    expect(wrapper.find(`a[href="mailto:${authorInfo.email}"]`).length).toBeGreaterThanOrEqual(1);
  });
});
