import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
};

const LocalTotoLogo: React.FC<Props> = ({ size = 'medium', showText = true }) => {
  const sizeStyles = {
    small: { logoSize: 24, textSize: 14 },
    medium: { logoSize: 32, textSize: 18 },
    large: { logoSize: 40, textSize: 22 },
  };

  const { logoSize, textSize } = sizeStyles[size];

  return (
    <View style={styles.container}>
      <View style={[styles.logoBox, { width: logoSize, height: logoSize }]}>
        <Text style={[styles.logoText, { fontSize: logoSize * 0.5 }]}>Lt</Text>
      </View>
      {showText && <Text style={[styles.brandText, { fontSize: textSize }]}>Local Toto</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    backgroundColor: '#22C55E',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: "white",
    fontWeight: '700',
  },
  brandText: {
    fontWeight: '600',
  },
});

export default LocalTotoLogo;

