import * as React from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import portalContext from '../context/portal/portalContext';

export type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
  valueColor: string;
};

export type ItemData = {
  created_at: string | null;
  id: number;
  name: string | null;
};


const Item: React.FC = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  valueColor,
}: ItemProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const {visible, show} = useContext(portalContext);
  const { name } = item;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, {backgroundColor}]}>
      <Text style={[styles.title, {color: textColor}]}>{name}</Text>
      <Text style={[styles.number, {color: valueColor}]}>0</Text>
      <IconButton
        mode="outlined"
        iconColor="black"
        icon={visible ? 'chevron-up-circle' : 'chevron-down-circle'}
        onPress={show}
        size={50}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 23,
  },
  number: {
    marginLeft: 'auto',
    fontSize: 23,
  },
});

export default Item;
