import React from 'react';
import { Animated as RNAnimated, PixelRatio, StyleSheet, Text, View } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

const Animated = jest.mocked(RNAnimated);

/**
 * Under test
 */
import Badge, { Props as BadgeProps, BadgePositions } from '../Badge';

const createElement = (props: Partial<BadgeProps>) => <Badge {...props} />;

const createRenderer = (props: Partial<BadgeProps>) => TestRenderer.create(createElement(props));

it('should match snapshot', () => {
  expect(createRenderer({ value: 12 })).toMatchSnapshot();
});

it('should render with a boolean value', () => {
  const { root } = createRenderer({ value: true });
  expect(root.findAllByType(Text).length).toBe(0);
});

it('should render when a value greather than limit', () => {
  const limit = 99;
  const { root } = createRenderer({ value: 100, limit });
  expect(root.findByType(Text).props.children).toBe(`${limit}+`);
});

it('should render customized appearance', () => {
  const props = {
    value: 12,
    size: 24,
    color: 'blue',
    radius: 3,
    style: { minHeight: 5 },
    textStyle: { color: 'red' },
  };
  const { root } = createRenderer(props);
  const wrapper = root.findByType(View);
  const text = root.findByType(Text);

  const fontSize = PixelRatio.roundToNearestPixel(props.size * 0.6);

  expect(wrapper.props.style).toEqual(
    expect.objectContaining({
      height: props.size,
      minWidth: props.size,
      minHeight: props.style.minHeight,
      backgroundColor: props.color,
      borderRadius: props.radius,
    }),
  );

  expect(StyleSheet.flatten(text.props.style)).toEqual(
    expect.objectContaining({
      fontSize,
      color: props.textStyle.color,
      marginHorizontal: fontSize / 2,
    }),
  );
});

Object.values(BadgePositions).map((position) => {
  it(`should render when position = ${position}`, () => {
    const props = { size: 25, value: 12, position, parentSize: 50, parentRadius: 20 };
    const { root } = createRenderer(props);
    const wrapper = root.findByType(View);

    const edgeOffset = props.parentRadius * (1 - Math.sin((45 * Math.PI) / 180));
    const selfOffset = props.size * (0.25 + props.parentRadius / (props.parentSize * 2));
    const offset = PixelRatio.roundToNearestPixel(edgeOffset - selfOffset);
    const [badgeY, badgeX] = position.split('-');

    expect(wrapper.props.style).toEqual(
      expect.objectContaining({
        [badgeY]: offset,
        [badgeX]: offset,
        height: props.size,
        position: 'absolute',
      }),
    );
  });
});

[0, '', false, undefined].map((value) => {
  it(`should not render when value = ${value}`, () => {
    const { root } = createRenderer({ value });
    expect(root.children.length).toBe(0);
  });
});

describe('animation', () => {
  const start = jest.fn();
  const config = {
    toValue: 1,
    friction: 6,
    tension: 50,
    useNativeDriver: true,
  };

  jest.spyOn(Animated, 'spring').mockImplementation(() => ({ start }));

  beforeEach(() => {
    start.mockClear();
  });

  it('should not animate when turned off by the prop', () => {
    const tree = createRenderer({ value: 0, animate: false });

    Animated.spring.mockClear();

    act(() => {
      tree.update(createElement({ value: 1, animate: false }));
    });

    expect(Animated.spring).not.toBeCalled();
  });

  it('should not animate when numeric value changes', () => {
    const tree = createRenderer({ value: 1 });

    Animated.spring.mockClear();

    act(() => {
      tree.update(createElement({ value: 2 }));
    });

    expect(Animated.spring).toBeCalledWith(expect.objectContaining({ _value: 1 }), config);
    expect(Animated.spring).toBeCalledTimes(1);
    expect(start).toBeCalled();
  });

  it('should animate when zero value changes to number', () => {
    const tree = createRenderer({ value: 0 });

    Animated.spring.mockClear();

    act(() => {
      tree.update(createElement({ value: 1 }));
    });

    expect(Animated.spring).toBeCalledWith(expect.objectContaining({ _value: 0 }), config);
    expect(Animated.spring).toBeCalledTimes(1);
    expect(start).toBeCalled();
  });

  it('should animate when empty value changes to string', () => {
    const tree = createRenderer({ value: '' });

    Animated.spring.mockClear();

    act(() => {
      tree.update(createElement({ value: '!' }));
    });

    expect(Animated.spring).toBeCalledWith(expect.objectContaining({ _value: 0 }), config);
    expect(Animated.spring).toBeCalledTimes(1);
    expect(start).toBeCalled();
  });
});
