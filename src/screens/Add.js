import React from "react";
import * as RN from "react-native";
import EmojiPicker, { emojisByCategory } from "rn-emoji-keyboard";
import { database } from '../config/firebase';
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


export default function Add() {
    const navigation = useNavigation();

    const [isOpen, setIsOpen] = React.useState(false); // Abre el menu de emojis
    const [newItem, setNewItem] = React.useState({ // elemento a almacenar
        emoji: '(-_-)',
        name: '',
        price: 0,
        isSold: false,
        createAt: new Date()
    });

    const onSend = async () => { // enviar a la base de datos
        await addDoc(collection(database, 'productos'), newItem);
        alert('Producto publicado');
        navigation.goBack();
    };
    const handlePick = (emojiObject) => { // cambia el emoji
        setNewItem({
            ...newItem,
            emoji: emojiObject.emoji,
        });
    }

    return (
        <RN.View style={styles.container}>
            <RN.Text style={styles.title}>Vender nuevo producto</RN.Text>
            <RN.Text style={styles.emoji} onPress={() => setIsOpen(true)}>{newItem.emoji}</RN.Text>
            <EmojiPicker
                onEmojiSelected={handlePick}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <RN.TextInput
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
                placeholder='Nombre del producto'
                style={styles.inputContainer}
            />
            <RN.TextInput
                onChangeText={(text) => setNewItem({ ...newItem, price: text })}
                placeholder='$ Precio'
                style={styles.inputContainer}
            />
            <RN.Button title='Publish' onPress={onSend} />
        </RN.View>
    );
}

const styles = RN.StyleSheet.create({ // Estilos CSS
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '700'
    },
    inputContainer: {
        width: '90%',
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6
    },
    emoji: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        padding: 10,
        marginVertical: 6
    }
})