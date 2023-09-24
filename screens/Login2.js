import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '../../src/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import Buttons from '../components/Buttons';

const Login2 = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigation = useNavigation(); // Initialize navigation

  const handleSignIn = () => {
    // Perform your sign-in logic here
    // For example, you can validate the form data

    // If sign-in is successful, navigate to AppScreen
    navigation.navigate('AppScreen');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* login form section */}
      <View style={{ flex: 2, flexDirection: 'column', backgroundColor: '#fff', paddingTop: 10, paddingHorizontal: '3%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 30, color: Colors.black }}>BeNice! Login Page</Text>
          <Image source={require('../assets/images/waving_hand.png')} style={{ width: 30, height: 30 }} />
        </View>
        <Text style={{ fontFamily: "OpenSans-Regular", fontSize: 14, paddingTop: 10, color: "#777" }}>Enter email and password.</Text>

        <View style={{ flexDirection: 'column', paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '95%', borderRadius: 10, height: 60, paddingLeft: 20 }}>
            <Icon name="envelope-o" size={22} color="#818181" />
            <TextInput onChangeText={(text) => { setFormData((prevState) => ({ ...prevState, email: text })) }} style={styles.input} placeholder="Enter Email" placeholderTextColor="#818181" />

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ededed', width: '95%', borderRadius: 10, height: 60, paddingLeft: 20, marginTop: 20 }}>
            <Icon name="lock" size={22} color="#818181" />
            <TextInput onChangeText={(text) => { setFormData((prevState) => ({ ...prevState, password: text })) }} style={styles.input} placeholder="Enter Password" secureTextEntry={true} placeholderTextColor="#818181" />
          </View>

          <View style={{ width: '95%', marginBottom: 10 }}>
            <Text style={{ fontSize: 17, fontFamily: 'OpenSans-SemiBold', color: '#818181', alignSelf: 'flex-end', paddingTop: 10 }}>Forgot your password?</Text>
          </View>

          <Buttons btn_text={"Sign In"} on_press={handleSignIn} />
        </View>
      </View>

      {/* social login section */}
      <View style={{ flex: 2, backgroundColor: '#fff', flexDirection: 'column', paddingHorizontal: '3%' }}>
        <Text style={{ fontFamily: "OpenSans-Bold", textAlign: 'center', marginVertical: 0, color: '#818181', fontSize: 20 }}>Or</Text>

        <View style={{ flexDirection: 'column', alignItems: 'center', width: '95%' }}>

        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: '#fff', marginBottom: 600 }}>

          <Text style={{ fontSize: 18, fontFamily: 'OpenSans-SemiBold', color: '#333' }}> Sign up here.</Text>
        </View>
      </View>

    </ScrollView>
  );
};

export default Login2;

const styles = StyleSheet.create({
  input: {
    position: 'relative',
    height: '100%',
    width: '90%',
    fontFamily: 'OpenSans-Medium',
    paddingLeft: 20,
  },
});
