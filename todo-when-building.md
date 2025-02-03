### Things to do when trying to build .apk (android) or .app (iOS) file

### **1. Remove all expo packeges**
Ensure all the expo packages or dependencies (components in source code) are removed

### **2. Re-check NativeWind installation**
Ensure you recheck **NativeWind**'s installation for the **framework-less** category.

### **3. Change all `background` colors to `tertiary` when needed**
Change the the following files:
1. BottomNav.js
2. ChatItem.tsx
3. EventItem.tsx
4. app.json (splash background image)

And if needed, add the following into the `android` json in the `app.json` file:
`
"adaptiveIcon": {
        "foregroundImage": "./assets/favicon.png",
        "backgroundColor": "#000000"
      },
`