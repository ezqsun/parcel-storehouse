// Import Dexie
import Dexie from 'dexie';
import { AuthUser } from './user-reducer';

// Subclass it
export class UserDatabase extends Dexie {
    user: Dexie.Table<AuthUser, number>;

    constructor (databaseName: string) {
        super(databaseName);
        this.version(1).stores({
            user: 'access_token,expires_in,expires_on,refresh_token,token_type'
        });
        this.user = this.table('user'); // Just informing Typescript what Dexie has already done...
    }
}
