import { mount } from 'enzyme';

import withWindowOpen, { WindowOpenOptions } from '../index';

const OpenerWithWindowOpen = withWindowOpen(Opener);

interface OpenerProps {
  options: WindowOpenOptions;
  windowOpen?(options: WindowOpenOptions): void;
}

function Opener({ windowOpen, options }: OpenerProps) {
  return <button onClick={() => windowOpen(options)}>Open the window</button>;
}

describe('withWindowOpen()', function() {
  beforeEach(function() {
    (open as jest.Mock).mockRestore();
  });

  it('should open a browser window', function() {
    const options = {
      url: 'http://dmitripavlutin.com',
      name: 'Twitter',
    };
    const wrapper = mount(<OpenerWithWindowOpen options={options} />);
    wrapper.find('button').simulate('click');
    expect(open).toHaveBeenCalledWith(
      options.url,
      options.name,
      'height=400, width=550, left=237, top=184, location=no, toolbar=no, status=no, directories=no, menubar=no, scrollbars=yes, resizable=no, centerscreen=yes, chrome=yes'
    );
  });

  it('should open a browser window with specified window size', function() {
    const options = {
      url: 'http://dmitripavlutin.com',
      name: 'Twitter',
      width: 100,
      height: 100,
    };
    const wrapper = mount(<OpenerWithWindowOpen options={options} />);
    wrapper.find('button').simulate('click');
    expect(open).toHaveBeenCalledWith(
      options.url,
      options.name,
      'height=100, width=100, left=462, top=334, location=no, toolbar=no, status=no, directories=no, menubar=no, scrollbars=yes, resizable=no, centerscreen=yes, chrome=yes'
    );
  });
});
