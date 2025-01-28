import React, { useState, useCallback, useReducer, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import {validate as validateEmail} from 'react-email-validator'
import { ScreenProps } from '../../../navigation';
import Input from '../components/input/Input';
import { Colors } from '../constants/Colors';
import { Call, Lock1, Message, User } from 'iconsax-react-native';
import Button from '../components/buttons/Button';
import { useMutation } from '@tanstack/react-query';
import { delay } from '../utils/delay';
import { validatePhoneNumber } from '../utils/PhoneUtils';
import { registerAccount } from '../api/AuthApi';
import Toast from 'react-native-toast-message';
import { useStudent } from '../components/students/StudentProvider';
import { Student } from '../interfaces/Student';

// We create a state for the student reducer function
type ReducerState = {
  firstName?: string,
  lastName?: string,
  email?: string,
  phoneNumber?: string,
  password?: string,
  confirmPassword?: string,
}

type ReducerAction = {
  type: keyof ReducerState,
  value: string,
}

function reducer(state:ReducerState, action: ReducerAction) : ReducerState{
  switch(action.type){
    case 'firstName':
      return {...state, firstName: action.value};
    case 'lastName':
      return {...state, lastName: action.value};
    case 'email':
      return {...state, email: action.value};
    case 'password':
      return {...state, password: action.value}
    case 'confirmPassword':
      return {...state, confirmPassword: action.value}
    default:
      return {...state, phoneNumber:action.value}
  }
}

const SignUpScreen = ({navigation}: ScreenProps<'Register'>) => {

  // State for input fields, errors, and loading state
  const [{firstName, lastName, email, password, phoneNumber, confirmPassword}, dispatch] = useReducer(reducer, {firstName:'', lastName:'', confirmPassword:'', email:'', password:'', phoneNumber:''})
  const [error, setError] = useState<string>();

  const {setStudent}  = useStudent()

  const register = async ()=>{
    console.log("Logging In")
    await delay(1000)
    const {data, status} = await registerAccount({firstName, lastName, email, phoneNumber, password})

    if(status === 200){
        return data;
    }

    throw new Error(data.message);


  }


  const validate = useMutation({
    mutationFn: async ()=>{
      // Wait for 2 seconds
      await delay(2000);
      setError('');


      if(firstName.trim().length === 0){
        setError('First Name cannot be empty');
        return;
      }

      if(lastName.trim().length === 0){
        setError('Last Name cannot be empty');
        return;
      }

      if(!validateEmail(email)){
        setError("Email is not valid")
        return;
      }

      if(phoneNumber.trim().length === 0){
        setError('Phone Number cannot be empty');
        return;
      }

      if(!validatePhoneNumber(phoneNumber)){
        setError('Phone Number is invalid');
        return;
      }

      if(password.trim().length <8){
        setError('Password must be at least 8 digits');
        return;
      }

      if(confirmPassword.trim() !== password.trim()){
        setError("Passwords don't match")
        return;
      }

      return register();


    },

    onSuccess: async ({data, message})=>{
      Toast.show({
        type:'success',
        text1:"Registered",
        text2:"Successfully registered your account"
      })

      setStudent(data as Student);

      await delay(1000)

      navigation.replace('Home')




    },
    onError: ({message})=>{
      // if(!message || message.includes('undefined')){
      //   return;
      // }
      Toast.show({
        type:'error',
        text1:"Failed to register",
        text2:message
      })
    }
  })

 

  const form = ()=>(
    <>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Join us and get started!</Text>

      {/* First Name Input */}
      <Input 
        placeholder='First Name'
        value={firstName}
        prefix={<User size={20} color={Colors.secondary} />}
        error={error && error.toLowerCase().includes('first name')? error: null}
        inputMode='text'
        onChange={(value)=>dispatch({type:'firstName', value})}
      />

      {/* Last Name Input */}
      <Input 
        placeholder='Last Name'
        value={lastName}
        prefix={<User size={20} color={Colors.secondary} />}
        error={error && error.toLowerCase().includes('last name')? error: null}
        inputMode='text'
        onChange={(value)=>dispatch({type:'lastName', value})}
      />
      

      {/* Email Input */}
      <Input 
        placeholder='Email'
        value={email}
        prefix={<Message size={20} color={Colors.secondary} />}
        error={error && error.toLowerCase().includes('email')? error: null}
        inputMode='email'
        onChange={(value)=>dispatch({type:'email', value})}
      />

      {/* Phone Input */}
      <Input 
        placeholder='Phone Number'
        value={phoneNumber}
        prefix={<Call size={20} color={Colors.secondary} />}
        error={error && error.toLowerCase().includes('phone')? error: null}
        inputMode='numeric'
        onChange={(value)=>dispatch({type:'phoneNumber', value})}
      />

      {/* Password Input */}
      <Input 
        placeholder='Password'
        value={password}
        prefix={<Lock1 size={20} color={Colors.secondary} />}
        error={error && error.toLowerCase().includes('password')? error: null}
        inputMode='text'
        isPassword
        onChange={(value)=>dispatch({type:'password', value})}
      />

      {/* Confirm Password Input */}
      <Input 
        placeholder='Confirm Password'
        value={confirmPassword}
        prefix={<Lock1 size={20} color={Colors.secondary} />}
        error={error && error.toLowerCase().includes('match')? error: null}
        inputMode='text'
        isPassword
        onChange={(value)=>dispatch({type:'confirmPassword', value})}
      />

      

      {/* Sign-Up Button */}
      <Button loading={validate.isPending} onClick={validate.mutate} title='Register' />

      {/* Footer */}
      <Text style={styles.footer}>
        Already have an account?{' '}
        <Text style={styles.signup} onPress={() => navigation.canGoBack()? navigation.goBack():  navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </>
  )


  


  return (
    <ImageBackground
      source={require('../assets/backgroundschlolarly.jpeg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <StatusBar barStyle='light-content' translucent backgroundColor={'transparent'} />
      <View style={styles.formContainer}>
        {form()}
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
    backgroundColor: Colors.black,
    borderRadius: 20,
    gap:10,
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
    color: Colors.lightPurple,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
