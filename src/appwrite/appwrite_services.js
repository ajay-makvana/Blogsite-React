import config_env_variable from "../config_env_variable/config_env_variable";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DBService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config_env_variable.appwriteUrl)
            .setProject(config_env_variable.appwriteProjectId);
        this.databases = new Databases();
        this.storage = new Storage();
    }

    // taken slug as unique ID - so all functionality DOCUMENT_ID = slug

    // creating Post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config_env_variable.appwriteDatabaseId,
                config_env_variable.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        }
        catch (error) {
            console.log("Appwrite service :: createPost :: error ", error);
        }
    }

    // updating Post
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config_env_variable.appwriteDatabaseId,
                config_env_variable.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        }
        catch (error) {
            console.log("Appwrite service :: updatePost :: error ", error);
        }
    }

    // deleting post
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config_env_variable.appwriteDatabaseId,
                config_env_variable.appwriteCollectionId,
                slug
            );
            return true; // successful deleted
        }
        catch (error) {
            console.log("Appwrite service :: deletePost :: error ", error);
            return false;
        }
    }

    // get specific Post
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config_env_variable.appwriteDatabaseId,
                config_env_variable.appwriteCollectionId,
                slug
            );
        }
        catch (error) {
            console.log("Appwrite service :: getPost :: error ", error);
            return false;
        }
    }

    // get all document
    // whose status = active (published) only so using Query
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                config_env_variable.appwriteDatabaseId,
                config_env_variable.appwriteCollectionId,
                queries,
                // Paggination
            );
        }
        catch (error) {
            console.log("Appwrite service :: getPosts :: error ", error);
            return false;
        }
    }

    // --- File Services

    // uploading Post image
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config_env_variable.appwriteBucketId,
                ID.unique(),
                file
            );
        }
        catch (error) {
            console.log("Appwrite service :: uploadFile :: error ", error);
            return false;
        }
    }

    // deleting Post image
    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config_env_variable.appwriteBucketId,
                fileId
            );
        }
        catch (error) {
            console.log("Appwrite service :: deleteFile :: error ", error);
            return false;
        }
    }

    // Post image preview
    async getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config_env_variable.appwriteBucketId,
            fileId
        );
    }

}

// exporting object of DBService
const dbService = new DBService();
export default dbService;