import React, { useCallback, useEffect, useMemo, useState } from 'react';
import md5 from 'js-md5';
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  PixelRatio,
  StyleSheet,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

import { Badge, BadgeProps } from './Badge';
import { getInitials, getStringColor, getRadius, useLayout, colorScheme } from './helpers';

export interface UserpicProps extends ViewProps {
  size?: number;
  borderRadius?: number | string;
  name?: string;
  email?: string;
  colorize?: boolean;
  source?: ImageSourcePropType;
  defaultSource?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  badge?: BadgeProps['value'];
  badgeColor?: BadgeProps['color'];
  badgeProps?: Omit<BadgeProps, 'value' | 'color'>;
  badgePosition?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
}

export const Userpic: React.FC<UserpicProps> = ({
  size = 50,
  borderRadius = '50%',
  name,
  email,
  colorize = false,
  source,
  defaultSource = require('./assets/default.png'),
  style,
  textStyle,
  imageStyle,
  badge,
  badgeColor,
  badgeProps,
  badgePosition = 'top-right',
  ...props
}) => {
  const getImageSource = useCallback(() => {
    if (source) {
      return source;
    } else if (email) {
      const emailHash = md5(email.toLowerCase().trim());
      const pixelSize = PixelRatio.getPixelSizeForLayoutSize(size);

      return { uri: `https://www.gravatar.com/avatar/${emailHash}?s=${pixelSize}&d=404` };
    }

    return defaultSource;
  }, [source, email, size, defaultSource]);

  const [{ height: badgeHeight }, onBadgeLayout] = useLayout({ height: 10 });
  const [{ height: imageHeight }, onImageLayout] = useLayout({ height: size });
  const [imageSource, setImageSource] = useState(getImageSource);

  useEffect(() => {
    setImageSource(getImageSource());
  }, [getImageSource, setImageSource]);

  const onError = useCallback(() => setImageSource(defaultSource), [defaultSource]);

  const initials = useMemo(
    () =>
      name &&
      imageSource === defaultSource && {
        color: colorize ? getStringColor(name) : undefined,
        text: getInitials(name),
      },
    [name, colorize, imageSource, defaultSource],
  );

  const radius = getRadius(borderRadius, size);

  const badgeOffset = useMemo(() => {
    // We want to place the badge at the point with polar coordinates (r,45°)
    // thus we need to find the distance from the containing square top right corner
    // which can be calculated as x = r - r × sin(45°)
    // Self offset is how much we’ll shift the badge from the edge point,
    // its value ranges from badgeHeight / 4 (square) to badgeHeight / 2 (circle)
    const selfOffset = badgeHeight * (0.25 + radius / (size * 2));
    const edgeOffset = radius * (1 - Math.sin((45 * Math.PI) / 180));

    return PixelRatio.roundToNearestPixel(edgeOffset - selfOffset);
  }, [badgeHeight, radius, size]);

  const rootStyles = [
    {
      width: size,
      height: size,
      borderRadius: radius,
    },
    styles.root,
    style,
  ];

  let content = [];

  if (initials) {
    const fontSize = PixelRatio.roundToNearestPixel(size / 2.5);

    content.push(
      <Text key="text" style={[{ fontSize }, styles.text, textStyle]} numberOfLines={1}>
        {initials.text}
      </Text>,
    );

    if (initials.color) {
      rootStyles.push({ backgroundColor: initials.color });
    }
  } else {
    const imageRadius = radius - (size - imageHeight) / 2;

    content.push(
      <Image
        key="image"
        style={[{ borderRadius: imageRadius }, styles.image, imageStyle]}
        source={imageSource}
        onLayout={onImageLayout}
        onError={onError}
      />,
    );
  }

  if (badge) {
    const [badgeY, badgeX] = badgePosition.split('-');
    const badgeStyles = [
      {
        [badgeY]: badgeOffset,
        [badgeX]: badgeOffset,
      },
      styles.badge,
      badgeProps?.style,
    ];

    content.push(
      <Badge
        key="badge"
        value={badge}
        color={badgeColor}
        {...badgeProps}
        style={badgeStyles}
        onLayout={onBadgeLayout}
      />,
    );
  }

  return (
    <View {...props} style={rootStyles}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorScheme('#aeaeb2', '#636366'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontWeight: '700',
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
    color: '#fff',
  },
  badge: {
    zIndex: 1,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
});
