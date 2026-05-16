# React native

## **Crear el proyecto con Expo**

### **Crear proyecto**

```bash
npx create-expo-app crud-tutorial --template blank
```

![image.png](React%20native/image.png)

### **Entrar al proyecto**

```bash
cd crud-tutorial
```

### **Abrir en VS Code**

```bash
code .
```

### **Ejecutar el proyecto**

```bash
npx expo start
```

![image.png](React%20native/image%201.png)

## **Instalar dependencias**

### **Instalar Firebase**

```bash
npm install firebase
```

### **Instalar manejo de variables de entorno**

```bash
npm install expo-constants expo-dotenv
npm install dotenv
```

- `expo-constants`: permite acceder a configuraciones del proyecto.
- `expo-dotenv`: ayuda a manejar variables privadas como llaves de Firebase.

### **Instalar React Navigation**

```bash
npm install @react-navigation/native
```

Permite navegar entre pantallas en React Native.

### **Instalar navegación tipo Stack**

```bash
npm install @react-navigation/native-stack
```

Permite crear navegación estilo pila:

- Abrir pantallas
- Volver atrás
- Mostrar modales

### **Instalar dependencias necesarias para navegación**

```bash
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
```

Son librerías necesarias para que React Navigation funcione correctamente.

Por ejemplo:

- Gestos
- Animaciones
- Manejo de pantallas
- Íconos

### **Instalar selector de emojis**

```bash
npm install rn-emoji-keyboard
```

Instala un componente visual para seleccionar emojis.

### **Instalar SVG**

```bash
npx expo install react-native-svg
```

Permite renderizar gráficos SVG, requeridos por el emoji picker.

## **Crear proyecto en Firebase**

[Firebase Console](https://console.firebase.google.com/?utm_source=chatgpt.com)

### **Crear Firestore Database**

1. Crear proyecto
2. Desactivar Google Analytics
3. Bases de datos y almacenamiento >> Firestore
    
    ![image.png](React%20native/image%202.png)
    
4. Create Database
5. Start in test mode

### **Registrar aplicación web**

En Firebase:

![image.png](React%20native/image%203.png)

- Configuración del proyecto
- Add App
- Web App

![image.png](React%20native/image%204.png)

Firebase entregará una configuración similar a esta:

```jsx
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## **Crear variables de entorno**

### **Crear archivo `.env` en la raiz del proyecto**

```
API_KEY=xxxx
AUTH_DOMAIN=xxxx
PROJECT_ID=xxxx
STORAGE_BUCKET=xxxx
MESSAGING_SENDER_ID=xxxx
APP_ID=xxxx
```

Guarda información sensible fuera del código.

Esto evita exponer credenciales al subir el proyecto a GitHub.

Cambiar  *xxxx* por los valores de Firebase

### **Agregar `.env` al `.gitignore`**

```
.env
```

## **Configurar Expo**

Renombrar:

```bash
app.json
```

por:

```bash
app.config.js
```

Importamos dotenv

```jsx
import 'dotenv/config';

export default {
  "expo": {
```

## **Código**

```jsx
import 'dotenv/config';

export default {
  "expo": {
    "name": "crud-tutorial",
    "slug": "crud-tutorial",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/android-icon-foreground.png",
        "backgroundImage": "./assets/android-icon-background.png",
        "monochromeImage": "./assets/android-icon-monochrome.png"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  }
}

```

Agregar sección extra. Permite acceder a las variables del `.env` desde cualquier parte de la aplicación.

## **Crear estructura del proyecto**

```
src/
 ├── components
 ├── config
 ├── screens
 └── Navigation.js
```

![image.png](React%20native/image%205.png)

Separar archivos facilita:

- mantenimiento
- escalabilidad
- reutilización de componentes

## **Configurar Firebase**

### **Crear archivo**

```bash
src/config/firebase.js
```

### **Código**

```jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
```

- `initializeApp`: inicia Firebase.
- `getFirestore`: conecta Firestore.
- `Constants`: accede a variables del proyecto.

```jsx
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  databaseURL: Constants.expoConfig.extra.databaseURL,
}

initializeApp(firebaseConfig);
export const database = getFirestore();
```

Extrae las variables de entorno configuradas anteriormente.

Inicializa la conexión con Firebase.

Crea y exporta la conexión a Firestore para usarla en toda la app.

## **Configurar navegación**

### **Crear pantallas**

```
src/screens/Home.js
src/screens/Add.js
```

![image.png](React%20native/image%206.png)

### **Home.js**

```jsx
import React from "react";
import * as RN from "react-native";

export default function Home() {
  return (
    <RN.View>
      <RN.Text>Home Screen</RN.Text>
    </RN.View>
  );
}
```

### **Add.js**

```jsx
import React from "react";
import * as RN from "react-native";

export default function Add() {
  return (
    <RN.View>
      <RN.Text>Add Screen</RN.Text>
    </RN.View>
  );
}
```

## **Configurar Navigation.js**

```jsx
import { NavigationContainer } from "@react-navigation/native";
```

Contiene toda la navegación de la aplicación.

```jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
```

Permite navegación tipo stack (apilar pantallas).

```jsx
const Stack = createNativeStackNavigator();
```

Crea el sistema de navegación.

```jsx
import Home from "./screens/Home";
import Add from "./screens/Add"
```

Importar las pantallas

### Estructuración de la pantalla

```jsx
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Add" component={Add} />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
```

## App.js

Reemplazar por:

```jsx
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <Navigation />
  );
}
```

## **Navegar entre pantallas**

### **Hook de navegación**

en Home.js

```jsx
import { useNavigation } from "@react-navigation/native";
```

Permite controlar la navegación desde cualquier componente.

Antes del return agregar

```jsx
const navigation = useNavigation();
```

Obtiene acceso a funciones como:

- navigate
- goBack

Agregar un boton pala la navegación

```jsx
<RN.Button title='Add screen' onPress={() => navigation.navigate('Add')} />
```

Agregamos opciones para la nueva ventana en Navigation.js

```jsx
<Stack.Screen name="Add" component={Add}  options={{presentation: 'modal'}}/>
```

## Add.js

## **Crear el proyecto con Expo**

### **Crear proyecto**

```bash
npx create-expo-app crud-tutorial --template blank
```

![image.png](React%20native/image.png)

### **Entrar al proyecto**

```bash
cd crud-tutorial
```

### **Abrir en VS Code**

```bash
code .
```

### **Ejecutar el proyecto**

```bash
npx expo start
```

![image.png](React%20native/image%201.png)

## **Instalar dependencias**

### **Instalar Firebase**

```bash
npm install firebase
```

### **Instalar manejo de variables de entorno**

```bash
npm install expo-constants expo-dotenv
npm install dotenv
```

- `expo-constants`: permite acceder a configuraciones del proyecto.
- `expo-dotenv`: ayuda a manejar variables privadas como llaves de Firebase.

### **Instalar React Navigation**

```bash
npm install @react-navigation/native
```

Permite navegar entre pantallas en React Native.

### **Instalar navegación tipo Stack**

```bash
npm install @react-navigation/native-stack
```

Permite crear navegación estilo pila:

- Abrir pantallas
- Volver atrás
- Mostrar modales

### **Instalar dependencias necesarias para navegación**

```bash
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
```

Son librerías necesarias para que React Navigation funcione correctamente.

Por ejemplo:

- Gestos
- Animaciones
- Manejo de pantallas
- Íconos

### **Instalar selector de emojis**

```bash
npm install rn-emoji-keyboard
```

Instala un componente visual para seleccionar emojis.

### **Instalar SVG**

```bash
npx expo install react-native-svg
```

Permite renderizar gráficos SVG, requeridos por el emoji picker.

## **Crear proyecto en Firebase**

[Firebase Console](https://console.firebase.google.com/?utm_source=chatgpt.com)

### **Crear Firestore Database**

1. Crear proyecto
2. Desactivar Google Analytics
3. Bases de datos y almacenamiento >> Firestore
    
    ![image.png](React%20native/image%202.png)
    
4. Create Database
5. Start in test mode

### **Registrar aplicación web**

En Firebase:

![image.png](React%20native/image%203.png)

- Configuración del proyecto
- Add App
- Web App

![image.png](React%20native/image%204.png)

Firebase entregará una configuración similar a esta:

```jsx
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## **Crear variables de entorno**

### **Crear archivo `.env` en la raiz del proyecto**

```
API_KEY=xxxx
AUTH_DOMAIN=xxxx
PROJECT_ID=xxxx
STORAGE_BUCKET=xxxx
MESSAGING_SENDER_ID=xxxx
APP_ID=xxxx
```

Guarda información sensible fuera del código.

Esto evita exponer credenciales al subir el proyecto a GitHub.

Cambiar  *xxxx* por los valores de Firebase

### **Agregar `.env` al `.gitignore`**

```
.env
```

## **Configurar Expo**

Renombrar:

```bash
app.json
```

por:

```bash
app.config.js
```

Importamos dotenv

```jsx
import 'dotenv/config';

export default {
  "expo": {
```

## **Código**

```jsx
import 'dotenv/config';

export default {
  "expo": {
    "name": "crud-tutorial",
    "slug": "crud-tutorial",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/android-icon-foreground.png",
        "backgroundImage": "./assets/android-icon-background.png",
        "monochromeImage": "./assets/android-icon-monochrome.png"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  }
}

```

Agregar sección extra. Permite acceder a las variables del `.env` desde cualquier parte de la aplicación.

## **Crear estructura del proyecto**

```
src/
 ├── components
 ├── config
 ├── screens
 └── Navigation.js
```

![image.png](React%20native/image%205.png)

Separar archivos facilita:

- mantenimiento
- escalabilidad
- reutilización de componentes

## **Configurar Firebase**

### **Crear archivo**

```bash
src/config/firebase.js
```

### **Código**

```jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
```

- `initializeApp`: inicia Firebase.
- `getFirestore`: conecta Firestore.
- `Constants`: accede a variables del proyecto.

```jsx
const firebaseConfig = {
  apiKey: Constants.expoConfig.extra.apiKey,
  authDomain: Constants.expoConfig.extra.authDomain,
  projectId: Constants.expoConfig.extra.projectId,
  storageBucket: Constants.expoConfig.extra.storageBucket,
  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
  appId: Constants.expoConfig.extra.appId,
  databaseURL: Constants.expoConfig.extra.databaseURL,
}

initializeApp(firebaseConfig);
export const database = getFirestore();
```

Extrae las variables de entorno configuradas anteriormente.

Inicializa la conexión con Firebase.

Crea y exporta la conexión a Firestore para usarla en toda la app.

## **Configurar navegación**

### **Crear pantallas**

```
src/screens/Home.js
src/screens/Add.js
```

![image.png](React%20native/image%206.png)

### **Home.js**

```jsx
import React from "react";
import * as RN from "react-native";

export default function Home() {
  return (
    <RN.View>
      <RN.Text>Home Screen</RN.Text>
    </RN.View>
  );
}
```

### **Add.js**

```jsx
import React from "react";
import * as RN from "react-native";

export default function Add() {
  return (
    <RN.View>
      <RN.Text>Add Screen</RN.Text>
    </RN.View>
  );
}
```

## **Configurar Navigation.js**

```jsx
import { NavigationContainer } from "@react-navigation/native";
```

Contiene toda la navegación de la aplicación.

```jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
```

Permite navegación tipo stack (apilar pantallas).

```jsx
const Stack = createNativeStackNavigator();
```

Crea el sistema de navegación.

```jsx
import Home from "./screens/Home";
import Add from "./screens/Add"
```

Importar las pantallas

### Estructuración de la pantalla

```jsx
function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Add" component={Add} />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
```

## App.js

Reemplazar por:

```jsx
import Navigation from "./src/Navigation";

export default function App() {
  return (
    <Navigation />
  );
}
```

## **Navegar entre pantallas**

### **Hook de navegación**

en Home.js

```jsx
import { useNavigation } from "@react-navigation/native";
```

Permite controlar la navegación desde cualquier componente.

Antes del return agregar

```jsx
const navigation = useNavigation();
```

Obtiene acceso a funciones como:

- navigate
- goBack

Agregar un boton pala la navegación

```jsx
<RN.Button title='Add screen' onPress={() => navigation.navigate('Add')} />
```

Agregamos opciones para la nueva ventana en Navigation.js

```jsx
<Stack.Screen name="Add" component={Add}  options={{presentation: 'modal'}}/>
```

## Add.js

```jsx
**import React from "react";
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
})**
```

---

---

---

---

---

---

# **14. Crear estado del formulario**

```jsx
const [newItem, setNewItem] = useState({
  emoji: "🔥",
  name: "",
  price: "",
  isSold: false,
  createdAt: new Date(),
});
```

Guarda temporalmente la información del producto antes de enviarla a Firebase.

---

# **15. Configurar Emoji Picker**

```jsx
const [isOpen, setIsOpen] = useState(false);
```

### **¿Qué hace?**

Controla si el selector de emojis está abierto o cerrado.

---

```jsx
<EmojiPicker
  open={isOpen}
  onClose={() => setIsOpen(false)}
  onEmojiSelected={handlePick}
/>
```

### **¿Qué hace?**

Renderiza el selector de emojis.

---

# **16. Crear Inputs**

## **Input nombre**

```jsx
<TextInput
  placeholder="Product Name"
/>
```

### **¿Qué hace?**

Crea un campo de texto para escribir el nombre del producto.

---

## **Capturar cambios**

```jsx
onChangeText={(text) =>
  setNewItem({
    ...newItem,
    name: text,
  })
}
```

### **¿Qué hace?**

Actualiza el estado cada vez que el usuario escribe.

---

# **17. Guardar datos en Firestore**

```jsx
import { addDoc, collection } from "firebase/firestore";
```

### **¿Qué hacen?**

- `collection`: referencia una colección.
- `addDoc`: agrega documentos.

---

```jsx
await addDoc(
  collection(db, "products"),
  newItem
);
```

### **¿Qué hace?**

Guarda el producto en Firestore.

Si la colección no existe, Firebase la crea automáticamente.

---

# **18. Leer datos en tiempo real**

```jsx
onSnapshot()
```

### **¿Qué hace?**

Escucha cambios en Firestore en tiempo real.

Cada vez que:

- se agrega
- elimina
- actualiza

un documento, React Native recibe los cambios automáticamente.

---

```jsx
orderBy("createdAt", "desc")
```

### **¿Qué hace?**

Ordena los productos del más reciente al más antiguo.

---

# **19. Actualizar productos**

```jsx
updateDoc(productRef, {
  isSold: true,
});
```

### **¿Qué hace?**

Actualiza únicamente el campo `isSold`.

---

# **20. Eliminar productos**

```jsx
await deleteDoc(productRef);
```

### **¿Qué hace?**

Elimina el documento de Firestore.

---

# **21. Conceptos importantes para reforzar**

## **Firestore**

Firestore trabaja con:

| **Concepto** | **Equivalente SQL** |
| --- | --- |
| Collection | Tabla |
| Document | Registro |
| Field | Columna |

---

# **22. Errores comunes durante la clase**

## **Error 1**

### **Firebase no conecta**

Posible causa:

- variables mal escritas
- `.env` incorrecto

---

## **Error 2**

### **Pantalla en blanco**

Posible causa:

- componente mal exportado
- navegación mal configurada

---

## **Error 3**

### **Datos no aparecen**

Posible causa:

- colección incorrecta
- nombre de campo diferente

---

# **23. Mejoras que puedes mostrar**

## **Validar formulario**

```jsx
if (!newItem.name || !newItem.price) {
  alert("Complete todos los campos");
  return;
}
```

### **¿Qué hace?**

Evita guardar productos vacíos.

---

## **Manejo de errores**

```jsx
try {

} catch (error) {
  console.log(error);
}
```

### **¿Qué hace?**

Captura errores para evitar que la aplicación falle.

---

# **24. Actividad final sugerida**

Pedir que los estudiantes agreguen:

- Imagen del producto
- Categoría
- Buscador
- Filtro de vendidos
- Pantalla detalle
- Confirmación antes de eliminar
- Edición completa del producto

---

# **25. Resultado esperado**

Al finalizar la clase los estudiantes deberán comprender:

- Cómo conectar React Native con Firebase
- Cómo funciona Firestore
- Cómo crear un CRUD completo
- Cómo escuchar datos en tiempo real
- Cómo manejar navegación en React Native
- Cómo estructurar un proyecto móvil correctamente
