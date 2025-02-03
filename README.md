## Scholary User Documentation: Local Machine Setup and Project Structure

### **Overview**

npm i react-native-onboarding-swiper

This documentation will guide you through the process of setting up an **Expo project** on your local machine, explain the project structure, and help you get started developing using **VS Code**. It is designed for users who are familiar with coding in **React Native** and want to work locally with **Expo**.

---

### **1. Setting Up Your Local Environment**

To get started working on your **Expo project** locally using **VS Code**, follow these steps:

#### **Prerequisites:**
- **Node.js** (LTS version) installed on your system. You can download it from [Node.js Official Site](https://nodejs.org/).
- **Expo CLI** installed globally.  
  If you don't have Expo CLI installed, run the following command in your terminal:
  ```bash
  npm install -g expo-cli
  ```

#### **Steps to Set Up the Project Locally:**

1. **Create a New Expo App**  
   Open your terminal and run the following command to create a new Expo project:
   ```bash
   npx create-expo-app@latest
   ```

2. **Navigate to Your Project Folder**  
   After the project has been created, navigate into the project folder:
   ```bash
   cd Project
   ```

3. **Start the Expo Project**  
   To start the development server and open the project in **Expo Developer Tools**:
   ```bash
   expo start
   ```
   This will open the Expo Developer Tools in your browser. You can:
   - Preview the app by scanning the **QR code** on your phone/tablet using the **Expo Go app**.
   - Open an **Android** or **iOS emulator** to see the app in action.

---

### **2. Project Folder Structure**

After creating a project using `npx create-expo-app@latest`, your project folder will have the following structure:

```
Project/                      # Root folder of your project
├── src/app/                          
│   ├── assets/                    # Folder to store images, fonts, and other media files
│   │   ├── icons/                 # Store app icons
│   │   └── logo.png               # Example image file
│   ├── components/                # Reusable components such as buttons, headers, etc.
│   │   ├── Button.js              # Button component
│   │   └── Loading.js             # Loading spinner component
│   │   └── screen.js            # screen wrapper component for app Screen
│   ├── components/helpers/common.js                 dimensions for screen size height and width
│   ├── constants/                 # App constants (styling, settings, etc.)
│   │   └── theme.js           # Define app-wide constants
│   ├── context/                   # Context API to manage global state
│   │   └── AuthContext.js         # Example authentication context
│   ├── api/                       # API interaction files
│   │   ├── AuthApi.js             # API for authentication
│   │   ├── ChannelApi.js          # API for channel data
│   │   └── UserApi.js             # API for user data
│   │   └── chatApi.js             # API for chat data
│   ├── screens/                   # Folder to store all app screens
│   │   ├── HomeScreen.js          # Example screen
│   │   ├── LoginScreen.js         # Login screen
│   │   └── SignupScreen.js        # Signup screen
│   ├── App.js                     # Entry point for the app
│   └── Navigation.js              # Handles navigation between screens
├── node_modules/                  # Contains all the npm dependencies for the project
├── package.json                   # Project metadata, dependencies, and scripts
├── babel.config.js                # Babel configuration for transpiling JavaScript
├── metro.config.js                # Metro bundler configuration (for React Native)
└── app.json                       # Expo app configuration file (app name, icon, splash screen)
```

#### **Folder Breakdown:**

- **`src/assets/`**:  
   **Purpose**: Stores all static files like images, icons, fonts, etc.  
   **Usage**: Place all media files used in your app (e.g., `logo.png`, `splash.png`) here.

- **`src/components/`**:  
   **Purpose**: Stores reusable components such as buttons, headers, etc.  
   **Usage**: Add components that are used across multiple screens or parts of the app (e.g., `Button.js`, `Loading.js`).

- **`src/constants/`**:  
   **Purpose**: Stores app-wide constants such as colors, font styles, or fixed values.  
   **Usage**: Define constants that will be used throughout the app in files like `constants.js`.

- **`src/context/`**:  
   **Purpose**: Manages the app’s global state using React's Context API.  
   **Usage**: Store shared state, such as authentication or user data (e.g., `AuthContext.js`).

- **`src/api/`**:  
   **Purpose**: Handles API calls for various app functionalities (e.g., authentication, user data, channels).  
   **Usage**: Create functions to interact with your backend services (e.g., `AuthApi.js`, `UserApi.js`).

- **`src/screens/`**:  
   **Purpose**: Stores all the screens/views for your app.  
   **Usage**: Create screens that will be rendered by the app, such as login, signup, and home screens (e.g., `HomeScreen.js`, `LoginScreen.js`).

- **`App.js`**:  
   **Purpose**: The entry point of the app where the main component and app logic are set up.  
   **Usage**: Modify this file to define the initial screen and setup global configurations.

- **`Navigation.js`**:  
   **Purpose**: Handles app navigation logic (e.g., stack navigation, tab navigation).  
   **Usage**: Set up your app’s screen navigation here using libraries like React Navigation.

---

### **3. Running the Project Locally**

To run and preview your project on your local machine, follow these steps:

1. **Start the Expo Server**:  
   Run the following command to start the Expo development server:
   ```bash
   expo start
   ```

   This will open the Expo Developer Tools in your browser.

2. **Scan the QR Code**:  
   - Open the **Expo Go app** on your mobile device.
   - Scan the **QR code** displayed in your browser to preview the app on your phone/tablet.

3. **Run on Emulator**:  
   If you don’t have a physical device, you can use an Android or iOS emulator.  
   Expo will also open the app in your selected emulator.

4. **Make Changes and Save**:  
   As you make changes to your app’s code, the changes will be automatically reflected in the Expo app on your device or emulator.

---

### **4. Common Commands for Development**

Here are some useful commands for working with your Expo project:

- **`expo start`**:  
   Start the development server and open Expo Developer Tools in the browser.

- **`expo build:ios` or `expo build:android`**:  
   Build your app for iOS and Android.

- **`expo publish`**:  
   Publish your app to Expo's cloud, enabling over-the-air updates.

- **`npm install` or `yarn add`**:  
   Install new dependencies for your app.

---

### **5. Next Steps**

1. **Create New Components**:  
   Add more reusable components, such as buttons, headers, or custom UI elements, to the `src/components/` folder.

2. **Setup Navigation**:  
   If your app has multiple screens, set up **React Navigation** to handle screen transitions.  
   Install the navigation library by running:
   ```bash
   npm install @react-navigation/native @react-navigation/stack
   ```

3. **Connect to an API**:  
   Use **Axios** or **Fetch API** to connect your app to a backend service and retrieve data.  
   Install Axios by running:
   ```bash
   npm install axios
   ```

4. **Deploy to App Stores**:  
   When your app is ready for production, follow the [Expo guide on building apps](https://docs.expo.dev/distribution/building-standalone-apps/) to deploy to the iOS and Android app stores.

---

### **Conclusion**

You are now ready to work on your Expo project locally. By following the steps in this guide, you should be able to set up your development environment, understand the project structure, and get started with building your app.

Let me know if you need any further assistance!