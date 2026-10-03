import { useState } from 'react';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Scale sizes relative to a 390pt-wide iPhone so the layout fits any screen.
const { width } = Dimensions.get('window');
const s = (size) => Math.round((Math.min(width, 500) / 390) * size);

function PillButton({ icon, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.pill, pressed && styles.pillPressed]}
    >
      {icon}
      <Text style={styles.pillLabel}>{label}</Text>
    </Pressable>
  );
}

function PillInput({ icon, ...props }) {
  return (
    <View style={styles.pill}>
      {icon}
      <TextInput
        placeholderTextColor="#9aa3b5"
        style={styles.pillInput}
        {...props}
      />
    </View>
  );
}

export default function App() {
  const [email, setEmail] = useState('');
  const [lang, setLang] = useState('English');

  return (
    <LinearGradient
      colors={['#1a3cff', '#0022ee', '#0010b8']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Pressable
          style={styles.langChip}
          onPress={() => setLang(lang === 'English' ? '한국어' : 'English')}
        >
          <Ionicons name="globe-outline" size={s(14)} color="#fff" />
          <Text style={styles.langText}>{lang}</Text>
        </Pressable>

        <View style={styles.hero}>
          <Text style={styles.logo}>Chance.</Text>
        </View>

        <View style={styles.bottom}>
          <Text style={styles.tagline}>Seeing the Unseen with AI.</Text>

          <PillButton
            icon={<Ionicons name="logo-apple" size={s(18)} color="#000" />}
            label="Continue with Apple"
            onPress={() => Alert.alert('Apple 로그인')}
          />
          <PillButton
            icon={<Ionicons name="logo-google" size={s(18)} color="#4285F4" />}
            label="Continue with Google"
            onPress={() => Alert.alert('Google 로그인')}
          />
          <PillInput
            icon={<Ionicons name="mail-outline" size={s(18)} color="#9aa3b5" />}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 500,
    paddingHorizontal: s(24),
    paddingTop: s(60),
    paddingBottom: s(40),
  },
  langChip: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
    paddingHorizontal: s(12),
    paddingVertical: s(6),
    borderRadius: s(20),
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  langText: { color: '#fff', fontSize: s(13), fontWeight: '600' },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  logo: {
    color: '#fff',
    fontSize: s(44),
    fontWeight: '800',
    fontStyle: 'italic',
    letterSpacing: -1,
  },
  bottom: { gap: s(12) },
  tagline: {
    color: '#fff',
    fontSize: s(15),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: s(8),
  },
  pill: {
    height: s(52),
    borderRadius: s(26),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(20),
    gap: s(10),
  },
  pillPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  pillLabel: { fontSize: s(16), fontWeight: '600', color: '#111' },
  pillInput: { flex: 1, fontSize: s(16), color: '#111', height: '100%' },
});
