const config_env_variable = {
    appwriteUrl: String(import.meta.end.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.end.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.end.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.end.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.end.VITE_APPWRITE_BUCKET_IDF),
}

export default config_env_variable