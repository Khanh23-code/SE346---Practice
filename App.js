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

export default class flexbox extends Component {

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.menu}>  
          <Text style={styles.header}>REGISTER</Text>

          <View style={styles.block}>
            <Text style={{fontWeight: 'bold'}}>Name</Text>
            <TextInput style={styles.textInput} placeholder='test'></TextInput>
          </View>
          
          <View style={styles.block}>
            <Text style={{fontWeight: 'bold'}}>Email</Text>
            <TextInput style={styles.textInput} placeholder='test@gmail.com' secureTextEntry={true}></TextInput>
          </View>

          <View style={styles.block}>
            <Text style={{fontWeight: 'bold'}}>Password</Text>
            <TextInput style={styles.textInput} placeholder='* * * *' secureTextEntry={true}></TextInput>
          </View>

          <View style={styles.block}>
            <Text style={{fontWeight: 'bold'}}>Confirm Password</Text>
            <TextInput style={styles.textInput} placeholder='* * * *' secureTextEntry={true}></TextInput>
          </View>
          
          <TouchableOpacity style={styles.button}>
            <Text style={{fontSize: 10}}>Create</Text>
          </TouchableOpacity>
        </View>

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

    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  menu: {
    width: '45%',
    height: 550,
    borderWidth: 3,
    borderColor: 'black',
    padding: 10,

    flexDirection: 'column',

    // backgroundColor: '#00b3ff',
  },

  header: {
    marginBottom: 50,
    fontSize: 25,
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