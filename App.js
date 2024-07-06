import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from 'react-native';
import Title from './components/Title/Title';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import globalStyle from './assets/styles/globalStyle';
import UserStory from './components/UserStory/userStory';

const App = () => {
  const userStories = [
    {
      id: 1,
      name: 'Nazar',
      image: require('./assets/images/ordila.jpg'),
    },
    {
      id: 2,
      name: 'Ores',
      image: require('./assets/images/ordila.jpg'),
    },
    {
      id: 3,
      name: 'Vlad',
      image: require('./assets/images/ordila.jpg'),
    },
    {
      id: 4,
      name: 'Bublik',
      image: require('./assets/images/ordila.jpg'),
    },
    {
      id: 5,
      name: 'Barasha',
      image: require('./assets/images/ordila.jpg'),
    },
    {
      id: 6,
      name: 'Boichuk',
      image: require('./assets/images/ordila.jpg'),
    },
    {
      id: 7,
      name: 'Kolya',
      image: require('./assets/images/ordila.jpg'),
    },
    {
      id: 8,
      name: 'Andrii',
      image: require('./assets/images/ordila.jpg'),
    },
    {
      id: 9,
      name: 'Pituh',
      image: require('./assets/images/ordila.jpg'),
    },
  ];

  const userStoriesPageSize = 4;
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1);
  const [userStoriesRenderedData, setUserStoriesRenderedData] = useState([]);
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false);

  const pagination = (database, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    if (startIndex >= database.length) {
      return [];
    }
    return database.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setIsLoadingUserStories(true);
    const getInitialData = pagination(userStories, 1, userStoriesPageSize);
    setUserStoriesRenderedData(getInitialData);
    setIsLoadingUserStories(false);
  }, []);

  return (
    <SafeAreaView>
      <View style={globalStyle.header}>
        <Title title={'Stogram'} />
        <TouchableOpacity style={globalStyle.messageIcon}>
          <FontAwesomeIcon icon={faEnvelope} size={20} color={'#898DAE'} />
          <View style={globalStyle.messageNumberContainer}>
            <Text style={globalStyle.messageNumber}>2</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={globalStyle.userStoryContainer}>
        <FlatList
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (isLoadingUserStories) {
              return;
            }
            setIsLoadingUserStories(true);
            const contentToAppend = pagination(
              userStories,
              userStoriesCurrentPage + 1,
              userStoriesPageSize,
            );
            if (contentToAppend.length > 0) {
              setUserStoriesCurrentPage(userStoriesCurrentPage + 1);
              setUserStoriesRenderedData(prev => [...prev, ...contentToAppend]);
            }
            setIsLoadingUserStories(false);
          }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={userStoriesRenderedData}
          renderItem={({item}) => (
            <UserStory
              key={'userStory' + item.id}
              firstName={item.name}
              profileImage={item.image}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;
