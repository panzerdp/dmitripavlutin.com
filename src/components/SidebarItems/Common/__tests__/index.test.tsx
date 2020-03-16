import * as React from 'react';
import { shallow } from 'enzyme';

import SidebarItemsCommon from '../index';
import SubscriptionRegion from 'components/Subscription/Region';
import AboutAuthorFetch from 'components/AboutAuthor/Fetch';
import AboutAuthorDetailed from 'components/AboutAuthor/Detailed';
import AboutAuthorContact from 'components/AboutAuthor/Contact';
import CarbonFetch from 'components/Carbon/Fetch';
import CarbonAd from 'components/Carbon/Ad';

const authorProfilePictureBig: FluidImage = {
  src: 'source',
  base64: 'base64',
  aspectRatio: 2,
  srcSet: 'src-set',
  sizes: 'some sizes',
  srcWebp: 'src-webp',
  srcSetWebp: 'src-set-webp',
};

const authorProfilePictureSmall: FixedImage = {
  width: 100,
  height: 100,
  base64: 'base64-encoded-string',
  src: 'http://images.com/image',
  srcSet: 'some srcset values',
  srcSetWebp: 'src-set-webp',
  srcWebp: 'src-webp',
};

const fetchData = {
  authorInfo: {
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
  },
  authorProfilePictureBig,
  authorProfilePictureSmall,
  authorStats: {
    twitterFollowersCount: '1.1K',
  },
};

const carbonAdsService: CarbonAdsService = {
  isEnabled: true,
  isProductionMode: true,
  scriptSrc: 'http://site.com/script.js',
};

describe('<SidebarItemsCommon />', function() {
  it('should render subscription form', function() {
    const wrapper = shallow(<SidebarItemsCommon />);
    expect(wrapper.find(SubscriptionRegion)).toHaveLength(1);
  });

  it('should render carbon ads', function() {
    const wrapper = shallow(<SidebarItemsCommon />)
      .find(CarbonFetch)
      .renderProp('render')(carbonAdsService);
    expect(wrapper.find(<CarbonAd carbonAdsService={carbonAdsService} />));
  });

  it('should render about author info', function() {
    const wrapper = shallow(<SidebarItemsCommon />);
    const authorWrapper = wrapper.find(AboutAuthorFetch).renderProp('render')(fetchData);
    expect(
      authorWrapper.contains(
        <AboutAuthorDetailed authorInfo={fetchData.authorInfo} authorProfilePicture={authorProfilePictureBig} />
      )
    );
    expect(authorWrapper.contains(<AboutAuthorContact authorInfo={fetchData.authorInfo} />));
    expect(authorWrapper.contains(<AboutAuthorContact authorInfo={fetchData.authorInfo} />));
  });
});
