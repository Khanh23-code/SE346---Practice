import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default class flexbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
    }
    this.showView = this.showView.bind(this);
  }

  showView() {
    switch(this.state.view) {
      case 0:
        return this.Register();
      case 1:
        return this.Login();
      case 2:
        return this.Profile();
    }
  }

  Register() {
    return (
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
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    )
  }

  Login() {
    return (
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
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    )
  }

  Profile() {
    return (
      <View style={styles.menu}>
        <Text style={styles.header}>PROFILE</Text>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Username</Text>
          <TextInput style={styles.textInput} placeholder='username'></TextInput>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Email</Text>
          <TextInput style={styles.textInput} placeholder='name@gmail.com'></TextInput>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Phone</Text>
          <TextInput style={styles.textInput} placeholder='+1234567890'></TextInput>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Date of Birth</Text>
          <TextInput style={styles.textInput} placeholder='01/01/2026'></TextInput>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Address</Text>
          <TextInput style={styles.textInput} placeholder='123 Main St'></TextInput>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Description</Text>
          <TextInput 
            style={styles.textInput} 
            placeholder='about yourself'
            multiline={true}
            numberOfLines={2}
            textAlignVertical='top'/>
        </View>
      
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
          {this.showView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5', 
  },

  menu: {
    width: '85%', 
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  header: {
    fontSize: 32,
    fontWeight: '800', 
    color: '#1a1a1a',
    marginBottom: 40,
    textAlign: 'center',
  },

  block: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
  },

  textInput: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db', 
    borderRadius: 12, 
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },

  button: {
    width: '100%',
    backgroundColor: '#f6803b', 
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    alignItems: 'center',

    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});