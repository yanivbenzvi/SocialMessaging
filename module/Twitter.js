import twitter from 'twitter'
export class TwitterAPI {

    // should be private
    static default_options() {
        return {
            consumer_key: 'vzplcQiyq9HHXlOz6GYg5w7Hx',
            consumer_secret: 'XMpiuos8MeKYNDFSGa1vAnj46Z6fFCFUo0JizH0ymx7RC9jkdV',
            access_token_key: '1109786317821489157-nolUSmcxSVutxFiVtgvmEAe8yGghKk',
            access_token_secret: 'nox2Y0ETWK3IjQgk80x6Y0uW0nvmFjzoPJtZg9DXmAO5N'
        }
    }

    constructor(options = TwitterAPI.default_options()) {
        this._options = options;
        this.client = new twitter(options)
    }

    async is_logged_in() {
        try {
            await this.client.get('statuses/show/a', {})
        }
        catch (err) {
            try {
                return (err[0].code == '34');
            }
            catch{
                return false;
            }
        }
    }

    /**
     * async, posts message as client logged in to twitter, for the corresponding app;
     * returns the id of the message posted and stores all messages in a dictionary 
     * 
     * @param {String} message
     * @returns {PromiseLike<string>} 
     */
    async post(message, is_fav = true) {
        let json = await this.client.post('statuses/update', { status: message });
        if (is_fav) await this.client.post('favorites/create/', { id: json.id_str });
        return json.id_str;
    }

    /**
     * async, pulls message using message id;
     * returns the message text
     * 
     * @param {String} id
     * @returns {PromiseLike<string>} 
     */
    async pull(id) {
        let stat = 'statuses/show/' + id;
        let json = await this.client.get(stat, {"tweet_mode":"extended"});
        return json.full_text;
    }

    async pull_all() {
        let json = await this.client.get("favorites/list", {"tweet_mode":"extended"});
        return json.map(el => { return { id: el.id_str, text: el.full_text } });
    }
    /**
     * async, destroys message using message id;
     * returns true of message destroyed, else false
     * 
     * @param {String} id
     * @returns {PromiseLike<boolean>} 
     */
    async destroy(id) {
        let stat = 'statuses/destroy/' + id;
        return await this.client.post(stat, {});
    }

    static get_client(options) {
        if (TwitterAPI._instance) {
            return TwitterAPI._instance;
        }
        TwitterAPI._instance = new TwitterAPI(options);
        return TwitterAPI._instance;
    }
}