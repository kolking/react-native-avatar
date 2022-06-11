import React from 'react';
import { Appearance, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Userpic } from 'react-native-userpic';

StatusBar.setBarStyle('light-content');

function colorScheme(lightColor: string, darkColor: string) {
  return Appearance.getColorScheme() === 'dark' ? darkColor : lightColor;
}

// Random user images:
const images = [
  'https://minimaltoolkit.com/images/randomdata/male/78.jpg',
  'https://minimaltoolkit.com/images/randomdata/male/62.jpg',
  'https://minimaltoolkit.com/images/randomdata/male/46.jpg',
  'https://minimaltoolkit.com/images/randomdata/female/107.jpg',
  'https://minimaltoolkit.com/images/randomdata/female/70.jpg',
  'https://minimaltoolkit.com/images/randomdata/female/96.jpg',
];

const App = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <View style={styles.row}>
        <Text style={styles.label}>Shape</Text>
        <Userpic borderRadius={0} />
        <Userpic borderRadius="25%" />
        <Userpic borderRadius="50%" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>No image</Text>
        <Userpic />
        <Userpic defaultSource={require('./assets/custom.png')} />
        <Userpic name="👩" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Initials</Text>
        <Userpic name="Nick" />
        <Userpic name="Jason Smith" colorize={true} />
        <Userpic name="Emma Miller" colorize={true} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Image</Text>
        <Userpic source={{ uri: images[1] }} />
        <Userpic source={{ uri: images[2] }} />
        <Userpic source={{ uri: images[5] }} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Gravatar</Text>
        <Userpic borderRadius={10} email="jasonsmith@mailto.plus" />
        <Userpic borderRadius={10} email="amandastone@mailto.plus" />
        <Userpic borderRadius={10} email="lucyfoster@mailto.plus" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Badge</Text>
        <Userpic badge={true} badgeColor="#34c759" email="jasonsmith@mailto.plus" />
        <Userpic badge={3} badgeColor="#007aff" email="amandastone@mailto.plus" />
        <Userpic badge={100} email="lucyfoster@mailto.plus" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Userpic badge="👋" badgeProps={statusBadgeProps} email="jasonsmith@mailto.plus" />
        <Userpic badge="😀" badgeProps={statusBadgeProps} email="amandastone@mailto.plus" />
        <Userpic badge="🐵" badgeProps={statusBadgeProps} email="lucyfoster@mailto.plus" />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Size</Text>
        <Userpic borderRadius="25%" size={30} email="jasonsmith@mailto.plus" />
        <Userpic borderRadius="25%" size={50} email="amandastone@mailto.plus" />
        <Userpic borderRadius="25%" size={75} email="lucyfoster@mailto.plus" />
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colorScheme('#fff', '#212124'),
  },
  content: {
    margin: 30,
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

const statusBadgeProps = {
  size: 22,
  style: styles.badgeStyle,
  textStyle: styles.badgeTextStyle,
};

export default App;
