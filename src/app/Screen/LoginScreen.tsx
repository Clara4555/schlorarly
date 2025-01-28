import React, { useEffect, useReducer, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import {validate as validateEmail} from 'react-email-validator'
import Input from '../components/input/Input';
import { ScreenProps } from '../../../navigation';
import { Colors } from '../constants/Colors';
import Button from '../components/buttons/Button';
import { useStudent } from '../components/students/StudentProvider';
import { useMutation } from '@tanstack/react-query';
import { User, Message, Call, Lock1 } from 'iconsax-react-native';
import Toast from 'react-native-toast-message';
import { loginAccount, registerAccount } from '../api/AuthApi';
import { Student } from '../interfaces/Student';
import { delay } from '../utils/delay';
import { isPhoneNumber, validatePhoneNumber } from '../utils/PhoneUtils';


type ReducerState = {
  emailOrPhoneNumber?: string,
  password?: string,
}

type ReducerAction = {
  type: keyof ReducerState,
  value: string,
}

function reducer(state:ReducerState, action: ReducerAction) : ReducerState{
  switch(action.type){
  
    case 'emailOrPhoneNumber':
      return {...state, emailOrPhoneNumber: action.value};
    case 'password':
      return {...state, password: action.value}
    default:
      return {...state, emailOrPhoneNumber:action.value}
  }
}



const LoginScreen = ({ navigation }: ScreenProps<'Login'>) => {
  const [{emailOrPhoneNumber, password}, dispatch] = useReducer(reducer, {emailOrPhoneNumber:'', password:''});
  const [error, setError] = useState('');
  const [isNumber, setIsPhoneNumber] = useState(false);

  const {setStudent}  = useStudent()

  useEffect(()=>{
    const phoneMatch = isPhoneNumber(emailOrPhoneNumber)
    setIsPhoneNumber(phoneMatch);
  }, [emailOrPhoneNumber])

  const login = async ()=>{
    console.log("Logging In")
    await delay(1000)
    const {data, status} = await loginAccount(emailOrPhoneNumber, password)

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

      const validPhone = validatePhoneNumber(emailOrPhoneNumber);
      const validEmail = validateEmail(emailOrPhoneNumber);

      if(!isNumber && !validEmail){
        setError("Email is not valid")
        return;
      }

      if(isNumber && !validPhone){
        setError('Phone Number is invalid');
        return;
      }

      if(password.trim().length <8){
        setError('Password would be at least 8 digits');
        return;
      }


      return login();
    },

    onSuccess: async ({data, message})=>{
      Toast.show({
        type:'success',
        text1:"Logged In",
        text2:"Successfully logged into your account"
      })

      setStudent(data as Student);

      await delay(1000)

      navigation.popTo('Home')
    },
    onError: ({message})=>{
      if(!message || message.includes('undefined')){
        return;
      }
      Toast.show({
        type:'error',
        text1:"Failed to login",
        text2:message
      })
    }
  })

 

  const form = ()=>(
    <>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Don't you have some work to do?</Text>

      {/* Email Input */}
      <Input 
        placeholder='Email Or Phone'
        value={emailOrPhoneNumber}
        style={{marginBottom:5}}
        prefix={!isNumber?<Message size={20} color={Colors.secondary} />:<Call size={20} color={Colors.secondary} />}
        error={error && error.toLowerCase().includes('email') || error.toLowerCase().includes('phone')? error: null}
        inputMode='email'
        onChange={(value)=>dispatch({type:'emailOrPhoneNumber', value})}
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

      

      {/* Sign-Up Button */}
      <Button style={{marginTop: 20}} loading={validate.isPending} onClick={validate.mutate} title='Login' />

      {/* Footer */}
      <Text style={styles.footer}>
        Don't have an account?{' '}
        <Text style={styles.signup} onPress={() =>navigation.canGoBack()? navigation.goBack(): navigation.navigate('Register')}>
          Register
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
    marginBottom: 30,
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

export default LoginScreen;
