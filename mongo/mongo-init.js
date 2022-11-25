print("########### START ###########")

db = db.getSiblingDB('buyIT');
db.createUser(
    {
        user: "joan",
        pwd: "1234",
        roles: [
            {
                role: "readWrite",
                db: "buyIT"
            }
        ]
    }
)