import  React from 'react'
import {View, Button, StyleSheet} from 'react-native'
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase'


const LogInScreen = () => {

  const   isUserEqual =(googleUser, firebaseUser) =>{
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getBasicProfile().getId()) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  const onSignIn =(googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.id_token,
            googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
        .auth()
        .signInWithCredential(credential)
        .then(function(){
          console.log("User Sign in")
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  }
   const signInWithGoogleAsync = async() => {
        try {
          const result = await Google.logInAsync({
             behavior: 'web',            
            androidClientId:'762894301670-gt5nvlevp6i94bkglqj3h5b8dhfrrj9u.apps.googleusercontent.com' ,
            //iosClientId: YOUR_CLIENT_ID_HERE,
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

      const signInWithGoogle = () => {
        signInWithGoogleAsync()
        }
        
       
    return (
        <View style={styles.container}>
            <Button
            style={styles.button}
            title="Sign In With Google"
            onPress={() => signInWithGoogle()}
            />

        </View>
         );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }, 
    button : {
      alignSelf: "stretch",
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginTop: 32,
      marginHorizontal: 32,
      borderRadius: 6    }
})

export default LogInScreen
