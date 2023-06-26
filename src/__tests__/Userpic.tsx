import React from 'react';
import { Image, PixelRatio, StyleSheet, Text, View } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

/**
 * Under test
 */
import { Userpic, UserpicProps } from '../';
import { getGravatarSource, getInitials, getStringColor } from '../helpers';

const createElement = (props: Partial<UserpicProps>) => <Userpic {...props} />;

const createRenderer = (props: Partial<UserpicProps>) => TestRenderer.create(createElement(props));

it('should match snapshot', () => {
  expect(createRenderer({ badge: 35 })).toMatchSnapshot();
});

it('should render network image', () => {
  const source = { uri: 'image.png' };
  const { root } = createRenderer({ source });

  expect(root.findByType(Image).props.source).toStrictEqual(source);
});

it('should render local image', () => {
  const source = require('../assets/custom.png');
  const { root } = createRenderer({ source });

  expect(root.findByType(Image).props.source).toStrictEqual(source);
});

it('should update image source', () => {
  const source1 = { uri: 'image.png' };
  const source2 = { uri: 'new-image.png' };
  const tree = createRenderer({ source: source1 });

  expect(tree.root.findByType(Image).props.source).toStrictEqual(source1);

  act(() => {
    tree.update(createElement({ source: source2 }));
  });

  expect(tree.root.findByType(Image).props.source).toStrictEqual(source2);
});

it('should render gravatar', () => {
  const size = 35;
  const email = 'user@email.com';
  const source = getGravatarSource(size, email);
  const { root } = createRenderer({ size, email });

  expect(root.findByType(Image).props.source).toStrictEqual(source);
});

it('should render 2-letters initials', () => {
  const size = 35;
  const name = 'User Name';
  const textStyle = { color: 'red' };
  const { root } = createRenderer({ size, name, textStyle, colorize: true });

  const text = root.findByType(Text);

  expect(text.props.children).toBe(getInitials(name));
  expect(StyleSheet.flatten(text.props.style)).toEqual(
    expect.objectContaining({
      ...textStyle,
      fontSize: PixelRatio.roundToNearestPixel(size / 2.5),
    }),
  );
  expect(StyleSheet.flatten(text.parent?.props.style)).toEqual(
    expect.objectContaining({
      backgroundColor: getStringColor(name),
    }),
  );
});

it('should render 1-letter initials', () => {
  const name = 'Username';
  const color = 'blue';
  const { root } = createRenderer({ name, color, colorize: false });

  const text = root.findByType(Text);

  expect(text.props.children).toBe(getInitials(name));
  expect(StyleSheet.flatten(text.parent?.props.style)).toEqual(
    expect.objectContaining({
      backgroundColor: color,
    }),
  );
});

it('should render initials if source fails', () => {
  const name = 'User Name';
  const source = { uri: 'image.png' };
  const { root } = createRenderer({ name, source });

  const image = root.findByType(Image);

  act(() => image.props.onError());

  expect(root.findByType(Text).props.children).toBe(getInitials(name));
});

it('should render initials if gravatar fails', () => {
  const name = 'User Name';
  const email = 'user@email.com';
  const { root } = createRenderer({ name, email });

  const image = root.findByType(Image);

  act(() => image.props.onError());

  expect(root.findByType(Text).props.children).toBe(getInitials(name));
});

it('should render default image if source fails', () => {
  const source = { uri: 'image.png' };
  const defaultSource = { uri: 'default.png' };
  const { root } = createRenderer({ source, defaultSource });

  const image = root.findByType(Image);

  act(() => image.props.onError());

  expect(image.props.source).toStrictEqual(defaultSource);
});

it('should render default image if gravatar fails', () => {
  const email = 'user@email.com';
  const defaultSource = { uri: 'default.png' };
  const { root } = createRenderer({ email, defaultSource });

  const image = root.findByType(Image);

  act(() => image.props.onError());

  expect(image.props.source).toStrictEqual(defaultSource);
});

it('should render default image if name is empty', () => {
  const name = '';
  const defaultSource = { uri: 'default.png' };
  const { root } = createRenderer({ name, defaultSource });

  const image = root.findByType(Image);

  expect(image.props.source).toStrictEqual(defaultSource);
});

it('should render badge', () => {
  const badge = 35;
  const { root } = createRenderer({ badge });

  expect(root.findByType(Text).props.children).toBe(badge);
});

it('should render customized appearance', () => {
  const props = {
    size: 35,
    color: 'blue',
    radius: 15,
    style: { borderWidth: 3, borderColor: 'purple' },
  };
  const { root } = createRenderer(props);
  const wrapper = root.findByType(View);
  const image = root.findByType(Image);

  expect(StyleSheet.flatten(wrapper.props.style)).toEqual(
    expect.objectContaining({
      width: props.size,
      height: props.size,
    }),
  );

  expect(StyleSheet.flatten(image.props.style)).toEqual(
    expect.objectContaining({
      ...props.style,
      backgroundColor: props.color,
      borderRadius: props.radius,
    }),
  );
});
