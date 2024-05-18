import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../screens/auth/Splash';
import Phone from '../screens/auth/Phone';
import Otp from '../screens/auth/Otp';
import Main from '../screens/home/Main';
import Form from '../screens/home/Form';
import Login from '../screens/auth/Login';
import Details from '../screens/home/Details';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Phone" component={Phone} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default MyStack;