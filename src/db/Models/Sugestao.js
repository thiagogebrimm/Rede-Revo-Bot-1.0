const { DataTypes, Model } = require('sequelize');

module.exports = class Sugestao extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            pergunta01: { type: DataTypes.STRING },
            pergunta02: { type: DataTypes.STRING },
            messageId: { type: DataTypes.STRING },
            autor: { type: DataTypes.STRING },
            resolved: { type: DataTypes.BOOLEAN },


        }, {
            tableName: 'Sugestao',
            timestamps: true,
            sequelize
        });
    }
}