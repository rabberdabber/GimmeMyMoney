import * as React from 'react';
import {MainScreenProps, ScreenName} from '../navigation/type';
import {useState, useContext, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View, Text, Alert} from 'react-native';
import Item, {ItemData} from '../components/Item';
import MoneyAmount from '../components/MoneyAmount';
import portalContext from '../context/portal/portalContext';
import {get_users, add_user} from '../supabase/api';
import CustomTextInput from '../components/TextInput';
import {IconButton} from 'react-native-paper';

const MainScreen = ({navigation}: MainScreenProps) => {
  const [selectedId, setSelectedId] = useState<number>();
  const {visible} = useContext(portalContext);
  const [users, setUsers] = useState<ItemData[]>([]);
  const [newUser, setNewUser] = useState<string>('');
  const [searchUser, setSearchUser] = useState<string>('');

  const fetch_users = async () => {
    const result = await get_users();
    setUsers(result);
  };

  useEffect(() => {
    fetch_users();
  }, []);

  const onPressAddNewUser = async () => {
    if (newUser !== '') {
      try {
        let _ = await add_user(newUser, users.length + 1);
        fetch_users();
        Alert.alert('New User Added','New User Added', [
          { text: "Alrighty", 
            onPress: () => {
           }
          }
        ])
      } catch (err) {
        throw new Error(err);
      }
    }
  };

  const onPressSearchUser = async () => {
    try {
      // let _ = await add_user(newUser, users.length + 1);
      // fetch_users();
      // Alert.alert('New User Added','New User Added', [
      //   { text: "Alrighty", 
      //     onPress: () => {
      //     }
      //   }
      // ])
    } catch (err) {
      throw new Error(err);
    }
  };

  const renderItem = ({item}: {item: ItemData}) => {
    const {id} = item;
    const backgroundColor = id === selectedId ? '#add8e6' : '#778899';
    const color = id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(id);
          navigation.navigate(ScreenName.DetailScreen);
        }}
        backgroundColor={backgroundColor}
        textColor={color}
        valueColor="black"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {visible ? (
        <MoneyAmount />
      ) : (
        <>
          <IconButton
            style={styles.icon}
            icon="cash-check"
            size={50}
            iconColor="black"
          />
          <Text style={styles.appText}>GIMME MY MONEY</Text>
          <View style={styles.inputGroupContainer}>
            <View style={styles.inputContainer}>
              <CustomTextInput
                label="add new user"
                placeholder="Bake"
                text={newUser}
                setText={setNewUser}
                style={styles.input}
                backgroundColor="white"
                id="add user input"
              />
              <IconButton size={50} icon="plus-thick" onPress={onPressAddNewUser} />
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                label="search user"
                placeholder="rabberdabber"
                text={searchUser}
                setText={setSearchUser}
                style={styles.input}
                backgroundColor="white"
                id="search user input"
              />
              <IconButton size={50} icon="account-search" onPress={onPressSearchUser} />
            </View>
          </View>
          <View style={styles.list}>
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 5,
  },
  appText: {
    color: '#778899',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
  },
  item: {
    padding: 20,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  button: {
    width: 70,
    height: 100,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
  title: {
    fontSize: 32,
  },
  inputGroupContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 30,
  },
  input: {
    width: '70%',
    height: 60,
    marginLeft: 'auto',
    backgroundColor: 'inherit',
  },
  list: {
    flex: 10,
  },
});

export default MainScreen;
