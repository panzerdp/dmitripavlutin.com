import { shallow } from 'enzyme';

import StructuredData from '../index';

const siteInfo: SiteInfo = {
  title: 'Dmitri Pavlutin',
  description: 'Thoughts on Frontend development',
  metaTitle: 'Dmitri Pavlutin Blog',
  metaDescription: 'Posts by Dmitri Pavlutin about software development',
  url: 'https://dmitripavlutin.com',
  repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
};

describe('<ExcerptsListStructuredData />', function() {
  it('should render structured data', function() {
    const wrapper = shallow(<StructuredData siteInfo={siteInfo} authorProfilePictureSrc="/image.png" />);
    expect(wrapper).toMatchSnapshot();
  });
});
