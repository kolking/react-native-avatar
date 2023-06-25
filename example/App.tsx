import React, { useCallback, useState } from 'react';
import { Appearance, ImageSourcePropType, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Userpic, UserpicProps } from 'react-native-userpic';

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
        <Userpic borderRadius={0} />
        <Userpic borderRadius={15} />
        <Userpic />
      </View>
      <View style={styles.row}>
        <Text style={styles.label} onPress={toggleBadImage}>
          No image
        </Text>
        <Userpic source={badImage} />
        <Userpic defaultSource={require('./assets/custom.png')} />
        <Userpic name="👩" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Initials</Text>
        <Userpic name="Nick" color="gray" />
        <Userpic name="Jason Smith" colorize={true} />
        <Userpic name="Emma Miller" email="nogravatar@email.com" colorize={true} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label} onPress={toggleImage}>
          Image
        </Text>
        <Userpic source={IMAGES[image]} />
        <Userpic source={IMAGES[3]} />
        <Userpic source={IMAGES[6]} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Gravatar</Text>
        <Userpic borderRadius={10} email="jasonsmith@mailto.plus" />
        <Userpic borderRadius={10} email="amandastone@mailto.plus" />
        <Userpic borderRadius={10} email="lucyfoster@mailto.plus" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label} onPress={toggleBadge}>
          Badge
        </Text>
        <Userpic
          source={IMAGES[1]}
          email="jasonsmith@mailto.plus"
          badge={!!badge}
          badgeColor="#34c759"
        />
        <Userpic
          borderRadius={20}
          email="amandastone@mailto.plus"
          badge={badge}
          badgeColor="#007aff"
        />
        <Userpic
          borderRadius={10}
          email="lucyfoster@mailto.plus"
          badge={badge ? badge + 100 : undefined}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Userpic email="jasonsmith@mailto.plus" badge="👋" badgeProps={statusBadgeProps} />
        <Userpic email="amandastone@mailto.plus" badge="😀" badgeProps={statusBadgeProps} />
        <Userpic email="lucyfoster@mailto.plus" badge="🐵" badgeProps={statusBadgeProps} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Size</Text>
        <Userpic borderRadius={8} size={30} email="jasonsmith@mailto.plus" />
        <Userpic borderRadius={12} size={50} email="amandastone@mailto.plus" />
        <Userpic borderRadius={18} size={75} email="lucyfoster@mailto.plus" />
      </View>
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
});

const statusBadgeProps: UserpicProps['badgeProps'] = {
  size: 22,
  position: 'bottom-right',
  style: styles.badgeStyle,
  textStyle: styles.badgeTextStyle,
};

export default App;
