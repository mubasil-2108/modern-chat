import { Client, Databases } from 'react-native-appwrite';

if (!process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID || !process.env.EXPO_PUBLIC_APPWRITE_DATABASE) {
    throw new Error('APPWRITE_PROJECT_ID or APPWRITE_DATABASE is not set');
}

const appwriteConfig = {
    endpoint: 'https://fra.cloud.appwrite.io/v1',
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    platform: 'com.mubasil2108.modrenchat',
    db: process.env.EXPO_PUBLIC_APPWRITE_DATABASE,
    col: {
        chatrooms: '68628dd3002e1f0c10a5',
        messages: '68628dbd0025c7273577'
    }
}

const client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const db = new Databases(client);

export { appwriteConfig, client, db };

