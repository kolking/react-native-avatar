import React, { useEffect, useMemo, useRef } from 'react';
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

import { clamp, debug, getBadgeValue } from './helpers';

const MIN_SIZE = 15;
const MAX_SIZE = 45;

export enum BadgePositions {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
}

export interface Props extends ViewProps {
  size?: number;
  color?: string;
  radius?: number;
  animate?: boolean;
  value?: number | string | boolean;
  limit?: number;
  parentRadius?: number;
  position?: `${BadgePositions}`;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Badge = ({
  size = 20,
  color = '#ff3b30',
  radius,
  animate = true,
  value,
  limit = 99,
  parentRadius = 0,
  position,
  style,
  textStyle,
  ...props
}: Props) => {
  const toValue = value ? 1 : 0;
  const animatedValue = useRef(new Animated.Value(toValue)).current;
  const hasContent = typeof value === 'number' || typeof value === 'string';
  const height = hasContent ? clamp(size, MIN_SIZE, MAX_SIZE) : styles.root.minHeight;

  useEffect(() => {
    if (animate) {
      if (toValue === 1) {
        Animated.spring(animatedValue, {
          toValue,
          tension: 50,
          friction: 6,
          useNativeDriver: true,
        }).start();
      } else {
        animatedValue.setValue(0);
      }
    }
  }, [animate, animatedValue, toValue]);

  const offset = useMemo(() => {
    // We want to place the badge at the point with polar coordinates (r,45°)
    // thus we need to find the distance from the containing square top right corner
    // which can be calculated as x = r - r × sin(45°)
    // Self offset is how much we’ll shift the badge from the edge point,
    // its value ranges from height / 4 (square) to height / 2 (circle)
    const edgeOffset = parentRadius * (1 - Math.sin((45 * Math.PI) / 180));
    const selfOffset = (1 + clamp(parentRadius / height, 0, 1)) * (height / 4);

    return PixelRatio.roundToNearestPixel(edgeOffset - selfOffset);
  }, [height, parentRadius]);

  if (!value) {
    return null;
  }

  let content = null;

  if (hasContent) {
    const fontSize = PixelRatio.roundToNearestPixel(height * 0.6);
    const textStyles = {
      ...styles.text,
      fontSize,
      marginHorizontal: fontSize / 2,
    };

    content = (
      <Text style={[textStyles, textStyle]} numberOfLines={1} ellipsizeMode="clip">
        {getBadgeValue(value, limit)}
      </Text>
    );
  }

  const rootStyles: Animated.AnimatedProps<ViewStyle[]> = [
    {
      ...styles.root,
      height,
      minWidth: height,
      backgroundColor: color,
      borderRadius: radius ?? height / 2,
      transform: [{ scale: animatedValue }],
    },
  ];

  if (position) {
    const [badgeY, badgeX] = position.split('-');
    rootStyles.push({
      ...styles.position,
      [badgeY]: offset,
      [badgeX]: offset,
    });
  }

  debug('RENDER <Badge>', value);

  return (
    <Animated.View {...props} style={[rootStyles, style]}>
      {content}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    minHeight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    zIndex: 1,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
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

export default React.memo(Badge);
