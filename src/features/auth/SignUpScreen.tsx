import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { AuthStackParamList } from '../../types/navigation';
import { Colors } from '@/constants/theme';
import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LocalTotoLogo from '@/src/components/ui/LocalTotoLogo';

type SignUpScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'SignUp'>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const theme = Colors[scheme ?? 'light'];
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (phoneNumber.trim().length >= 7) {
      navigation.navigate('OTPVerify', {
        phone: `+91 ${phoneNumber}`,
      });
    }
  };

  const isDisabled = phoneNumber.trim().length < 7;

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, backgroundColor: theme.background }]}>
      {/* Header */}

      <View style={styles.header}>
        <LocalTotoLogo size="medium" />
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.formTitle, { color: theme.text }]}>Enter your phone number</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          We'll send you a verification code to sign up
        </Text>

        {/* Phone Number */}
        <View style={[styles.inputWrapper, { backgroundColor: theme.surface }]}>
          <Text style={[styles.countryCode, { color: theme.text }]}>+91</Text>
          <TextInput
            keyboardType="phone-pad"
            style={[styles.input, { color: theme.text }]}
            placeholder="Enter phone number"
            placeholderTextColor={theme.textMuted}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
            autoFocus
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            { backgroundColor: isDisabled ? '#9CA3AF' : '#22C55E' }
          ]}
          onPress={handleContinue}
          disabled={isDisabled}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: theme.textMuted }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.loginLink, { color: theme.tint }]}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
    height: 56,
    borderWidth: 1,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    paddingLeft: 8,
  },
  continueButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpScreen;
