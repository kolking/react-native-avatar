import md5 from 'js-md5';
import { Appearance, ImageSourcePropType, PixelRatio } from 'react-native';

/* istanbul ignore next */
export function debug(...args: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args);
  }
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}

export function colorScheme(lightColor: string, darkColor: string) {
  return Appearance.getColorScheme() === 'dark' ? darkColor : lightColor;
}

export function getGravatarSource(size: number, email: string): ImageSourcePropType {
  const emailHash = md5(email.toLowerCase().trim());
  const pixelSize = PixelRatio.getPixelSizeForLayoutSize(size);

  return {
    uri: `https://www.gravatar.com/avatar/${emailHash}?s=${pixelSize}&d=404`,
  };
}

export function getStringColor(string: string): string {
  let hash = 0;

  if (string.length > 0) {
    for (let i = 0; i < string.length; i += 1) {
      /* eslint-disable no-bitwise */
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
      hash &= hash;
      /* eslint-enable no-bitwise */
    }
  }

  return `hsl(${hash % 360}, 75%, 50%)`;
}

export function getInitials(name: string): string {
  const initials = name.trim().split(/\s+/gu) || [];
  let output = [...(initials.shift() || '')][0];

  if (initials.length > 0) {
    output += [...(initials.pop() || '')][0];
  }

  return output.toUpperCase();
}

export function getBadgeValue(value: number | string | boolean, limit: number) {
  return typeof value === 'number' && limit > 0 && value > limit ? `${limit}+` : value;
}
