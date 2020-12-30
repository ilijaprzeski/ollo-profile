import firebase from 'react-native-firebase/dist/index';
import PhoneVerifyState from './PhoneVerifyState';
import * as SecureStore from './SecureStore';

export const verifyPhoneNumber = () => {
  return new Promise(resolve => {
    SecureStore.getPhoneNumber().then(
      phoneNumber => {
        firebase
          .auth()
          .verifyPhoneNumber(phoneNumber)
          .on('state_changed', (phoneAuthSnapshot) => {
            let statusObj = {};

            switch (phoneAuthSnapshot.state) {
              case firebase.auth.PhoneAuthState.CODE_SENT:
              case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
                console.log('sms code sent');

                statusObj.status = PhoneVerifyState.VerifySMSCode;
                statusObj.verificationId = phoneAuthSnapshot.verificationId;
                resolve(statusObj);
                break;

              case firebase.auth.PhoneAuthState.ERROR:
                console.log('phone verification error');

                statusObj.status = PhoneVerifyState.Invalid;
                statusObj.message = phoneAuthSnapshot.error.message;
                resolve(statusObj);
                break;

              case firebase.auth.PhoneAuthState.AUTO_VERIFIED:
                console.log('auto verified on android');

                statusObj.status = PhoneVerifyState.Verified;

                completePhoneSignIn(phoneAuthSnapshot.verificationId, phoneAuthSnapshot.code)
                  .then(
                    (authStatus) => {
                      statusObj.authInfo = authStatus;
                      resolve(statusObj);
                    });

                break;
            }
          });
      });
  });
};

export const completePhoneSignIn = (verificationId, code) => {
  const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);

  return new Promise(resolve => {
    let statusObj = {};

    firebase
      .auth()
      .signInWithCredential(credential)
      .then(
        (userCredential) => {
          statusObj.success = true;
          statusObj.user = userCredential;

          resolve(statusObj);
        },
        (rejected) => {
          statusObj.success = false;
          statusObj.rejection = rejected;

          resolve(statusObj);
        });

  });
};

export const loadUser = async () => {
  if (firebase.auth().currentUser) {
    try {
      const token = await firebase.auth().currentUser.getIdToken(true);
      await SecureStore.setUserToken(token);
      return firebase.auth().currentUser;
    }
    catch {
      await SecureStore.unsetUserToken();
      return null;
    }
  }
  return null;
};

export const getUser = () => {
  return firebase.auth().currentUser;
};

export const signOut = () => {
  return new Promise(resolve => {
    SecureStore.unsetUserToken()
      .then(() => {
        SecureStore.unsetPhoneNumber()
          .then(() => {
            resolve(firebase.auth().signOut());
          });
      });
  });
};

