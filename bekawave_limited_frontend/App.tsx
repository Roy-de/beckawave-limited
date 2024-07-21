import { StyleSheet, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from 'react';

export default function App() {
  const [isHovered, setIsHovered] = useState(false);

  return (
      <View style={styles.container}>
        <Pressable
            onPressIn={() => setIsHovered(true)}
            onPressOut={() => setIsHovered(false)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed || isHovered ? '#dfdfdf' : '#fff',
              },
              styles.iconContainer,
            ]}
        >
          <Ionicons name="menu" size={30} color="#061a23" />
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: 4,
    borderRadius: 5,
  },
});
