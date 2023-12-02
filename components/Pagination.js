import React from 'react';
import { Animated, Dimensions, View, StyleSheet, Pressable } from 'react-native';

const { width } = Dimensions.get('window');

const itemSize = 15;
const activeItemSize = itemSize + 4;
const itemSpacing = 15;

const Pagination = ({ items, scrollAnimation, scrollRef }) => {
  const inputRange = items.map((_, i) => width * i);

  const translateX = scrollAnimation.interpolate({
    inputRange,
    outputRange: items.map((_, i) => i * (itemSize + itemSpacing)),
  });

  const scale = scrollAnimation.interpolate({
    inputRange,
    outputRange: items.map((_, i) => {
      const baseScale = 0.8;
      const scaleFactor = 0.2;
      const distance = Math.abs(i * (itemSize + itemSpacing) - translateX._value);
      const scaleValue = 1 - scaleFactor * (distance / width);
      return scaleValue > baseScale ? scaleValue : baseScale;
    }),
  });

  const opacity = scrollAnimation.interpolate({
    inputRange,
    outputRange: items.map(() => 1),
  });

  return (
    <View style={styles.pagination}>
      <View style={styles.paginationInner}>
        <Animated.View
          style={[
            styles.activeItem,
            {
              transform: [{ translateX }, { scale }],
              opacity,
            },
          ]}
        />
        {items.map(({ id }, index) => (
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
    left: (itemSize - activeItemSize) / 2,
    top: (itemSize - activeItemSize) / 2,
    width: activeItemSize+13,
    height: activeItemSize,
    borderRadius: activeItemSize / 2,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'white',
  },
});

export default Pagination
