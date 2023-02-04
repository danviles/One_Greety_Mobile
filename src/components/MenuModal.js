/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
import React, {useRef, useState, useMemo} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MenuModalSeguidores from './MenuModalSeguidores';
import MenuModalCrud from './MenuModalCrud';
import useForo from '../hooks/useForo';
import {BottomSheetModalProvider, BottomSheetModal, useBottomSheetModal} from '@gorhom/bottom-sheet';
const MenuModal = ({openModal}) => {
  const {esAdmin, esColaborador, esCreador} = useForo();
  const modalRef = useRef(null);
  const {dismiss} = useBottomSheetModal();
  const snapPoints = useMemo(() => ['15%', '30%'], []);
  const [isOpen, setIsOpen] = useState(false);

  const mostrarModal = () => {
    modalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  openModal.current = {
    mostrarModal,
  };

  const onDimissisModal = () => {
    setIsOpen(false);
    dismiss();
  };

  switch (true) {
    case esAdmin:
    case esColaborador:
    case esCreador:
      return (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={modalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{borderRadius: 50, borderWidth: 1}}
            onDismiss={onDimissisModal}
            >
            <MenuModalCrud />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      );
      break;

    default:
      return (
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={modalRef}
            index={0}
            snapPoints={snapPoints}
            backgroundStyle={{borderRadius: 50, borderWidth: 1}}
            onDismiss={() => setIsOpen(false)}>
            <MenuModalSeguidores />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      );
      break;
  }
};

export default MenuModal;
