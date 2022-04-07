const { DataTypes, Model } = require('sequelize');

module.exports = class Sorteios extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            authorId: { type: DataTypes.TEXT },
            winnersId: { type: DataTypes.TEXT, defaultValue: '[]' },
            maxWinners: { type: DataTypes.INTEGER, defaultValue: 1 },
            time: { type: DataTypes.TEXT },
            timeMs: { type: DataTypes.TEXT },
            premio: { type: DataTypes.TEXT },
            messageId: { type: DataTypes.TEXT},
            channelId: { type: DataTypes.TEXT},
            ended: { type: DataTypes.BOOLEAN, defaultValue: false}
        }, {
            tableName: 'Sorteios',
            timestamps: false,
            sequelize
        });
    }
}