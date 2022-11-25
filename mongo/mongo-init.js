print("########### START ###########")

db = db.getSiblingDB('buyIT');
db.createUser(
    {
        user: "gfmois",
        pwd: "1234",
        roles: [
            {
                role: "readWrite",
                db: "buyIT"
            }
        ]
    }
)