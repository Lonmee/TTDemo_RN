import {connect} from 'react-redux';
import React, {Component, PureComponent} from 'react';
import {
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {toggleComment} from '../actions';
import Modal from 'react-native-modal';
import {frameHeight, frameWidth} from '../utils';
import {TextInput} from 'react-native-gesture-handler';

const s2p = (s: any) => {
  return {
    currentVideoIndex: s.home.currentVideoIndex,
    isModalVisible: s.comment.isModalVisible,
  };
};
const d2p = (d: any) => {
  return {
    toggleComment: () => d(toggleComment()),
  };
};
export default connect(
  s2p,
  d2p,
)(
  class Comment extends Component<any, any> {
    state = {inputting: true}; // hide optional
    private mockData = [
      [
        'Comment of video0',
        'Comment of video0',
        'Comment of video0',
        'Comment of video0',
      ],
      [
        'Comment of video1',
        'Comment of video1',
        'Comment of video1',
        'Comment of video1',
      ],
      [
        'Comment of video2',
        'Comment of video2',
        'Comment of video2',
        'Comment of video2',
      ],
    ];
    private commentContent: string = '';
    private tf: any;
    private submitAndClear() {
      this.commentContent == '' ||
        this.mockData[this.props.currentVideoIndex % 3].unshift(
          this.commentContent,
        );
      this.commentContent = '';
      this.tf.clear();
    }
    render() {
      const {isModalVisible, toggleComment, currentVideoIndex} = this.props,
        {inputting} = this.state;
      return (
        <Modal
          style={styles.view}
          isVisible={isModalVisible}
          deviceWidth={frameWidth}
          deviceHeight={frameHeight}
          backdropOpacity={0}
          avoidKeyboard={true}
          onBackButtonPress={() => toggleComment()}
          onBackdropPress={() => toggleComment()}>
          <View
            style={{
              flex: 0.6,
              backgroundColor: '#999',
            }}>
            <FlatList
              style={{flex: 1}}
              data={this.mockData[currentVideoIndex % 3].reverse()}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingTop: 40, alignItems: 'center'}}
              renderItem={(info) => (
                <CommentItem
                  data={info.item}
                  onFocus={() => this.setState({inputting: true})}
                />
              )}
            />
            {inputting && (
              <KeyboardAvoidingView style={styles.container}>
                <TextInput
                  ref={(ref) => (this.tf = ref)}
                  style={styles.textInputStyle}
                  blurOnSubmit={true}
                  onChangeText={(text) => (this.commentContent = text)}
                  onSubmitEditing={() => {
                    this.submitAndClear();
                  }}
                />
                <Button
                  title="Send"
                  color={'white'}
                  onPress={() => {
                    this.submitAndClear();
                    this.tf.blur();
                  }}
                />
              </KeyboardAvoidingView>
            )}
            <View style={{position: 'absolute', right: 4, top: 2}}>
              <Button title="X" onPress={() => toggleComment()} />
            </View>
          </View>
        </Modal>
      );
    }
  },
);

class CommentItem extends PureComponent<any> {
  render() {
    const {data, onFocus} = this.props;
    return (
      <TouchableWithoutFeedback onPress={onFocus}>
        <View
          style={{
            paddingTop: 10,
            width: frameWidth * 0.8,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <View style={{flexDirection: 'column', paddingRight: 10}}>
            <Text style={{color: '#00dd00', fontSize: 12}}>Icon</Text>
            <Text style={{color: '#00dd00', fontSize: 12}}>Icon</Text>
          </View>
          <Text style={{fontSize: 22}}>{data}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    height: 60,
    width: frameWidth,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  textInputStyle: {
    fontSize: 22,
    width: frameWidth * 0.8,
    height: 40,
    backgroundColor: '#CCC',
  },
});
