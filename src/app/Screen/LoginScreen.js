import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // For latest social media icons
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    // If no errors, simulate loading and navigate to HomeScreen
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true); // Set loading to true
      setTimeout(() => {
        navigation.replace('HomeScreen');
      }, 1500); // Delay for 1.5 seconds before navigation
    }
  };

  return (
    <ImageBackground
      source={require('../assets/backgroundschlolarly.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Glad you're back!</Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color="#ccc" />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
              setErrors((prev) => ({ ...prev, username: '' }));
            }}
          />
        </View>
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#ccc" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors((prev) => ({ ...prev, password: '' }));
            }}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesome name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Login Button */}
        <TouchableOpacity onPress={handleLogin} disabled={isLoading}>
          <LinearGradient
            colors={[
              'rgba(113, 154, 243, 0.985)',
              'rgba(86, 124, 205, 0.985)',
              'rgba(185, 9, 238, 0.985)',
              '#c515cb',
              '#cb1cd1',
              '#cd18d4',
              'rgb(192, 7, 192)',
            ]}
            style={styles.button}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        {/* Social Media Icons */}
        {/* Social Media Icons (Updated to Latest Icons) */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialIcon}>
            <MaterialCommunityIcons name="google" size={30} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <MaterialCommunityIcons name="facebook" size={30} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <FontAwesome name="github" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Don't have an account?{' '}
          <Text style={styles.signup} onPress={() => navigation.navigate('SignUp')}>
            Signup
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: '#ff4d4f',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: '#ccc',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialIcon: {
    padding: 10,
  },
  footer: {
    textAlign: 'center',
    color: '#ccc',
    marginTop: 20,
  },
  signup: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
