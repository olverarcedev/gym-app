import { google } from 'googleapis';
import serviceAccount from '../../placeholders/service-account.json';
import admin from 'firebase-admin';

const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];

const getAccessToken = async () => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
            databaseURL: 'https://uta-sport-734ef.firebaseio.com'
        });
    }
    const jwtClient = new google.auth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        SCOPES,
        null
    );

    const tokens: any = await new Promise((resolve, reject) => {
        jwtClient.authorize((err, tokens) => {
            if (err) {
                reject(err);
            } else {
                resolve(tokens);
            }
        });
    });
    return tokens.access_token
}
export default getAccessToken;