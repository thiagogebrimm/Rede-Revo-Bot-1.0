const { DataTypes, Model } = require('sequelize');

module.exports = class Sugestao extends Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            votosPositivo: { type: DataTypes.INTEGER },
            votosNegativo: { type: DataTypes.INTEGER },
            pergunta01: { type: DataTypes.STRING },
            pergunta02: { type: DataTypes.STRING },
            messageId: { type: DataTypes.STRING },
            autor: { type: DataTypes.STRING }
            
        }, {
            tableName: 'Sugestao',
            timestamps: true,
            sequelize
        });
    }
}