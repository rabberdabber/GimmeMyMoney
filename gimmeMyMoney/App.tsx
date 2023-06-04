/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import Navigation from './src/navigation/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider, Portal} from 'react-native-paper';
import PortalProvider from './src/context/portal/PortalProvider';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <PortalProvider>
          <Navigation />
        </PortalProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
