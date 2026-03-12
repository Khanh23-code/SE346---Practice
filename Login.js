import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet, 
  Text, 
  View, 
  Image, 
  Switch, 
  TextInput, 
  TouchableOpacity, 
  TouchableHighlight 
} from 'react-native';

export default class Login extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.menu}>  
          <Text style={styles.header}>LOGIN</Text>

          <View style={styles.block}>
            <Text style={{fontWeight: 'bold'}}>Email/Username</Text>
            <TextInput style={styles.textInput} placeholder='test@gmail.com'></TextInput>
          </View>
          
          <View style={styles.block}>
            <Text style={{fontWeight: 'bold'}}>Password</Text>
            <TextInput style={styles.textInput} placeholder='****' secureTextEntry={true}></TextInput>
            <Text style={{fontSize: 12, fontWeight: 'bold'}}>Forgot password?</Text>
          </View>
          
          <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 10}}>Sign in</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  menu: {
    width: 250,
    height: 550,
    borderWidth: 3,
    borderColor: 'black',
    padding: 10,

    flexDirection: 'column',

    // backgroundColor: '#00b3ff',
  },

  header: {
    marginBottom: 50,
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  block: {
    // backgroundColor: '#5eff00',
    marginBottom: 25,
  },

  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 6,
    width: '100%',
    marginTop: 4,
    marginBottom: 4,
  },

    button: {
    width: '50%',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,

    alignSelf: 'center',
    alignItems: 'center',
  },
});