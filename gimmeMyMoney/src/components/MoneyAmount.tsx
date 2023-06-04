import * as React from 'react';
import {useContext, useState, useMemo, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Chip, Provider, Portal, Modal, IconButton} from 'react-native-paper';
import portalContext from '../context/portal/portalContext';

const CustomIconButton = ({
  iconName,
  onPress,
}: {
  iconName: string;
  onPress: () => void;
}) => {
  return (
    <IconButton onPress={onPress} icon={iconName} iconColor="gray" size={30} />
  );
};

const CustomChip = ({
  children,
  index,
  counts,
  setCounts,
}: {
  children: string;
  index: number;
  counts: number[];
  setCounts: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [count, setCount] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  useEffect(() => {
    if (count != counts[index]) {
      setCount(counts[index]);
    }
  }, [count, counts]);

  const setCountsHelper = (type: "add" | "subtract", value: number) => {
    setCounts(counts => {
        const newCounts = [...counts];
        if (type === "add") {
            newCounts[index] += value;
        }
        else if (type === "subtract") {
            newCounts[index] -= value;
        }
        return newCounts;
      });
  }

  const setCountHelper = (value: number) => {
    setCount(value => {
        setCounts(counts => {
            const newCounts = [...counts];
            newCounts[index] = value;
            return newCounts;
        })
        return value;
    })
  } 

  const onPressUp = () => {
    // setCount(count + 1);
    // setCountsHelper("add", 1);
    setCountHelper(count + 1);
};

const onPressDown = () => {
    // setCount(count - 1);
    // setCountsHelper("subtract", 1);
    setCountHelper(count - 1);
};

  return (
    <View style={styles.chipContainer}>
      <View style={styles.chipUpperContainer}>
        <Chip
          mode="flat"
          key={children}
          onPress={onPressUp}
          selectedColor="white"
          style={{width: '60%', height: '80%'}}>
          {children}
        </Chip>
        <View style={styles.iconContainer}>
          <CustomIconButton
            key={1}
            onPress={onPressUp}
            iconName="arrow-up-bold"
          />
          <CustomIconButton
            key={2}
            onPress={() => setCount(0)}
            iconName="restart"
          />
          <CustomIconButton
            key={3}
            onPress={onPressDown}
            iconName="arrow-down-bold"
          />
        </View>
      </View>
      <Text
        style={{
          alignSelf: 'flex-start',
          marginLeft: 35,
          fontSize: 20,
          color: 'black',
        }}>
        {' '}
        {count}{' '}
      </Text>
    </View>
  );
};

const MoneyAmount: React.FC = () => {
  const {visible, hide} = useContext(portalContext);
  const [counts, setCounts] = useState(Array.from({length: 6}, () => 0));
  const valuesInWon = ['1K', '10K', '50K', '100K', '500K', '1M'];
  const valuesInDigit = [1000, 10000, 50000, 100000, 500000, 1000000];
  const mappedItems = valuesInWon.map((value, index) => (
    <View style={styles.chip} key={index}>
      <CustomChip
        index={index}
        counts={counts}
        setCounts={setCounts}>
        {value}
      </CustomChip>
    </View>
  ));

  const sum = useMemo(() => {
    var s = 0;
    counts.forEach((count, index) => {
      s += valuesInDigit[index] * count;
    });

    return s;
  }, [counts]);

  const flush = () => {
    setCounts(Array.from({length: 6}, () => 0));
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hide}
          contentContainerStyle={styles.container}>
          <>
            {mappedItems}
            <IconButton
              icon="restart"
              iconColor="black"
              size={50}
              onPress={flush}
            />
            <Text style={{color: 'black', fontSize: 20}}>
              {' '}
              Total:{' '}
              <Text style={{fontSize: 30, color: 'red'}}>
                {' '}
                {sum / 10000} 만원
              </Text>{' '}
            </Text>
          </>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default MoneyAmount;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignContent: 'flex-end',
  },
  chipContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipUpperContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  chip: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 10,
  },
  iconContainer: {
    flex: 1,
    height: '80%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
