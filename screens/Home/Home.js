import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StatusBar,
} from 'react-native';
import Title from '../../components/Title/Title';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import style from './style';
import UserStory from '../../components/UserStory/userStory';
import UserPost from '../../components/UserPost/UserPost';
import {scaleFontSize} from '../../assets/styles/scaling';
import globalStyle from '../../assets/styles/globalStyle';
import {Routes} from '../../navigation/Routes';

const Home = ({navigation}) => {
  const userStories = [
    {
      id: 1,
      name: 'Nazar',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
    {
      id: 2,
      name: 'Ores',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
    {
      id: 3,
      name: 'Vlad',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
    {
      id: 4,
      name: 'Bublik',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
    {
      id: 5,
      name: 'Barasha',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
    {
      id: 6,
      name: 'Boichuk',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
    {
      id: 7,
      name: 'Kolya',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
    {
      id: 8,
      name: 'Andrii',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
    {
      id: 9,
      name: 'Pituh',
      profileImage: require('../../assets/images/ordila.jpg'),
    },
  ];
  const userPosts = [
    {
      firstName: 'Orest',
      lastName: 'Burmei',
      location: 'IF, UA',
      likes: 1201,
      comments: 24,
      bookmarks: 55,
      image: require('../../assets/images/top_car.jpg'),
      profileImage: require('../../assets/images/ordila.jpg'),
      id: 1,
    },
    {
      firstName: 'Nazar',
      lastName: 'Kuryshchuk',
      location: 'Lviv, UA',
      likes: 3291,
      comments: 25,
      bookmarks: 70,
      image: require('../../assets/images/top_car.jpg'),
      profileImage: require('../../assets/images/ordila.jpg'),
      id: 2,
    },
    {
      firstName: 'Vasya',
      lastName: 'Barasha',
      location: 'Kolomia, UA',
      likes: 100,
      comments: 8,
      bookmarks: 3,
      image: require('../../assets/images/top_car.jpg'),
      profileImage: require('../../assets/images/ordila.jpg'),
      id: 3,
    },
    {
      firstName: 'Vasya',
      lastName: 'Bublik',
      location: 'Kolomia, UA',
      likes: 1001,
      comments: 15,
      bookmarks: 10,
      image: require('../../assets/images/top_car.jpg'),
      profileImage: require('../../assets/images/ordila.jpg'),
      id: 4,
    },
    {
      firstName: 'Lubchik',
      lastName: 'Boichuk',
      location: 'Lviv, UA',
      likes: 1322,
      comments: 23,
      bookmarks: 30,
      image: require('../../assets/images/top_car.jpg'),
      profileImage: require('../../assets/images/ordila.jpg'),
      id: 5,
    },
  ];

  const userStoriesPageSize = 4;
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1);
  const [userStoriesRenderedData, setUserStoriesRenderedData] = useState([]);
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false);

  const userPostsPageSize = 2;
  const [userPostsCurrentPage, setUserPostsCurrentPage] = useState(1);
  const [userPostsRenderedData, setUserPostsRenderedData] = useState([]);
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false);

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

    setIsLoadingUserPosts(true);
    const getInitialDataPosts = pagination(userPosts, 1, userPostsPageSize);
    setUserPostsRenderedData(getInitialDataPosts);
    setIsLoadingUserPosts(false);
  }, []);

  return (
    <SafeAreaView style={globalStyle.backgroundWhite}>
      <View>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={style.header}>
                <Title title={'Stogram'} />
                <TouchableOpacity
                  style={style.messageIcon}
                  onPress={() => {
                    navigation.navigate(Routes.Profile);
                  }}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={scaleFontSize(20)}
                    color={'#898DAE'}
                  />
                  <View style={style.messageNumberContainer}>
                    <Text style={style.messageNumber}>2</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={style.userStoryContainer}>
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
                      setUserStoriesRenderedData(prev => [
                        ...prev,
                        ...contentToAppend,
                      ]);
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
                      profileImage={item.profileImage}
                    />
                  )}
                />
              </View>
            </>
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (isLoadingUserPosts) {
              return;
            }
            setIsLoadingUserPosts(true);
            const contentToAppend = pagination(
              userPosts,
              userPostsCurrentPage + 1,
              userPostsPageSize,
            );
            if (contentToAppend.length > 0) {
              setUserPostsCurrentPage(userPostsCurrentPage + 1);
              setUserPostsRenderedData(prev => [...prev, ...contentToAppend]);
            }
            setIsLoadingUserPosts(false);
          }}
          showsVerticalScrollIndicator={false}
          data={userPostsRenderedData}
          renderItem={({item}) => (
            <View style={style.userPostContainer}>
              <UserPost
                firstName={item.firstName}
                lastName={item.lastName}
                image={item.image}
                likes={item.likes}
                comments={item.comments}
                bookmarks={item.bookmarks}
                profileImage={item.profileImage}
                location={item.location}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
