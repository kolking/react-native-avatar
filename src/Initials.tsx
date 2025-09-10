import React, { useMemo } from 'react';
import { PixelRatio, StyleSheet, StyleProp, Text, TextStyle, View, ViewProps } from 'react-native';

import { getInitials, getStringColor } from './helpers';

interface Props extends ViewProps {
  size: number;
  name: string;
  color: string;
  colorize: boolean;
  borderRadius: number;
  textStyle?: StyleProp<TextStyle>;
}

const Initials = ({ size, name, color, colorize, borderRadius, style, textStyle }: Props) => {
  const fontSize = PixelRatio.roundToNearestPixel(size / 2.5);
  const [initials, backgroundColor] = useMemo(
    () => [getInitials(name), colorize ? getStringColor(name) : color],
    [name, color, colorize],
  );

  return (
    <View style={[styles.root, { borderRadius, backgroundColor }, style]}>
      <Text
        style={[styles.text, { fontSize }, textStyle]}
        numberOfLines={1}
        allowFontScaling={false}
      >
        {initials}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontFamily: 'System',
    includeFontPadding: false,
    textAlignVertical: 'center',
    backgroundColor: 'transparent',
  },
});

export default Initials;
