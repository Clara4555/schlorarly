import React, { useState, useCallback } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from 'react-native-vector-icons'; // For latest social media icons

const SignUpScreen = () => {
  const navigation = useNavigation();

  // State for input fields, errors, and loading state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation function
  const handleSignUp = useCallback(() => {
    const newErrors = {};

    // Username validation
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    // Confirm Password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // If no errors, simulate loading and navigate to Login screen
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true); // Set loading to true
      setTimeout(() => {
        setIsLoading(false); // Set loading to false after 1.5 seconds
        navigation.navigate('Login'); // Navigate to Login screen
      }, 1500); // Delay for 1.5 seconds before navigation
    }
  }, [username, email, password, confirmPassword, navigation]);

  return (
    <ImageBackground
      source={require('../assets/backgroundschlolarly.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Join us and get started!</Text>

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

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color="#ccc" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors((prev) => ({ ...prev, email: '' }));
            }}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

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
            <FontAwesome name={passwordVisible ? "eye-slash" : "eye"} size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#ccc" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#ccc"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors((prev) => ({ ...prev, confirmPassword: '' }));
            }}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <FontAwesome name={confirmPasswordVisible ? "eye-slash" : "eye"} size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        {/* Sign-Up Button */}
        <TouchableOpacity onPress={handleSignUp} disabled={isLoading}>
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
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        {/* Social Media Icons */}
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
          Already have an account?{' '}
          <Text style={styles.signup} onPress={() => navigation.navigate('Login')}>
            Login
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
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  orText: {
    textAlign: 'center',
    color: '#fff',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  footer: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  signup: {
    color: '#0fa6ff',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
