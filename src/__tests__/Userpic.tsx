import React from 'react';
import { Image } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

/**
 * Under test
 */
import { Userpic, UserpicProps as Props } from '../';
import { Badge } from '../Badge';

jest.mock('../Badge', () => ({ Badge: 'Badge' }));

const createElement = (props: Partial<Props>) => <Userpic {...props} />;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render default image', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

it('should render image', () => {
  const tree = createRenderer({});

  act(() => {
    tree.update(createElement({ source: { uri: 'image.png' } }));
  });

  expect(tree).toMatchSnapshot();
});

it('should render image as square', () => {
  const tree = createRenderer({ borderRadius: 0, source: { uri: 'image.png' } });

  act(() => {});

  expect(tree).toMatchSnapshot();
});

it('should render gravatar', () => {
  const tree = createRenderer({});

  act(() => {
    tree.update(createElement({ email: 'user@email.com' }));
  });

  expect(tree).toMatchSnapshot();
});

it('should render initials', () => {
  const tree = createRenderer({});

  act(() => {
    tree.update(createElement({ name: 'User Name', colorize: true }));
  });

  expect(tree).toMatchSnapshot();
});

it('should fallback to initials', () => {
  const tree = createRenderer({});

  act(() => {
    tree.update(createElement({ name: 'User Name', email: 'user@email.com' }));
  });

  const image = tree.root.findByType(Image);

  act(() => image.props.onError());

  expect(tree).toMatchSnapshot();
});

it('should render default image if no image', () => {
  const tree = createRenderer({
    source: { uri: 'image.png' },
    defaultSource: { uri: 'default.png' },
  });

  act(() => {});

  const image = tree.root.findByType(Image);

  act(() => image.props.onError());

  expect(tree).toMatchSnapshot();
});

it('should render default image if no gravatar', () => {
  const tree = createRenderer({
    email: 'user@email.com',
    defaultSource: { uri: 'default.png' },
  });

  act(() => {});

  const image = tree.root.findByType(Image);

  act(() => image.props.onError());

  expect(tree).toMatchSnapshot();
});

it('should render default image if empty name', () => {
  const tree = createRenderer({ name: '', defaultSource: { uri: 'default.png' } });

  act(() => {});

  const image = tree.root.findByType(Image);

  act(() => image.props.onError());

  expect(tree).toMatchSnapshot();
});

it('should render as rounded square', () => {
  const size = 50;
  const tree = createRenderer({ size, borderRadius: 10 });

  act(() => {});

  const height = size - 10;
  const { onLayout } = tree.root.findByType(Image).props;

  act(() => {
    onLayout({ nativeEvent: { layout: { height } } });
  });

  expect(tree).toMatchSnapshot();
});

const badgePositions: Props['badgePosition'][] = [
  'top-right',
  'bottom-right',
  'bottom-left',
  'top-left',
];

badgePositions.forEach((badgePosition) => {
  it(`should render as circle with ${badgePosition} badge`, () => {
    const tree = createRenderer({ badgePosition, badge: 1 });

    act(() => {});

    const height = 20;
    const { onLayout } = tree.root.findByType(Badge).props;

    act(() => {
      onLayout({ nativeEvent: { layout: { height } } });
    });

    expect(tree).toMatchSnapshot();
  });

  it(`should render as square with ${badgePosition} badge`, () => {
    const tree = createRenderer({ badgePosition, badge: 1, borderRadius: 0 });

    act(() => {});

    const height = 20;
    const { onLayout } = tree.root.findByType(Badge).props;

    act(() => {
      onLayout({ nativeEvent: { layout: { height } } });
    });

    expect(tree).toMatchSnapshot();
  });
});
