import {map} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {getNewsMoviesApi} from '../api/movies';
import usePreferences from '../hooks/usePreferences';
import {BASE_PATH_IMG} from '../utils/constants';

const {width} = Dimensions.get('window');

const News = ({navigation}) => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(true);
  const {theme} = usePreferences();

  useEffect(() => {
    getNewsMoviesApi(page).then((response) => {
      const totalPages = response.total_pages;
      if (page < totalPages) {
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowMore(false);
      }
    });
  }, [page]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {map(movies, (movie, index) => (
          <Movie key={index} movie={movie} navigation={navigation} />
        ))}
      </View>
      {showMore && (
        <Button
          mode="contained"
          contentStyle={styles.loadMoreContainer}
          style={styles.loadMore}
          labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}
          onPress={() => setPage(page + 1)}>
          Cargar mas...
        </Button>
      )}
    </ScrollView>
  );
};



const Movie = ({movie, navigation}) => {
  const {id, title, poster_path} = movie;

  const goMovie = () => {
    navigation.navigate("movie", {id})
}

  return (
    <TouchableWithoutFeedback onPress={goMovie}>
      <View style={styles.movie}>
        {poster_path ? (
          <Image
            style={styles.image}
            source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
          />
        ) : (
          <Text>{title}</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
