import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ScreenName {
  MainScreen = 'MainScreen',
  DetailScreen = 'DetailScreen',
}

export type ScreenParamList = {
  MainScreen: undefined;
  DetailScreen: undefined;
};

export type MainScreenProps = NativeStackScreenProps<
  ScreenParamList,
  ScreenName.MainScreen
>;

export type DetailScreenProps = NativeStackScreenProps<
  ScreenParamList,
  ScreenName.DetailScreen
>;
