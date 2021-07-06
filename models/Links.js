'use strict';

const db = require('./conn');


class LinksModel {
    constructor(id, userID, uuid, custom_link, target_url, title, date_added, click_count) {
        this.id = id;
        this.userID = userID;
        this.uuid = uuid;
        this.custom_link = custom_link;
        this.target_url = target_url;
        this.title = title;
        this.date_added = date_added;
        this.click_count = click_count;
    }

    //Method to retrieve all links for a specific user
    static async getAll(userID) {
        try {
            const response = await db.any(
                `SELECT * FROM links
                WHERE userID = ${userID}
                ORDER by id;`
            )
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    //Method to retrieve all links for user and sort by user parameter
    static async getBy(userID, parameter) {
        try {
            const response = await db.any(
                `SELECT * FROM links
                WHERE userID = ${userID}
                ORDER by '${parameter}';`
            )
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    //Method to create custom link while logged in
    static async addCustomLink(userID, uuid, custom_link, target_url, title) {
        try {
            const query = `
                INSERT INTO links 
                    (userID, uuid, custom_link, target_url, title)
                VALUES
                (${userID}, '${uuid}', '${custom_link}', '${target_url}', '${title}');`
            const response = await db.one(query);
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    //Method to add link without being logged in
    static async addLink(uuid, target_url) {
        try {
            const query = `
                INSERT INTO links 
                    (uuid, target_url)
                VALUES
                ('${uuid}', '${target_url}');`
            const response = await db.one(query);
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    //Method to update existing custom link
    static async updateLink(id, custom_link, target_url, title) {
        try {
            const query = `
                UPDATE links
                SET custom_link = '${custom_link}'
                SET target_url = '${target_url}'
                SET title = '${title}'
                WHERE id = ${id};`
            const response = await db.result(query);
            return response;
        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    //Method to increment click count
    static async updateClicks(id) {
        try {
            const response = await db.result(`
                UPDATE links
                SET click_count = click_count + 1
                WHERE id = ${id};`
            )
        return response;

        } catch(error) {
            console.error("ERROR: ", error);
            return error;
        }
    }

    //Method to delete a saved link
    static async deleteLink(id) {
        try {
            const response = await db.result(
                `DELETE FROM links
                WHERE id = ${id};`
            )
            return response;
        } catch(error) {
            console.log("ERROR: ", error);
        }
    }
}

module.exports = LinksModel;