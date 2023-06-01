import React, { useEffect, useState } from 'react';
import {
  Animated,
  PixelRatio,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { clamp, getRadius } from './helpers';

const minSize = 15;
const maxSize = 40;

export interface BadgeProps extends ViewProps {
  size?: number;
  color?: string;
  borderRadius?: number | string;
  animate?: boolean;
  value?: number | boolean | string;
  limit?: number | boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Badge: React.FC<BadgeProps> = ({
  size = 20,
  color = '#ff3b30',
  borderRadius = '50%',
  animate = true,
  value,
  limit = 99,
  style,
  textStyle,
  ...props
}) => {
  const toValue = value ? 1 : 0;
  const [animatedValue] = useState(() => new Animated.Value(toValue));

  useEffect(() => {
    Animated.spring(animatedValue, {
      tension: 60,
      friction: 6,
      toValue: toValue,
      useNativeDriver: true,
    }).start();
  }, [animatedValue, toValue]);

  if (!value) {
    return null;
  }

  let content = null;
  let height = styles.root.minHeight;

  if (typeof value === 'number' || typeof value === 'string') {
    height = clamp(Math.round(size), minSize, maxSize);

    const fontSize = PixelRatio.roundToNearestPixel(height * 0.6);
    const displayValue = typeof value === 'number' && typeof limit === 'number' && value > limit ? `${limit}+` : value;
    const textStyles = [
      {
        fontSize,
        marginHorizontal: fontSize / 2,
      },
      styles.text,
      textStyle,
    ];

    content = (
      <Text style={textStyles} numberOfLines={1}>
        {displayValue}
      </Text>
    );
  }

  const rootStyles = [
    {
      height,
      minWidth: height,
      backgroundColor: color,
      borderRadius: getRadius(borderRadius, height),
    },
    styles.root,
    style,
  ];

  if (animate) {
    rootStyles.push({ transform: [{ scale: animatedValue as any }] });
  }

  return (
    <Animated.View {...props} style={rootStyles}>
      {content}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '400',
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
  },
});
