import React from 'react';
import { Animated as AnimatedObj } from 'react-native';

// Note: test renderer must be required after react-native.
import TestRenderer, { act } from 'react-test-renderer';

jest.doMock('react-native/Libraries/Animated/Animated', () => {
  const Animated = jest.requireActual('react-native/Libraries/Animated/Animated');

  return {
    ...Animated,
    spring: jest.fn((value: any, { toValue }: any) => {
      value.setValue(toValue);

      return {
        start: jest.fn(),
      };
    }),
  };
});

/**
 * Under test
 */
import { Badge, BadgeProps as Props } from '../';

const Animated: any = AnimatedObj;

const createElement = (props: Partial<Props>) => <Badge {...props} />;

const createRenderer = (props: Partial<Props>) => TestRenderer.create(createElement(props));

it('should render normally', () => {
  expect(createRenderer({ value: 12 })).toMatchSnapshot();
});

it('should render without number', () => {
  expect(createRenderer({ value: true })).toMatchSnapshot();
});

it('should render when greather than limit', () => {
  expect(createRenderer({ value: 500, limit: 99 })).toMatchSnapshot();
});

it('should render with custom props', () => {
  expect(createRenderer({ value: 12, size: 16, borderRadius: 0 })).toMatchSnapshot();
});

it('should not render when value = 0', () => {
  expect(createRenderer({ value: 0 })).toMatchSnapshot();
});

it('should not render when value = undefined', () => {
  expect(createRenderer({})).toMatchSnapshot();
});

describe('animation', () => {
  const start = jest.fn();

  Animated.spring.mockImplementation(() => ({ start }));

  beforeEach(() => {
    start.mockClear();
  });

  it('should not animate', () => {
    const tree = createRenderer({ value: 1 });

    act(() => {});

    Animated.spring.mockClear();

    act(() => {
      tree.update(createElement({ value: 2 }));
    });

    expect(Animated.spring).not.toBeCalled();
  });

  it('should animate appearance', () => {
    const tree = createRenderer({ value: 0 });

    act(() => {});

    Animated.spring.mockClear();

    act(() => {
      tree.update(createElement({ value: 1 }));
    });

    expect(Animated.spring).toBeCalledWith(expect.objectContaining({ _value: 0 }), {
      toValue: 1,
      friction: 6,
      tension: 60,
      useNativeDriver: true,
    });
    expect(start).toBeCalled();
  });
});
