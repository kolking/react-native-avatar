import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import {
  Image,
  ImageStyle,
  ImageSourcePropType,
  StyleSheet,
  StyleProp,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';

import Initials from './Initials';
import Badge, { Props as BadgeProps } from './Badge';
import { clamp, colorScheme, debug, getGravatarSource } from './helpers';

const DEFAULT_COLOR = colorScheme('#aeaeb2', '#636366');
const DEFAULT_SOURCE: ImageSourcePropType = require('./assets/default.png');

export interface Props extends ViewProps {
  size?: number;
  name?: string;
  email?: string;
  source?: ImageSourcePropType;
  defaultSource?: ImageSourcePropType;
  color?: string;
  radius?: number;
  colorize?: boolean;
  style?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  badge?: BadgeProps['value'];
  badgeColor?: BadgeProps['color'];
  badgeProps?: Omit<BadgeProps, 'value' | 'color' | 'parentRadius'>;
}

const Userpic = ({
  size = 50,
  name,
  email,
  source,
  defaultSource = DEFAULT_SOURCE,
  color = DEFAULT_COLOR,
  radius = size / 2,
  colorize = false,
  style,
  textStyle,
  badge,
  badgeColor,
  badgeProps,
  ...props
}: Props) => {
  const avatarSource = useMemo(() => {
    return source || (email ? getGravatarSource(size, email) : defaultSource);
  }, [source, size, email, defaultSource]);

  const [imageSource, setImageSource] = useState(avatarSource);
  const borderRadius = clamp(radius, 0, size / 2);

  useLayoutEffect(() => {
    setImageSource(avatarSource);
  }, [avatarSource]);

  const onImageError = useCallback(() => {
    setImageSource(defaultSource);
  }, [defaultSource]);

  debug('RENDER <Userpic>', name || email || imageSource);

  return (
    <View {...props} style={[styles.root, { width: size, height: size }]}>
      {name && imageSource === defaultSource ? (
        <Initials
          size={size}
          name={name}
          color={color}
          colorize={colorize}
          borderRadius={borderRadius}
          style={style}
          textStyle={textStyle}
        />
      ) : (
        <Image
          style={[styles.image, { borderRadius, backgroundColor: color }, style]}
          source={imageSource}
          onError={onImageError}
        />
      )}
      {badge !== undefined && (
        <Badge
          position="top-right"
          {...badgeProps}
          value={badge}
          color={badgeColor}
          parentRadius={borderRadius}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(Userpic);
