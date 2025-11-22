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
  useColorScheme,
  View,
} from 'react-native';
import { AuthStackParamList } from '../../types/navigation';
import LocalTotoLogo from '../../components/ui/LocalTotoLogo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const scheme = useColorScheme()
  const theme = Colors[scheme ?? 'light'];
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = () => {
    if (phoneNumber.trim().length >= 7 && password.length >= 6) {
      navigation.navigate('OTPVerify', { phone: `+234 ${phoneNumber}` });
    }
  };

  const isDisabled = phoneNumber.trim().length < 7 || password.length < 6;

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <LocalTotoLogo size="medium" />
        <Text style={styles.headerTitle}>Login</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration Placeholder */}
        <View style={styles.illustrationContainer}>
          <Ionicons name="person" size={80} color="#22C55E" />
          <Ionicons name="rocket" size={40} color="#F59E0B" style={styles.rocketIcon} />
        </View>

        <Text style={styles.formTitle}>Enter Mobile Number & Password</Text>

        {/* Phone Number */}
        <View style={styles.inputWrapper}>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#9CA3AF"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forget Password ??{" "}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, { color: theme.textMuted }]}>
            New here?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.loginLink, { color: theme.tint }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[styles.continueButton, isDisabled && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={isDisabled}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    padding: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 32,
    position: 'relative',
  },
  rocketIcon: {
    position: 'absolute',
    right: 60,
    top: 20,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#22C55E',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#000000',
  },
  continueButton: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
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

export default LoginScreen;
