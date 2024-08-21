import React, { useCallback, useState } from 'react';
import {
  Appearance,
  ImageSourcePropType,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Badge, Avatar, AvatarProps } from '@kolking/react-native-avatar';

StatusBar.setBarStyle('light-content');

function colorScheme(lightColor: string, darkColor: string) {
  return Appearance.getColorScheme() === 'dark' ? darkColor : lightColor;
}

const IMAGES = [
  { uri: 'https://example.com/image.png' },
  { uri: 'https://xsgames.co/randomusers/assets/avatars/female/44.jpg' },
  { uri: 'https://xsgames.co/randomusers/assets/avatars/male/42.jpg' },
  { uri: 'https://xsgames.co/randomusers/assets/avatars/female/38.jpg' },
  { uri: 'https://xsgames.co/randomusers/assets/avatars/male/73.jpg' },
  { uri: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg' },
  { uri: 'https://xsgames.co/randomusers/assets/avatars/male/46.jpg' },
];

const App = () => {
  const [badge, setBadge] = useState<number>(0);
  const [image, setImage] = useState<number>(1);
  const [badImage, setBadImage] = useState<ImageSourcePropType>();

  const toggleBadge = useCallback(() => {
    console.log('-- STATE UPDATED --');
    setBadge(badge === 5 ? 0 : badge + 1);
  }, [badge]);

  const toggleImage = useCallback(() => {
    console.log('-- STATE UPDATED --');
    setImage(image + 1 === IMAGES.length ? 0 : image + 1);
  }, [image]);

  const toggleBadImage = useCallback(() => {
    console.log('-- STATE UPDATED --');
    setBadImage(badImage ? undefined : IMAGES[0]);
  }, [badImage]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Shape</Text>
        <Avatar radius={0} />
        <Avatar radius={15} />
        <Avatar />
      </View>
      <View style={styles.row}>
        <Text style={styles.label} onPress={toggleBadImage}>
          No image
        </Text>
        <Avatar source={badImage} />
        <Avatar defaultSource={require('./assets/custom.png')} />
        <Avatar name="👩" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Initials</Text>
        <Avatar name="Nick" color="gray" />
        <Avatar name="Jason Smith" colorize={true} />
        <Avatar name="Emma Miller" email="nogravatar@email.com" colorize={true} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label} onPress={toggleImage}>
          Image
        </Text>
        <Avatar source={IMAGES[image]} />
        <Avatar source={IMAGES[3]} />
        <Avatar source={IMAGES[6]} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Gravatar</Text>
        <Avatar radius={10} email="jasonsmith@mailto.plus" />
        <Avatar radius={10} email="amandastone@mailto.plus" />
        <Avatar radius={10} email="lucyfoster@mailto.plus" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label} onPress={toggleBadge}>
          Badge
        </Text>
        <Avatar email="jasonsmith@mailto.plus" badge={!!badge} badgeColor="#34c759" />
        <Avatar radius={15} email="amandastone@mailto.plus" badge={badge} badgeColor="#007aff" />
        <Avatar
          radius={10}
          email="lucyfoster@mailto.plus"
          badge={badge ? badge + 100 : undefined}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Avatar email="jasonsmith@mailto.plus" badge="👋" badgeProps={statusBadgeProps} />
        <Avatar email="amandastone@mailto.plus" badge="😀" badgeProps={statusBadgeProps} />
        <Avatar email="lucyfoster@mailto.plus" badge="🐵" badgeProps={statusBadgeProps} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Size</Text>
        <Avatar radius={8} size={30} email="jasonsmith@mailto.plus" />
        <Avatar radius={12} size={50} email="amandastone@mailto.plus" />
        <Avatar radius={18} size={75} email="lucyfoster@mailto.plus" />
      </View>
      <TouchableHighlight
        style={styles.button}
        activeOpacity={0.5}
        underlayColor="#00849C"
        onPress={toggleBadge}
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
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: colorScheme('#fff', '#212124'),
  },
  row: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 15,
    flexBasis: '35%',
    fontWeight: '700',
    color: colorScheme('#000', '#fff'),
  },
  badgeStyle: {
    elevation: 0,
    shadowOpacity: 0,
    backgroundColor: colorScheme('#fff', '#212124'),
  },
  badgeTextStyle: {
    marginHorizontal: 0,
  },
  button: {
    width: 150,
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

const statusBadgeProps: AvatarProps['badgeProps'] = {
  size: 22,
  position: 'bottom-right',
  style: styles.badgeStyle,
  textStyle: styles.badgeTextStyle,
};

export default App;
