import React, {useEffect} from 'react';
import { Button, Paragraph, Dialog, Portal} from 'react-native-paper';
import useAlerta from '../hooks/useAlerta';

const AlertaComponent = ({ title, desc, btext}) => {
  const {visible, mostrarAlerta, ocultarAlerta} = useAlerta();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={ocultarAlerta}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{desc}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={ocultarAlerta}>{btext}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AlertaComponent;
