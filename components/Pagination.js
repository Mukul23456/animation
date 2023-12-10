import React from 'react';
import {Animated, Dimensions, View, StyleSheet, Pressable} from 'react-native';

const {width} = Dimensions.get('window');

const itemSize = 15;
const activeItemSize = itemSize;
const itemSpacing = 15;

const Pagination = ({items, scrollAnimation, scrollRef}) => {
  
  const translateX = scrollAnimation.interpolate({
    inputRange:items.map((_, i) => width * i),
    outputRange: items.map((_, i) => i * (itemSize + itemSpacing)),
  });

  return (
    <View style={styles.pagination}>
      <View style={styles.paginationInner}>
        <Animated.View
          style={[
            styles.activeItem,
            {
              transform: [{translateX}],
            },
          ]}
        />
        {items.map(({id}, index) => (
          <Pressable
            key={id}
            onPress={() => {
              scrollRef.current.scrollToOffset({
                animated: true,
                offset: width * index,
              });
            }}>
            <View
              style={[
                styles.item,
                index === 0 ? styles.firstItem : null,
                index === items.length - 1 ? styles.lastItem : null,
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',
    alignItems: 'center',
    width,
    height: itemSize,
    bottom: 60,
  },
  paginationInner: {
    flexDirection: 'row',
  },
  item: {
    width: itemSize,
    height: itemSize,
    backgroundColor: 'white',
    borderRadius: itemSize,
    marginRight: itemSpacing,
  },
  firstItem: {
    width: itemSize,
  },
  lastItem: {
    marginRight: 0,
  },
  activeItem: {
    position: 'absolute',
    
    width: activeItemSize + 13,
    height: activeItemSize,
    borderRadius: activeItemSize / 2,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
  },
});

export default Pagination;
