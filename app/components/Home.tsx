import {connect} from 'react-redux';
import React, {Component, PureComponent} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {switchVideo, toggleComment} from '../actions';
import Carousel from 'react-native-snap-carousel';
import {frameHeight, frameWidth} from '../utils';

const s2p = (s: any) => {
  return {
    ...s.home,
    version: s.app.version,
  };
};
const d2p = (d: any) => {
  return {
    switchVideo: (i: number) => d(switchVideo(i)),
    toggleComment: () => d(toggleComment()),
  };
};
export default connect(
  s2p,
  d2p,
)(
  class Home extends Component<any, any> {
    private videoArray = [
      require('../assets/video/01.mp4'),
      require('../assets/video/02.mp4'),
      require('../assets/video/03.mp4'),
      require('../assets/video/01.mp4'),
      require('../assets/video/02.mp4'),
      require('../assets/video/03.mp4'),
      require('../assets/video/01.mp4'),
      require('../assets/video/02.mp4'),
      require('../assets/video/03.mp4'),
      require('../assets/video/01.mp4'),
      require('../assets/video/02.mp4'),
      require('../assets/video/03.mp4'),
    ];

    constructor(props: any, context: any) {
      super(props, context);
      this.state = {currentVideoIndex: 0};
    }

    setPlayer = (p: any) => {
      this.setState({player: p});
    };

    onBuffer(n: any) {
      // console.log('buffer:', n);
    }
    onLoad(n: any) {
      // console.log('loaded:', n);
    }
    videoError(n: any) {
      console.log('error:', n);
    }

    render() {
      const {version, navigation, switchVideo, toggleComment} = this.props;
      const {currentVideoIndex} = this.state;
      return (
        <>
          <StatusBar barStyle="dark-content" translucent={true} />
          <SafeAreaView style={styles.view}>
            <Carousel
              vertical={true}
              windowSize={50}
              sliderWidth={frameWidth}
              itemWidth={frameWidth}
              sliderHeight={frameHeight}
              itemHeight={frameHeight}
              inactiveSlideScale={1}
              // loop={true}
              onSnapToItem={(slideIndex) => {
                switchVideo(slideIndex);
                this.setState({currentVideoIndex: slideIndex});
              }}
              data={this.videoArray}
              renderItem={(info: any) => (
                <VideoItem
                  index={info.index}
                  url={info.item}
                  onBuffer={this.onBuffer}
                  videoError={this.videoError}
                  onLoad={this.onLoad}
                  currentVideoIndex={currentVideoIndex}
                  toggleComment={toggleComment}
                />
              )}
            />
            <View style={{position: 'absolute', top: 44}}>
              <Button
                title={'Login'}
                onPress={() => navigation.navigate('Mine')}
              />
            </View>
            <Text style={styles.versionTxt}>{'version:' + version}</Text>
          </SafeAreaView>
        </>
      );
    }
  },
);

class VideoItem extends PureComponent<any> {
  render() {
    const {
      index,
      url,
      currentVideoIndex,
      onBuffer,
      videoError,
      onLoad,
      toggleComment,
    } = this.props;
    return (
      <>
        <Video
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
          resizeMode={'cover'}
          key={index.toString()}
          repeat={true}
          rate={index == currentVideoIndex ? 1 : 0}
          source={url}
          onBuffer={onBuffer}
          onError={videoError}
          onLoad={onLoad}
          style={styles.backgroundVideo}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 200,
            right: -10,
            transform: [{rotateZ: '-1.55'}],
          }}>
          <Button title={'Comment'} onPress={() => toggleComment()} />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  versionTxt: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginRight: 5,
    bottom: 0,
  },
});
