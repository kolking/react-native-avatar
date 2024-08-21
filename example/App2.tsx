import React, { useCallback, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, AvatarProps } from '@kolking/react-native-avatar';

const badgeProps: AvatarProps[] = [
  {
    defaultSource: require('./assets/custom.png'),
  },
  {
    name: '👩🏼',
  },
  {
    name: 'React Native',
    colorize: true,
  },
  {
    badge: 0,
    badgeProps: { size: 30 },
    source: { uri: 'https://xsgames.co/randomusers/assets/avatars/female/44.jpg' },
  },
  {
    badge: 3,
    badgeProps: { size: 30 },
    source: { uri: 'https://xsgames.co/randomusers/assets/avatars/female/44.jpg' },
  },
  {
    badge: 4,
    badgeProps: { size: 30 },
    source: { uri: 'https://xsgames.co/randomusers/assets/avatars/female/44.jpg' },
    radius: 40,
  },
  {
    badge: 5,
    badgeProps: { size: 30 },
    source: { uri: 'https://xsgames.co/randomusers/assets/avatars/female/44.jpg' },
    radius: 30,
  },
  {
    badge: false,
    badgeProps: { size: 30 },
    source: { uri: 'https://xsgames.co/randomusers/assets/avatars/male/73.jpg' },
  },
  {
    badge: true,
    badgeColor: '#34c759',
    badgeProps: { size: 30 },
    source: { uri: 'https://xsgames.co/randomusers/assets/avatars/male/73.jpg' },
  },
  {
    badge: '',
    badgeProps: { size: 30 },
    source: { uri: 'https://xsgames.co/randomusers/assets/avatars/female/38.jpg' },
  },
  {
    badge: '👋',
    badgeProps: {
      size: 30,
      position: 'bottom-right',
      style: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: '#212124',
      },
      textStyle: {
        marginHorizontal: 0,
      },
    },
    source: { uri: 'https://xsgames.co/randomusers/assets/avatars/female/38.jpg' },
  },
];

const App = () => {
  const [props, setProps] = useState(0);

  const toggleProps = useCallback(() => {
    setProps(props + 1 === badgeProps.length ? 0 : props + 1);
  }, [props]);

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={toggleProps}>
        <Avatar size={100} color="#636366" {...badgeProps[props]} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#212124',
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

export default App;
