import { initializeApp, cert, getApps, getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccount = {
  type: "service_account",
  project_id: "toomore-c0619",
  private_key_id: "206d110484dc791643b0d49d49ff1344245fbe68",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: "firebase-adminsdk-fbsvc@toomore-c0619.iam.gserviceaccount.com",
  client_id: "118052358574431442173",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40toomore-c0619.iam.gserviceaccount.com",
}

const adminApp = getApps().length === 0
  ? initializeApp(
      {
        credential: cert(serviceAccount as any),
        storageBucket: 'toomore-c0619.appspot.com',
      },
      'admin'
    )
  : getApp('admin')

export const adminDb = getFirestore(adminApp)
export { adminApp }