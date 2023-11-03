import {supabase} from "@/lib/supabase/supabaseClient";

export async function getUserSession(): Promise<Session> {
    let session = null;

    await supabase.auth.getSession().then(async (result) => {
        session = result.data.session.user?.id;
    });
    return session;
}

export async function getContactsOfUserWithId(id): Promise<Array<string>> {
    let contacts = [];

    await supabase
        .from('contacts')
        .select('contact')
        .eq('user_id', id)
        .then(({data, error}) => {
            if (error) {
                console.log(error)
            } else {
                contacts = data;
            }
        });

    return contacts;
}

export async function getChatsOfUserWithIDSentToUserWithID(current_user_id, current_contact_id): Promise<String[]> {
    let chats = [];

    await supabase
        .from('chats')
        .select()
        .match({'user_id': current_user_id, 'contact': current_contact_id})
        .order('created_at', {ascending: true})
        .then((allChats) => {
            chats = allChats.data;
        });
    return chats;
}

export async function getUserDetailsOfUserWithID(id): Promise<string> {
    let username = '';

    await supabase.from('users')
        .select('username, user_id, email')
        .eq('user_id', id).then(({data, error}) => {
            if (error) {
                console.log(error)
            } else {
                username = data[0];
            }
        });

    return username;
}

// function to check if a certain user with a specific user_id actually exists in auth of supabase
export async function checkIfUserExistsInAuth(user_id): Promise<boolean> {
    let exists = false;

    await supabase.from('users')
        .select('user_id')
        .eq('user_id', user_id).then(({data, error}) => {
            try {
                exists = !!data[0].user_id;
            } catch (e) {
                exists = false;
            }
        });

    return exists;
}


export async function checkIfUsernameExists(username): Promise<boolean> {
    let exists = false;

    await supabase.from('users')
        .select('username')
        .eq('username', username).then(({data, error}) => {
            try {
                exists = !!data[0].username;
            } catch (e) {
                exists = false;
            }
        });

    return exists;
}


export async function getChipsOfSpecificDialogBetweenUserAndContact(current_user_id, contact_id, chat_id): Promise<String[]> {
    let chips = [];
    await supabase
        .from('chats')
        .select('chips')
        .match({'user_id': current_user_id, 'contact': contact_id, 'chat_id': chat_id})
        .then((allChips) => {
            chips = allChips.data;
        });
    return chips;
}

export async function checkIfUserWithUIDExistsInUsersTable(user_id) {
    let exists = false;

    await supabase.from('users')
        .select('user_id')
        .eq('user_id', user_id).then(({data, error}) => {
            try {
                exists = !!data[0].user_id;
            } catch (e) {
                exists = false;
            }
        });

    return exists;
}

export async function getAvatarForID(id: string) {
    return supabase.storage
        .from('avatars')
        .getPublicUrl(`${id}/avatar.jpeg`).data.publicUrl + '?' + new Date().getTime();
}

export async function checkFileExists(bucketName: string, filePath: string) {
    const {data, error} = await supabase.storage
        .from(bucketName)
        .list(filePath)

    return data?.length > 0;
}


export async function messageSentByMe(id: string, chat_id: string) {
    let sentByMe = false;

    await supabase
        .from('chats')
        .select('chat_id')
        .match({'user_id': id, 'chat_id': chat_id}).then(({data, error}) => {
            try {
                sentByMe = !!data[0].chat_id;
            } catch (e) {
                sentByMe = false;
            }
        });

    return sentByMe;
}
