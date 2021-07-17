const databases = require('../../../databases/index');

const accounts = databases.accounts;

function verify_letters(targets, letters) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < targets.length; i++) {
            for (let j = 0; j < letters.length; j++) {
                if (targets[i].indexOf(letters[j]) != -1) resolve(true);
            }
        }
        resolve(false);
    });
}

async function verify_disponibility(columns, table, target_column, target_item) {
    var selection = await accounts.select(
        columns,
        table,
        `where ${target_column} = '${target_item}'`
    );

    if (selection.length) return false
    return true;
}

async function register(username, password) {
    try {
        if (await verify_letters(
            [username, password], 
            ["'", ' ']
        ) || !await verify_disponibility(
            ['*'], 
            'users', 
            'username', 
            username
        )) return false;

        await accounts.insert(
            'users',
            ['username', 'password'],
            [username, password]
        );
        
        return true;
        
    } catch(error) {
        console.log(error);
        return false;
    }
}

module.exports = register;