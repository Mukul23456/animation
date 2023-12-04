import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Pagination from './Pagination';
import img1 from '../assets/5.jpg';
import img2 from '../assets/3.webp';
import img3 from '../assets/4.webp';
import img4 from '../assets/2.jpg';

const { width, height } = Dimensions.get('window');

const items = [
  {
    id: 1,
    image: img1,
    title: 'CAPTAIN AMERICA CIVIL WAR',
  },
  {
    id: 2,
    image: img2,
    title: 'OPPENHEIMER',
  },
  {
    id: 3,
    image: img3,
    title: 'JAWAN',
  },
  {
    id: 4,
    image: img4,
    title: 'ANT-MAN',
  },
  {
    id: 5,
    image: img1,
    title: 'CAPTAIN AMERICA CIVIL WAR',
  },
];

const Carousel = () => {
  const scrollRef = useRef(null);
  const smallImageTranslation = useRef(new Animated.Value(0)).current;

  const onPanResponderMove = (_, gestureState) => {
    const { dx } = gestureState;
    smallImageTranslation.setValue(-dx);
  };

  const smallImagePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove,
    }),
  ).current;

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Animated.FlatList
        ref={scrollRef}
        data={items}
        bounces={false}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: smallImageTranslation } },
            },
          ],
          { useNativeDriver: true },
        )}
        renderItem={({ item, index }) => {
          
          const titleInputRange = [
            width * (index - 1),
            width * index,
            width * (index + 1),
          ];

          const titleOpacity = smallImageTranslation.interpolate({
            inputRange: titleInputRange,
            outputRange: [-3, 1, -3],
          });

          return (
            <View style={styles.item}>
              <Animated.View style={styles.overlay} />
              <Animated.Image
                source={item.image}
                style={[
                  styles.image,
                  {
              
                    opacity: smallImageTranslation.interpolate({
                      inputRange: [
                        width * (index - 1),
                        width * index,
                        width * (index + 1),
                      ],
                      outputRange: [-2, 1, -2],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              />

              <Animated.View
                style={[
                  styles.titleContainer,
                  {
                    opacity: titleOpacity,
                  },
                ]}
              >
                <Animated.Image
                  source={item.image}
                  style={[
                    styles.titleImage,
                    {
                      transform: [
                        {
                          translateX: smallImageTranslation.interpolate({
                            inputRange: titleInputRange,
                            outputRange: [180, 0, -180],
                          }),
                        },
                      ],
                    },
                  ]}
                  {...smallImagePanResponder.panHandlers}
                />
              </Animated.View>
            </View>
          );
        }}
      />
      <Pagination
        items={items}
        scrollAnimation={smallImageTranslation}
        scrollRef={scrollRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  item: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
    
    position: 'absolute',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 140,
    zIndex: 1,
  },
  titleImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

export default Carousel;

