import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ChatMsg = ({navigation, id, color, usuario, msg}) => {
  const handlePerfilUsuario = () => {
    navigation.navigate('PerfilUsuario', {id});
  };
  return (
    <>
      <View style={styles.chatMsgContenedor}>
        <TouchableOpacity onPress={handlePerfilUsuario}>
          <Text style={[styles.chatUsuario, {color: color}]}>{usuario}: </Text>
        </TouchableOpacity>
        <Text style={styles.chatMsg}>{msg}</Text>
      </View>
    </>
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
