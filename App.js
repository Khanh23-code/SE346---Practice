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
// import DateTimePicker from '@react-native-community/datetimepicker';

export default class flexbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      regEmail: '',
      regPassword: '',
      confirmPassword: '',
      logEmail: '',
      logPassword: '',
    }
    this.showView = this.showView.bind(this);
    this.onCreatePress = this.onCreatePress.bind(this);
    this.onSignInPress = this.onSignInPress.bind(this);
    this.onLogoutPress = this.onLogoutPress.bind(this);
    this.onForgotPasswordPress = this.onForgotPasswordPress.bind(this);
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

  onCreatePress() {
    if (this.state.regEmail === '' || this.state.regPassword === '' || this.state.confirmPassword === '') {
      return alert("Please fill in all fields!");
    }

    if (this.state.regPassword !== this.state.confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Account created successfully!");
      this.setState({ view: 1 });
    }
  }

  onSignInPress() {
    if (this.state.logEmail === '' || this.state.logPassword === '') {
      return alert("Please fill in all fields!");
    }

    if (this.state.logEmail === this.state.regEmail && this.state.logPassword === this.state.regPassword) {
      alert("Login successful!");
      this.setState({ view: 2 });
    } else {
      alert("Invalid email or password!");
    }
  }

  onLogoutPress() {
    this.setState({ view: 1 });
  }

  onForgotPasswordPress() {
    this.setState({ view: 0 });
  }

  Register() {
    return (
      <View style={styles.menu}>  
        <Text style={styles.header}>REGISTER</Text>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Name</Text>
          <TextInput style={styles.textInput} placeholder='test'/>
        </View>
        
        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Email</Text>
          <TextInput style={styles.textInput} placeholder='test@gmail.com' keyboardType='email-address'
            value={this.state.regEmail}
            onChangeText={(regEmail) => this.setState({ regEmail })}/>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Password</Text>
          <TextInput style={styles.textInput} placeholder='* * * *' secureTextEntry={true}
            value={this.state.regPassword}
            onChangeText={(regPassword) => this.setState({ regPassword })}/>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Confirm Password</Text>
          <TextInput style={styles.textInput} placeholder='* * * *' secureTextEntry={true}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}/>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={this.onCreatePress}>
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
          <TextInput style={styles.textInput} placeholder='test@gmail.com' keyboardType='email-address'
            value={this.state.logEmail}
            onChangeText={(logEmail) => this.setState({ logEmail })}/>
        </View>
        
        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Password</Text>
          <TextInput style={styles.textInput} placeholder='****' secureTextEntry={true}
            value={this.state.logPassword}
            onChangeText={(logPassword) => this.setState({ logPassword })}/>
          <TouchableOpacity onPress={this.onForgotPasswordPress}>
            <Text style={{color: '#000000', marginTop: 8, textAlign: 'right'}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={this.onSignInPress}>
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
          <TextInput style={styles.textInput} placeholder='username'/>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Email</Text>
          <TextInput style={styles.textInput} placeholder='name@gmail.com' keyboardType='email-address'/>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Phone</Text>
          <TextInput style={styles.textInput} placeholder='+1234567890' keyboardType='phone-pad'/>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Date of Birth</Text>
          <TextInput style={styles.textInput} placeholder='01/01/2026'/>
        </View>

        <View style={styles.block}>
          <Text style={{fontWeight: 'bold'}}>Address</Text>
          <TextInput style={styles.textInput} placeholder='123 Main St'/>
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
      
        <TouchableOpacity style={styles.button} onPress={this.onLogoutPress}>
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