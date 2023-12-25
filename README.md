# React Native Userpic

<table>
<tr>
<td>
<img width="200" align="left" src="https://github.com/kolking/react-native-userpic/assets/4656448/877fbd1b-7040-41d4-a29b-80958b9b7cdd" />
</td>
<td>
The ultimate React Native component for displaying user avatars written in TypeScript with a strong focus on performance. This fully featured and highly customizable component allows you to show Gravatar images by providing an email address, fallback to user's initials, fine-tune the shape and size of avatars, add badges and custom statuses to the avatar image.
</td>
</tr>
</table>

---

<img width="200" align="left" src="https://github.com/kolking/react-native-userpic/assets/4656448/53d8eec3-6685-4b6b-9d85-261e7f391b11" />

**Control the shape of the avatars**  
The default circular shape can be changed by specifying a custom border radius. The `style` prop enables you to override the default styles.

---

<img width="200" align="left" src="https://github.com/kolking/react-native-userpic/assets/4656448/d7a4a923-fb79-4734-8092-7531835876ce" />

**Custom fallback image or emoji**  
For users without an image, you have the option to display the default avatar icon, provide a custom fallback image, or even show an emoji.

---

<img width="200" align="left" src="https://github.com/kolking/react-native-userpic/assets/4656448/de5dfe87-37ba-49ad-ba73-1e7828c06468" />

**Fallback to user's initials**  
Another option for users without an image is to display their initials. By enabling the `colorize` option, unique color can be generated based on the user's name.

---

<img width="200" align="left" src="https://github.com/kolking/react-native-userpic/assets/4656448/06e2e2e6-10f7-420e-a381-3f2fd154b82a" />

**Gravatar support**  
Include the user's email address to display their Gravatar image. This can be combined with your own avatar image to provide a fallback option.

---

<img width="200" align="left" src="https://github.com/kolking/react-native-userpic/assets/4656448/91f3bab9-f1cd-4d4d-9965-967ca524f484" />

**Numeric badges**  
You can add a badge to display the count of unread messages or the online/offline status of the user. The position of the badge can also be customized.

---

<img width="200" align="left" src="https://github.com/kolking/react-native-userpic/assets/4656448/9b7a07b9-b988-492c-b9d0-e74e3e3208ed" />

**Custom badges**  
Another option for utilizing avatar badges is to display a custom status icon, such as an emoji, for example.

---

## Installation

### yarn
```sh
yarn add react-native-userpic
```
### npm
```sh
npm install react-native-userpic
```

## Basic Example

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

## Advanced Example

```jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Userpic } from 'react-native-userpic';

const defaultImage = require('./assets/defaultAvatar.png');
const badgeProps = {
  size: 24,
  radius: 5,
  position: 'top-left',
}

const MyComponent = ({ userImage, userEmail, userName, unreadCount }) => (
  <View style={styles.wrapper}>
    <Userpic
      size={60}
      defaultSource={defaultImage}
      source={{ uri: userImage }}
      email={userEmail}
      name={userName}
      colorize={true}
      radius={20}
      badge={unreadCount}
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
`size` | number | `50` | Width and height of the avatar
`name` | string | | User name for showing initials
`email` | string | | User email for showing Gravatar image
`source` | ImageSourcePropType | | The avatar image source (either a remote URL or a local file resource)
`defaultSource` | ImageSourcePropType | | The fallback image source
`color` | string | `#aeaeb2` | Background color of the avatar
`radius` | number | `size / 2` | Border radius of the avatar
`colorize` | boolean | `false` | To generate a unique background color when displaying initials
`style` | ViewStyle | | Style object applied to the image or initials container
`textStyle` | TextStyle | | Style object applied to the initials text
`badge` | number \| string \| boolean | | A number or string value to show in the badge, or `true` to display a color dot
`badgeColor` | string | | Background color of the badge
`badgeProps` | BadgeProps | | [Badge props](#badge-props) excluding `value`, `color`, and `parentRadius`

## Badge Component

<img width="200" align="left" src="https://github.com/kolking/react-native-userpic/assets/4656448/6ee48b43-d2ac-40bb-ab21-152a93637e4a" />

The badge can be used as a standalone component. The font size of the badge text value is calculated based on the `size` prop, so you normally don't have to specify it. By default, the badge appears with a spring animation, which can be disabled using the `animate` prop. To position the badge absolutely over its parent, use the `position` prop along with the `parentRadius` prop.

<br clear="both" />

```jsx
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Badge } from 'react-native-userpic';

const MyComponent = () => {
  const [badge, setBadge] = useState(0);

  return (
    <View style={styles.wrapper}>
      <TouchableHighlight
        style={styles.button}
        underlayColor="#00849C"
        onPress={() => setBadge(badge + 1)}
      >
        <>
          <Text style={styles.buttonText}>Press me</Text>
          <Badge value={badge} position="top-right" parentRadius={styles.button.borderRadius} />
        </>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 44,
    marginTop: 20,
    borderRadius: 22,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2FAFC7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default MyComponent;
```

## Badge Props

Prop | Type | Default | Description
---|---|---|---
`size` | number | `20` | Height and min width of the badge
`color` | string | `#ff3b30` | Background color of the badge
`radius` | number | `size / 2` | Border radius of the badge
`animate` | boolean | `true` | To animate appearance with a spring animation
`value` | number \| boolean \| string | | A number or string value to show in the badge, or `true` to display a color dot
`limit` | number | `99` | To display "99+" when the `value` exceeds the limit, set `0` to disable
`parentRadius` | number | `0` | Border radius of the parent container, used to position the badge more precisely
`position` | BadgePositions | | To position the badge absolutely over its parent, the allowed options are `top-left`, `top-right`, `bottom-left`, and `bottom-right`
`style` | ViewStyle | | Style object applied to the container
`textStyle` | TextStyle | | Style object applied to the text

## Feedback

I appreciate your feedback, so please star the repository if you like it. This is the best motivation for me to maintain the package and add new features. If you have any feature requests, found a bug, or have ideas for improvement, feel free to [open an issue](https://github.com/kolking/react-native-userpic/issues).

## License

Licensed under the MIT license.
