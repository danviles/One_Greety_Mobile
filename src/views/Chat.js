/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Cabecera from '../components/Cabecera';
import {useTheme, TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatMsg from '../components/ChatMsg';
import useAuth from '../hooks/useAuth';
import useEspacio from '../hooks/useEspacio';
import useChat from '../hooks/useChat';
import io from 'socket.io-client';
import {BACKEND_ROOT} from '@env';

let socket;

const Chat = ({navigation}) => {
  const {colors, chatColors} = useTheme();
  const {espacio} = useEspacio();
  const {auth} = useAuth();
  const {chatMsgs, addChatMsg, actualizarChat} = useChat();
  const scrollsref = useRef();

  const [showButton, setShowButton] = useState(false);
  const [msg, setMsg] = useState('');
  const [userColor, setUserColor] = useState({});

  useEffect(() => {
    socket = io(BACKEND_ROOT);
    socket.emit('chat room', espacio._id);
  }, []);

  useEffect(() => {
    const eventListener = data => {
      if (!userColor[data.usuario]) {
        const keys = Object.keys(chatColors);
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomColor = chatColors[keys[randomIndex]];
        setUserColor({...userColor, [data.usuario]: randomColor});
      }
      actualizarChat(data);
    };
    socket.on('msg agregado', eventListener);

    return () => socket.off('msg agregado', eventListener);
  });

  useFocusEffect(
    React.useCallback(() => {
      scrollsref.current.scrollToEnd({animated: true});
    }, []),
  );

  const handleInputFocus = () => {
    scrollsref.current.scrollToEnd({animated: true});
  };

  const handleSend = () => {
    if (!userColor[auth.usu_nombre]) {
      const keys = Object.keys(chatColors);
      const randomIndex = Math.floor(Math.random() * keys.length);
      const randomColor = chatColors[keys[randomIndex]];
      setUserColor({...userColor, [auth.usu_nombre]: randomColor});
    }

    addChatMsg({usuid: auth._id, usuario: auth.usu_nombre, msg}, espacio._id);

    setMsg('');
    scrollsref.current.scrollToEnd({animated: true});
    Keyboard.dismiss();
  };

  return (
    <>
      {showButton ? (
        <Cabecera
          titulo={'Chat'}
          icono={'chevron-double-down'}
          color={colors.azul}
          func={() => scrollsref.current.scrollToEnd({animated: true})}
        />
      ) : (
        <Cabecera titulo={'Chat'} />
      )}

      <KeyboardAvoidingView behavior="padding">
        <View style={styles.chatContenedor}>
          <FlatList
            keyboardShouldPersistTaps="handled"
            onEndReached={() => setShowButton(false)}
            onEndReachedThreshold={0.1}
            onScrollBeginDrag={() => setShowButton(true)}
            getItemLayout={(data, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
            ref={scrollsref}
            data={chatMsgs}
            renderItem={({item, index}) => (
                <ChatMsg
                  navigation={navigation}
                  id={item.usuid}
                  usuario={item.usuario}
                  color={userColor[item.usuario]}
                  msg={item.msg}
                />
            )}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.inputContenedor}>
        <ScrollView>
          <View style={styles.chatInputContenedor}>
            <TextInput
              style={styles.inputText}
              theme={{borderColor: 100, colors: {primary: colors.azul}}}
              placeholder="Mensaje"
              dense={true}
              multiline={true}
              mode="outlined"
              onFocus={handleInputFocus}
              onChangeText={text => setMsg(text.replace(/[\r\n]+/g, ""))}
              value={msg}
            />
          </View>
        </ScrollView>
        <TouchableOpacity onPress={handleSend}>
          <View style={styles.contenedorSend}>
            <View style={[styles.icon, {backgroundColor: colors.azul}]}>
              <MaterialCommunityIcons
                name={'send-outline'}
                color={'white'}
                size={20}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputContenedor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    bottom: 0,
  },
  chatInputContenedor: {
    maxHeight: 140,
  },
  inputText: {
    marginVertical: 5,
    height: 40,
  },
  contenedorSend: {
    marginBottom: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 5,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatContenedor: {
    marginHorizontal: 10,
    marginBottom: 70,
    maxHeight: 523,
    minHeight: 240,
    paddingBottom: 10,
  },
});

export default Chat;
