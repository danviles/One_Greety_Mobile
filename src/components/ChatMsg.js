import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatMsg = ({color, usuario, msg}) => {
  return (
    <View style={styles.chatMsgContenedor}>
      <TouchableOpacity>
        <Text style={[styles.chatUsuario, {color: color}]}>{usuario}: </Text>
      </TouchableOpacity>
      <Text style={styles.chatMsg}>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatMsgContenedor: {
    flexDirection: 'row',
  },
  chatUsuario: {
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {width: 1, height: 1},
    fontSize: 16,
  },
  chatMsg: {
    fontSize: 16,
  },
});

export default ChatMsg;
