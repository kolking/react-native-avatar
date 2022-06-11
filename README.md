# React Native Userpic

Full featured and highly customizable React Native component to display user avatars. The component allows you to show gravatar images, fallback to user's initials, fine tune shape and size, add badges and custom statuses to avatar image.

---

<img width="200" align="left" src="https://user-images.githubusercontent.com/4656448/173195684-55d89be7-7037-4050-a5e3-6beb85b38b7b.png" />

**Shape that fits your design**  
Square, circle, rounded borders. For your convenience, the `borderRadius` prop supports percent values just like in CSS.

---

<img width="200" align="left" src="https://user-images.githubusercontent.com/4656448/173195937-eb636936-181d-4acb-b404-c851ddeb9d1a.png" />

**Custom fallback image or even emoji**  
For users without an image you can leave the default profile icon, or use your own fallback image, or even show an emoji.

---

<img width="200" align="left" src="https://user-images.githubusercontent.com/4656448/173196145-b06e448d-b31b-4df9-a751-d2c6d84600a4.png" />

**Fallback to user's initials**  
Another option for those who have no image is to display their initials. The `colorize` option will generate unique colors based on user's name.

---

<img width="200" align="left" src="https://user-images.githubusercontent.com/4656448/173196152-2b0dc063-443c-4910-bc42-2f7b11e85761.png" />

**Gravatar support**  
Add user's email address to display their gravatar image. This can be combined with your own avatar images as a fallback option.

---

<img width="200" align="left" src="https://user-images.githubusercontent.com/4656448/173196169-4fda6644-49e0-4ef8-8eb2-5682a36dd48a.png" />

**Numeric badges**  
You can add a badge to display unread messages count, or user's online/offline status. Badge position can be customized as well.

---

<img width="200" align="left" src="https://user-images.githubusercontent.com/4656448/173196176-51a670e3-9d4c-4102-8c5e-460c51bb6853.png" />

**Custom badges**  
Another way of using badges is allowing your users to attach a status icon to their avatar by picking up an emoji.

---

## Installation

```sh
yarn add react-native-userpic
# or
npm install react-native-userpic
```

## Usage

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Userpic } from 'react-native-userpic';

const MyComponent = ({ userImage, userEmail }) => (
  <View style={styles.wrapper}>
    <Userpic source={{ uri: userImage }} email={userEmail} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyComponent;
```

## Advanced example

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Userpic } from 'react-native-userpic';

const defaultImage = require('./assets/defaultAvatar.png');
const badgeProps = {
  size: 30,
  borderRadius: 5,
}

const MyComponent = ({ userImage, userEmail, userName }) => (
  <View style={styles.wrapper}>
    <Userpic
      size={75}
      defaultSource={defaultImage}
      source={{ uri: userImage }}
      email={userEmail}
      name={userName}
      colorize={true}
      borderRadius="25%"
      badge={35}
      badgeColor="#007aff"
      badgeProps={badgeProps}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyComponent;
```

## Props

Prop | Type | Default | Description
---|---|---|---
`size` | number | 50 | Size of the image
`borderRadius` | number \| string | '50%' | In addition to a number you can use percentage strings "0%...50%" where "50%" creates circle shape
`name` | string | | User name for showing initials when no image provided
`email` | string | | User email for showing their gravatar image
`colorize` | boolean | false | This will generate a unique color when showing initials
`source` | ImageSourcePropType | | The image source (either a remote URL or a local file resource)
`defaultSource` | ImageSourcePropType | | The fallback image source
`style` | ViewStyle | | Style of the container
`textStyle` | TextStyle | | Style of the initials text
`imageStyle` | ImageStyle | | Style of the image
`badge` | number \| boolean \| string | | A number or string value to show in the badge, passing `true` will show a color dot
`badgeColor` | string | | Color of the badge
`badgePosition` | string | 'top-right' | Possible values are `top-right`, `bottom-right`, `bottom-left`, `top-left'`
`badgeProps` | BadgeProps | | See [badge props](#badge-props) below

## Badge

You can also use the badge as a stand-alone component.

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Badge } from 'react-native-userpic';

const MyComponent = ({ count }) => (
  <View style={styles.wrapper}>
    <Badge value={count} color="#34c759" size={30} animate={false} />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyComponent;
```

## Badge props

Prop | Type | Default | Description
---|---|---|---
`size` | number | 20 | Size (height) of the badge
`color` | string | '#ff3b30' | Background color of the badge
`borderRadius` | number \| string | '50%' | In addition to a number you can use percentage strings "0%...50%" where "50%" creates a circle or pill shape
`animate` | boolean | true | When `true`, the badge will appear with a spring animation
`value` | number \| boolean \| string | | A number or string value to show in the badge, passing `true` will show a color dot
`limit` | number \| boolean | 99 | Will show "99+" when the value exceeds the limit, set `false` to turn it off
`style` | ViewStyle | | Style of the container
`textStyle` | TextStyle | | Style of the text value

## License

MIT