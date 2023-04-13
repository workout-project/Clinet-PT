import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './Navigator/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { UserContextProvider } from './Contexts/UserContext';
import { DetailsContextProvider } from './Contexts/DetailContext';
export default function App() {
  return (
    <UserContextProvider>
      <DetailsContextProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </DetailsContextProvider>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
