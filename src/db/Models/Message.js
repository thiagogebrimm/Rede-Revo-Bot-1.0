const { DataTypes, Model } = require('sequelize');

module.exports = class Message extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            authorId: { type: DataTypes.TEXT },
            time: { type: DataTypes.TEXT },
            timeMs: { type: DataTypes.TEXT },
            messageId: { type: DataTypes.TEXT},
            channelId: { type: DataTypes.TEXT},
            deleted: { type: DataTypes.BOOLEAN, defaultValue: false}
        }, {
            tableName: 'Messages',
            timestamps: false,
            sequelize
        });
    }
}